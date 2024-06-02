<template>
  <v-form
    ref="form"
    lazy-validation
    @submit.prevent="onSubmit"
  >
    <v-card-title v-t="'message.title.login_password'"></v-card-title>
    <EmailDisplayBtn @click="router.push({ name: '/login/email' })">
      {{ email }}
    </EmailDisplayBtn>
    <v-card-text class="mt-8">
      <v-text-field
        v-model="password"
        variant="outlined"
        clearable
        :label="$t('message.label.password')"
        :type="passwordInputType"
        name="password"
      >
      </v-text-field>
      <v-checkbox
        v-model="showPassword"
        class="mt-n7"
        :label="$t('message.label.show_password')"
      >
      </v-checkbox>
    </v-card-text>
    <v-card-text class="d-flex justify-space-between">
      <v-btn
        v-t="'message.button.forget_password'"
        variant="text"
        color="secondary"
        @click="router.push({ name: '/register/', query: { type: 'forget_password' } })"
      ></v-btn>
      <v-btn
        v-t="'message.button.login'"
        color="secondary"
        variant="flat"
        type="submit"
      ></v-btn>
    </v-card-text>
  </v-form>
</template>

<script setup lang="ts">
import { login } from '@/apis/auth'
import { useNotification } from '@/composables/notification'
import { useStorage } from '@vueuse/core'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router/auto'
import { VForm } from 'vuetify/lib/components/index.mjs'

import EmailDisplayBtn from '@/components/EmailDisplayBtn.vue'
import { useLoading } from '@/composables/loading'

const not = useNotification()
const router = useRouter()
const { load } = useLoading()
const email = useStorage('email', '')

const form = ref<VForm | null>(null)

const password = ref('')
const showPassword = ref(false)
const passwordInputType = computed(() => (showPassword.value ? 'text' : 'password'))

const onSubmit = async () => {
  if (!form.value) return
  if (!(await form.value.validate()).valid) return

  const { message } = await load(login(email.value, password.value))

  not.success(message)
  router.push('/online')
}
</script>
