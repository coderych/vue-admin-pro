<script setup lang="ts">
import type { TableColumn } from 'naive-ui/es/data-table/src/interface'
import { NButton, NInput, NSelect } from 'naive-ui'
import { h } from 'vue'
import { useBpmnModeler } from '../../../context'

const { elementData, updateExecutionListeners } = useBpmnModeler()

const eventOptions = [
  { label: '开始', value: 'start' },
  { label: '结束', value: 'end' },
]

const typeOptions = [
  { label: 'Java类', value: 'class' },
  { label: '表达式', value: 'expression' },
  { label: '委托表达式', value: 'delegateExpression' },
]

function addListener() {
  elementData.executionListeners.push({
    event: 'start',
    _type: 'class',
    _value: '',
  })
  updateExecutionListeners()
}

function removeListener(index: number) {
  elementData.executionListeners.splice(index, 1)
  updateExecutionListeners()
}

function createColumns(): TableColumn<ExecutionListener>[] {
  return [{
    title: '事件类型',
    key: 'event',
    width: 90,
    render(row: any) {
      return h(NSelect, {
        'value': row.event,
        'options': eventOptions,
        'size': 'small',
        'placeholder': '请选择事件类型',
        'onUpdate:value': function (v: string) {
          row.event = v
          updateExecutionListeners()
        },
      })
    },
  }, {
    title: '监听器类型',
    key: 'type',
    width: 140,
    render(row) {
      return h(NSelect, {
        'value': row._type,
        'options': typeOptions,
        'size': 'small',
        'placeholder': '请选择监听器类型',
        'onUpdate:value': function (v: any) {
          row._type = v
          updateExecutionListeners()
        },
      })
    },
  }, {
    title: '值',
    key: 'value',
    render(row) {
      return h(NInput, {
        'value': row._value,
        'size': 'small',
        'placeholder': '请输入值',
        'onUpdate:value': function (v: string) {
          row._value = v
          if (row._type === 'class') {
            row.class = v
          }
          else if (row._type === 'expression') {
            row.expression = v
          }
          else if (row._type === 'delegateExpression') {
            row.delegateExpression = v
          }

          updateExecutionListeners()
        },
      })
    },
  }, {
    title: '操作',
    key: 'actions',
    width: 50,
    align: 'center',
    render(_, index: number) {
      return h(NButton, { type: 'error', text: true, onClick: () => removeListener(index) }, { default: () => '删除' })
    },
  }]
}
</script>

<template>
  <div class="flex-col gap-6px">
    <n-data-table
      :columns="createColumns()"
      :data="elementData.executionListeners"
      :bordered="false"
      size="small"
    />
    <NButton type="primary" @click="addListener">
      添加监听器
    </NButton>
  </div>
</template>

<style scoped>
</style>
