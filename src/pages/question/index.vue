<template>
  <v-card-title v-t="'message.title.question'"></v-card-title>
  <v-card-text v-t="'message.text.question'"></v-card-text>
  <v-card-text>
    <v-btn
      v-t="'message.button.begin_test'"
      color="secondary"
      variant="flat"
      @click="start"
    ></v-btn>
  </v-card-text>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router/auto'
import { useQuestionStore } from '@/stores/question'
import { getTest } from '@/apis/question'
import { useLoading } from '@/composables/loading'

const router = useRouter()
const questionStore = useQuestionStore()
const { load } = useLoading()

const start = async () => {
  questionStore.test = await load(getTest())
  router.push('/question/1')
}
</script>
