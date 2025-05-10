import type { App } from 'vue'
import { setupPermissionDirective } from './permission'

/**
 * 注册全局指令
 * @param app Vue 实例
 */
export function setupDirectives(app: App<Element>) {
  setupPermissionDirective(app)
}
