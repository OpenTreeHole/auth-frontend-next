<template>
  <v-card-title> 入站答题 </v-card-title>
  <v-card-text
    v-if="currentQuestion"
    class="text-left"
  >
    <b> {{ index }}. {{ currentQuestion.question }} </b>
    <v-radio-group
      v-if="currentQuestion.type === 'single-selection' || currentQuestion.type === 'true-or-false'"
      :model-value="currentQuestion.answer.length > 0 && currentQuestion.answer[0]"
      column
      class="ml-n1 my-1"
      color="red"
      @update:model-value="updateRadioGroup"
    >
      <v-radio
        v-for="item in currentQuestion.options"
        :key="item"
        :label="item"
        :value="item"
      >
      </v-radio>
    </v-radio-group>
    <template v-else-if="currentQuestion.type === 'multi-selection'">
      <v-checkbox
        v-for="item in currentQuestion.options"
        :key="item"
        :model-value="currentQuestion.answer"
        :label="item"
        :value="item"
        @update:model-value="updateCheckboxGroup"
      >
      </v-checkbox>
    </template>
  </v-card-text>
  <v-card-text style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr))">
    <div class="d-flex justify-start">
      <v-btn
        v-if="index > 1"
        variant="text"
        color="secondary"
        @click="router.push(`/question/${index - 1}`)"
      >
        上一题
      </v-btn>
    </div>

    <div class="d-flex justify-center">
      <v-btn
        v-if="mobile"
        variant="text"
        color="secondary"
        @click="side = !side"
      >
        目录
      </v-btn>
    </div>
    <div class="d-flex justify-end">
      <v-btn
        v-if="index < total"
        variant="flat"
        color="secondary"
        @click="router.push(`/question/${index + 1}`)"
      >
        下一题
      </v-btn>
      <v-btn
        v-else
        variant="flat"
        color="secondary"
        @click="onSubmit"
      >
        交卷
      </v-btn>
    </div>
  </v-card-text>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'
import { useSide } from '@/composables/side'
import { useRouter } from 'vue-router/auto'
import { useRouteParams } from '@vueuse/router'
import { computed, onBeforeMount } from 'vue'
import { useQuestionStore } from '@/stores/question'
import { useLoading } from '@/composables/loading'
import { submitTestAnswer } from '@/apis/question'
import { TestAnswerSchema } from '@/types/question'
import { useNotification } from '@/composables/notification'

const { mobile } = useDisplay()
const { side } = useSide()
const { load } = useLoading()
const not = useNotification()
const router = useRouter()
const questionStore = useQuestionStore()
const indexParam = useRouteParams('index')

const index = computed(() => Number(indexParam.value))
const total = computed(() => questionStore.questions.length)
const currentQuestion = computed(() =>
  questionStore.questions.find((_, i) => i + 1 === index.value)
)

const updateRadioGroup = (value: string) => {
  currentQuestion.value!.answer = [value]
  currentQuestion.value!.status = 'answered'
}

const updateCheckboxGroup: any = (values: string[]) => {
  currentQuestion.value!.answer = values
  if (values.length === 0) currentQuestion.value!.status = 'not-answered'
  else currentQuestion.value!.status = 'answered'
}

const onSubmit = async () => {
  const { message, correct, wrongQuestionIds } = await load(
    submitTestAnswer(
      TestAnswerSchema.parse({
        answers: questionStore.questions,
        version: questionStore.test!.version
      })
    )
  )
  if (correct) {
    not.success(message)
    router.push('/online')
  } else {
    not.error(message)
    for (const question of questionStore.questions) {
      if (wrongQuestionIds.includes(question.id)) {
        question.status = 'wrong'
      } else {
        question.status = 'correct'
      }
    }
    router.push(`/question/${wrongQuestionIds[0]}`)
  }
}

onBeforeMount(() => {
  if (!questionStore.test) {
    router.push('/question/')
  } else if (!currentQuestion.value) {
    router.push(`/question/1`)
  }
})
</script>

<route lang="json">
{
  "meta": {
    "side": true
  }
}
</route>
