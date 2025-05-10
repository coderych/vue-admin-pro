import type { SelectOption } from 'naive-ui'
import type { VNodeChild } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

export interface UserInfo {
  id?: string
  username?: string
  name?: string
  avatar?: string
  email?: string
  phone?: string
  roles?: string[]
  permissions?: string[]
  routes?: Permission[]
  dict?: DictOption[]
}

export interface LoginForm {
  username: string
  password: string
  uuid: string
  captcha: string
}

export type LayoutType = 'side' | 'top' | 'mix'
export type TabStyle = 'bar' | 'card' | 'button'
export type DarkMode = 'auto' | 'light' | 'dark'

export interface AppSetting {
  mode: LayoutType
  dark: DarkMode
  collapsed: boolean
  round: number
  colorWeak: boolean
  colorGray: boolean
  header: boolean
  headerFixed: boolean
  headerHeight: number
  headerTheme: string
  sider: boolean
  siderWidth: number
  siderCollapsedWidth: number
  siderFixed: boolean
  siderTheme: string
  accordion: boolean
  prefix: boolean
  prefixHeight: number
  prefixFixed: boolean
  suffix: boolean
  suffixHeight: number
  suffixFixed: boolean
  primaryColor: string
  infoColor: string
  successColor: string
  warningColor: string
  errorColor: string
  logo: boolean
  breadcrumb: boolean
  breadcrumbIcon: boolean
  splitMenu: boolean
  watermark: boolean
  watermarkContent: string
  transitionName: string
  tabPersist: boolean
  setting: boolean
  tabStyle: TabStyle
  tabIcon: boolean
}

export interface Permission {
  id?: string
  name?: string
  code: string
  type?: number
  parentId?: string
  path?: string
  component?: string
  layout?: LayoutType
  redirect?: string
  icon?: string
  sort?: number
  hideInMenu?: number
  hideInBreadcrumb?: number
  hideInTab?: number
  keepAlive?: number
  status?: number
  disabled?: number
}

export interface Menu {
  key: string
  label?: string | (() => VNodeChild)
  icon?: () => VNodeChild
  disabled?: boolean
  show?: boolean
  sort?: number
  children?: Menu[]
  meta?: Record<string, any>
  [key: string]: any
}

export interface GenerateRoutesResult {
  routes: RouteRecordRaw[]
  menus: Menu[]
}

export interface Tab {
  key: string
  name?: string
  title?: string
  closable?: boolean
  keepAlive?: boolean
  icon?: string
}

export type ValueType = string | number | boolean

export interface DictOption extends SelectOption {
  label: string
  value: string
  dataType: string
  type: string
  extra: string
}
