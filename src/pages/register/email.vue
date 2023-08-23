<template>
  <v-form
    ref="form"
    lazy-validation
    @submit.prevent="onSubmit"
  >
    <v-card-title>
      {{ isForgetPassword ? '忘记密码' : '注册' }}
    </v-card-title>
    <v-card-subtitle class="text-subtitle-1">
      {{
        isForgetPassword
          ? '使用复旦学邮(@fudan.edu.cn)以找回密码'
          : '使用您的复旦学邮(@fudan.edu.cn)进行注册！'
      }}
    </v-card-subtitle>
    <v-card-text class="mt-8">
      <v-text-field
        v-model="email"
        variant="outlined"
        clearable
        label="复旦大学电子邮箱"
        type="email"
        :rules="emailRules"
      >
      </v-text-field>
    </v-card-text>
    <v-card-text class="d-flex justify-space-between">
      <v-btn
        color="secondary"
        variant="text"
        @click="router.push('/login')"
      >
        已有账号？点此登录
      </v-btn>
      <v-btn
        color="secondary"
        variant="flat"
        type="submit"
      >
        验证邮箱
      </v-btn>
    </v-card-text>
  </v-form>
</template>

<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { useRouteQuery } from '@vueuse/router'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router/auto'
import { VForm } from 'vuetify/lib/components/index.mjs'

const router = useRouter()
const registerType = useRouteQuery('type')
const emailStorage = useStorage('email', '')

const form = ref<VForm | null>(null)
const email = ref(emailStorage.value)

const isForgetPassword = computed(() => registerType.value === 'forget_password')

const checkEmail = (email: string) =>
  /^[a-zA-Z\d]+@(m\.)?fudan\.edu\.cn$/.test(email) || email === 'admin@opentreehole.org'
const emailRules = [(v: string) => checkEmail(v) || '不是正确的复旦学邮格式！']

const onSubmit = async () => {
  if (!form.value) return
  if (!(await form.value.validate()).valid) return

  emailStorage.value = email.value
  router.push('/register/sendVerificationCode')
}
</script>
