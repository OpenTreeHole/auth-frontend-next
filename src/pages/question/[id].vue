<template>
  <v-card-title> 入站答题 </v-card-title>
  <v-card-text class="text-left">
    <b>
      1.
      发布违反社区公约的内容，将会被社区管理员删除，严重者将会被封禁。请问以下哪些内容违反了社区公约？
    </b>
    <v-radio-group
      column
      class="ml-n1 my-1"
      color="red"
    >
      <v-radio
        v-for="item in items"
        :key="item"
        :label="item"
        :value="item"
      >
      </v-radio>
    </v-radio-group>
  </v-card-text>
  <v-card-text class="d-flex justify-space-between flex-row-reverse">
    <v-btn
      v-if="id < total"
      variant="flat"
      color="secondary"
      @click="router.push(`/question/${id + 1}`)"
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
    <v-btn
      v-if="mobile"
      variant="text"
      color="secondary"
      @click="side = !side"
    >
      目录
    </v-btn>
    <v-btn
      v-if="id > 1"
      variant="text"
      color="secondary"
      @click="router.push(`/question/${id - 1}`)"
    >
      上一题
    </v-btn>
  </v-card-text>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'
import { useSide } from '@/composables/side'
import { useRouter } from 'vue-router/auto'
import { useRouteParams } from '@vueuse/router'
import { computed } from 'vue'
const { mobile } = useDisplay()
const { side } = useSide()
const router = useRouter()
const idParam = useRouteParams('id')
const id = computed(() => Number(idParam.value))

const total = 20
const items = ['色情低俗内容', '人身攻击', '恶意刷屏', '发布广告']

const onSubmit = () => {
  router.push('/question/3')
}
</script>

<route lang="json">
{
  "meta": {
    "side": true
  }
}
</route>
