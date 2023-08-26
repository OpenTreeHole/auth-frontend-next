<template>
  <v-card-title v-t="'message.title.question'"></v-card-title>
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
      :color="$t(`color.question.${currentQuestion.status}`)"
      @update:model-value="updateRadioGroup"
    >
      <v-radio
        v-for="item in currentQuestion.options"
        :key="item"
        :label="
          currentQuestion.type === 'true-or-false' ? $t(`message.label.question.${item}`) : item
        "
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
        :color="
          $t(
            currentQuestion.answer.includes(item)
              ? `color.question.${currentQuestion.status}`
              : 'color.question.blank'
          )
        "
        @update:model-value="updateCheckboxGroup"
      >
      </v-checkbox>
    </template>
  </v-card-text>
  <v-card-text style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr))">
    <div class="d-flex justify-start">
      <v-btn
        v-if="index > 1"
        v-t="'message.button.prev_question'"
        variant="text"
        color="secondary"
        @click="router.push(`/question/${index - 1}`)"
      ></v-btn>
    </div>

    <div class="d-flex justify-center">
      <v-btn
        v-if="mobile"
        v-t="'message.button.question_list'"
        variant="text"
        color="secondary"
        @click="side = !side"
      ></v-btn>
    </div>
    <div class="d-flex justify-end">
      <v-btn
        v-if="index < total"
        v-t="'message.button.next_question'"
        variant="flat"
        color="secondary"
        @click="router.push(`/question/${index + 1}`)"
      ></v-btn>
      <v-btn
        v-else
        v-t="'message.button.submit_test'"
        variant="flat"
        color="secondary"
        @click="onSubmit"
      ></v-btn>
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
import { useI18n } from 'vue-i18n'

const { mobile } = useDisplay()
const { side } = useSide()
const { load } = useLoading()
const { t } = useI18n()
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
  if (values.length === 0) currentQuestion.value!.status = 'blank'
  else currentQuestion.value!.status = 'answered'
}

const onSubmit = async () => {
  if (questionStore.questions.some((q) => q.status === 'blank')) {
    not.error(t('message.error.question_not_answered'))
    return
  }
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
