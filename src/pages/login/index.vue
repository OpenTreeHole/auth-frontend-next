<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router/auto'

const email = useStorage('email', '')
const router = useRouter()

onBeforeMount(() => {
  if (email.value) {
    router.push('/login/password')
  } else {
    router.push('/login/email')
  }
})
</script>
