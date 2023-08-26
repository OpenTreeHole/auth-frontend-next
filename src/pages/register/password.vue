<template>
  <v-form
    ref="form"
    lazy-validation
    @submit.prevent="onSubmit"
  >
    <v-card-title v-t="`message.title.verify_email`"></v-card-title>
    <EmailDisplayBtn @click="router.push('/register/email')">
      {{ email }}
    </EmailDisplayBtn>
    <v-card-text>
      {{ $t('message.text.verification_code.sent', { email }) }}<br />{{
        $t('message.text.verification_code.not_received')
      }}
      <v-btn
        v-t="'message.button.prev_step'"
        class="px-0"
        variant="text"
        color="secondary"
        style="height: 19px; margin-top: -3px"
        @click="router.push('/register/sendVerificationCode')"
      ></v-btn>
    </v-card-text>
    <v-card-text class="mt-8">
      <v-text-field
        v-model="verificationCode"
        variant="outlined"
        clearable
        :label="$t('message.label.verification_code')"
        type="text"
        :rules="codeRules"
      >
      </v-text-field>
    </v-card-text>
    <v-card-text
      v-if="!showPasswordArea"
      class="d-flex justify-space-between"
    >
      <v-btn
        v-t="`message.button.prev_step`"
        variant="text"
        color="secondary"
        @click="router.push('/register/sendVerificationCode')"
      ></v-btn>
      <v-btn
        v-t="`message.button.next_step`"
        variant="flat"
        color="secondary"
        type="submit"
      ></v-btn>
    </v-card-text>
    <template v-else>
      <v-card-text class="mt-n9">
        <v-text-field
          v-model="password"
          variant="outlined"
          clearable
          :label="$t('message.label.set_password')"
          type="password"
          :rules="passwordRules"
        >
        </v-text-field>
      </v-card-text>
      <v-card-text class="mt-n9">
        <v-text-field
          v-model="password2"
          variant="outlined"
          clearable
          :label="$t('message.label.confirm_password')"
          type="password"
          :rules="password2Rules"
        >
        </v-text-field>
      </v-card-text>
      <v-card-text class="d-flex justify-space-between">
        <v-btn
          v-t="`message.button.prev_step`"
          variant="text"
          color="secondary"
          @click="showPasswordArea = false"
        ></v-btn>
        <v-btn
          v-t="`message.button.register.${registerType}`"
          variant="flat"
          color="secondary"
          type="submit"
        ></v-btn>
      </v-card-text>
    </template>
  </v-form>
</template>

<script setup lang="ts">
import { changePassword, register } from '@/apis/auth'
import { useNotification } from '@/composables/notification'
import { useStorage } from '@vueuse/core'
import { useRouteQuery } from '@vueuse/router'
import { computed } from 'vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router/auto'
import { VForm } from 'vuetify/lib/components/index.mjs'
import EmailDisplayBtn from '@/components/EmailDisplayBtn.vue'
import { useLoading } from '@/composables/loading'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const not = useNotification()
const router = useRouter()
const { load } = useLoading()
const registerType = useRouteQuery<string>('type', 'register')
const email = useStorage('email', '')

const form = ref<VForm | null>(null)

const showPasswordArea = ref(false)
const verificationCode = ref('')
const password = ref('')
const password2 = ref('')

const isForgetPassword = computed(() => registerType.value === 'forget_password')
const codeRules = computed(() => [
  (v: string) => v.length === 6 || t('message.error.verification_code_length')
])
const passwordRules = [
  (v: string) => (v.length >= 8 && v.length <= 12) || t('message.error.password_length')
]
const password2Rules = computed(() => [
  (v: string) => v === password.value || t('message.error.password_not_match')
])

const onSubmit = async () => {
  if (!form.value) return
  if (!(await form.value.validate()).valid) return

  if (!showPasswordArea.value) showPasswordArea.value = true
  else {
    const submitPasswordFunc = isForgetPassword.value ? changePassword : register
    const { message } = await load(
      submitPasswordFunc(email.value, password.value, verificationCode.value)
    )
    not.success(message)
    router.push('/online')
  }
}
</script>
