<template>
  <v-card-title> 入站答题 </v-card-title>
  <v-card-text>
    为了更好地维护社区的和谐氛围，我们需要您在正式加入社区之前完成一份入站答题，答题时请参考意见问题和协议条款。
  </v-card-text>
  <v-card-text>
    <v-btn
      color="secondary"
      variant="flat"
      @click="start"
    >
      开始答题
    </v-btn>
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
