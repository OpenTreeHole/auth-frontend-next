import { useLoadingStore } from '@/stores/loading'
import { computed } from 'vue'

export const useLoading = () => {
  const loadingStore = useLoadingStore()
  const loading = computed(() => loadingStore.loadingSemaphore > 0)
  const acquireLoading = () => loadingStore.loadingSemaphore++
  const releaseLoading = () => loadingStore.loadingSemaphore--
  const load = async <T>(promise: Promise<T>): Promise<T> => {
    acquireLoading()
    try {
      return await promise
    } finally {
      releaseLoading()
    }
  }
  return { loading, load, acquireLoading, releaseLoading }
}
