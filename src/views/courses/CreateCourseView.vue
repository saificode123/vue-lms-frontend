<template>
  <div class="max-w-4xl mx-auto animate-fade-in">
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Create New Course</h2>
        <p class="mt-1 text-sm text-gray-500">
          Start building your curriculum. You can add sections and lessons later.
        </p>
      </div>
      <router-link
        to="/dashboard"
        class="text-sm font-medium text-brand-600 hover:text-brand-800 transition-colors flex items-center"
      >
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          ></path>
        </svg>
        Back to Dashboard
      </router-link>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div v-if="errorMessage" class="bg-red-50 p-4 border-b border-red-100 transition-all">
        <p class="text-sm text-red-700 font-medium flex items-center">
          <svg class="w-5 h-5 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          {{ errorMessage }}
        </p>
      </div>

      <form @submit.prevent="submitCourse" class="p-6 sm:p-8 space-y-6">
        <div>
          <label for="title" class="block text-sm font-semibold text-gray-700 mb-1"
            >Course Title <span class="text-red-500">*</span></label
          >
          <input
            id="title"
            v-model="form.title"
            type="text"
            required
            class="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
            placeholder="e.g., Advanced Vue 3 Architecture"
          />
        </div>

        <div>
          <label for="description" class="block text-sm font-semibold text-gray-700 mb-1"
            >Course Description</label
          >
          <textarea
            id="description"
            v-model="form.description"
            rows="4"
            class="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors resize-y"
            placeholder="Briefly describe what your students will learn..."
          ></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-100 pt-6">
          <div>
            <label for="status" class="block text-sm font-semibold text-gray-700 mb-1"
              >Initial Status</label
            >
            <select
              id="status"
              v-model="form.status"
              class="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
            >
              <option value="draft">Draft (Hidden from students)</option>
              <option value="published">Published (Live to the world)</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Course Thumbnail</label>
            <input
              type="file"
              @change="handleFileUpload"
              accept="image/jpeg, image/png, image/webp"
              class="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-brand-100 file:text-brand-700 hover:file:bg-brand-200 transition-colors cursor-pointer text-sm text-gray-600 focus:outline-none"
            />
            <p class="text-xs text-gray-500 mt-1.5">Optional. JPEG, PNG, or WEBP under 2MB.</p>
          </div>
        </div>

        <div class="pt-6 border-t border-gray-100 flex items-center justify-end space-x-4">
          <router-link
            to="/dashboard"
            class="px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </router-link>

          <button
            type="submit"
            :disabled="isLoading"
            class="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center"
          >
            <svg
              v-if="isLoading"
              class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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

            {{ isLoading ? 'Saving Course...' : 'Create Course' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '../../lib/axios' // Make sure this path correctly points to your axios.js file

const router = useRouter()

// 1. Form State
const form = reactive({
  title: '',
  description: '',
  status: 'draft',
})

// We keep the file separate from the reactive object because files cannot be bound directly with v-model
const thumbnailFile = ref(null)

const isLoading = ref(false)
const errorMessage = ref('')

// 2. Capture the file when the user selects an image
const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    thumbnailFile.value = file
  }
}

// 3. Form Submission
const submitCourse = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    // Pro-Tip: When sending files in JavaScript, you CANNOT send standard JSON.
    // You must construct a native FormData object.
    const formData = new FormData()
    formData.append('title', form.title)
    formData.append('status', form.status)

    if (form.description) {
      formData.append('description', form.description)
    }

    // Attach the file if one was selected
    if (thumbnailFile.value) {
      formData.append('thumbnail', thumbnailFile.value)
    }

    // Axios interceptor will automatically attach your Bearer Token.
    // Because we pass `formData`, Axios automatically sets the header to 'multipart/form-data'.
    const response = await apiClient.post('/instructor/courses', formData)

    // On success, take them to the curriculum builder to add sections and lessons
    const courseId = response.data.data.id
    router.push(`/dashboard/courses/${courseId}/curriculum`)
  } catch (error) {
    console.error(error)
    // Handle Laravel Validation Errors (Status 422)
    if (error.response && error.response.status === 422) {
      // Extract the very first validation message to show the user
      const errors = error.response.data.errors
      errorMessage.value = Object.values(errors)[0][0]
    } else {
      errorMessage.value = 'An unexpected error occurred while communicating with the server.'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
