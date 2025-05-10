import type { ProxyOptions } from 'vite'

export function createViteProxy(env: Record<string, any>): Record<string, string | ProxyOptions> {
  return {
    [env.VITE_GLOB_API_BASE_URL]: {
      target: env.VITE_API_URL,
      changeOrigin: true,
      rewrite: path => path.replace(new RegExp(`^${env.VITE_GLOB_API_BASE_URL}`), ''),
    },
  }
}
