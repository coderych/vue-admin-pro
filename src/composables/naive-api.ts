import type { useDialog, useLoadingBar, useMessage, useModal, useNotification } from 'naive-ui'
import type { DialogOptions } from 'naive-ui/es/dialog/src/DialogProvider'
import { useAppStore } from '@/stores/app'
import { merge } from 'lodash-es'
import { createDiscreteApi } from 'naive-ui'

/**
 * Naive UI Discrete API
 */
export interface NaiveApi {
  message: ReturnType<typeof useMessage>
  loadingBar: ReturnType<typeof useLoadingBar>
  dialog: ReturnType<typeof useDialog>
  notification: ReturnType<typeof useNotification>
  modal: ReturnType<typeof useModal>
}

export interface DialogApi {
  destroyAll: () => void
  create: (options?: DialogOptions) => Promise<() => void>
  success: (options?: DialogOptions) => Promise<() => void>
  warning: (options?: DialogOptions) => Promise<() => void>
  error: (options?: DialogOptions) => Promise<() => void>
  info: (options?: DialogOptions) => Promise<() => void>
}

/**
 * Naive UI API
 */
const naiveApi: Partial<NaiveApi> = {}

const Dialog: DialogApi = {} as any

/**
 * Naive UI API 组合式函数
 */
export function useNaiveApi() {
  return naiveApi
}

export function useDialogApi() {
  return Dialog
}

/**
 * 创建 Naive UI 脱离上下文的 API
 */
export function setupNaiveDiscreteApi() {
  const appStore = useAppStore()
  const {
    message,
    loadingBar,
    dialog,
    notification,
    modal,
  } = createDiscreteApi(['message', 'loadingBar', 'dialog', 'notification', 'modal'], {
    configProviderProps: {
      theme: appStore.theme,
      themeOverrides: appStore.themeOverrides,
    },
  })

  window.$message = message
  window.$loadingBar = loadingBar
  window.$dialog = dialog
  window.$notification = notification
  window.$modal = modal

  merge(naiveApi, { message, loadingBar, dialog, notification, modal })

  for (const key in dialog) {
    if (key === 'destroyAll') {
      Dialog.destroyAll = dialog.destroyAll
      continue
    }
    Dialog[key as keyof typeof Dialog] = async (options?: DialogOptions) => {
      return new Promise<() => void>((resolve, reject) => {
        const d = dialog[key as keyof typeof dialog]({
          title: '提示',
          content: '确定要执行该操作吗？',
          positiveText: '确定',
          negativeText: '取消',
          onPositiveClick: async () => {
            d!.loading = true
            return new Promise((hide) => {
              resolve(hide as any)
            })
          },
          onNegativeClick: () => {
            reject(new Error('用户点击取消'))
          },
          ...options,
        })
      })
    }
  }
  window.$Dialog = Dialog
}
