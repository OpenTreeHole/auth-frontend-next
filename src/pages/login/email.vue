<template>
  <v-form
    ref="form"
    lazy-validation
    @submit.prevent="onSubmit"
  >
    <v-card-title v-t="'message.title.login'"></v-card-title>
    <v-card-subtitle
      v-t="'message.subtitle.login'"
      class="text-subtitle-1"
    ></v-card-subtitle>
    <v-card-text class="mt-8">
      <v-text-field
        v-model="email"
        variant="outlined"
        clearable
        :label="$t('message.label.email')"
        type="text"
        name="email"
        :rules="emailRules"
      >
      </v-text-field>
    </v-card-text>
    <v-card-text class="d-flex justify-space-between">
      <v-btn
        v-t="'message.button.go_to_register'"
        variant="text"
        color="secondary"
        @click="$router.push('/register')"
      ></v-btn>
      <v-btn
        v-t="'message.button.next_step'"
        variant="flat"
        color="secondary"
        type="submit"
      ></v-btn>
    </v-card-text>
  </v-form>
</template>

<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { ref } from 'vue'
import { useRouter } from 'vue-router/auto'
import { VForm } from 'vuetify/components'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()
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
  router.push('/login/password')
}
</script>
