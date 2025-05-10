<script setup lang="ts">
import type { ButtonProps, IconProps } from 'naive-ui'
import { pick } from 'lodash-es'
import { buttonProps, iconProps } from 'naive-ui'

const props = defineProps({
  ...buttonProps,
  ...iconProps,
  onClick: {
    type: Function as PropType<() => void>,
  },
  size: {
    type: [String] as PropType<ButtonProps['size']>,
    default: undefined,
  },
  iconSize: {
    type: [Number, String] as PropType<IconProps['size']>,
    default: 14,
  },
  focusable: {
    type: Boolean,
    default: false,
  },
  text: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <n-button v-bind="(pick(props, Object.keys(buttonProps)) as any)" @click="onClick">
    <template #icon>
      <n-icon v-bind="pick(props, Object.keys(iconProps))" :size="iconSize" />
    </template>
  </n-button>
</template>

<style scoped>

</style>
