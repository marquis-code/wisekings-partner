<template>
  <div class="h-screen w-screen flex bg-[#f0f2f5] overflow-hidden select-none">
    <!-- Left Sidebar: Conversation List -->
    <div class="w-full md:w-[400px] flex flex-col bg-white border-r border-[#e9edef] shrink-0">
      <!-- User Info & Actions Header -->
      <div class="h-[64px] px-4 flex items-center justify-between bg-[#f0f2f5] shrink-0">
        <div class="flex items-center gap-3">
          <NuxtLink to="/" class="group flex items-center gap-2 pr-4 border-r border-gray-300">
             <Icon name="lucide:arrow-left" class="w-5 h-5 text-gray-700 group-hover:-translate-x-1 transition-transform" />
             <span class="text-xs font-black text-gray-900 uppercase tracking-tighter">Dashboard</span>
          </NuxtLink>
          <div class="w-10 h-10 rounded-full bg-[#033958] flex items-center justify-center text-white font-black text-sm shadow-sm ring-2 ring-white">
            {{ user?.fullName?.[0] }}
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button class="p-2 text-[#54656f] hover:bg-gray-200 rounded-full transition-colors">
            <Icon name="lucide:users" class="w-5 h-5" />
          </button>
          <button class="p-2 text-[#54656f] hover:bg-gray-200 rounded-full transition-colors">
            <Icon name="lucide:message-square-plus" class="w-5 h-5" />
          </button>
          <button class="p-2 text-[#54656f] hover:bg-gray-200 rounded-full transition-colors">
            <Icon name="lucide:more-vertical" class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Search & Filter -->
      <div class="p-4 shrink-0 bg-white">
        <div class="relative group">
          <Icon name="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#033958] transition-colors" />
          <input 
            placeholder="Search or start new chat" 
            class="w-full bg-[#f0f2f5] border-none rounded-xl py-2 pl-12 pr-4 text-xs font-medium focus:ring-0 placeholder:text-gray-500"
          />
        </div>
      </div>

      <!-- Conversations List -->
      <div class="flex-1 overflow-y-auto bg-white custom-scrollbar">
        <div v-if="loadingConversations" class="flex justify-center p-12">
          <Icon name="lucide:loader-2" class="w-8 h-8 text-[#033958] animate-spin" />
        </div>

        <div v-else-if="conversations.length === 0" class="flex flex-col items-center justify-center h-full p-8 text-center space-y-6">
          <div class="w-20 h-20 bg-[#f0f2f5] rounded-full flex items-center justify-center animate-pulse">
            <Icon name="lucide:message-circle" class="w-10 h-10 text-gray-300" />
          </div>
          <div>
            <p class="text-sm font-black text-gray-900 mb-1">No chats yet</p>
            <p class="text-xs text-gray-500 font-medium">Connect with support or browse the community.</p>
          </div>
          <div class="grid grid-cols-1 w-full gap-3">
            <button @click="startSupportChat" class="w-full py-3 bg-[#033958] text-white rounded-xl text-xs font-black shadow-lg shadow-blue-900/20 hover:bg-[#055380] transition-all active:scale-[0.98]">
              Contact Support
            </button>
            <button @click="joinCommunity" class="w-full py-3 bg-gray-900 text-white rounded-xl text-xs font-black hover:bg-black transition-all active:scale-[0.98]">
              Join Community
            </button>
          </div>
        </div>

        <div v-else class="divide-y divide-[#f5f6f6]">
          <button 
            v-for="conv in conversations" 
            :key="conv._id"
            @click="getHistory(conv)"
            :class="['w-full h-18 px-4 flex items-center gap-4 transition-colors text-left group', 
              activeConversation?._id === conv._id ? 'bg-[#f0f2f5]' : 'hover:bg-[#f5f6f6]']"
          >
            <div class="relative shrink-0">
              <div class="w-12 h-12 rounded-full flex items-center justify-center font-black text-white text-lg shadow-sm"
                :class="conv.type === 'group' ? 'bg-gradient-to-br from-blue-500 to-indigo-600' : 'bg-gradient-to-br from-[#033958] to-[#055380]'">
                {{ getConversationName(conv).charAt(0) }}
              </div>
              <div v-if="conv.unreadCount" class="absolute -top-1 -right-1 w-5 h-5 bg-[#25d366] border border-white rounded-full flex items-center justify-center text-[10px] text-white font-black">
                {{ conv.unreadCount }}
              </div>
            </div>
            <div class="flex-1 min-w-0 border-b border-[#f5f6f6] py-3 group-last:border-none">
              <div class="flex items-center justify-between mb-1">
                <span class="font-bold text-gray-900 truncate">{{ getConversationName(conv) }}</span>
                <span class="text-[10px] text-gray-500 font-medium">{{ formatLastTime(conv.lastMessageAt) }}</span>
              </div>
              <p class="text-xs text-gray-500 truncate font-medium flex items-center gap-1">
                <Icon v-if="conv.lastMessageBy === user?._id" name="lucide:check-check" class="w-3.5 h-3.5 text-blue-500" />
                {{ conv.lastMessage || 'Click to start chatting' }}
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Right Area: Chat Window -->
    <div class="flex-1 flex flex-col bg-[#efeae2] relative">
      <!-- Wallpaper Overlay -->
      <div class="absolute inset-0 opacity-[0.06] pointer-events-none bg-[url('https://as2.ftcdn.net/v2/jpg/04/40/25/11/1000_F_440251147_iM1JtDoz7vA63jK278XlH6gZkP6q3c9S.jpg')] bg-repeat"></div>

      <template v-if="activeConversation">
        <!-- Chat Header -->
        <div class="h-[64px] px-4 flex items-center justify-between bg-[#f0f2f5] border-b border-[#e9edef] shrink-0 relative z-10">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full flex items-center justify-center bg-gray-300 text-white font-black text-lg shadow-sm shrink-0"
              :class="activeConversation.type === 'group' ? 'bg-gradient-to-br from-blue-400 to-indigo-500' : 'bg-gradient-to-br from-[#033958] to-[#055380]'">
              {{ getConversationName(activeConversation).charAt(0) }}
            </div>
            <div class="min-w-0">
              <h2 class="font-black text-sm text-gray-900 truncate tracking-tight">{{ getConversationName(activeConversation) }}</h2>
              <p class="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1 tracking-wider">
                {{ isConnected ? 'Online' : 'Linking...' }}
                <span v-if="isTyping" class="text-blue-600 lowercase animate-pulse">• typing...</span>
              </p>
            </div>
          </div>
          <div class="flex items-center gap-4 px-2">
            <button class="p-2 text-[#54656f] hover:bg-gray-200 rounded-full transition-colors">
              <Icon name="lucide:search" class="w-5 h-5" />
            </button>
            <button class="p-2 text-[#54656f] hover:bg-gray-200 rounded-full transition-colors">
              <Icon name="lucide:more-vertical" class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Messages Flow -->
        <div class="flex-1 overflow-y-auto p-12 space-y-2 relative z-10 custom-scrollbar scroll-smooth" ref="messageContainer">
          <div v-if="loadingHistory" class="flex justify-center py-20">
            <Icon name="lucide:loader-2" class="w-10 h-10 text-blue-500 animate-spin" />
          </div>
          
          <template v-else>
            <template v-for="(msg, i) in messages" :key="msg._id">
               <!-- Date Separator -->
               <div v-if="showDateSeparator(i)" class="flex justify-center my-6">
                <span class="px-3 py-1.5 bg-white rounded-lg text-[10px] font-black text-gray-500 uppercase tracking-widest shadow-sm">
                  {{ formatDateSeparator(msg.createdAt) }}
                </span>
               </div>

               <div :class="['flex mb-1', msg.senderId?._id === user?._id ? 'justify-end' : 'justify-start']">
                <div :class="['max-w-[85%] md:max-w-[65%] flex flex-col', msg.senderId?._id === user?._id ? 'items-end' : 'items-start']">
                  <!-- Message Bubble -->
                  <div :class="['relative p-2.5 shadow-sm min-w-[80px] group transition-all', 
                    msg.senderId?._id === user?._id 
                      ? 'bg-[#dcf8c6] rounded-xl rounded-tr-none' 
                      : 'bg-white rounded-xl rounded-tl-none']">
                    
                    <!-- Sender Name for Groups -->
                    <p v-if="msg.senderId?._id !== user?._id && activeConversation.type === 'group'" class="text-[11px] font-black text-blue-600 mb-0.5">
                      {{ msg.senderId?.fullName }}
                    </p>
                    
                    <p class="text-sm text-[#111b21] leading-relaxed break-words pr-8">{{ msg.content }}</p>
                    
                    <span class="absolute bottom-1 right-2 flex items-center gap-1">
                      <span class="text-[9px] font-medium text-gray-500">{{ formatTime(msg.createdAt) }}</span>
                      <Icon v-if="msg.senderId?._id === user?._id" 
                        :name="msg.isRead ? 'lucide:check-check' : 'lucide:check'" 
                        :class="['w-3.5 h-3.5', msg.isRead ? 'text-blue-500' : 'text-gray-400']" />
                    </span>
                  </div>
                </div>
              </div>
            </template>
          </template>
        </div>

        <!-- Input Section -->
        <div class="px-6 py-3 bg-[#f0f2f5] flex items-center gap-4 relative z-10 shrink-0">
          <div class="flex items-center gap-2">
            <button class="p-2 text-[#54656f] hover:bg-gray-200 rounded-full transition-colors">
              <Icon name="lucide:smile" class="w-6 h-6" />
            </button>
            <button class="p-2 text-[#54656f] hover:bg-gray-200 rounded-full transition-colors">
              <Icon name="lucide:paperclip" class="w-6 h-6" />
            </button>
          </div>
          <div class="flex-1">
            <input 
              v-model="newMessage" 
              @input="handleTyping"
              @keydown.enter.prevent="handleSend"
              placeholder="Type a message..." 
              class="w-full bg-white border-none rounded-xl py-3 px-5 text-sm font-medium focus:ring-0 shadow-sm placeholder:text-gray-400"
            />
          </div>
          <button @click="handleSend" :disabled="!newMessage.trim()" 
            class="w-12 h-12 bg-[#033958] text-white rounded-full flex items-center justify-center hover:bg-[#055380] transition-all shadow-md active:scale-95 disabled:opacity-50 group">
            <Icon name="lucide:send" class="w-5 h-5 group-hover:translate-x-0.5" />
          </button>
        </div>
      </template>

      <!-- Welcome State (WhatsApp Desktop style) -->
      <div v-else class="flex-1 flex flex-col items-center justify-center text-center p-12 relative z-10 bg-[#f8f9fa] border-b-[6px] border-[#033958]">
        <div class="mb-8 p-12 bg-white rounded-full shadow-xl relative animate-bounce-subtle">
           <Icon name="lucide:message-square" class="w-24 h-24 text-[#cbd5e1]" />
           <div class="absolute -bottom-2 -right-2 bg-[#033958] p-4 rounded-3xl shadow-lg ring-4 ring-white">
              <Icon name="lucide:shield-check" class="w-8 h-8 text-white" />
           </div>
        </div>
        <h2 class="text-3xl font-black text-gray-900 tracking-tighter mb-4">Partner Connect</h2>
        <p class="text-gray-500 max-w-md font-medium leading-relaxed mb-10">
          Direct communication with WiseKings Support and our Partner Network.
          End-to-end security for all your professional conversations.
        </p>
        <button @click="startSupportChat" class="px-10 py-4 bg-[#033958] text-white rounded-2xl font-black text-sm hover:scale-105 transition-all shadow-xl shadow-blue-900/30">
          Open Support Channel
        </button>
        
        <div class="absolute bottom-10 flex items-center gap-2 text-gray-400">
          <Icon name="lucide:lock" class="w-3.5 h-3.5" />
          <span class="text-[10px] font-black uppercase tracking-widest">Secured Messaging</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useChat } from '@/composables/modules/chat/useChat'
import { useAuthState } from '@/composables/useAuthState'
import { format, isToday, isYesterday, isSameDay } from 'date-fns'

definePageMeta({ layout: 'chat' })

const { user, accessToken } = useAuthState()
const config = useRuntimeConfig()
const { 
  messages, 
  conversations, 
  isConnected, 
  isTyping, 
  activeConversation, 
  loadingHistory, 
  loadingConversations,
  fetchConversations, 
  getHistory, 
  sendMessage, 
  sendTyping 
} = useChat()

const newMessage = ref('')
const messageContainer = ref<HTMLElement | null>(null)

function handleSend() {
  if (newMessage.value.trim()) {
    sendMessage(newMessage.value.trim())
    newMessage.value = ''
  }
}

let typingTimeout: any = null
function handleTyping() {
  sendTyping(true)
  if (typingTimeout) clearTimeout(typingTimeout)
  typingTimeout = setTimeout(() => sendTyping(false), 2000)
}

function getConversationName(conv: any) {
  if (conv.type === 'group') return conv.groupName || 'Partner Community'
  const partner = conv.participants.find((p: any) => p._id !== user.value?._id)
  return partner?.fullName || 'Support Admin'
}

function formatTime(date: any) {
  if (!date) return ''
  return format(new Date(date), 'HH:mm')
}

function formatLastTime(date: any) {
  if (!date) return ''
  const d = new Date(date)
  if (isToday(d)) return format(d, 'HH:mm')
  if (isYesterday(d)) return 'Yesterday'
  return format(d, 'dd/MM/yy')
}

function formatDateSeparator(date: any) {
  const d = new Date(date)
  if (isToday(d)) return 'Today'
  if (isYesterday(d)) return 'Yesterday'
  return format(d, 'MMMM d, yyyy')
}

function showDateSeparator(index: number) {
  if (index === 0) return true
  return !isSameDay(new Date(messages.value[index].createdAt), new Date(messages.value[index-1].createdAt))
}

// Logic to initiate a support chat if none exists
async function startSupportChat() {
  try {
    const res: any = await $fetch(`${config.public.apiBase}/chat/conversations`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken.value}` },
      body: { participants: [], type: 'support' }
    })
    await fetchConversations()
    if (res.data) getHistory(res.data)
  } catch (error) {
    console.error('Start support error:', error)
  }
}

async function joinCommunity() {
  try {
    const res: any = await $fetch(`${config.public.apiBase}/chat/community`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken.value}` }
    })
    await fetchConversations()
    if (res.data) getHistory(res.data)
  } catch (error) {
    console.error('Join community error:', error)
  }
}

watch(messages, () => {
  nextTick(() => {
    if (messageContainer.value) {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight
    }
  })
}, { deep: true })

onMounted(() => {
  fetchConversations()
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.2);
}

@keyframes bounce-subtle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
.animate-bounce-subtle {
  animation: bounce-subtle 3s ease-in-out infinite;
}
</style>
