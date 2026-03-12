<template>
  <div class="fixed bottom-8 right-8 z-[100]">
    <!-- Chat Button -->
    <button 
      @click="toggleChat"
      :class="['w-16 h-16 rounded-[2rem] flex items-center justify-center shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 group', 
      isOpen ? 'bg-gray-900 border border-white/10' : 'bg-[#033958] shadow-blue-900/30']"
    >
      <Icon v-if="!isOpen" name="lucide:message-circle" class="w-8 h-8 text-white group-hover:rotate-12 transition-transform" />
      <Icon v-else name="lucide:x" class="w-8 h-8 text-white transition-opacity" />
      
      <!-- Notification Badge (Placeholder) -->
      <div v-if="!isOpen && unreadCount" class="absolute -top-1 -right-1 w-6 h-6 bg-red-500 border-2 border-white rounded-full flex items-center justify-center text-[10px] text-white font-black">
        {{ unreadCount }}
      </div>
    </button>

    <!-- Chat Mini Window -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform translate-y-8 opacity-0 scale-95"
      enter-to-class="transform translate-y-0 opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100 scale-100"
      leave-to-class="transform translate-y-8 opacity-0 scale-95"
    >
      <div v-if="isOpen" class="absolute bottom-20 right-0 w-[400px] h-[600px] bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden flex flex-col">
        <!-- Header -->
        <div class="p-6 bg-gray-900 text-white flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Icon name="lucide:headset" class="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 class="font-black text-sm tracking-tight">Partner Support</h3>
              <p class="text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                <span class="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                Online Support
              </p>
            </div>
          </div>
          <NuxtLink to="/chat" @click="isOpen = false" class="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
            <Icon name="lucide:maximize-2" class="w-4 h-4" />
          </NuxtLink>
        </div>

        <!-- Messages Area (Mini) -->
        <div class="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/30" ref="messageContainer">
          <div v-if="messages.length === 0" class="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div class="w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center shadow-sm">
              <Icon name="lucide:message-square" class="w-8 h-8 text-blue-500" />
            </div>
            <p class="text-xs font-bold text-gray-400 uppercase tracking-widest px-8">Contact WiseKings Support Team</p>
          </div>

          <div v-for="msg in messages" :key="msg._id" :class="['flex', msg.senderId?._id === user?._id ? 'justify-end' : 'justify-start']">
            <div :class="['max-w-[85%] p-3.5 rounded-2xl text-xs font-semibold leading-relaxed shadow-sm', 
              msg.senderId?._id === user?._id ? 'bg-gray-900 text-white rounded-tr-none' : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none']">
              {{ msg.content }}
            </div>
          </div>
        </div>

        <!-- Input Area (Mini) -->
        <div class="p-4 bg-white border-t border-gray-50">
          <form @submit.prevent="handleSend" class="flex items-center gap-3">
            <input 
              v-model="newMessage"
              placeholder="Message support..."
              class="flex-1 bg-gray-50 border-none rounded-2xl py-3.5 px-5 text-xs font-semibold focus:ring-4 focus:ring-blue-500/5 transition-all outline-none"
            />
            <button type="submit" :disabled="!newMessage.trim()" class="w-12 h-12 bg-[#033958] text-white rounded-2xl flex items-center justify-center hover:bg-[#055380] active:scale-95 transition-all disabled:opacity-50">
              <Icon name="lucide:send" class="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useChat } from '@/composables/modules/chat/useChat'
import { useAuthState } from '@/composables/useAuthState'

const isOpen = ref(false)
const unreadCount = ref(0)
const newMessage = ref('')
const messageContainer = ref<HTMLElement | null>(null)

const { user } = useAuthState()
const { 
  messages, 
  conversations, 
  activeConversation, 
  fetchConversations, 
  getHistory, 
  sendMessage 
} = useChat()

async function toggleChat() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    if (!conversations.value.length) {
      await fetchConversations()
    }
    
    // Find support conversation or create one
    const support = conversations.value.find(c => c.type === 'direct')
    if (support) {
      await getHistory(support)
    }
  }
}

function handleSend() {
  if (newMessage.value.trim() && activeConversation.value) {
    sendMessage(newMessage.value.trim())
    newMessage.value = ''
  }
}

watch(messages, () => {
  nextTick(() => {
    if (messageContainer.value) {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight
    }
  })
}, { deep: true })
</script>
