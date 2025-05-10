<script setup lang="ts">
import { pick } from 'lodash-es'
import { checkboxGroupProps } from 'naive-ui'
import { proCheckboxGroupProps } from './typing'

const props = defineProps(proCheckboxGroupProps)

const modelValue = defineModel<any[]>('value', { default: undefined })
</script>

<template>
  <n-checkbox-group v-model:value="modelValue" v-bind="pick(props, Object.keys(checkboxGroupProps))">
    <template v-for="option in props.options" :key="option.value">
      <n-checkbox v-bind="option" />
    </template>
  </n-checkbox-group>
</template>

<style scoped>

</style>
