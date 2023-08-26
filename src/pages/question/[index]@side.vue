<template>
  <div class="d-flex justify-center py-0">
    <v-item-group
      style="
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        gap: 4px;
        justify-items: center;
        flex-grow: 1;
        max-width: 80vw;
      "
    >
      <v-item
        v-for="(question, n) in questionStore.questions"
        :key="n"
      >
        <v-btn
          icon
          aria-current="false"
          variant="text"
          :rounded="4"
          :active="n + 1 === index"
          :color="$t(`color.question.${question.status}`)"
          @click="router.push(`/question/${n + 1}`)"
        >
          {{ n + 1 }}
        </v-btn>
      </v-item>
    </v-item-group>
  </div>

  <v-card-text class="d-flex justify-center pt-2 pb-0">
    <v-btn
      color="secondary"
      variant="flat"
      @click="onSubmit"
    >
      交卷
    </v-btn>
  </v-card-text>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router/auto'
import { useRouteParams } from '@vueuse/router'
import { computed } from 'vue'
import { useQuestionStore } from '@/stores/question'
import { TestAnswerSchema } from '@/types/question'
import { useNotification } from '@/composables/notification'
import { submitTestAnswer } from '@/apis/question'
import { useLoading } from '@/composables/loading'

const { load } = useLoading()
const not = useNotification()
const router = useRouter()
const questionStore = useQuestionStore()
const indexParam = useRouteParams('index')

const index = computed(() => Number(indexParam.value))

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
</script>
