import type { GenerateRoutesResult, Menu, Permission } from '@/stores'
import type { RouteRecordRaw } from 'vue-router'
import { usePermission } from '@/composables/permission'
import { hyphenate } from '@vueuse/core'
import { omit } from 'lodash-es'
import router from '.'
import { renderNIcon } from '../utils/render'
import { IframeComponent } from './constants'

const ROOT_PARENT_ID = '0'

export const viewModules = import.meta.glob(['@/views/**/*.vue', '!@/views/**/components/*.vue'], {
  eager: true,
  import: 'default',
})

export function resolveComponent(path?: string): any {
  if (!path) {
    return null
  }
  const component = viewModules[`/src/views/${path}.vue`]
  if (!component) {
    console.warn(`Component not found: ${path}`)
    return null
  }
  return component
}

/**
 * 生成前端路由（拉平路由、生成菜单）
 *
 * @param routes 路由列表
 * @returns 路由
 */
export function generateFrontendRoutes(routes: RouteRecordRaw[]) {
  const result: GenerateRoutesResult = {
    routes: [],
    menus: [],
  }

  const { hasRole, hasPermission } = usePermission()

  // 递归
  function loop(routes: RouteRecordRaw[], parentPath = '') {
    const menus: Menu[] = []
    for (const route of routes) {
      const { meta = {}, children = [] } = route
      const hasRoles = meta?.roles ? hasRole(meta.roles) : true
      const hasPermissions = meta?.permissions ? hasPermission(meta.permissions) : true

      if (!hasRoles || !hasPermissions) {
        continue
      }

      const originPath = route.path
      meta.originPath = originPath

      const _isExternal = isExternal(originPath)

      const path = _isExternal ? `/iframe/${hyphenate(route.name as string)}` : resolvePath(originPath, parentPath)

      // 判断是否为菜单 component || redirect || _isExternal
      if (route.component || route.redirect || _isExternal) {
        // 添加路由
        const currentRoute: RouteRecordRaw = {
          ...(omit(route, ['children']) as RouteRecordRaw),
          path,
        }
        // 外链特殊处理
        if (_isExternal) {
          currentRoute.component = IframeComponent
        }

        // 添加菜单
        result.routes.push(currentRoute)
      }
      if (meta.hideInMenu) {
        continue
      }

      // 菜单
      const currentMenu: Menu = {
        key: path,
        label: renderTitle(route),
        icon: renderIcon(meta.icon),
        sort: meta.sort || 0,
        disabled: meta.disabled,
        show: meta.show,
        meta,
      }
      if (children.length > 0) {
        currentMenu.children = loop(children, path) || []
        if (!currentMenu.children?.length) {
          // 无子菜单，删除 children
          delete currentMenu.children
        }
        else {
          // 排序
          currentMenu.children.sort((a, b) => a.sort! - b.sort!)
        }
      }
      menus.push(currentMenu)
    }
    menus.sort((a, b) => a.sort! - b.sort!)
    return menus
  }
  result.menus = loop(routes)

  return result
}

/**
 * 生成后端路由（根据权限生成路由、菜单）
 *
 * @param permissions 权限列表
 */
export function generateBackendRoutes(permissions: Permission[]) {
  permissions.sort((a, b) => (a.sort || 0) - (b.sort || 0))
  const menuMap = new Map<string, Menu>(permissions.map(item => [item.id!, {
    key: `${item.path}`,
    icon: renderIcon(item.icon),
    label: item.name,
    disabled: item.disabled === 1,
    show: true,
    sort: item.sort || 0,
    meta: { ...item },
  }]))

  const result: GenerateRoutesResult = {
    routes: [],
    menus: [],
  }

  for (const item of permissions) {
    if (!item.id) {
      continue
    }
    const { parentId = '' } = item
    const originPath = `${item.path}`
    const _isExternal = isExternal(originPath)
    const path = _isExternal ? `/iframe/${hyphenate(item.name as string)}` : resolvePath(originPath, menuMap.get(parentId)?.key)

    const currentMenu = menuMap.get(item.id) as Menu
    currentMenu.key = path

    if (item.component || item.redirect || _isExternal) {
      const currentRoute = {
        path,
        name: item.code,
        component: _isExternal ? IframeComponent : resolveComponent(item.component),
        meta: {
          ...item,
          title: item.name,
          originPath,
        },
      } as RouteRecordRaw
      result.routes.push(currentRoute)
    }
    if (!item.parentId || `${item.parentId}` === ROOT_PARENT_ID) {
      result.menus.push(currentMenu)
    }
    else {
      const parent = menuMap.get(item.parentId)
      if (parent) {
        (parent.children ??= []).push(currentMenu)
      }
    }
  }

  return result
}

/**
 * 格式化路径
 * 1. 路径以 / 开头，则认为是绝对路径，直接返回
 * 2. 路径以 http(s)://, mailto:, tel: 开头，则认为是外部链接，直接返回
 * 3. 否则，拼接父路径
 * 4. 格式化 保证是一个正确的路径
 *
 * @param path 路径
 * @param parentPath 父路径
 * @returns 格式化后的路径
 */
export function resolvePath(path: string, parentPath?: string): string {
  if (path.startsWith('/') || isExternal(path)) {
    return path
  }
  if (!parentPath) {
    path = `/${path}`
  }
  else {
    path = `${parentPath}/${path}`
  }
  // 格式化 保证是一个正确的路径
  return path.replace(/\/+/g, '/')
}

/**
 * 渲染标题（可在这处理国际化等）
 *
 * @param route 路由
 * @returns 路由标题
 */
export function renderTitle(route: RouteRecordRaw) {
  const { title } = route.meta || {}
  if (!title) {
    return ''
  }
  return title
}

/**
 * 渲染图标
 *
 * @param icon 图标
 * @returns 渲染后的图标
 */
export function renderIcon(icon?: string) {
  if (!icon) {
    return
  }
  return renderNIcon(icon)
}

/**
 * 判断是否为外部链接
 *
 * @param path 路径
 * @returns 是否为外部链接
 */
export function isExternal(path: string) {
  return /^(?:https?:|mailto:|tel:)/.test(path)
}

export function onUpdateMenuValue(value: string, option: any) {
  const originPath = option?.meta?.path as any
  // 判断是否为外链
  if (isExternal(originPath)) {
    window.$dialog?.info({
      type: 'info',
      title: `请选择打开方式`,
      positiveText: '外链打开',
      negativeText: '在本站内嵌打开',
      onPositiveClick: () => {
        window.open(originPath)
      },
      onNegativeClick: () => {
        router.push(value)
      },
    })
    return
  }
  router.push(value)
}
