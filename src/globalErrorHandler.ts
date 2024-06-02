import { useNotification } from '@/composables/notification'
import { AxiosError } from 'axios'
import { ZodError } from 'zod'

export const globalErrorHandler = (err: any) => {
  const not = useNotification()
  if (err instanceof Error) {
    if (err instanceof AxiosError) {
      not.error(err.response?.data?.message ?? err.message)
    } else if (err instanceof ZodError) {
      not.error(err.issues[0].message)
    } else not.error(err.message)
  }
  console.error(err)
}
