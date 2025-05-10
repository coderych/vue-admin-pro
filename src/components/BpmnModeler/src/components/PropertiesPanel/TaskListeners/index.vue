<script setup lang="ts">
import type { TableColumn } from 'naive-ui/es/data-table/src/interface'
import { NButton, NDataTable, NInput, NSelect } from 'naive-ui'
import { h, ref } from 'vue'

interface FieldInjection {
  name: string
  type: string
  value: string
}

interface TaskListener {
  event: string
  type: string
  value: string
  fields: FieldInjection[]
}

const listeners = ref<TaskListener[]>([])

const eventOptions = [
  { label: '创建', value: 'create' },
  { label: '分配', value: 'assignment' },
  { label: '完成', value: 'complete' },
  { label: '删除', value: 'delete' },
  { label: '超时', value: 'timeout' },
]

const typeOptions = [
  { label: 'Java类', value: 'class' },
  { label: '表达式', value: 'expression' },
  { label: '委托表达式', value: 'delegateExpression' },
  { label: '脚本', value: 'script' },
]

const fieldTypeOptions = [
  { label: '字符串', value: 'string' },
  { label: '表达式', value: 'expression' },
]

function addListener() {
  listeners.value.push({
    event: 'create',
    type: 'class',
    value: '',
    fields: [],
  })
}

function addField(listener: TaskListener) {
  listener.fields.push({
    name: '',
    type: 'string',
    value: '',
  })
}

function removeField(listener: TaskListener, index: number) {
  listener.fields.splice(index, 1)
}

function removeListener(index: number) {
  listeners.value.splice(index, 1)
}

function createFieldColumns(listener: TaskListener): TableColumn<FieldInjection>[] {
  return [{
    title: '字段名',
    key: 'name',
    width: 120,
    render(row) {
      return h(NInput, {
        'value': row.name,
        'placeholder': '请输入字段名',
        'size': 'small',
        'onUpdate:value': function (v: string) {
          row.name = v
        },
      })
    },
  }, {
    title: '字段类型',
    key: 'type',
    width: 120,
    render(row) {
      return h(NSelect, {
        'value': row.type,
        'options': fieldTypeOptions,
        'size': 'small',
        'placeholder': '请选择字段类型',
        'onUpdate:value': function (v: string) {
          row.type = v
        },
      })
    },
  }, {
    title: '字段值',
    key: 'value',
    render(row) {
      return h(NInput, {
        'value': row.value,
        'placeholder': '请输入字段值',
        'size': 'small',
        'onUpdate:value': function (v: string) {
          row.value = v
        },
      })
    },
  }, {
    title: '操作',
    key: 'actions',
    width: 50,
    align: 'center',
    render(_, index: number) {
      return h(NButton, { type: 'error', text: true, onClick: () => removeField(listener, index) }, { default: () => '删除' })
    },
  }]
}

function createColumns(): TableColumn<TaskListener>[] {
  return [{
    type: 'expand',
    width: 20,
    align: 'center',
    renderExpand(row: TaskListener) {
      return h('div', { class: 'flex-col gap-2' }, [
        h(NDataTable, {
          columns: createFieldColumns(row),
          data: row.fields,
          bordered: true,
          size: 'small',
          class: 'mb-2',
          style: {
            backgroundColor: 'var(--n-table-color)',
            borderRadius: 'var(--n-border-radius)',
          },
        }),
        h(NButton, {
          size: 'small',
          type: 'primary',
          onClick: () => addField(row),
          class: 'self-start',
        }, { default: () => '添加字段' }),
      ])
    },
  }, {
    title: '事件类型',
    key: 'event',
    width: 100,
    render(row: any) {
      return h(NSelect, {
        'value': row.event,
        'options': eventOptions,
        'size': 'small',
        'placeholder': '请选择事件类型',
        'onUpdate:value': function (v: string) {
          row.event = v
        },
      })
    },
  }, {
    title: '监听器类型',
    key: 'type',
    width: 130,
    render(row) {
      return h(NSelect, {
        'value': row.type,
        'options': typeOptions,
        'size': 'small',
        'placeholder': '请选择监听器类型',
        'onUpdate:value': function (v: string) {
          row.type = v
        },
      })
    },
  }, {
    title: '值',
    key: 'value',
    render(row) {
      return h(NInput, {
        'value': row.value,
        'placeholder': '请输入值',
        'size': 'small',
        'onUpdate:value': function (v: string) {
          row.value = v
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
    <NDataTable
      :columns="createColumns()"
      :data="listeners"
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
