import type { App } from 'vue'
import { useLocale } from '@/composables/locale'
import { LocaleEnum } from '@/enums/common'
import dayjs from '@/utils/date'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  legacy: false,
  locale: LocaleEnum.Default,
  fallbackLocale: LocaleEnum.Default,
  sync: true,
  silentFallbackWarn: false,
  missingWarn: false,
  silentTranslationWarn: false,
  messages: {
  },
})

/**
 * 注册 i18n 实例
 * @param app Vue 实例
 */
export function setupI18n(app: App<Element>) {
  // 加载语言文件
  const { toggle } = useLocale()
  toggle()
  app.use(i18n)
}

export function setLocale(locale: LocaleEnum) {
  i18n.global.locale.value = locale
  document.querySelector('html')?.setAttribute('lang', locale)
  dayjs.locale(locale)
}

// 缓存判断是否已经加载过语言文件
const loadedLocales = new Set<LocaleEnum>()

/**
 * 加载语言文件
 * @param locale 语言
 * @returns Promise
 */
export async function loadLocaleAsync(locale: LocaleEnum) {
  try {
    if (loadedLocales.has(locale)) {
      return nextTick()
    }
    loadedLocales.add(locale)
    let messages
    try {
      messages = await import(`./lang/${locale}.ts`)
    }
    catch (e) {
      console.log('load locale error', e)
      messages = await import(`./lang/${LocaleEnum.Default}.ts`)
    }
    if (messages) {
      i18n.global.setLocaleMessage(locale, messages.default)
    }
  }
  catch (e) {
    console.warn('load locale error', e)
  }
  return nextTick()
}

export default i18n
