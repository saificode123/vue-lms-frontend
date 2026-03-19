<template>
  <div class="max-w-7xl mx-auto space-y-6 animate-fade-in">
    <div
      class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:shadow-md"
    >
      <div>
        <h2 class="text-2xl font-bold text-gray-900">
          Welcome back, <span class="text-brand-600">{{ authStore.userName }}</span
          >! 👋
        </h2>
        <p class="mt-1 text-gray-500 text-sm sm:text-base">
          Here is what's happening with your LMS platform today.
        </p>
      </div>
      <button
        class="inline-flex items-center px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors shrink-0"
      >
        <svg class="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          ></path>
        </svg>
        Create New Course
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4 hover:border-blue-200 transition-colors"
      >
        <div class="p-3 bg-blue-50 text-blue-600 rounded-lg shrink-0">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            ></path>
          </svg>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500">Total Courses</p>
          <h3 class="text-2xl font-bold text-gray-900">1</h3>
        </div>
      </div>

      <div
        class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4 hover:border-green-200 transition-colors"
      >
        <div class="p-3 bg-green-50 text-green-600 rounded-lg shrink-0">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            ></path>
          </svg>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500">Active Students</p>
          <h3 class="text-2xl font-bold text-gray-900">0</h3>
        </div>
      </div>

      <div
        class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4 hover:border-purple-200 transition-colors"
      >
        <div class="p-3 bg-purple-50 text-purple-600 rounded-lg shrink-0">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
            ></path>
          </svg>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500">Total Revenue</p>
          <h3 class="text-2xl font-bold text-gray-900">$0.00</h3>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
        <h3 class="text-lg font-semibold text-gray-900">Recent Courses</h3>
      </div>
      <div class="p-6 text-center py-12">
        <svg
          class="mx-auto h-12 w-12 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          ></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No courses published</h3>
        <p class="mt-1 text-sm text-gray-500">
          Get started by creating your first interactive course.
        </p>
        <div class="mt-6">
          <button
            type="button"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 focus:outline-none"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
            New Course
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'

// Access the global state to get the user's name
const authStore = useAuthStore()
</script>

<style scoped>
/* A subtle fade-in animation for when the dashboard loads */
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
