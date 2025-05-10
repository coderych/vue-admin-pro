import { useAppStore } from '@/stores'

export function usePermission() {
  const appStore = useAppStore()
  const roles = computed(() => appStore.userInfo?.roles || [])
  const permissions = computed(() => appStore.userInfo?.permissions || [])
  const hasAdvancedPermission = computed(() => roles.value.includes('admin'))

  const hasRole = (values: string | string[], isOr = true) => {
    if (hasAdvancedPermission.value) {
      return true
    }
    const roleList = Array.isArray(values) ? values : [values]
    if (isOr) {
      return roleList.some(role => roles.value.includes(role))
    }
    return roleList.every(role => roles.value.includes(role))
  }

  const hasPermission = (values: string | string[], isOr = true) => {
    if (hasAdvancedPermission.value) {
      return true
    }
    const permissionList = Array.isArray(values) ? values : [values]
    if (isOr) {
      return permissionList.some(permission => permissions.value.includes(permission))
    }
    return permissionList.every(permission => permissions.value.includes(permission))
  }

  return {
    roles,
    permissions,
    hasAdvancedPermission,
    hasRole,
    hasPermission,
  }
}
