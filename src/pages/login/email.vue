<template>
  <v-form
    ref="form"
    lazy-validation
    @submit.prevent="onSubmit"
  >
    <v-card-title> 登录 </v-card-title>
    <v-card-subtitle class="text-subtitle-1"> 使用您的 FDU Hole 账号 </v-card-subtitle>
    <v-card-text class="mt-8">
      <v-text-field
        v-model="email"
        variant="outlined"
        clearable
        label="复旦大学电子邮箱"
        type="text"
        name="email"
        :rules="emailRules"
      >
      </v-text-field>
    </v-card-text>
    <v-card-text class="d-flex justify-space-between">
      <v-btn
        variant="text"
        color="secondary"
        @click="$router.push('/register')"
      >
        注册 FDU Hole 账号
      </v-btn>
      <v-btn
        variant="flat"
        color="secondary"
        type="submit"
      >
        下一步
      </v-btn>
    </v-card-text>
  </v-form>
</template>

<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { ref } from 'vue'
import { useRouter } from 'vue-router/auto'
import { VForm } from 'vuetify/lib/components/index.mjs'

const router = useRouter()
const emailStorage = useStorage('email', '')

const form = ref<VForm | null>(null)
const email = ref(emailStorage.value)

const checkEmail = (email: string) =>
  /^[a-zA-Z\d]+@(m\.)?fudan\.edu\.cn$/.test(email) || email === 'admin@opentreehole.org'
const emailRules = [(v: string) => checkEmail(v) || '不是正确的复旦学邮格式！']

const onSubmit = async () => {
  if (!form.value) return
  if (!(await form.value.validate()).valid) return

  emailStorage.value = email.value
  router.push('/login/password')
}
</script>
