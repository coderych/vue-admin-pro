import type { Tab } from './typing'
import router from '@/router'
import { useRouteListener } from '@/router/route-listener'
import { useStorage } from '@vueuse/core'
import { useAppStore } from './app'

const tabs = useStorage<Tab[]>('__APP_TAB__', [])

export const useTabStore = defineStore('tabs', () => {
  const appStore = useAppStore()
  const data = ref<Tab[]>([])
  const activeKey = ref('')
  const activeIndex = computed(() => data.value.findIndex(item => item.key === activeKey.value))
  const activeTab = computed(() => data.value.find(item => item.key === activeKey.value))
  const currentKey = ref('')
  const currentIndex = computed(() => data.value.findIndex(item => item.key === currentKey.value))
  const loaded = ref(true)
  const canBack = ref(false)
  const canForward = ref(false)
  const route = useRoute()

  const init = () => {
    if (appStore.tabPersist) {
      data.value = tabs.value
      return
    }
    router.getRoutes()
      .filter(route => route.meta?.title && route.meta?.affix)
      .sort((a, b) => (a.meta?.sort as number || 999) - (b.meta?.sort as number || 999))
      .forEach((route) => {
        data.value.push({
          key: route.path,
          name: route.name as string,
          title: route.meta?.title as string,
          closable: false,
          keepAlive: !!route.meta?.keepAlive,
          icon: route.meta?.icon as string,
        })
      })
  }

  const addTab = (tab: Tab) => {
    const exist = data.value.find(item => item.key === tab.key)
    if (exist) {
      return
    }
    data.value.push(tab)
  }

  // 要删除的key, 关闭位置（左侧还是右侧）
  const closeTab = (key: string, position: 'left' | 'right' | 'other' | 'current' | 'all' = 'current') => {
    const index = data.value.findIndex(item => item.key === key)
    if (position === 'all') {
      data.value = data.value.filter(item => item.closable === false)
      router.push('/')
    }
    else if (position === 'current') {
      if (data.value.length === 1) {
        window.$message?.error('至少保留一个标签页')
        return
      }
      if (activeKey.value === key) {
        activeKey.value = index === 0 ? data.value[1].key : data.value[index - 1].key
        router.push(activeKey.value)
      }
      data.value.splice(index, 1)
    }
    else if (position === 'left') {
      if (activeIndex.value < index) {
        activeKey.value = key
        router.push(activeKey.value)
      }
      data.value = data.value.filter((item, i) => item.closable !== false && i >= index)
    }
    else if (position === 'right') {
      if (index < activeIndex.value) {
        activeKey.value = key
        router.push(activeKey.value)
      }
      data.value = data.value.filter((item, i) => item.closable !== false && i <= index)
    }
    else if (position === 'other') {
      if (activeKey.value !== key) {
        activeKey.value = key
        router.push(activeKey.value)
      }
      data.value = data.value.filter(item => item.key === key && item.closable !== false)
    }
  }

  const reload = async () => {
    const tab = data.value.find(item => item.key === activeKey.value)
    if (!tab) {
      return
    }
    if (tab.keepAlive) {
      tab.keepAlive = false
    }
    window.$loadingBar?.start()
    loaded.value = false
    await nextTick(() => {
      loaded.value = true
      window.$loadingBar?.finish()
      tab.keepAlive = true
    })
  }

  const resetTab = (tab: Partial<Tab>) => {
    const key = tab.key || route.fullPath

    const index = data.value.findIndex(item => item.key === key)

    if (index !== -1) {
      data.value.splice(index, 1, { ...data.value[index], ...tab })
    }
  }

  const reset = () => {
    data.value = []
    tabs.value = []
    init()
  }

  useRouteListener((to) => {
    console.log('route listener', to)
    canBack.value = !!window.history?.state?.back
    canForward.value = !!window.history?.state?.forward

    if (to.meta?.hideInTab || to.name === 'Unmatched') {
      return
    }
    addTab({
      key: to.fullPath,
      name: to.name as string,
      title: (to.meta?.title || to.name) as string,
      closable: true,
      keepAlive: !!to.meta?.keepAlive,
      icon: to.meta?.icon,
    })

    nextTick(() => {
      activeKey.value = to.fullPath
    })
  }, { immediate: true })

  watch(data, () => {
    tabs.value = data.value
  })

  init()

  return {
    data,
    activeKey,
    activeTab,
    activeIndex,
    currentKey,
    currentIndex,
    canBack,
    canForward,
    loaded,

    init,
    addTab,
    closeTab,
    reload,
    resetTab,
    reset,
  }
})
