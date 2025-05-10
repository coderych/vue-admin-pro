<script setup lang="ts">
import { useDark } from '@vueuse/core'

defineProps<{
  value: string | null
}>()

const isDark = useDark()
</script>

<template>
  <div class="aie-content" :class="{ 'aie-theme-dark': isDark }" v-html="value" />
</template>

<style scoped>

</style>
