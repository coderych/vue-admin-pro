<script setup lang="ts">
import { pick } from 'lodash-es'
import { switchProps } from 'naive-ui'
import { proSwitchProps } from './typing'

const props = defineProps(proSwitchProps)
const modelValue = defineModel<boolean | undefined>('value', { default: false })
</script>

<template>
  <n-switch v-model:value="modelValue" v-bind="pick(props, Object.keys(switchProps))">
    <template v-if="checkedText" #checked>
      {{ checkedText }}
    </template>
    <template v-if="uncheckedText" #unchecked>
      {{ uncheckedText }}
    </template>
    <template v-if="checkedIcon" #checked-icon>
      <component :is="checkedIcon" />
    </template>
    <template v-if="uncheckedIcon" #unchecked-icon>
      <component :is="uncheckedIcon" />
    </template>
    <template v-if="icon" #icon>
      <component :is="icon" />
    </template>
  </n-switch>
</template>

<style scoped>

</style>
