import type { AppSetting } from '@/stores'
import { useStorage } from '@vueuse/core'

export const APP_SETTING_KEY = '__APP_SETTING__'

export const defaultAppSetting: AppSetting = {
  mode: 'side',
  dark: 'light',
  collapsed: true,
  bordered: true,
  round: 3,
  colorWeak: false,
  colorGray: false,
  header: true,
  headerFixed: true,
  headerHeight: 48,
  headerTheme: '#FFFFFF',
  sider: true,
  siderWidth: 240,
  siderCollapsedWidth: 48,
  siderFixed: false,
  siderTheme: '#FFFFFF',
  accordion: true,
  prefix: true,
  prefixHeight: 36,
  prefixFixed: true,
  suffix: true,
  suffixHeight: 32,
  suffixFixed: false,
  primaryColor: '#686EFC',
  infoColor: '#686EFC',
  successColor: '#54C327',
  warningColor: '#F8AD2B',
  errorColor: '#F32435',
  logo: true,
  breadcrumb: true,
  breadcrumbIcon: true,
  splitMenu: true,
  watermark: false,
  watermarkContent: 'Vue Admin Pro',
  transitionName: 'zoom-out',
  tabPersist: true,
  setting: false,
  tabStyle: 'button',
  tabIcon: true,
}

export const useAppSetting = () => useStorage(APP_SETTING_KEY, defaultAppSetting)
