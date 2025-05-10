import type { RouteRecordRaw } from 'vue-router'

const dynamicRoutes: RouteRecordRaw[] = [
]

const staticRoutes: RouteRecordRaw[] = [
]

/**
 * 路由模块
 */
const routeModules = import.meta.glob(['@/router/modules/*.ts', '@/views/**/route.ts'], { eager: true, import: 'default' })
Object.keys(routeModules).forEach((key) => {
  const mod = routeModules[key]
  const routeArr: RouteRecordRaw[] = Array.isArray(mod) ? mod : [mod]
  dynamicRoutes.push(...routeArr)
})

export default dynamicRoutes
export {
  staticRoutes,
}
