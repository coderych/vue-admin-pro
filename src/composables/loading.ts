const loadingCountMap = new Map<string, number>()

export function useLoading() {
  const loadingMap: Map<string, boolean> = reactive(new Map<string, boolean>())
  const isLoading = computed(() => (key: string) => loadingMap.get(key) || false)

  function start(key: string) {
    loadingCountMap.set(key, (loadingCountMap.get(key) || 0) + 1)
    loadingMap.set(key, true)
  }

  function end(key: string) {
    loadingCountMap.set(key, (loadingCountMap.get(key) || 1) - 1)
    if (loadingCountMap.get(key) === 0) {
      loadingMap.set(key, false)
    }
  }

  return {
    loadingMap,
    isLoading,
    loadingCountMap,
    start,
    end,
  }
}
