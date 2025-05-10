import type { App } from 'vue'
import Scrollbar from './src/components/Scrollbar.vue'
import AdminLayout from './src/index.vue'

export {
  AdminLayout,
  Scrollbar,
}

export default AdminLayout

export function install(app: App) {
  app.component('AdminLayout', AdminLayout)
}

export * from './src/typing'
