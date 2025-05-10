<script setup lang="ts">
import type { TableColumn } from 'naive-ui/es/data-table/src/interface'
import { NButton, NDataTable, NInput } from 'naive-ui'
import { h } from 'vue'
import { useBpmnModeler } from '../../../context'

const { updateExecutionProperties, elementData } = useBpmnModeler()

function addProperty() {
  elementData.executionProperties!.push({
    name: '',
    value: '',
  })
  updateExecutionProperties()
}

function removeProperty(index: number) {
  elementData.executionProperties!.splice(index, 1)
  updateExecutionProperties()
}

function createColumns(): TableColumn<ExtensionProperty>[] {
  return [{
    title: '属性名',
    key: 'name',
    width: 130,
    render(row) {
      return h(NInput, {
        'value': row.name,
        'placeholder': '请输入属性名',
        'size': 'small',
        'onUpdate:value': function (v: string) {
          row.name = v
          updateExecutionProperties()
        },
      })
    },
  }, {
    title: '属性值',
    key: 'value',
    render(row) {
      return h(NInput, {
        'value': row.value,
        'size': 'small',
        'placeholder': '请输入属性值',
        'onUpdate:value': function (v: string) {
          row.value = v
          updateExecutionProperties()
        },
      })
    },
  }, {
    title: '操作',
    key: 'actions',
    width: 50,
    align: 'center',
    render(_, index: number) {
      return h(NButton, { type: 'error', text: true, onClick: () => removeProperty(index) }, { default: () => '删除' })
    },
  }]
}
</script>

<template>
  <div class="flex-col gap-6px">
    <NDataTable
      :columns="createColumns()"
      :data="elementData.executionProperties"
      :bordered="false"
      size="small"
    />
    <NButton type="primary" @click="addProperty">
      添加属性
    </NButton>
  </div>
</template>

<style scoped>
</style>
