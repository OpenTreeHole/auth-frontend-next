<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router/auto'

const email = useStorage('email', '')
const router = useRouter()

onBeforeMount(() => {
  if (email.value) {
    router.push('/register/sendVerificationCode')
  } else {
    router.push('/register/email')
  }
})
</script>
