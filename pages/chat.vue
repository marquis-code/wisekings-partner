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
      <div class="p-4 shrink-0 bg-white border-b border-[#f5f6f6]">
        <div class="relative group mb-3">
          <Icon name="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#033958] transition-colors" />
          <input 
            v-model="searchQuery"
            placeholder="Search or start new chat" 
            class="w-full bg-[#f0f2f5] border-none rounded-xl py-2 pl-12 pr-4 text-xs font-medium focus:ring-0 placeholder:text-gray-500"
          />
        </div>
        <div class="flex gap-2 overflow-x-auto custom-scrollbar pb-1">
          <button v-for="tab in ['All', 'Admin', 'Merchant']" :key="tab"
            @click="activeTab = tab"
            :class="['px-3 py-1.5 rounded-full text-[11px] font-black whitespace-nowrap transition-colors uppercase tracking-wider', 
              activeTab === tab ? 'bg-[#033958] text-white shadow-md' : 'bg-[#f0f2f5] text-gray-500 hover:text-gray-900']">
            {{ tab }}
          </button>
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
            v-for="conv in categorizedConversations" 
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
                <Icon v-if="String(conv.lastMessageBy || '') === String(user?._id || user?.id || '')" name="lucide:check-check" class="w-3.5 h-3.5 text-blue-500" />
                <span class="flex items-center gap-1">
                  <Icon v-if="conv.lastMessageType === 'image'" name="lucide:camera" size="14" />
                  <Icon v-else-if="conv.lastMessageType === 'video'" name="lucide:video" size="14" />
                  <Icon v-else-if="conv.lastMessageType === 'audio'" name="lucide:mic" size="14" />
                  <Icon v-else-if="conv.lastMessageType === 'document'" name="lucide:file-text" size="14" />
                  <span>{{ conv.lastMessage || 'Click to start chatting' }}</span>
                </span>
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
            <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm shrink-0"
              :class="getParticipantRole(activeConversation) === 'admin' ? 'bg-[#033958]' : 'bg-indigo-500'">
              {{ getParticipantInitials(activeConversation) }}
            </div>
            <div class="min-w-0">
              <h2 class="font-bold text-[15px] text-gray-900 truncate tracking-tight flex items-center gap-2">
                {{ getParticipantName(activeConversation) }}
                <span v-if="getParticipantRole(activeConversation)" class="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">({{ getParticipantRole(activeConversation) }})</span>
              </h2>
              <p class="text-[11px] font-bold text-gray-500 flex items-center gap-1 tracking-wider">
                <span v-if="isTyping" class="text-blue-600 animate-pulse lowercase">• typing...</span>
                <span v-else-if="isConnected" class="text-green-600 lowercase tracking-wide font-black">online</span>
                <span v-else class="text-gray-400">linking...</span>
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
            <Icon name="lucide:loader-2" class="w-10 h-10 text-[#033958] animate-spin" />
          </div>
          
          <template v-else>
            <template v-for="(msg, i) in messages" :key="msg._id">
               <!-- Date Separator -->
               <div v-if="showDateSeparator(i)" class="flex justify-center my-6">
                <span class="px-3 py-1.5 bg-white rounded-lg text-[10px] font-black text-gray-500 uppercase tracking-widest shadow-sm">
                  {{ formatDateSeparator(msg.createdAt) }}
                </span>
               </div>

                <div :class="['flex mb-1', isSentByMe(msg) ? 'justify-end' : 'justify-start']">
                 <div :class="['max-w-[85%] md:max-w-[65%] flex flex-col', isSentByMe(msg) ? 'items-end' : 'items-start']">
                   <!-- Message Bubble -->
                   <div class="relative group flex items-center gap-2">
                     <!-- Reply Action Button (Hover) -->
                     <button v-if="!isSentByMe(msg)" @click="replyingToMessage = msg" class="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-700 transition-opacity absolute -right-8 z-10">
                       <Icon name="lucide:reply" size="14" />
                     </button>
                     <!-- Actual Bubble -->
                     <div :class="['relative p-2.5 shadow-sm min-w-[80px] transition-all', 
                       isSentByMe(msg) 
                         ? 'bg-[#dcf8c6] rounded-xl rounded-tr-none' 
                         : 'bg-white rounded-xl rounded-tl-none']">
                       
                       <!-- Sender Name for Groups -->
                       <p v-if="!isSentByMe(msg) && activeConversation.type === 'group'" class="text-[11px] font-black text-blue-600 mb-0.5">
                         {{ msg.senderId?.fullName }}
                       </p>
 
                       <!-- Reply Preview Block -->
                       <div v-if="msg.replyTo" class="mb-1 p-1.5 rounded bg-black/5 border-l-4 border-blue-500 text-[11px] opacity-90 cursor-pointer">
                         <p class="font-black text-blue-600 mb-0.5">{{ msg.replyTo.senderId?._id === user?._id ? 'You' : (msg.replyTo.senderId?.fullName || msg.replyTo.senderId?.email || 'User') }}</p>
                         <p class="text-gray-700 font-medium truncate max-w-[200px]">{{ msg.replyTo.content || (msg.replyTo.type !== 'text' ? msg.replyTo.type : 'Message') }}</p>
                       </div>
 
                       <!-- Attachments -->
                       <div v-if="msg.attachments?.length > 0" class="mb-2 max-w-[280px] overflow-hidden rounded">
                         <template v-for="(att, aIdx) in msg.attachments" :key="aIdx">
                            <img v-if="msg.type === 'image'" :src="att" class="w-full object-cover cursor-pointer hover:opacity-90 transition-opacity max-h-[300px]" @click="previewMedia = att" />
                            <video v-else-if="msg.type === 'video'" :src="att" controls class="w-full"></video>
                            <audio v-else-if="msg.type === 'audio'" :src="att" controls class="w-full"></audio>
                            <a v-else :href="att" target="_blank" class="flex flex-col gap-2 p-3 bg-black/5 rounded-lg text-[#033958] hover:bg-black/10 transition-colors border border-[#033958]/10">
                               <div class="flex items-center gap-3">
                                 <Icon name="lucide:file-text" size="24" class="text-[#033958] shrink-0" />
                                 <div class="min-w-0">
                                   <p class="text-[12px] font-bold truncate text-[#033958]">Document Attachment</p>
                                   <p class="text-[10px] text-gray-500 font-black uppercase tracking-tight">Click to view/download</p>
                                 </div>
                               </div>
                            </a>
                         </template>
                       </div>
                       
                       <p class="text-sm text-[#111b21] leading-relaxed break-words pr-12 whitespace-pre-wrap">{{ msg.content }}</p>
                       
                       <span class="absolute bottom-1 right-2 flex items-center gap-1">
                         <span class="text-[9px] font-bold text-gray-400">{{ formatTime(msg.createdAt) }}</span>
                         <Icon v-if="isSentByMe(msg)" 
                           :name="msg.isRead ? 'lucide:check-check' : 'lucide:check'" 
                           :class="['w-3.5 h-3.5', msg.isRead ? 'text-blue-500' : 'text-gray-400']" />
                       </span>
                     </div>
                     <!-- Reply Action Button (Hover) for my messages -->
                     <button v-if="isSentByMe(msg)" @click="replyingToMessage = msg" class="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-700 transition-opacity absolute -left-8 z-10">
                       <Icon name="lucide:reply" size="14" />
                     </button>
                   </div>
                 </div>
               </div>
            </template>
          </template>
        </div>

        <!-- Reply Banner -->
        <div v-if="replyingToMessage" class="px-6 py-2 bg-[#f0f2f5] border-l-4 border-blue-500 flex items-center justify-between z-10 shrink-0">
          <div class="min-w-0">
            <p class="text-xs font-black text-blue-600 mb-0.5">Replying to {{ replyingToMessage.senderId?._id === user?._id ? 'yourself' : (replyingToMessage.senderId?.fullName || replyingToMessage.senderId?.email || 'User') }}</p>
            <p class="text-[11px] font-medium text-gray-500 truncate">{{ replyingToMessage.content || 'Attachment' }}</p>
          </div>
          <button @click="replyingToMessage = null" class="p-1 text-gray-400 hover:text-gray-700 transition-colors"><Icon name="lucide:x" size="14" /></button>
        </div>

        <!-- Uploading Banner -->
        <div v-if="isUploading" class="px-6 py-2 bg-white flex items-center gap-3 text-blue-600 text-xs font-bold z-10 border-t border-gray-200 shrink-0">
          <Icon name="lucide:loader-2" class="w-4 h-4 animate-spin" />
          <span>Uploading attachment...</span>
        </div>

        <!-- Input Section -->
        <div class="px-6 py-3 bg-[#f0f2f5] flex items-center gap-3 relative z-10 shrink-0">
          <div class="relative">
            <button @click="showEmojiPicker = !showEmojiPicker; showAttachMenu = false" class="p-2 text-[#54656f] hover:text-blue-600 transition-colors">
              <Icon name="lucide:smile" class="w-6 h-6" />
            </button>
            <div v-if="showEmojiPicker" class="absolute bottom-12 left-0 bg-white border border-gray-200 p-3 rounded-xl shadow-xl grid grid-cols-6 gap-2 w-[220px] select-none z-50">
              <span v-for="emoji in ['😀','😂','🥺','❤️','🔥','👍','🎉','✨','🤔','🙌','😎','💯','✅','❌','👀','🚀','💸','🙏']" :key="emoji" @click="newMessage += emoji" class="cursor-pointer hover:scale-125 transition-transform text-xl text-center">{{ emoji }}</span>
            </div>
          </div>
          
          <div class="relative">
            <button @click="showAttachMenu = !showAttachMenu; showEmojiPicker = false" class="p-2 text-[#54656f] hover:text-blue-600 transition-colors" :disabled="isUploading">
              <Icon name="lucide:paperclip" class="w-6 h-6" />
            </button>
            <div v-if="showAttachMenu" class="absolute bottom-12 left-0 bg-white border border-gray-200 p-2 rounded-xl shadow-xl flex flex-col gap-1 w-[150px] z-50">
              <button @click="triggerFileInput('image/*,video/*'); showAttachMenu = false" class="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg text-sm font-bold text-gray-700 text-left">
                <Icon name="lucide:image" class="text-blue-500" size="16"/> Media
              </button>
              <button @click="triggerFileInput('.pdf,.doc,.docx'); showAttachMenu = false" class="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg text-sm font-bold text-gray-700 text-left">
                <Icon name="lucide:file-text" class="text-purple-500" size="16"/> Document
              </button>
              <button @click="openCamera(); showAttachMenu = false" class="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg text-sm font-bold text-gray-700 text-left">
                <Icon name="lucide:camera" class="text-rose-500" size="16"/> Camera
              </button>
            </div>
            <input type="file" ref="fileInput" class="hidden" @change="handleFileUpload" :accept="fileAccept" />
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
          <button @click="handleSend" :disabled="(!newMessage.trim() && !pendingAttachment) || isUploading" 
            class="w-12 h-12 bg-[#033958] text-white rounded-full flex items-center justify-center hover:bg-[#055380] transition-all shadow-md active:scale-95 disabled:opacity-50 group shrink-0">
            <Icon :name="newMessage.trim() || pendingAttachment ? 'lucide:send' : 'lucide:mic'" class="w-5 h-5 group-hover:translate-x-0.5" />
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
    
    <!-- Camera Modal -->
    <div v-if="showCamera" class="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <div class="relative w-full max-w-lg bg-white rounded-2xl overflow-hidden flex flex-col">
        <div class="p-4 bg-gray-900 flex items-center justify-between absolute top-0 w-full z-10 bg-transparent">
          <button @click="closeCamera" class="p-2 text-white hover:bg-white/20 rounded-full transition-colors drop-shadow-md">
            <Icon name="lucide:x" size="24" />
          </button>
        </div>
        <video ref="videoElement" class="w-full h-auto max-h-[70vh] object-cover bg-black" autoplay playsinline></video>
        <canvas ref="canvasElement" class="hidden"></canvas>
        <div class="p-6 bg-gray-900 flex justify-center border-t border-gray-800">
          <button @click="capturePhoto" class="w-16 h-16 rounded-full border-4 border-blue-500 flex items-center justify-center hover:scale-105 transition-transform bg-blue-500/20 group">
            <div class="w-12 h-12 bg-blue-500 rounded-full group-hover:bg-blue-400 transition-colors"></div>
          </button>
        </div>
      </div>
    </div>

    <!-- Media Preview Overlay -->
    <div v-if="previewMedia" class="fixed inset-0 z-[150] flex items-center justify-center bg-black/95 backdrop-blur-md" @click="previewMedia = null">
      <button class="absolute top-4 right-4 p-2 text-white hover:bg-white/20 rounded-full transition-colors">
        <Icon name="lucide:x" size="24" />
      </button>
      <img :src="previewMedia" class="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl" @click.stop />
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
const searchQuery = ref('')
const messageContainer = ref<HTMLElement | null>(null)

// Enhanced Chat State
const activeTab = ref('All')
const showEmojiPicker = ref(false)
const showAttachMenu = ref(false)
const replyingToMessage = ref<any>(null)
const isUploading = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const fileAccept = ref('*/*')
const pendingAttachment = ref<string | null>(null)

// Camera state
const showCamera = ref(false)
const videoElement = ref<HTMLVideoElement | null>(null)
const canvasElement = ref<HTMLCanvasElement | null>(null)
let mediaStream: MediaStream | null = null
const previewMedia = ref<string | null>(null)

const categorizedConversations = computed(() => {
  let list = conversations.value
  
  if (activeTab.value !== 'All') {
    list = list.filter((c: any) => {
      if (c.type === 'group') return false // Simplified logic for groups in tabs if needed
      const partner = c.participants?.find((p: any) => p._id !== user.value?._id)
      const role = (partner?.role || partner?.userType || '').toLowerCase()
      
      if (activeTab.value === 'Admin' && ['admin', 'superadmin', 'support'].includes(role)) return true
      if (activeTab.value === 'Merchant' && role === 'merchant') return true
      return false
    })
  }
  
  if (!searchQuery.value) return list
  const q = searchQuery.value.toLowerCase()
  return list.filter((c: any) => getConversationName(c).toLowerCase().includes(q))
})

function handleSend() {
  if (newMessage.value.trim() || pendingAttachment.value) {
    sendMessage(newMessage.value.trim() || 'Attachment', 'text', [], replyingToMessage.value?._id)
    newMessage.value = ''
    replyingToMessage.value = null
    showEmojiPicker.value = false
  }
}

function triggerFileInput(accept: string) {
  fileAccept.value = accept
  if (fileInput.value) fileInput.value.click()
}

async function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  if (!target.files?.length) return
  const file = target.files[0]
  
  isUploading.value = true
  try {
    const url = await useChat().uploadChatFile(file)
    let type = 'file'
    if (file.type.startsWith('image/')) type = 'image'
    else if (file.type.startsWith('video/')) type = 'video'
    else if (file.type.startsWith('audio/')) type = 'audio'
    else type = 'document'
    
    sendMessage(newMessage.value || file.name, type, [url], replyingToMessage.value?._id)
    newMessage.value = ''
    replyingToMessage.value = null
  } catch (err) {
    alert('Failed to upload file')
  } finally {
    isUploading.value = false
    if (fileInput.value) fileInput.value.value = ''
  }
}

async function openCamera() {
  showCamera.value = true
  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
    if (videoElement.value) {
      videoElement.value.srcObject = mediaStream
    }
  } catch (err) {
    alert('Camera access denied or unavailable')
    closeCamera()
  }
}

function closeCamera() {
  if (mediaStream) {
    mediaStream.getTracks().forEach(track => track.stop())
    mediaStream = null
  }
  showCamera.value = false
}

async function capturePhoto() {
  if (!videoElement.value || !canvasElement.value) return
  const video = videoElement.value
  const canvas = canvasElement.value
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  canvas.getContext('2d')?.drawImage(video, 0, 0)
  
  canvas.toBlob(async (blob) => {
    if (blob) {
      closeCamera()
      const file = new File([blob], `photo_${Date.now()}.jpg`, { type: 'image/jpeg' })
      isUploading.value = true
      try {
        const url = await useChat().uploadChatFile(file)
        sendMessage(newMessage.value || 'Photo', 'image', [url], replyingToMessage.value?._id)
        newMessage.value = ''
        replyingToMessage.value = null
      } catch (err) {
        alert('Failed to upload photo')
      } finally {
        isUploading.value = false
      }
    }
  }, 'image/jpeg', 0.8)
}

let typingTimeout: any = null
function handleTyping() {
  sendTyping(true)
  if (typingTimeout) clearTimeout(typingTimeout)
  typingTimeout = setTimeout(() => sendTyping(false), 2000)
}

function isSentByMe(msg: any) {
  const senderId = String(msg.senderId?._id || msg.senderId || '')
  const myId = String(user.value?._id || user.value?.id || '')
  return !!senderId && senderId === myId
}

function getParticipantRole(conv: any) {
  if (conv.type === 'group') return 'group'
  const other = conv.participants.find((p: any) => p._id !== user.value?._id)
  return (other?.role || other?.userType || '').toLowerCase()
}

function getParticipantInitials(conv: any) {
  const name = getConversationName(conv)
  return name.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2)
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
