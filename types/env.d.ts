/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

interface ImportMetaEnv {
  VITE_GLOB_BASE_URL: string
  VITE_GLOB_APP_TITLE: string
  VITE_GLOB_ROUTER_MODE: 'hash' | 'history'
  VITE_GLOB_FILE_ENDPOINT: string
  VITE_PORT: string
  VITE_ROUTE_LOAD_MODE: 'backend' | 'frontend'
  VITE_PROXY: string
  VITE_DROP_CONSOLE: 'true' | 'false'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
