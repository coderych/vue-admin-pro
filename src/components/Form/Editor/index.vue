<script setup lang="ts">
import type { AiGlobalConfig } from 'aieditor'
import type { EditorInst } from './typing'
import { CommonApi } from '@/api/common'
import { useDark } from '@vueuse/core'
import { AiEditor } from 'aieditor'
import 'aieditor/dist/style.css'

const props = withDefaults(defineProps<{
  value: string
  height?: string
  placeholder?: string
  disabled?: boolean
}>(), {
  height: '500px',
  placeholder: '请输入内容',
  disabled: false,
})
const modelValue = defineModel<string>('value', { default: null })

const isDark = useDark()
let instance: AiEditor | null = null
const el = ref<HTMLDivElement | null>(null)
const doing = ref(false)

function init() {
  instance = new AiEditor({
    element: el.value!,
    placeholder: props.placeholder,
    content: modelValue.value,
    onChange: () => {
      doing.value = true
      modelValue.value = instance?.getHtml() || ''
      nextTick(() => {
        doing.value = false
      })
    },
    ai: {
      models: {
        spark: {
          appId: 'e68c1382',
          apiKey: 'e63bb65c16eab9bc112d205de666ed9f',
          apiSecret: 'NmEzZjhkMTEyMzg0ZDA3NWYwZGE1NDgw',
          version: 'v3.5',
        },
      },
      bubblePanelEnable: true,
    } as AiGlobalConfig,
    // 上传相关
    ...Object.fromEntries(['image', 'video', 'attachment'].map(key => [key, {
      uploader: async (file: File): Promise<Record<string, any>> => {
        const form = new FormData()
        form.append('file', file)
        form.append('biz', '/editor')

        const { data } = await CommonApi.upload(form)
        console.log(data)

        return {
          errorCode: 0,
          data: {
            src: data,
            href: data,
            alt: file.name,
            fileName: file.name,
            poster: '',
          },
        }
      },
    }])),
  })
}

watch(modelValue, (value) => {
  if (!doing.value) {
    instance?.setContent(value)
  }
}, { immediate: true })

watch(() => props.disabled, (value) => {
  nextTick(() => {
    instance?.setEditable(!value)
  })
}, { immediate: true })

watch(isDark, (value) => {
  nextTick(() => {
    instance?.changeTheme(value ? 'dark' : 'light')
  })
}, { immediate: true })

onMounted(() => {
  init()
})

onUnmounted(() => {
  instance?.destroy()
})

defineExpose<EditorInst>({
  getInstance: () => instance,
})
</script>

<template>
  <div ref="el" :style="{ height: props.height }" />
</template>

<style scoped>

</style>
