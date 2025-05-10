import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import ConfigPlugin from 'unplugin-config/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import VueDevTools from 'vite-plugin-vue-devtools'

export function createVitePlugins(_env: Record<string, any>) {
  return [
    Vue(),
    VueJsx(),
    VueDevTools(),
    Unocss(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'types/auto-imports.d.ts',
    }),
    Components({
      resolvers: [NaiveUiResolver()],
      dts: 'types/components.d.ts',
    }),
    ConfigPlugin({
      configFile: {
        generate: true,
        fileName: '_app.config.js',
        outputDir: 'dist',
      },
      envVariables: {
        prefix: 'VITE_GLOB_',
      },
    }),
  ]
}
