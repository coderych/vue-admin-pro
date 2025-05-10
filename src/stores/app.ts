import type { LocaleEnum } from '@/enums/common'
import type { GlobalTheme, GlobalThemeOverrides, NDateLocale, NLocale } from 'naive-ui'
import type { RouteRecordRaw } from 'vue-router'
import type { AppSetting, GenerateRoutesResult, LoginForm, Menu, UserInfo } from './typing'
import { CommonApi } from '@/api/common'
import { useAppEnv, useAuthorization } from '@/composables/app'
import { useLocale } from '@/composables/locale'
import { PageEnum } from '@/enums/common'
import router from '@/router'
import { generateBackendRoutes, generateFrontendRoutes } from '@/router/generate-routes'
import dynamicRoutes from '@/router/routes'
import { defaultAppSetting, useAppSetting } from '@/settings/app-setting'
import { darkThemeOverrides, themeOverrides as naiveUiThemeOverrides } from '@/settings/naive-ui-theme-overrides'
import { generateNaiveThemeColors } from '@/utils/color'
import { toReactive, useClipboard, useDark } from '@vueuse/core'
import { merge } from 'lodash-es'
import { darkTheme, dateZhCN, useOsTheme, zhCN } from 'naive-ui'
import { defineStore } from 'pinia'
import { useTabStore } from './tab'

export const useAppStore = defineStore('app', () => {
  const isDark = useDark()
  const osTheme = useOsTheme()
  const { VITE_ROUTE_LOAD_MODE } = useAppEnv()
  const token = useAuthorization()
  const appSetting = useAppSetting()
  const { ui, toggle } = useLocale()
  const { copy: handleCopy, copied } = useClipboard({ legacy: true })

  // 用户信息
  const userInfo = shallowRef<UserInfo | null>(null)
  // 应用设置
  const app: AppSetting = toReactive(appSetting)
  // 路由配置
  const routeOptions = shallowRef<RouteRecordRaw[]>([])
  // 菜单配置
  const menuOptions = shallowRef<Menu[]>([])
  const loadingCount = ref<number>(0)
  const loading = computed(() => loadingCount.value > 0)
  const loaded = ref<boolean>(true)
  const isFull = ref<boolean>(false)

  // 主题
  const theme = computed<GlobalTheme | null>(() => {
    if (app.dark === 'auto') {
      return osTheme.value === 'dark' ? darkTheme : null
    }
    return app.dark === 'dark' ? darkTheme : null
  })
  // 主题变量
  const themeOverrides = computed<GlobalThemeOverrides>(() => {
    const colors = {
      ...generateNaiveThemeColors('primary', app.primaryColor),
      ...generateNaiveThemeColors('success', app.successColor),
      ...generateNaiveThemeColors('info', app.infoColor),
      ...generateNaiveThemeColors('warning', app.warningColor),
      ...generateNaiveThemeColors('error', app.errorColor),
    }

    const overrides: GlobalThemeOverrides = {
      ...naiveUiThemeOverrides,
      common: {
        ...naiveUiThemeOverrides.common,
        ...colors,
        borderRadius: `${app.round}px`,
        borderRadiusSmall: `${app.round * 0.8}px`,
      },
    }
    if (isDark.value) {
      merge(overrides, darkThemeOverrides)
    }

    return overrides
  })

  // 语言
  const locale = computed<NLocale>(() => ui.value?.locale || zhCN)

  // 时间语言
  const dateLocale = computed<NDateLocale>(() => ui.value?.dateLocale || dateZhCN)

  // 登录
  const login = async (form: LoginForm) => {
    const { success, data } = await CommonApi.login(form)
    if (!success || !data.token) {
      return
    }
    token.value = data.token
    window.$notification?.success({
      title: '登录成功',
      content: '欢迎回来',
      duration: 3000,
    })
    setTimeout(() => {
      const redirect = (router.currentRoute?.value?.query?.redirect || PageEnum.Home) as string
      router.push(redirect)
      useTabStore().reset()
    }, 1000)
  }

  // 登出
  const logout = async () => {
    try {
      const hide = await window.$Dialog.info({ content: '您确定要退出系统吗？' })
      const { success } = await CommonApi.logout()
      if (success) {
        token.value = null
        userInfo.value = null
        window.$notification?.success({
          title: '再见',
          content: '再见，即将跳转到登录页面',
          duration: 3000,
        })

        setTimeout(() => {
          router.push(PageEnum.Login)
          hide()
        }, 1000)
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  // 个人信息
  const profile = async () => {
    const { data } = await CommonApi.profile()
    userInfo.value = { ...data }
    return userInfo.value
  }

  // 生成路由 - 前端
  const getFrontendRoutes = async () => {
    return generateFrontendRoutes([...dynamicRoutes])
  }

  // 生成路由 - 后端
  const getBackendRoutes = async () => {
    return generateBackendRoutes([...userInfo.value?.routes || []])
  }

  // 路由生成函数映射
  const generateRoutesFuncMap: Record<string, () => Promise<GenerateRoutesResult>> = {
    frontend: getFrontendRoutes,
    backend: getBackendRoutes,
  }

  // 生成路由
  const generateRoutes = async () => {
    console.time('generateRoutes')
    const loadMode = VITE_ROUTE_LOAD_MODE.split(',')
    const result = await Promise.all(loadMode.map(async (mode: string) => {
      const func = generateRoutesFuncMap[mode as keyof typeof generateRoutesFuncMap]
      if (func) {
        return await func()
      }
      return { routes: [], menus: [] }
    }))

    routeOptions.value = result.reduce((acc: RouteRecordRaw[], cur) => acc.concat(cur.routes), [])
    menuOptions.value = result.reduce((acc: Menu[], cur) => acc.concat(cur.menus), [])

    // 排序
    menuOptions.value.sort((a, b) => (a.sort || 999) - (b.sort || 999))

    console.log('routeOptions', routeOptions.value, 'menuOptions', menuOptions.value)
    console.timeEnd('generateRoutes')

    return routeOptions.value
  }

  // 重置应用设置
  const reset = () => {
    Object.assign(app, defaultAppSetting)
  }

  // 复制应用设置
  const copy = async () => {
    try {
      await handleCopy(JSON.stringify(app, null, 2))
      if (copied.value) {
        window.$message?.success('复制成功')
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  // 重新加载
  const reload = async () => {
    window.$loadingBar?.start()
    loaded.value = false
    await nextTick(() => {
      loaded.value = true
      window.$loadingBar?.finish()
    })
  }

  // 切换主题
  const toggleTheme = () => {
    app.dark = theme.value === darkTheme ? 'light' : 'dark'
  }

  // 切换多语言
  const toggleLocale = (locale: LocaleEnum) => {
    toggle(locale)
  }

  // 监听主题变化
  watch(theme, (value) => {
    isDark.value = value === darkTheme
  }, { immediate: true })

  // 灰色模式
  watch(() => app.colorGray, () => {
    document.body.classList.toggle('color-gray', app.colorGray)
  }, { immediate: true })

  // 弱色模式
  watch(() => app.colorWeak, () => {
    document.body.classList.toggle('color-weak', app.colorWeak)
  }, { immediate: true })

  return {
    app,
    ...toRefs(app),
    userInfo,
    routeOptions,
    menuOptions,
    loading,
    loadingCount,
    isFull,

    isDark,

    theme,
    themeOverrides,
    locale,
    dateLocale,

    login,
    logout,
    profile,
    generateRoutes,
    reset,
    copy,
    toggleTheme,
    reload,
    toggleLocale,
  }
})
