import axios from 'axios'
import { accessTokenInterceptor, refreshTokenInterceptor } from './interceptors/request'
import {
  accessTokenExpirationInterceptor,
  camelizeKeysResponseInterceptor,
  refreshErrorInterceptor
} from './interceptors/response'

export const authRequest = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL
})

export const authNoAuthorizationRequest = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL
})

export const refreshRequest = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL
})

authRequest.interceptors.request.use(accessTokenInterceptor)
authRequest.interceptors.response.use(
  (response) => response,
  accessTokenExpirationInterceptor(refreshRequest)
)
authRequest.interceptors.response.use(camelizeKeysResponseInterceptor)

authNoAuthorizationRequest.interceptors.response.use(camelizeKeysResponseInterceptor)

refreshRequest.interceptors.request.use(refreshTokenInterceptor)
refreshRequest.interceptors.response.use((response) => response, refreshErrorInterceptor)
refreshRequest.interceptors.response.use(camelizeKeysResponseInterceptor)
