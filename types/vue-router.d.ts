import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    // Layout
    layout?: 'basic' | 'empty'

    // 菜单标题
    title?: string

    // 菜单图标
    icon?: string

    // 当前路由激活的菜单项的key
    activeMenu?: string

    // 固钉
    affix?: boolean

    // 是否缓存组件
    keepAlive?: boolean

    // 显示
    hideInMenu?: boolean
    hideInBreadcrumb?: boolean
    hideInTab?: boolean

    // 排序
    sort?: number

    // 路由动画名称
    transitionName?: string

    // 权限相关
    roles?: string[]
    permissions?: string[]

    // 原始路径
    originPath?: string

    // 是否禁用菜单
    disabled?: boolean

    // 是否显示菜单
    show?: boolean
  }
}
