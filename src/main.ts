import { setupNaiveDiscreteApi } from '@/composables/naive-api.ts'

import { createApp } from 'vue'
import App from './App.vue'

import { setupDirectives } from './directives'
import { setupI18n } from './locales'

import router, { setupRouter } from './router'
import { setupStore } from './stores'
import './assets/styles/main.css'
import 'virtual:uno.css'
import 'vfonts/FiraCode.css'

async function setupApp() {
  // 创建 Vue 实例
  const app = createApp(App)

  // 注册 Store
  setupStore(app)

  // 注册 Naive UI 脱离上下文的API
  setupNaiveDiscreteApi()

  // 注册 Router
  setupRouter(app)

  // 注册 I18n
  setupI18n(app)

  // 注册全局指令
  setupDirectives(app)

  // 等待路由准备就绪
  await router.isReady()

  // 挂载 APP
  app.mount('#app')
}

setupApp().then(() => console.log('App is ready!!!'))
