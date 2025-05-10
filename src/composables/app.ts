import { LocaleEnum } from '@/enums/common'
import { createGlobalState, useBreakpoints, useStorage } from '@vueuse/core'
import mitt from 'mitt'

/**
 * 环境变量
 */
const env = import.meta.env as ImportMetaEnv

/**
 * 全局环境变量
 */
const globalEnv = env.DEV ? env : window.__PRODUCTION__UNPLUGIN__CONFIG__CONF__

/**
 * 应用配置
 */
let appEnv: ImportMetaEnv | undefined

/**
 * 获取应用配置
 * @returns {ImportMetaEnv} 应用配置
 */
export function useAppEnv(): ImportMetaEnv {
  if (appEnv) {
    return appEnv
  }
  appEnv = env.DEV ? env : { ...env, ...globalEnv } as ImportMetaEnv
  return appEnv
}

/**
 * 全局事件管理器
 */
const emitter = mitt()

/**
 * 全局事件管理器
 */
export function useEmitter() {
  return emitter
}

/**
 * Token 持久化存储的 key
 */
export const AUTHORIZATION_KEY = '__APP_AUTHORIZATION__'

/**
 * Token 名称
 */
export const TOKEN_NAME = 'Authorization'

/**
 * Token 持久化存储
 */
export const useAuthorization = createGlobalState(() => useStorage<string | null>(AUTHORIZATION_KEY, null))

/**
 * 断点
 */
export const breakpointsEnum = {
  xl: 1600,
  lg: 1199,
  md: 991,
  sm: 767,
  xs: 575,
}

/**
 * 断点
 * @returns {object} 断点
 */
export function useQueryBreakpoints() {
  const breakpoints = reactive(useBreakpoints(breakpointsEnum))

  // 手机端
  const isMobile = breakpoints.smaller('sm')
  // pad端
  const isPad = breakpoints.between('sm', 'md')
  // pc端
  const isDesktop = breakpoints.greater('md')

  return {
    breakpoints,
    isMobile,
    isPad,
    isDesktop,
  }
}

/**
 * 卸载应用加载动画
 */
export function unmountAppLoading() {
  const el: HTMLElement | null = document.querySelector('body > #__app-loading__')
  if (el) {
    el.classList.add('hide')
    setTimeout(() => {
      el.remove()
    }, 500)
  }
}

/**
 * 应用语言存储的 key
 */
export const LOCALE_KEY = '__APP_LOCALE__'

/**
 * 应用语言
 */
export const useAppLocale = createGlobalState(() => useStorage<LocaleEnum>(LOCALE_KEY, LocaleEnum.Default))
