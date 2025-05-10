<script setup lang="ts">
import { useAppStore } from '@/stores'

const appStore = useAppStore()

const { watermark, watermarkContent } = storeToRefs(appStore)
</script>

<template>
  <n-watermark
    v-if="watermark"
    cross fullscreen :rotate="-15" :font-size="16" :line-height="16"
    :width="384" :height="384" :x-offset="12" :y-offset="60"
    :content="watermarkContent"
  />
</template>

<style scoped>

</style>
