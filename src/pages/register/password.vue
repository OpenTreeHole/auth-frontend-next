<template>
  <v-form
    ref="form"
    lazy-validation
    @submit.prevent="onSubmit"
  >
    <v-card-title> 验证邮箱 </v-card-title>
    <EmailDisplayBtn @click="router.push('/register/email')">
      {{ email }}
    </EmailDisplayBtn>
    <v-card-text>
      <span>
        我们已向 {{ email }} 发送验证码。<br />未收到？
        <v-btn
          class="px-0"
          variant="text"
          color="secondary"
          style="height: 19px; margin-top: -3px"
          @click="router.push('/register/sendVerificationCode')"
        >
          返回上一步
        </v-btn>
        。
      </span>
    </v-card-text>
    <v-card-text class="mt-8">
      <v-text-field
        v-model="verificationCode"
        variant="outlined"
        clearable
        label="验证码"
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
        variant="text"
        color="secondary"
        @click="router.push('/register/sendVerificationCode')"
      >
        返回上一步
      </v-btn>
      <v-btn
        variant="flat"
        color="secondary"
        type="submit"
      >
        下一步
      </v-btn>
    </v-card-text>
    <template v-else>
      <v-card-text class="mt-n9">
        <v-text-field
          v-model="password"
          variant="outlined"
          clearable
          label="设置密码"
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
          label="重复输入密码"
          type="password"
          :rules="password2Rules"
        >
        </v-text-field>
      </v-card-text>
      <v-card-text class="d-flex justify-space-between">
        <v-btn
          variant="text"
          color="secondary"
          @click="showPasswordArea = false"
        >
          返回上一步
        </v-btn>
        <v-btn
          variant="flat"
          color="secondary"
          type="submit"
        >
          {{ isForgetPassword ? '确认' : '注册' }}
        </v-btn>
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

const not = useNotification()
const router = useRouter()
const { load } = useLoading()
const registerType = useRouteQuery('type')
const email = useStorage('email', '')

const form = ref<VForm | null>(null)

const showPasswordArea = ref(false)
const verificationCode = ref('')
const password = ref('')
const password2 = ref('')

const isForgetPassword = computed(() => registerType.value === 'forget_password')
const codeRules = computed(() => [(v: string) => v.length === 6 || '请输入6位验证码！'])
const passwordRules = [(v: string) => (v.length >= 8 && v.length <= 12) || '请输入8~12位密码！']
const password2Rules = computed(() => [
  (v: string) => v === password.value || '两次输入密码不相同！'
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
