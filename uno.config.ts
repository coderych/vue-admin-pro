import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import { defineConfig, presetIcons, presetWind3 } from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      primary: 'var(--primary-color)',
      success: 'var(--success-color)',
      info: 'var(--info-color)',
      warning: 'var(--warning-color)',
      error: 'var(--error-color)',
    },
  },
  shortcuts: [
    ['f-c-c', 'flex justify-center items-center'],
    ['wh-full', 'w-full h-full'],
    ['text-ellipsis', 'truncate'],
    ['flex-col', 'flex flex-col'],
    ['auto-bg', 'bg-white dark:bg-dark'],
  ],
  presets: [
    presetWind3(),
    presetIcons({
      warn: true,
      prefix: 'i-',
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
      collections: {
        svg: FileSystemIconLoader('src/assets/icons/svg'),
      },
    }),
  ],
})
