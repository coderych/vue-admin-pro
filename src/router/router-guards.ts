import type { Router } from 'vue-router'
import { unmountAppLoading, useAppEnv } from '@/composables/app'
import { createRouteListener } from './route-listener'

// 全局配置
const { VITE_GLOB_APP_TITLE } = useAppEnv()

export function createRouterGuards(router: Router) {
  /**
   * 路由前置守卫
   */
  router.beforeEach((to) => {
    // 路由监听
    createRouteListener(to)
    // 显示 loading 条
    window.$loadingBar?.start()
    return true
  })

  /**
   * 路由后置守卫
   */
  router.afterEach(async (to) => {
    // 页面标题
    const title = to.meta?.title as string
    if (title) {
      document.title = `${title} - ${VITE_GLOB_APP_TITLE}`
    }
    else {
      document.title = VITE_GLOB_APP_TITLE
    }

    // 隐藏 loading 条
    nextTick(() => {
      window.$loadingBar?.finish()
      unmountAppLoading()
    }).then()
  })

  /**
   * 路由全局错误处理
   */
  router.onError(() => {
    // 隐藏 loading 条
    window.$loadingBar?.error()
  })
}
