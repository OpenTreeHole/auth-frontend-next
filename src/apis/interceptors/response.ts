import { useCookies } from '@vueuse/integrations/useCookies'
import { refresh } from '../auth'
import { AxiosInstance, AxiosResponse } from 'axios'
import { camelizeKeys } from 'humps'

export const accessTokenExpirationInterceptor =
  (requestor: AxiosInstance) => async (error: any) => {
    if (!error.response) return Promise.reject(error)
    if (error.response.status !== 401) return Promise.reject(error)
    // Refresh access token if it is expired
    const { access } = await refresh()
    // Retry the original request
    const config = error.config
    config.headers.Authorization = `Bearer ${access}`
    return requestor.request(config)
  }

export const refreshErrorInterceptor = async (error: any) => {
  if (!error.response) return Promise.reject(error)
  if (error.response.status !== 401) return Promise.reject(error)
  // Refresh token is expired, redirect to login page
  const cookies = useCookies(['access', 'refresh'])
  cookies.remove('access')
  cookies.remove('refresh')
  window.location.href = '/login'
  return Promise.reject(error)
}

export const camelizeKeysResponseInterceptor = (response: AxiosResponse<any>) => {
  return {
    ...response,
    data: camelizeKeys(response.data)
  }
}
