import { Test } from '@/types/question'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useQuestionStore = defineStore('question', () => {
  const test = ref<Test | null>(null)
  const questions = computed(() => test.value?.questions ?? [])
  return {
    test,
    questions
  }
})
