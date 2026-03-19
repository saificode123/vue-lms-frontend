<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center">
        <svg
          class="w-12 h-12 text-brand-600"
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
      </div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
        Instructor Portal
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Sign in to manage your courses and students
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div
        class="bg-white py-8 px-4 shadow-xl shadow-brand-100/50 sm:rounded-xl sm:px-10 border border-gray-100"
      >
        <div
          v-if="errorMessage"
          class="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-md transition-all duration-300 ease-in-out"
        >
          <div class="flex items-center">
            <svg
              class="h-5 w-5 text-red-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p class="text-sm text-red-700 font-medium">{{ errorMessage }}</p>
          </div>
        </div>

        <form class="space-y-6" @submit.prevent="handleLogin">
          <div>
            <label for="email" class="block text-sm font-semibold text-gray-700"
              >Email address</label
            >
            <div class="mt-2">
              <input
                id="email"
                v-model="form.email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition-colors duration-200"
                placeholder="instructor@lms.com"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-semibold text-gray-700"
                >Password</label
              >
              <a
                href="#"
                class="text-sm font-medium text-brand-600 hover:text-brand-500 transition-colors"
                >Forgot password?</a
              >
            </div>
            <div class="mt-2">
              <input
                id="password"
                v-model="form.password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition-colors duration-200"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
            >
              <svg
                v-if="isLoading"
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>

              <span>{{ isLoading ? 'Authenticating...' : 'Sign in to Dashboard' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// Initialize core plugins
const router = useRouter()
const authStore = useAuthStore()

// Reactive state
const form = reactive({
  email: 'instructor@lms.com', // Pre-filled for development speed
  password: 'password',
})
const isLoading = ref(false)
const errorMessage = ref('')

// Form Submission Handler
const handleLogin = async () => {
  // 1. Reset state
  isLoading.value = true
  errorMessage.value = ''

  // 2. Call the Pinia action we wrote earlier
  const result = await authStore.login(form)

  // 3. Handle the response
  if (result.success) {
    // Perfect transition: Push them straight to the dashboard!
    router.push('/dashboard')
  } else {
    // Show the error toast (e.g., "Invalid credentials")
    errorMessage.value = result.message
  }

  // 4. Turn off the loading spinner
  isLoading.value = false
}
</script>
