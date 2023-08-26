<template>
  <v-form
    ref="form"
    lazy-validation
    @submit.prevent="onSubmit"
  >
    <v-card-title v-t="`message.title.register.${registerType}`"></v-card-title>
    <v-card-subtitle
      v-t="`message.subtitle.register.${registerType}`"
      class="text-subtitle-1"
    ></v-card-subtitle>
    <v-card-text class="mt-8">
      <v-text-field
        v-model="email"
        variant="outlined"
        clearable
        :label="$t('message.label.email')"
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
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router/auto'
import { VForm } from 'vuetify/components'

const { t } = useI18n()
const router = useRouter()
const registerType = useRouteQuery<string>('type', 'register')
const emailStorage = useStorage('email', '')

const form = ref<VForm | null>(null)
const email = ref(emailStorage.value)

const checkEmail = (email: string) =>
  /^[a-zA-Z\d]+@(m\.)?fudan\.edu\.cn$/.test(email) || email === 'admin@opentreehole.org'
const emailRules = [(v: string) => checkEmail(v) || t('message.error.email_format')]

const onSubmit = async () => {
  if (!form.value) return
  if (!(await form.value.validate()).valid) return

  emailStorage.value = email.value
  router.push('/register/sendVerificationCode')
}
</script>
