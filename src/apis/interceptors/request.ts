import { useCookies } from '@vueuse/integrations/useCookies'
import { InternalAxiosRequestConfig } from 'axios'
import { refresh } from '../auth'

export const accessTokenInterceptor = async (config: InternalAxiosRequestConfig<any>) => {
  const cookies = useCookies(['access', 'refresh'])
  let accessToken = cookies.get('access')
  if (!accessToken) await refresh()
  accessToken = cookies.get('access')
  if (!accessToken)
    throw new Error('Access token not found after refresh. Cookies may be disabled.')
  config.headers.Authorization = `Bearer ${accessToken}`
  return config
}

export const refreshTokenInterceptor = async (config: InternalAxiosRequestConfig<any>) => {
  const cookies = useCookies(['access', 'refresh'])
  const refreshToken = cookies.get('refresh')
  if (!refreshToken) {
    window.location.href = '/login'
    throw new Error('会话已过期，请重新登录。')
  }
  config.headers.Authorization = `Bearer ${refreshToken}`
  return config
}
