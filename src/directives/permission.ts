import type { App, Directive } from 'vue'
import { usePermission } from '@/composables/permission'

/**
 * 权限指令
 * @param el 元素
 * @param binding 指令绑定
 */
export const permissionDirective: Directive = (el, binding) => {
  const { hasPermission } = usePermission()
  if (!hasPermission(binding.value))
    el.parentNode?.removeChild(el)
}

/**
 * 注册权限指令
 * @param app 应用实例
 */
export function setupPermissionDirective(app: App<Element>) {
  app.directive('permission', permissionDirective)
}
