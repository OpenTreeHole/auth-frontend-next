<template>
  <v-card-title> 您已登录 </v-card-title>
  <v-card-subtitle class="mt-0">
    <span style="font-family: 'Open Sans', serif; font-size: 14px">
      {{ email }}
    </span>
  </v-card-subtitle>
  <v-card-text class="text-start"> <b>Access:</b> {{ access }} </v-card-text>
  <v-card-text class="text-start mt-n4"> <b>Refresh:</b> {{ refresh }} </v-card-text>
  <v-card-text>
    <v-btn
      variant="flat"
      color="secondary"
      @click="onLogout"
    >
      登出
    </v-btn>
  </v-card-text>
</template>

<script setup lang="ts">
import { logout } from '@/apis/auth'
import { useJwtTokens } from '@/composables/jwtToken'
import { useLoading } from '@/composables/loading'
import { useNotification } from '@/composables/notification'
import { promiseTimeout, useLocalStorage } from '@vueuse/core'
import { useRouteQuery } from '@vueuse/router'
import { onBeforeMount } from 'vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router/auto'

const not = useNotification()
const router = useRouter()
const { load } = useLoading()
const email = useLocalStorage('email', '')
const { access, refresh } = useJwtTokens()
const redirectUrl = useRouteQuery('url')

const onLogout = async () => {
  const { message } = await load(logout())
  not.success(message)
  router.push('/login')
}

onBeforeMount(() => {
  if (!access.value || !refresh.value) {
    not.error('您尚未登录！')
    router.push('/login')
  }
})

onMounted(async () => {
  if (redirectUrl.value && typeof redirectUrl.value === 'string') {
    await load(promiseTimeout(1000))
    // Redirect to the url after 1s
    location.replace(redirectUrl.value)
  }
})
</script>
