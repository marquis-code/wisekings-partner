<template>
  <div class="max-w-4xl mx-auto py-8 lg:py-12 animate-fade-in pl-4 md:pl-0 sm:pr-8 pr-4">
    <div class="mb-10">
      <div class="w-16 h-16 bg-[#033958]/10 rounded-2xl flex items-center justify-center mb-6">
        <Icon name="lucide:shield-check" class="w-8 h-8 text-[#033958]" />
      </div>
      <h1 class="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">KYC Verification</h1>
      <p class="text-gray-500 font-medium mt-2 text-lg">Submit required documents to verify your account.</p>
    </div>

    <!-- Overall Status Header -->
    <div class="mb-8 p-6 rounded-3xl border flex items-center gap-4" :class="statusClasses.container">
      <div class="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" :class="statusClasses.iconBg">
        <Icon :name="statusClasses.icon" class="w-6 h-6" :class="statusClasses.iconText" />
      </div>
      <div>
        <h3 class="font-black text-xl" :class="statusClasses.title">Overall Status: {{ formatStatus(overallStatus) }}</h3>
        <p class="text-sm font-medium opacity-80" :class="statusClasses.text">{{ statusClasses.description }}</p>
      </div>
    </div>

    <!-- Document List -->
    <div class="space-y-6">
      <div 
        v-for="doc in documents" 
        :key="doc.documentType" 
        class="bg-white border border-gray-100 rounded-[2rem] p-6 lg:p-8 shadow-sm hover:shadow-md transition-all"
      >
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0">
              <Icon :name="getDocIcon(doc.documentType)" class="w-6 h-6 text-[#033958]" />
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h4 class="text-lg font-black text-gray-900">{{ doc.documentLabel }}</h4>
                <span 
                  :class="[
                    'text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md',
                    doc.isRequired ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-gray-50 text-gray-400 border border-gray-100'
                  ]"
                >
                  {{ doc.isRequired ? 'Mandatory' : 'Optional' }}
                </span>
              </div>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-full" :class="getBadgeClasses(doc.status)">
                  {{ formatStatus(doc.status) }}
                </span>
                <span v-if="doc.submittedAt" class="text-xs text-gray-400 font-medium">
                  Submitted {{ formatDate(doc.submittedAt) }}
                </span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <button 
              v-if="doc.status !== 'approved' && doc.status !== 'pending'"
              @click="openUploadModal(doc)"
              class="btn-primary !rounded-xl !px-6 !py-2.5 font-bold text-sm flex items-center gap-2"
            >
              {{ doc.status === 'rejected' ? 'Re-submit' : 'Submit Document' }}
              <Icon name="lucide:upload" class="w-4 h-4" />
            </button>
            <div v-if="doc.status === 'pending'" class="flex items-center gap-2 text-amber-600 font-bold text-sm">
              <Icon name="lucide:clock" class="w-4 h-4" />
              In Review
            </div>
            <div v-if="doc.status === 'approved'" class="flex items-center gap-2 text-emerald-600 font-bold text-sm">
              <Icon name="lucide:check-circle" class="w-4 h-4" />
              Verified
            </div>
          </div>
        </div>

        <!-- Rejection Reason -->
        <div v-if="doc.status === 'rejected' && doc.rejectionReason" class="mt-4 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-800 text-sm font-medium flex items-start gap-3">
          <Icon name="lucide:alert-circle" class="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p class="font-black text-red-900 mb-0.5">Rejection Reason</p>
            {{ doc.rejectionReason }}
          </div>
        </div>

        <!-- Document Preview if Submitted -->
        <div v-if="doc.documentUrl" class="mt-6 flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
           <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
             <Icon :name="isFileImage(doc.documentUrl) ? 'lucide:image' : 'lucide:file-text'" class="w-5 h-5 text-gray-400" />
           </div>
           <div class="flex-1 min-w-0">
             <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">Submitted File</p>
             <a :href="doc.documentUrl" target="_blank" class="text-sm font-bold text-[#033958] truncate block hover:underline">
               {{ getFileName(doc.documentUrl) }}
             </a>
           </div>
            <p v-if="doc.requiresIdNumber && doc.idNumber" class="text-sm font-bold text-gray-600 px-4 border-l border-gray-200">
             ID: {{ doc.idNumber }}
           </p>
        </div>
      </div>
    </div>

    <!-- Upload Modal -->
    <div v-if="activeDoc" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div class="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl p-8 lg:p-10 animate-scale-in">
        <div class="flex justify-between items-start mb-8">
          <div>
            <h3 class="text-2xl font-black text-gray-900 tracking-tight">Submit Document</h3>
            <p class="text-gray-500 font-medium">Uploading {{ activeDoc.documentLabel }}</p>
          </div>
          <button @click="closeUploadModal" class="p-2 hover:bg-gray-100 rounded-full transition-all">
            <Icon name="lucide:x" class="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div class="space-y-6">
          <div v-if="activeDoc.requiresIdNumber" class="space-y-2">
            <label class="text-xs font-black text-gray-500 uppercase tracking-widest pl-3 block mb-1">ID/Registration Number</label>
            <input 
              v-model="uploadForm.idNumber" 
              type="text" 
              placeholder="Enter document number" 
              :required="activeDoc.requiresIdNumber"
              class="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 font-bold text-gray-900 focus:ring-4 focus:ring-[#033958]/10 focus:border-[#033958] outline-none transition-all" 
            />
          </div>

          <div v-if="activeDoc.requiresFileUpload" class="space-y-2">
            <label class="text-xs font-black text-gray-500 uppercase tracking-widest pl-3 block mb-1">Upload File</label>
            <div class="relative group cursor-pointer" @click="triggerFileInput">
              <div class="w-full bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center p-8 group-hover:bg-gray-100 group-hover:border-[#033958] transition-all min-h-[160px]">
                <template v-if="!uploadForm.documentUrl && !uploading">
                  <Icon name="lucide:upload-cloud" class="w-10 h-10 text-gray-400 mb-2 group-hover:scale-110 transition-transform" />
                  <p class="text-sm font-bold text-gray-500 text-center">Tap to upload file</p>
                  <p class="text-xs font-medium text-gray-400 mt-1">PDF, DOC, Images (up to 10MB)</p>
                </template>
                <div v-else-if="uploading" class="flex flex-col items-center">
                  <div class="w-8 h-8 border-4 border-gray-200 border-t-[#033958] rounded-full animate-spin mb-3"></div>
                  <p class="text-sm font-bold text-gray-500">Uploading...</p>
                </div>
                <template v-else>
                  <img v-if="isFileImage(uploadForm.documentUrl)" :src="uploadForm.documentUrl" class="max-h-32 object-contain rounded-xl" />
                  <div v-else class="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
                    <Icon name="lucide:file-text" class="w-6 h-6 text-red-500" />
                    <p class="text-sm font-bold text-gray-700 truncate max-w-[200px]">{{ uploadedFileName }}</p>
                  </div>
                  <p class="text-xs font-black text-[#033958] mt-3 uppercase tracking-wider">Tap to change</p>
                </template>
              </div>
              <input 
                  type="file" 
                  ref="fileInputRef" 
                  class="hidden" 
                  accept="image/*,.pdf,.doc,.docx" 
                  @change="handleFileUpload"
              />
            </div>
          </div>

          <button 
            @click="submitDocument"
            :disabled="!isUploadValid || submitting"
            class="w-full bg-[#033958] text-white font-black py-4 rounded-2xl shadow-xl shadow-[#033958]/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-4 uppercase tracking-widest text-sm"
          >
            <span v-if="submitting">Submitting...</span>
            <template v-else>
              Submit {{ activeDoc.documentLabel }}
              <Icon name="lucide:arrow-right" class="w-5 h-5" />
            </template>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { partners_api } from '@/api_factory/modules/partners'
import { upload_api } from '@/api_factory/modules/upload'
import { useCustomToast } from '@/composables/core/useCustomToast'

definePageMeta({ layout: 'dashboard' })

const { showToast } = useCustomToast()
const loading = ref(true)
const submitting = ref(false)
const uploading = ref(false)
const documents = ref<any[]>([])
const overallStatus = ref('not_submitted')
const activeDoc = ref<any>(null)
const uploadedFileName = ref('')
const fileInputRef = ref<HTMLInputElement | null>(null)

const uploadForm = reactive({
  documentType: '',
  idNumber: '',
  documentUrl: ''
})

const isUploadValid = computed(() => {
  if (!activeDoc.value) return false
  const idValid = activeDoc.value.requiresIdNumber ? !!uploadForm.idNumber.trim() : true
  const fileValid = activeDoc.value.requiresFileUpload ? !!uploadForm.documentUrl.trim() : true
  return idValid && fileValid
})

const statusClasses = computed(() => {
  const status = overallStatus.value
  if (status === 'approved') return {
    container: 'bg-emerald-50 border-emerald-100',
    iconBg: 'bg-emerald-500',
    icon: 'lucide:check-circle',
    iconText: 'text-white',
    title: 'text-emerald-900',
    text: 'text-emerald-700',
    description: 'Your identity has been verified and your account is fully active.'
  }
  if (status === 'pending') return {
    container: 'bg-amber-50 border-amber-100',
    iconBg: 'bg-amber-500',
    icon: 'lucide:clock',
    iconText: 'text-white',
    title: 'text-amber-900',
    text: 'text-amber-700',
    description: 'We are currently reviewing your documents. Please check back later.'
  }
  if (status === 'rejected') return {
    container: 'bg-red-50 border-red-100',
    iconBg: 'bg-red-500',
    icon: 'lucide:alert-circle',
    iconText: 'text-white',
    title: 'text-red-900',
    text: 'text-red-700',
    description: 'Some of your documents were rejected. Please review and re-submit.'
  }
  return {
    container: 'bg-gray-50 border-gray-100',
    iconBg: 'bg-gray-400',
    icon: 'lucide:file-text',
    iconText: 'text-white',
    title: 'text-gray-900',
    text: 'text-gray-600',
    description: 'Please submit all required documents listed below to verify your account.'
  }
})

async function fetchKyc() {
  loading.value = true
  try {
    const res = await partners_api.getKyc() as any
    documents.value = res.data.documents || []
    overallStatus.value = res.overallStatus || 'not_submitted'
  } catch (err) {
    showToast({ title: 'Error', message: 'Failed to fetch KYC documents', toastType: 'error' })
  } finally {
    loading.value = false
  }
}

function openUploadModal(doc: any) {
  activeDoc.value = doc
  uploadForm.documentType = doc.documentType
  uploadForm.idNumber = doc.idNumber || ''
  uploadForm.documentUrl = doc.documentUrl || ''
  uploadedFileName.value = doc.documentUrl ? getFileName(doc.documentUrl) : ''
}

function closeUploadModal() {
  activeDoc.value = null
  uploadForm.documentType = ''
  uploadForm.idNumber = ''
  uploadForm.documentUrl = ''
  uploadedFileName.value = ''
}

function triggerFileInput() {
  fileInputRef.value?.click()
}

async function handleFileUpload(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  uploadedFileName.value = file.name
  uploading.value = true
  try {
    const res = await upload_api.uploadDocument(file, 'kyc') as any
    const url = res?.url || res?.data?.url
    if (url) {
      uploadForm.documentUrl = url
    } else {
      throw new Error('No URL returned')
    }
  } catch (err: any) {
    showToast({ title: 'Upload Failed', message: err.message || 'File upload failed', toastType: 'error' })
  } finally {
    uploading.value = false
  }
}

async function submitDocument() {
  submitting.value = true
  try {
    await partners_api.submitKycDocument(uploadForm)
    showToast({ title: 'Success', message: 'Document submitted successfully', toastType: 'success' })
    closeUploadModal()
    fetchKyc()
  } catch (err: any) {
    showToast({ title: 'Error', message: err.message || 'Failed to submit document', toastType: 'error' })
  } finally {
    submitting.value = false
  }
}

function formatStatus(status: string) {
  if (!status) return 'Unknown'
  return status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

function getBadgeClasses(status: string) {
  if (status === 'approved') return 'bg-emerald-100 text-emerald-700'
  if (status === 'pending') return 'bg-amber-100 text-amber-700'
  if (status === 'rejected') return 'bg-red-100 text-red-700'
  return 'bg-gray-100 text-gray-500'
}

function getDocIcon(type: string) {
  if (type.includes('id')) return 'lucide:id-card'
  if (type.includes('cac') || type.includes('business')) return 'lucide:building-2'
  if (type.includes('passport')) return 'lucide:passport'
  return 'lucide:file-text'
}

function isFileImage(url: string) {
  if (!url) return false
  return url.match(/\.(jpeg|jpg|gif|png|webp)/i) != null
}

function getFileName(url: string) {
  if (!url) return ''
  return url.split('/').pop() || 'document'
}

function formatDate(date: any) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
}

onMounted(() => fetchKyc())
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.animate-scale-in {
  animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>
