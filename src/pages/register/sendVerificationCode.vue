<template>
  <v-card-title v-t="'message.title.confirm_email'"></v-card-title>
  <EmailDisplayBtn @click="router.push('/register/email')">
    {{ email }}
  </EmailDisplayBtn>
  <v-card-text v-t="'message.subtitle.confirm_email'"></v-card-text>
  <v-card-text class="d-flex justify-space-between">
    <v-btn
      v-t="'message.button.prev_step'"
      variant="text"
      color="secondary"
      @click="router.push('/register/email')"
    ></v-btn>
    <v-btn
      variant="flat"
      color="secondary"
      :disabled="sendCodeTimeout > 0"
      @click="onSubmit"
    >
      <span class="mx-2">{{ sendCodeText }}</span>
    </v-btn>
  </v-card-text>
</template>

<script setup lang="ts">
import { verifyWithEmail } from '@/apis/auth'
import EmailDisplayBtn from '@/components/EmailDisplayBtn.vue'
import { useLoading } from '@/composables/loading'
import { useNotification } from '@/composables/notification'
import { useNow, useStorage } from '@vueuse/core'
import { useRouteQuery } from '@vueuse/router'
import { computed } from 'vue'
import { useRouter } from 'vue-router/auto'

const not = useNotification()
const router = useRouter()
const { load } = useLoading()
const registerType = useRouteQuery<string>('type', 'register')
const email = useStorage('email', '')
const now = useNow()
const sendCodeTimeoutDate = useStorage('sendCodeTimeoutDate', new Date())

const sendCodeTimeout = computed(() => {
  const timeout = Math.floor((sendCodeTimeoutDate.value.getTime() - now.value.getTime()) / 1000)
  return timeout > 0 ? timeout : 0
})
const sendCodeText = computed(() =>
  sendCodeTimeout.value > 0 ? sendCodeTimeout.value.toString() : '发送验证码'
)
const isForgetPassword = computed(() => registerType.value === 'forget_password')

const onSubmit = async () => {
  sendCodeTimeoutDate.value = new Date(now.value.getTime() + 60 * 1000)
  const { message } = await load(
    verifyWithEmail(email.value, isForgetPassword.value ? 'reset' : 'register')
  )
  not.success(message)
  router.push('/register/password')
}
</script>
