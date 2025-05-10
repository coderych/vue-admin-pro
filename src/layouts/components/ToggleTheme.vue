<script setup lang="ts">
import { useAppStore } from '@/stores'
import { DarkModeOutlined, LightModeOutlined } from '@vicons/material'
import HeaderAction from './HeaderAction.vue'

const appStore = useAppStore()
const { isDark } = storeToRefs(appStore)

async function toggle({ clientX, clientY }: MouseEvent) {
  if (!(document as any).startViewTransition) {
    return appStore.toggleTheme()
  }
  await (document as any).startViewTransition(appStore.toggleTheme).ready

  const clipPath = [
    `circle(0px at ${clientX}px ${clientY}px)`,
    `circle(${Math.hypot(
      Math.max(clientX, window.innerWidth - clientX),
      Math.max(clientY, window.innerHeight - clientY),
    )}px at ${clientX}px ${clientY}px)`,
  ]

  document.documentElement.animate({
    clipPath: isDark.value ? clipPath.reverse() : clipPath,
  }, {
    duration: 500,
    easing: 'ease-in',
    pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`,
  })
}
</script>

<template>
  <HeaderAction :icon="isDark ? LightModeOutlined : DarkModeOutlined" :tooltip="isDark ? '浅色主题' : '深色主题'" @click="toggle" />
</template>

<style scoped>

</style>
