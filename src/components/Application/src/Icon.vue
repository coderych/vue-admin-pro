<script setup lang="ts">
import type { CSSProperties } from 'vue'

const props = withDefaults(defineProps<{
  name: string
  size?: number
  color?: string
}>(), {
  size: 16,
})

const style = computed<CSSProperties>(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
}))
</script>

<template>
  <i :class="`i-${props.name}${props.color ? '?mask' : ''} color-${color}`" :style="style" />
</template>

<style scoped>

</style>
