<template>
  <div class="max-w-4xl mx-auto space-y-6 animate-fade-in pb-20">
    <div
      class="flex items-center justify-between bg-white p-6 rounded-xl shadow-sm border border-gray-100"
    >
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Curriculum Builder</h2>
        <p class="mt-1 text-sm text-gray-500">Drag and drop to reorder sections and lessons.</p>
      </div>
      <div class="flex space-x-3">
        <router-link
          to="/dashboard/courses"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          Cancel
        </router-link>
        <button
          @click="saveCurriculum"
          :disabled="isSaving"
          class="px-6 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold rounded-lg shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-70 transition-all flex items-center"
        >
          <span
            v-if="isSaving"
            class="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"
          ></span>
          {{ isSaving ? 'Saving...' : 'Save Curriculum' }}
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center py-20">
      <div
        class="animate-spin rounded-full h-12 w-12 border-4 border-brand-500 border-t-transparent"
      ></div>
    </div>

    <!-- Content -->
    <div v-else class="space-y-4">
      <draggable
        v-model="sections"
        item-key="id"
        handle=".section-drag-handle"
        ghost-class="opacity-50"
        class="space-y-6"
      >
        <template #item="{ element: section, index: sectionIndex }">
          <div
            class="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden shadow-sm transition-all"
          >
            <div
              class="bg-gray-100 border-b border-gray-200 p-4 flex items-center justify-between group"
            >
              <div class="flex items-center flex-1">
                <button
                  class="section-drag-handle cursor-grab active:cursor-grabbing p-2 text-gray-400 hover:text-gray-600 mr-2"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 8h16M4 16h16"
                    ></path>
                  </svg>
                </button>
                <span class="font-bold text-gray-700 mr-3">Section {{ sectionIndex + 1 }}:</span>
                <input
                  v-model="section.title"
                  type="text"
                  placeholder="Enter section title..."
                  class="flex-1 bg-white px-3 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-brand-500 focus:outline-none text-sm font-semibold"
                />
              </div>
              <button
                @click="removeSection(sectionIndex)"
                class="text-red-400 hover:text-red-600 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </button>
            </div>

            <div class="p-4 space-y-3">
              <draggable
                v-model="section.lessons"
                item-key="id"
                handle=".lesson-drag-handle"
                ghost-class="bg-blue-50"
                class="space-y-3"
              >
                <template #item="{ element: lesson, index: lessonIndex }">
                  <div
                    class="bg-white border border-gray-200 rounded-lg p-3 flex items-start group shadow-sm hover:border-brand-300 transition-colors"
                  >
                    <button
                      class="lesson-drag-handle cursor-grab active:cursor-grabbing p-2 text-gray-400 hover:text-brand-500 mr-1 mt-1"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                      </svg>
                    </button>

                    <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label class="block text-xs font-semibold text-gray-500 mb-1"
                          >Lesson Title</label
                        >
                        <input
                          v-model="lesson.title"
                          type="text"
                          placeholder="e.g., Introduction to the course"
                          class="w-full bg-gray-50 px-3 py-2 border border-gray-200 rounded text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label class="block text-xs font-semibold text-gray-500 mb-1"
                          >Video URL (YouTube/Vimeo)</label
                        >
                        <input
                          v-model="lesson.video_url"
                          type="url"
                          placeholder="https://youtube.com/watch?v=..."
                          class="w-full bg-gray-50 px-3 py-2 border border-gray-200 rounded text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none text-brand-600 font-mono"
                        />
                      </div>
                    </div>

                    <button
                      @click="removeLesson(sectionIndex, lessonIndex)"
                      class="text-red-400 hover:text-red-600 p-2 ml-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </template>
              </draggable>

              <button
                @click="addLesson(sectionIndex)"
                class="mt-2 flex items-center text-sm font-semibold text-brand-600 hover:text-brand-800 transition-colors px-2 py-1"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
                Add Lesson
              </button>
            </div>
          </div>
        </template>
      </draggable>

      <button
        @click="addSection"
        class="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-semibold hover:border-brand-500 hover:text-brand-600 hover:bg-brand-50 transition-all flex items-center justify-center"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          ></path>
        </svg>
        Add New Section
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import draggable from 'vuedraggable'
import apiClient from '../../lib/axios'

const route = useRoute()
const router = useRouter()
const courseId = route.params.id // Grabs the course ID from the URL
const isSaving = ref(false)
const isLoading = ref(false)

// Generate unique IDs for the drag-and-drop keys
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2)

// The Master State: A nested array of sections containing lessons
const sections = ref([])

// Fetch course data on mount
const fetchCourse = async () => {
  isLoading.value = true
  try {
    const response = await apiClient.get(`/instructor/courses/${courseId}`)
    const course = response.data.data

    if (course.sections && course.sections.length > 0) {
      sections.value = course.sections.map((section) => ({
        id: `section-${section.id}`,
        title: section.title,
        lessons: section.lessons.map((lesson) => ({
          id: `lesson-${lesson.id}`,
          title: lesson.title,
          video_url: lesson.video_url || '',
        })),
      }))
    } else {
      // Initialize with default section if none exists
      sections.value = [
        {
          id: generateId(),
          title: 'Introduction',
          lessons: [{ id: generateId(), title: 'Course Welcome', video_url: '' }],
        },
      ]
    }
  } catch (error) {
    console.error('Failed to fetch course:', error)
    // Initialize with default if fetch fails
    sections.value = [
      {
        id: generateId(),
        title: 'Introduction',
        lessons: [{ id: generateId(), title: 'Course Welcome', video_url: '' }],
      },
    ]
  } finally {
    isLoading.value = false
  }
}

// --- Methods ---

const addSection = () => {
  sections.value.push({
    id: generateId(),
    title: '',
    lessons: [],
  })
}

const removeSection = (index) => {
  if (confirm('Are you sure you want to delete this entire section and its lessons?')) {
    sections.value.splice(index, 1)
  }
}

const addLesson = (sectionIndex) => {
  sections.value[sectionIndex].lessons.push({
    id: generateId(),
    title: '',
    video_url: '',
  })
}

const removeLesson = (sectionIndex, lessonIndex) => {
  sections.value[sectionIndex].lessons.splice(lessonIndex, 1)
}

const saveCurriculum = async () => {
  isSaving.value = true

  try {
    // 1. Format the data to send to Laravel
    // We map over the array to add the proper 'order' values based on their dragged positions
    const payload = {
      sections: sections.value.map((section, sIndex) => ({
        title: section.title,
        order: sIndex + 1,
        lessons: section.lessons.map((lesson, lIndex) => ({
          title: lesson.title,
          video_url: lesson.video_url,
          order: lIndex + 1,
        })),
      })),
    }

    // 2. Call the Laravel API to save the curriculum
    await apiClient.put(`/instructor/courses/${courseId}/curriculum`, payload)

    // Show success message
    alert('Curriculum saved successfully!')

    // Optionally redirect back to dashboard
    router.push('/dashboard/courses')
  } catch (error) {
    console.error('Failed to save curriculum:', error)
    alert('Failed to save curriculum. Please try again.')
  } finally {
    isSaving.value = false
  }
}

// Fetch course data on component mount
onMounted(() => {
  fetchCourse()
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
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
