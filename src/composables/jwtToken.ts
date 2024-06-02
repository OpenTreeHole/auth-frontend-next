import { cookieDomain } from '@/config'
import { useCookies } from '@vueuse/integrations/useCookies'
import { computed } from 'vue'

export const useJwtTokens = () => {
  const cookies = useCookies(['access', 'refresh'])
  const access = computed({
    get: () => cookies.get('access') || null,
    set: (value: string | null) => {
      if (value === null) {
        cookies.remove('access', { domain: cookieDomain })
      } else {
        cookies.set('access', value, {
          domain: cookieDomain,
          path: '/',
          expires: new Date(Date.now() + 2 * 60 * 60 * 1000)
        })
      }
    }
  })
  const refresh = computed({
    get: () => cookies.get('refresh') || null,
    set: (value: string | null) => {
      if (value === null) {
        cookies.remove('refresh', { domain: cookieDomain })
      } else {
        cookies.set('refresh', value, {
          domain: cookieDomain,
          path: '/',
          expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
        })
      }
    }
  })
  return { access, refresh }
}
