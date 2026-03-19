<template>
  <div class="min-h-screen bg-gray-50 flex overflow-hidden font-sans">
    <div
      v-if="isSidebarOpen"
      @click="isSidebarOpen = false"
      class="fixed inset-0 z-20 bg-gray-900 bg-opacity-50 transition-opacity lg:hidden"
    ></div>

    <aside
      :class="[
        'fixed inset-y-0 left-0 z-30 w-64 bg-brand-900 text-white flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
      ]"
    >
      <div
        class="h-16 flex items-center justify-center border-b border-brand-800 bg-brand-950 px-6"
      >
        <svg
          class="w-8 h-8 text-brand-400 mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 14l9-5-9-5-9 5 9 5z"
          ></path>
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
          ></path>
        </svg>
        <span class="text-xl font-bold tracking-wider">LearnIO</span>
      </div>

      <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <router-link
          to="/dashboard"
          exact-active-class="bg-brand-800 text-white"
          class="flex items-center px-4 py-3 text-brand-100 hover:bg-brand-800 hover:text-white rounded-lg font-medium transition-colors"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            ></path>
          </svg>
          Overview
        </router-link>

        <a
          href="#"
          class="flex items-center px-4 py-3 text-brand-100 hover:bg-brand-800 hover:text-white rounded-lg font-medium transition-colors"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            ></path>
          </svg>
          My Courses
        </a>
      </nav>

      <div class="p-4 border-t border-brand-800">
        <div class="flex items-center px-4 py-2">
          <div
            class="w-8 h-8 rounded-full bg-brand-700 flex items-center justify-center text-sm font-bold"
          >
            {{ userInitials }}
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-white">{{ authStore.userName }}</p>
            <p class="text-xs text-brand-300">Instructor</p>
          </div>
        </div>
      </div>
    </aside>

    <div class="flex-1 flex flex-col w-full overflow-hidden">
      <header
        class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-sm z-10"
      >
        <div class="flex items-center">
          <button
            @click="isSidebarOpen = true"
            class="text-gray-500 hover:text-gray-700 focus:outline-none lg:hidden mr-4"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 class="text-xl font-semibold text-gray-800 hidden sm:block">Dashboard</h1>
        </div>

        <div class="flex items-center space-x-4">
          <button
            @click="handleLogout"
            class="flex items-center text-sm font-semibold text-red-600 hover:text-red-800 transition-colors bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              ></path>
            </svg>
            Logout
          </button>
        </div>
      </header>

      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

// State for mobile sidebar
const isSidebarOpen = ref(false)

// Pro-level UI touch: Get the user's initials for the avatar circle
const userInitials = computed(() => {
  const name = authStore.userName
  if (!name) return 'U'
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()
})

// Logout handler
const handleLogout = async () => {
  // The store action handles the API call, local storage wipe, and redirect!
  await authStore.logout()
}
</script>

<style scoped>
/* Smooth page transition animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
