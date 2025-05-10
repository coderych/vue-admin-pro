<script setup lang="ts">
import { pick } from 'lodash-es'
import { radioGroupProps } from 'naive-ui'
import { proRadioGroupProps } from './typing'

const props = defineProps(proRadioGroupProps)

const modelValue = defineModel<any>('value', { default: undefined })
</script>

<template>
  <n-radio-group v-model:value="modelValue" v-bind="pick(props, Object.keys(radioGroupProps))" :class="{ 'radio-group-solid': buttonStyle === 'solid' && optionType === 'button' }">
    <template v-for="option in props.options" :key="option.value">
      <n-radio v-if="optionType === 'default'" v-bind="option" />
      <n-radio-button v-else-if="optionType === 'button'" v-bind="option" />
    </template>
  </n-radio-group>
</template>

<style>
.radio-group-solid > .n-radio-button.n-radio-button--checked {
  background: var(--n-button-border-color-active);
  color: #fff;
}
</style>
