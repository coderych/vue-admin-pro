import type { ConfigEnv, UserConfig } from 'vite'

import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import { createVitePlugins } from './build/plugins'
import { createViteProxy } from './build/proxy'

// https://vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  // eslint-disable-next-line node/prefer-global/process
  const env = loadEnv(mode, process.cwd())
  console.log('env', env)
  const { VITE_PORT, VITE_GLOB_BASE_URL, VITE_DROP_CONSOLE } = env

  return {
    base: VITE_GLOB_BASE_URL,
    plugins: createVitePlugins(env),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: '0.0.0.0',
      port: Number(VITE_PORT) || 5173,
      proxy: createViteProxy(env),
    },
    build: {
      minify: 'esbuild',
      cssCodeSplit: true,
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1024,
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia'],
            utils: ['lodash-es', 'dayjs'],
          },
          experimentalMinChunkSize: 4096,
        },
      },
    },
    esbuild: {
      drop: VITE_DROP_CONSOLE === 'true' ? ['console', 'debugger'] : undefined,
    },
  }
})
