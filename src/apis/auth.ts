import { authNoAuthorizationRequest, authRequest, refreshRequest } from './request'
import { z } from 'zod'
import { useJwtTokens } from '@/composables/jwtToken'

export const login = async (email: string, password: string) => {
  const response = await authNoAuthorizationRequest.post('/login', {
    email: email,
    password: password
  })
  const data = z
    .object({
      message: z.string(),
      access: z.string(),
      refresh: z.string()
    })
    .parse(response.data)

  const { access, refresh } = useJwtTokens()
  access.value = data.access
  refresh.value = data.refresh
  return data
}

export const logout = async () => {
  const response = await authRequest.get('/logout')
  const data = z
    .object({
      message: z.string()
    })
    .parse(response.data)

  const { access, refresh } = useJwtTokens()
  access.value = null
  refresh.value = null
  return data
}

export const verifyWithEmail = async (email: string, scope: string) => {
  const response = await authNoAuthorizationRequest.get('/verify/email', {
    params: {
      email,
      scope,
      check: true
    }
  })
  return z
    .object({ message: z.string(), scope: z.string(), registered: z.boolean() })
    .parse(response.data)
}

export const register = async (password: string, email: string, verification: string) => {
  const response = await authNoAuthorizationRequest.post('/register', {
    password: password,
    email: email,
    verification: verification
  })
  const data = z
    .object({
      message: z.string(),
      access: z.string(),
      refresh: z.string()
    })
    .parse(response.data)

  const { access, refresh } = useJwtTokens()
  access.value = data.access
  refresh.value = data.refresh
  return data
}

export const changePassword = async (password: string, email: string, verification: string) => {
  const response = await authNoAuthorizationRequest.put('/register', {
    password: password,
    email: email,
    verification: verification
  })
  const data = z
    .object({
      message: z.string(),
      access: z.string(),
      refresh: z.string()
    })
    .parse(response.data)

  const { access, refresh } = useJwtTokens()
  access.value = data.access
  refresh.value = data.refresh
  return data
}

export const refresh = async () => {
  const response = await refreshRequest.post('/refresh')
  const data = z
    .object({
      message: z.string(),
      access: z.string(),
      refresh: z.string()
    })
    .parse(response.data)

  const { access, refresh } = useJwtTokens()
  access.value = data.access
  refresh.value = data.refresh
  return data
}
