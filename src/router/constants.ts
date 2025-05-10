import type { RouteRecordRaw } from 'vue-router'
import { PageEnum } from '@/enums/common'

/**
 * Iframe组件
 */
export const IframeComponent = () => import('@/layouts/components/Iframe.vue')

/**
 * 根路由
 * 重定向到 dashboard 页面
 */
export const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.Home,
}

/**
 * 登录路由
 */
export const LoginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: '登录',
    layout: 'empty',
    hideInTab: true,
    ignoreAuth: true,
  },
}

/**
 * 404路由
 */
export const NotFoundRoute: RouteRecordRaw = {
  path: '/404',
  name: 'NotFound',
  component: () => import('@/layouts/pages/404.vue'),
  meta: {
    title: '页面未找到',
    layout: 'basic',
    hideInTab: true,
  },
}

/**
 * 403路由
 */
export const ForbiddenRoute: RouteRecordRaw = {
  path: '/403',
  name: 'Forbidden',
  component: () => import('@/layouts/pages/403.vue'),
  meta: {
    title: '权限不足',
    layout: 'basic',
    hideInTab: true,
  },
}

/**
 * 未匹配到路由
 */
export const UnmatchedRoute: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'Unmatched',
  component: NotFoundRoute.component,
  meta: {
    title: '页面未找到',
    hideInTab: true,
  },
}

export const constantRoutes: RouteRecordRaw[] = [
  RootRoute,
  LoginRoute,
  NotFoundRoute,
  ForbiddenRoute,
  UnmatchedRoute,
]
