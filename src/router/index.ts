import type { App } from 'vue'
import { useAppEnv } from '@/composables/app'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { constantRoutes } from './constants'
import { createPermissionGuard } from './permissions'
import { createRouterGuards } from './router-guards'
import { staticRoutes } from './routes'

// 获取环境变量
const { VITE_GLOB_ROUTER_MODE, VITE_GLOB_BASE_URL } = useAppEnv()

/**
 * 路由模式
 */
const history = VITE_GLOB_ROUTER_MODE === 'hash' ? createWebHashHistory(VITE_GLOB_BASE_URL) : createWebHistory(VITE_GLOB_BASE_URL)

/**
 * 创建 Vue Router 实例
 */
const router = createRouter({
  history,
  routes: [
    ...staticRoutes,
    ...constantRoutes,
  ],
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

/**
 * 注册路由
 * @param app Vue 实例
 */
export function setupRouter(app: App<Element>) {
  // 路由守卫
  createRouterGuards(router)
  // 权限
  createPermissionGuard(router)
  // 挂载路由实例
  app.use(router)
}

export default router
