<script setup lang="ts">
import type { Component } from 'vue'

withDefaults(defineProps<{
  show?: boolean
  icon: Component
  tooltip?: string
  onClick?: (...args: any[]) => any
  disabled?: boolean
}>(), {
  show: true,
  disabled: false,
})
</script>

<template>
  <div class="header-action">
    <n-tooltip v-if="show" show-arrow :disabled="!Boolean(tooltip)">
      <template #trigger>
        <n-button quaternary :disabled="disabled" :focusable="false" strong block class="header-action-button" @click="onClick">
          <n-icon :component="icon" />
        </n-button>
      </template>
      {{ tooltip }}
    </n-tooltip>
  </div>
</template>

<style scoped lang="less">
.header-action {
  height: 100%;
  display: flex;
  align-items: center;

  &-button {
    --n-text-color: inherit;
    --n-text-color-hover: var(--n-text-color);
    --n-text-color-pressed: var(--n-text-color);
  }
}
</style>
