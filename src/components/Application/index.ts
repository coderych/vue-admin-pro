import Firework from './src/Firework.vue'
import Icon from './src/Icon.vue'
import PageWrapper from './src/PageWrapper.vue'
import Scrollbar from './src/Scrollbar.vue'
import Watermark from './src/Watermark.vue'

export {
  Firework,
  Icon,
  PageWrapper,
  Scrollbar,
  Watermark,
}

export const FIRERWORK_EMITTER_KEY = Symbol('FIRERWORK_EMITTER_KEY')

export const images = import.meta.glob('./src/images/*.png', { eager: true, import: 'default' })

export const Fire: Record<string, string> = Object.fromEntries(Object.keys(images).map(key => [key.replace('./src/images/', '').replace('.png', ''), images[key] as string]))
