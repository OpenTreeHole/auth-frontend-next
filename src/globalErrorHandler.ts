import { useNotification } from '@/composables/notification'
import { AxiosError } from 'axios'

export const globalErrorHandler = (err: any) => {
  const not = useNotification()
  if (err instanceof Error) {
    if (err instanceof AxiosError) {
      not.error(err.response?.data?.message ?? err.message)
    } else not.error(err.message)
  }
  console.error(err)
}
