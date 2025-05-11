<script setup lang="ts">
import Simplebar from 'simplebar-vue'
import 'simplebar-vue/dist/simplebar.min.css'

const props = withDefaults(defineProps<{
  xScrollable?: boolean
  size?: number
  color?: string
  hoverColor?: string
  autoHide?: boolean
  borderRadius?: number
}>(), {
  xScrollable: false,
  size: 5,
  color: 'rgba(0, 0, 0, 0.25)',
  hoverColor: 'rgba(0, 0, 0, 0.4)',
  autoHide: true,
  borderRadius: 5,
})

const emit = defineEmits(['scroll'])

const style = computed(() => ({
  '--scrollbar-size': `${props.size}px`,
  '--scrollbar-color': props.color,
  '--scrollbar-hover-color': props.hoverColor,
  '--scrollbar-border-radius': `${props.borderRadius}px`,
}))
</script>

<template>
  <Simplebar v-bind="$attrs" :auto-hide="autoHide" :class="{ 'overflow-x-hidden': !xScrollable }" :style="style" @scroll="emit('scroll', $event)">
    <slot />
  </Simplebar>
</template>

<style lang="less">
.simplebar-scrollbar::before {
  background-color: var(--scrollbar-color);
  border-radius: var(--scrollbar-border-radius);
  cursor: pointer;
}

.simplebar-scrollbar.simplebar-visible.simplebar-hover::before {
  background-color: var(--scrollbar-hover-color);
}

.simplebar-horizontal {
  .simplebar-scrollbar::before {
    height: var(--scrollbar-size) !important;
  }
}

.simplebar-vertical {
  .simplebar-scrollbar::before {
    width: var(--scrollbar-size) !important;
  }
}
</style>
