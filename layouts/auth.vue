<template>
  <div class="min-h-screen flex bg-white font-inter">
    <!-- Left Side: Image and Branding -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#FFF9F5] sticky top-0 h-screen">
      <div class="absolute inset-0 z-0 bg-black">
        <img 
          src="@/assets/images/auth-bg.png" 
          alt="Authentication Background" 
          class="w-full h-full object-cover opacity-60"
        >
        <div class="absolute inset-0 bg-gradient-to-br from-[#FFF9F5]/40 via-transparent to-black/20"></div>
      </div>
      
      <div class="relative z-10 flex flex-col justify-between p-12 w-full">
        <div>
          <NuxtLink to="/" class="flex items-center gap-2 group">
            <div class="w-10 h-10 bg-black rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <span class="text-white font-bold text-xl italic">W</span>
            </div>
            <span class="text-2xl font-extrabold tracking-tight text-black group-hover:text-gray-700 transition-colors">WISEKINGS</span>
          </NuxtLink>
        </div>

        <div class="max-w-md">
          <h1 class="text-5xl font-extrabold text-black leading-[1.1] mb-6 animate-fade-up">
            Powering the Future of <span class="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-600">Snack Business</span>
          </h1>
          <p class="text-xl text-gray-700 leading-relaxed opacity-90">
            Join thousands of vendors and partners growing their business with WiseKings. Simple, fast, and secure.
          </p>
        </div>

        <div class="flex items-center gap-4">
          <div class="flex -space-x-3">
            <div v-for="i in 4" :key="i" class="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm">
              <img :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+10}`" alt="User Avatar">
            </div>
          </div>
          <p class="text-sm font-medium text-gray-700">
            Trusted by <span class="text-black font-bold">2,000+</span> business partners
          </p>
        </div>
      </div>
    </div>

    <!-- Right Side: Form Content -->
    <div class="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-12 lg:px-20 py-12 relative bg-white">
      <div class="absolute top-8 left-6 lg:hidden">
        <NuxtLink to="/" class="flex items-center gap-2">
          <div class="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm italic">W</span>
          </div>
          <span class="text-xl font-bold tracking-tight text-black">WISEKINGS</span>
        </NuxtLink>
      </div>

      <div class="w-full max-w-md mx-auto space-y-8 animate-fade-in">
        <slot />
      </div>
      
      <div class="absolute bottom-8 left-0 right-0 text-center px-6">
        <p class="text-sm text-gray-400">
          &copy; {{ new Date().getFullYear() }} WiseKings. All rights reserved.
        </p>
      </div>
    </div>
  </div>
</template>

<style>
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-up {
  animation: fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}

.font-inter {
  font-family: 'Inter', sans-serif;
}
</style>
