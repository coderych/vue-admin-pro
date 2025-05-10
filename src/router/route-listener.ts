import type { Handler } from 'mitt'
import type { RouteLocationNormalized } from 'vue-router'
import { useEmitter } from '@/composables/app'

const emitter = useEmitter()

export interface RouteListenerOptions {
  immediate?: boolean
}

const key = Symbol('__ROUTE_LISTENER__')
let route: RouteLocationNormalized

/**
 * 监听路由变化
 * @param to 路由对象
 */
export function createRouteListener(to: RouteLocationNormalized) {
  emitter.emit(key, to)
  route = to
}

/**
 * 使用路由变化监听
 * @param handler 路由变化时的回调函数
 * @param options 配置项
 */
export function useRouteListener(handler: (to: RouteLocationNormalized) => void, options: RouteListenerOptions = {}) {
  emitter.on(key, handler as Handler)
  const { immediate = false } = options
  if (immediate && route) {
    handler(route)
  }
}

/**
 * 移除路由变化监听
 */
export function removeRouteListener() {
  emitter.off(key)
}
