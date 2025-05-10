import type { App } from 'vue'
import { createPinia } from 'pinia'

/**
 * 创建 Pinia 实例
 */
const pinia = createPinia()

/**
 * 注册 Pinia
 * @param app Vue 实例
 */
export function setupStore(app: App<Element>) {
  app.use(pinia)
}

export * from './app'
export * from './tab'

export * from './typing'
