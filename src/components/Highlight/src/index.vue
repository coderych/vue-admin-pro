<script setup lang="ts">
import { CheckSquareOutlined, CopyOutlined } from '@vicons/antd'
import { useClipboard } from '@vueuse/core'
import hljs from 'highlight.js'

const props = withDefaults(defineProps<{
  code?: string
  language?: string
  height?: string
}>(), {
  code: '',
  language: 'javascript',
  height: 'auto',
})

const { copied, copy } = useClipboard({ legacy: true })

async function handleCopy() {
  if (copied.value) {
    return
  }
  await copy(props.code)
  window.$message?.success('复制成功')
}

const themeOverrides = {
  color: 'rgba(255, 255, 255, 0.2)',
  colorHover: 'rgba(255, 255, 255, 0.3)',
}
</script>

<template>
  <n-scrollbar x-scrollable :theme-overrides="themeOverrides" :style="`max-height: ${height};`">
    <pre class="hljs m-0 p-2"><code v-html="hljs.highlight(code, { language }).value" /></pre>

    <n-tooltip>
      <template #trigger>
        <n-button type="primary" quaternary class="absolute right-0 top-0" @click="handleCopy()">
          <n-icon :component="copied ? CheckSquareOutlined : CopyOutlined" />
        </n-button>
      </template>
      复制
    </n-tooltip>
  </n-scrollbar>
</template>

<style scoped>

</style>
