<script setup lang="ts">
import { FullscreenExitOutlined, FullscreenOutlined } from '@vicons/antd'
import { useFullscreen } from '@vueuse/core'
import HeaderAction from './HeaderAction.vue'

const { toggle, isFullscreen } = useFullscreen()
</script>

<template>
  <HeaderAction :icon="isFullscreen ? FullscreenExitOutlined : FullscreenOutlined" :tooltip="isFullscreen ? '退出全屏' : '全屏'" @click="toggle" />
</template>

<style scoped>

</style>
