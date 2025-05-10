declare interface Window {
  $loadingBar: import('naive-ui').LoadingBarProviderInst
  $notification: import('naive-ui').NotificationProviderInst
  $dialog: import('naive-ui').DialogProviderInst
  $modal: import('naive-ui').ModalProviderInst
  $message: import('naive-ui').MessageProviderInst
  $Dialog: import('@/composables/naive-api').DialogApi
  __PRODUCTION__UNPLUGIN__CONFIG__CONF__: any
}
