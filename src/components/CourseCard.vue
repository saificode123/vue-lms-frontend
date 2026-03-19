<template>
  <div
    class="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-brand-300 transition-all duration-300 group cursor-pointer"
    @click="$emit('click')"
  >
    <!-- Thumbnail -->
    <div class="relative h-40 bg-gray-100 overflow-hidden">
      <img
        v-if="course.thumbnail"
        :src="thumbnailUrl"
        :alt="course.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div v-else class="w-full h-full flex items-center justify-center">
        <svg class="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      </div>

      <!-- Status Badge -->
      <span
        :class="[
          'absolute top-3 right-3 px-2.5 py-1 text-xs font-semibold rounded-full',
          course.status === 'published'
            ? 'bg-green-100 text-green-700'
            : 'bg-yellow-100 text-yellow-700',
        ]"
      >
        {{ course.status === 'published' ? 'Published' : 'Draft' }}
      </span>
    </div>

    <!-- Content -->
    <div class="p-5">
      <h3
        class="text-lg font-bold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2"
      >
        {{ course.title }}
      </h3>

      <p v-if="course.description" class="mt-2 text-sm text-gray-500 line-clamp-2">
        {{ course.description }}
      </p>

      <!-- Meta Info -->
      <div class="mt-4 flex items-center justify-between text-sm text-gray-500">
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          {{ sectionCount }} {{ sectionCount === 1 ? 'Section' : 'Sections' }}
        </div>
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {{ lessonCount }} {{ lessonCount === 1 ? 'Lesson' : 'Lessons' }}
        </div>
      </div>

      <!-- Actions -->
      <div
        class="mt-4 pt-4 border-t border-gray-100 flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <button
          @click.stop="$emit('edit')"
          class="px-3 py-1.5 text-sm font-medium text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
        >
          Edit Curriculum
        </button>
        <button
          @click.stop="$emit('view')"
          class="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Preview
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  course: {
    type: Object,
    required: true,
  },
})

defineEmits(['click', 'edit', 'view'])

const thumbnailUrl = computed(() => {
  if (!props.course.thumbnail) return null
  // Handle both full URLs and relative paths
  if (props.course.thumbnail.startsWith('http')) {
    return props.course.thumbnail
  }
  return `${import.meta.env.VITE_API_BASE_URL?.replace('/api', '')}/storage/${props.course.thumbnail}`
})

const sectionCount = computed(() => {
  return props.course.sections?.length || 0
})

const lessonCount = computed(() => {
  return (
    props.course.sections?.reduce((total, section) => {
      return total + (section.lessons?.length || 0)
    }, 0) || 0
  )
})
</script>
