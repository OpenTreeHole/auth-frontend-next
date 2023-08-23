import { authNoAuthorizationRequest, authRequest, refreshRequest } from './request'
import { useCookies } from '@vueuse/integrations/useCookies'
import { cookieDomain } from '@/config'

export const login = async (
  email: string,
  password: string
): Promise<{ message: string; access?: string; refresh?: string }> => {
  const response = await authNoAuthorizationRequest.post<{
    message: string
    access?: string
    refresh?: string
  }>('/login', {
    email: email,
    password: password
  })
  const cookies = useCookies(['access', 'refresh'])
  const expireDate = new Date()
  expireDate.setDate(expireDate.getDate() + 10)
  cookies.set('access', response.data.access, {
    domain: cookieDomain,
    expires: expireDate,
    path: '/'
  })
  cookies.set('refresh', response.data.refresh, {
    domain: cookieDomain,
    expires: expireDate,
    path: '/'
  })
  return response.data
}

export const logout = async (): Promise<{ message: string }> => {
  const response = await authRequest.get<{ message: string }>('/logout')

  const cookies = useCookies(['access', 'refresh'])
  cookies.remove('access', { domain: cookieDomain })
  cookies.remove('refresh', { domain: cookieDomain })
  return response.data
}

export const verifyWithEmail = async (
  email: string,
  scope: string
): Promise<{ message: string; scope: string }> => {
  const response = await authNoAuthorizationRequest.get<{ message: string; scope: string }>(
    '/verify/email',
    {
      params: {
        email,
        scope
      }
    }
  )
  return response.data
}

export const register = async (
  password: string,
  email: string,
  verification: string
): Promise<{ message: string; access?: string; refresh?: string }> => {
  const response = await authNoAuthorizationRequest.post<{
    message: string
    access?: string
    refresh?: string
  }>('/register', {
    password: password,
    email: email,
    verification: verification
  })
  const cookies = useCookies(['access', 'refresh'])
  const expireDate = new Date()
  expireDate.setDate(expireDate.getDate() + 10)
  cookies.set('access', response.data.access, {
    domain: cookieDomain,
    expires: expireDate,
    path: '/'
  })
  cookies.set('refresh', response.data.refresh, {
    domain: cookieDomain,
    expires: expireDate,
    path: '/'
  })
  return response.data
}

export const changePassword = async (
  password: string,
  email: string,
  verification: string
): Promise<{ message: string; access?: string; refresh?: string }> => {
  const response = await authNoAuthorizationRequest.put<{
    message: string
    access?: string
    refresh?: string
  }>('/register', {
    password: password,
    email: email,
    verification: verification
  })
  const cookies = useCookies(['access', 'refresh'])
  const expireDate = new Date()
  expireDate.setDate(expireDate.getDate() + 10)
  cookies.set('access', response.data.access, {
    domain: cookieDomain,
    expires: expireDate,
    path: '/'
  })
  cookies.set('refresh', response.data.refresh, {
    domain: cookieDomain,
    expires: expireDate,
    path: '/'
  })
  return response.data
}

export const refresh = async (): Promise<{ message: string; access: string; refresh: string }> => {
  const response = await refreshRequest.post<{ message: string; access: string; refresh: string }>(
    '/refresh'
  )
  const cookies = useCookies(['access', 'refresh'])
  const expireDate = new Date()
  expireDate.setDate(expireDate.getDate() + 10)
  cookies.set('access', response.data.access, {
    domain: cookieDomain,
    expires: expireDate,
    path: '/'
  })
  cookies.set('refresh', response.data.refresh, {
    domain: cookieDomain,
    expires: expireDate,
    path: '/'
  })
  return response.data
}
