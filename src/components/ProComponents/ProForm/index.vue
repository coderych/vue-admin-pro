<script setup lang="ts">
import type { GridProps } from 'naive-ui'
import type { ProFormColumn } from './typing'
import { createExposeProxy } from '@/utils/common'
import { pick } from 'lodash-es'
import { formProps, gridProps } from 'naive-ui'
import { renderField } from './render-field'
import { proFormProps } from './typing'

const props = defineProps(proFormProps)

defineSlots<
  Record<string, (props: { column: ProFormColumn, row: Record<string, any>, key: string, index: number, value: any }) => any>
>()

const model = defineModel('value', { default: {} })

const _gridProps = computed<GridProps>(() => {
  return {
    ...pick(props, Object.keys(gridProps)),
    xGap: props.gap || 12,
    yGap: props.gap || 12,
  }
})

const formRef = ref()

const columns = computed(() => props.columns?.filter(item => item.enabled !== false).sort((a, b) => (a?.sort || 10) - (b?.sort || 10)) || [])

defineExpose(createExposeProxy(formRef))
</script>

<template>
  <n-form v-bind="pick(props, Object.keys(formProps))" ref="formRef" :model="model">
    <n-grid v-bind="_gridProps">
      <template v-for="(column, index) in columns" :key="column.key">
        <n-gi :span="column.span || 24">
          <slot :name="column.key" v-bind="{ column, row: model, key: column.key, index, value: model[column.key] }">
            <n-form-item v-if="column.component !== 'none'" v-bind="column.formItemProps" :label="column.label" :rule="column.rule" :path="column.key">
              <component :is="renderField(column, model)" v-if="column.component !== 'render'" />
              <component :is="column.render" v-else v-bind="{ column, model }" />
            </n-form-item>
          </slot>
        </n-gi>
      </template>
    </n-grid>
  </n-form>
</template>

<style scoped>

</style>
