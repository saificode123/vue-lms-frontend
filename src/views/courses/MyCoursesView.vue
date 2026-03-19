<template>
  <div class="max-w-7xl mx-auto animate-fade-in">
    <!-- Header -->
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">My Courses</h2>
        <p class="mt-1 text-sm text-gray-500">Manage and organize your courses</p>
      </div>
      <router-link
        to="/dashboard/courses/create"
        class="inline-flex items-center px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors"
      >
        <svg class="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Create New Course
      </router-link>
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage" class="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-md">
      <p class="text-sm text-red-700 font-medium">{{ errorMessage }}</p>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center py-20">
      <div
        class="animate-spin rounded-full h-12 w-12 border-4 border-brand-500 border-t-transparent"
      ></div>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="courses.length === 0"
      class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div class="p-12 text-center">
        <svg
          class="mx-auto h-16 w-16 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
        <h3 class="mt-4 text-lg font-medium text-gray-900">No courses yet</h3>
        <p class="mt-2 text-sm text-gray-500 max-w-sm mx-auto">
          Get started by creating your first course. You'll be able to add sections and lessons
          after.
        </p>
        <div class="mt-6">
          <router-link
            to="/dashboard/courses/create"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 focus:outline-none"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create Your First Course
          </router-link>
        </div>
      </div>
    </div>

    <!-- Courses Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CourseCard
        v-for="course in courses"
        :key="course.id"
        :course="course"
        @click="viewCourse(course)"
        @edit="editCurriculum(course)"
        @view="previewCourse(course)"
      />
    </div>

    <!-- Pagination -->
    <div v-if="pagination && pagination.last_page > 1" class="mt-8 flex justify-center">
      <nav class="flex items-center space-x-2">
        <button
          v-if="pagination.current_page > 1"
          @click="fetchCourses(pagination.current_page - 1)"
          class="px-3 py-2 text-sm font-medium text-gray-600 hover:text-brand-600 hover:bg-gray-50 rounded-lg transition-colors"
        >
          Previous
        </button>

        <span class="px-3 py-2 text-sm text-gray-500">
          Page {{ pagination.current_page }} of {{ pagination.last_page }}
        </span>

        <button
          v-if="pagination.current_page < pagination.last_page"
          @click="fetchCourses(pagination.current_page + 1)"
          class="px-3 py-2 text-sm font-medium text-gray-600 hover:text-brand-600 hover:bg-gray-50 rounded-lg transition-colors"
        >
          Next
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '../../lib/axios'
import CourseCard from '../../components/CourseCard.vue'

const router = useRouter()

const courses = ref([])
const isLoading = ref(false)
const errorMessage = ref('')
const pagination = ref(null)

const fetchCourses = async (page = 1) => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await apiClient.get(`/instructor/courses?page=${page}`)
    courses.value = response.data.data
    pagination.value = {
      current_page: response.data.meta.current_page,
      last_page: response.data.meta.last_page,
      total: response.data.meta.total,
    }
  } catch (error) {
    console.error('Failed to fetch courses:', error)
    errorMessage.value = 'Failed to load courses. Please try again.'
  } finally {
    isLoading.value = false
  }
}

const viewCourse = (course) => {
  // Could open a detail view
  console.log('View course:', course)
}

const editCurriculum = (course) => {
  router.push(`/dashboard/courses/${course.id}/curriculum`)
}

const previewCourse = (course) => {
  // Could open a preview modal or navigate to public course page
  console.log('Preview course:', course)
}

onMounted(() => {
  fetchCourses()
})
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
