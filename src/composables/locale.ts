import type { LocaleEnum } from '@/enums/common'
import type { NDateLocale, NLocale } from 'naive-ui'
import i18n, { loadLocaleAsync, setLocale } from '@/locales'
import { createSharedComposable } from '@vueuse/core'
import { useAppLocale } from './app'

export const useLocale = createSharedComposable(() => {
  // 当前语言
  const locale = useAppLocale()
  // 加载状态
  const loading = ref(false)

  // ui 框架的语言包
  const ui = computed<{ locale: NLocale, dateLocale: NDateLocale }>(() => {
    const messages = i18n?.global?.getLocaleMessage(unref(locale)) as any
    return {
      locale: messages?.ui?.locale,
      dateLocale: messages?.ui?.dateLocale,
    }
  })

  // 切换语言
  const toggle = async (lang: LocaleEnum = locale.value) => {
    if (!i18n) {
      return
    }
    if (loading.value) {
      return
    }
    loading.value = true
    try {
      locale.value = lang
      await loadLocaleAsync(lang)
      setLocale(lang)
    }
    finally {
      loading.value = false
    }
  }

  // 翻译
  const t = (key: string, defaultValue?: string) => {
    const message = i18n?.global?.t?.(key)
    if (message !== key) {
      return message
    }
    return defaultValue ?? key
  }

  return {
    loading,
    locale,
    ui,
    t,
    toggle,
  }
})
