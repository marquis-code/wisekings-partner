<template>
  <div>
    <definePageMeta :layout="'dashboard'" />
    <h1 class="text-2xl font-bold text-white mb-6">Profile</h1>
    <div class="max-w-xl card space-y-4">
      <div class="text-center mb-4"><div class="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-2xl font-bold mx-auto">{{ user?.fullName?.[0] }}</div></div>
      <div><label class="label">Company</label><input :value="(user as any)?.companyName" class="input" disabled /></div>
      <div><label class="label">Contact Person</label><input :value="(user as any)?.contactPerson" class="input" disabled /></div>
      <div><label class="label">Email</label><input :value="user?.email" class="input" disabled /></div>
      <div><label class="label">Partner Code</label><input :value="(user as any)?.partnerCode" class="input" disabled /></div>
      <div><label class="label">Commission Rate</label><input :value="`${(user as any)?.commissionRate || 0}%`" class="input" disabled /></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthState } from '@/composables/useAuthState'
definePageMeta({ layout: 'dashboard' })
const { user } = useAuthState()
</script>
