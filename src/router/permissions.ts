import type { Router, RouteRecordRaw } from 'vue-router'
import { useAuthorization } from '@/composables/app'
import { PageEnum } from '@/enums/common'
import { useAppStore } from '@/stores'
import { isEmpty } from '@/utils/common'

export function createPermissionGuard(router: Router) {
  router.beforeEach(async (to) => {
    const token = useAuthorization()
    if (!token.value) {
      if (to.meta?.ignoreAuth === true) {
        return true
      }
      return { path: PageEnum.Login, query: { ...to.query, redirect: to.fullPath } }
    }
    if (to.path === PageEnum.Login) {
      return { path: PageEnum.Home, replace: true }
    }

    if (to.meta?.ignoreAuth === true) {
      return true
    }
    const appStore = useAppStore()

    if (isEmpty(appStore.userInfo)) {
      await appStore.profile()
      const routes: RouteRecordRaw[] = await appStore.generateRoutes()
      routes.forEach((route) => {
        if (route.name && !router.hasRoute(route.name)) {
          router.addRoute(route)
        }
      })
      return to.fullPath
    }

    return true
  })
}
