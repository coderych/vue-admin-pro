<script setup lang="ts">
import type { TableColumn } from 'naive-ui/es/data-table/src/interface'
import { NButton, NDataTable, NInput, NSelect } from 'naive-ui'
import { h, ref, watch } from 'vue'

interface Input {
  name: string
  type: string
  value: string
}

const props = defineProps<{
  modelValue?: Input[]
}>()

const emit = defineEmits(['update:modelValue'])

const inputs = ref<Input[]>(props.modelValue || [])

const inputTypeOptions = [
  { label: '字符串', value: 'string' },
  { label: '数字', value: 'number' },
  { label: '布尔值', value: 'boolean' },
  { label: '表达式', value: 'expression' },
]

function addInput() {
  inputs.value.push({
    name: '',
    type: 'string',
    value: '',
  })
  emitUpdate()
}

function removeInput(index: number) {
  inputs.value.splice(index, 1)
  emitUpdate()
}

function emitUpdate() {
  emit('update:modelValue', inputs.value)
}

function createColumns(): TableColumn<Input>[] {
  return [{
    title: '参数名称',
    key: 'name',
    width: 120,
    render(row) {
      return h(NInput, {
        'value': row.name,
        'size': 'small',
        'placeholder': '请输入参数名称',
        'onUpdate:value': function (v: string) {
          row.name = v
          emitUpdate()
        },
      })
    },
  }, {
    title: '参数类型',
    key: 'type',
    width: 120,
    render(row) {
      return h(NSelect, {
        'value': row.type,
        'size': 'small',
        'options': inputTypeOptions,
        'placeholder': '请选择参数类型',
        'onUpdate:value': function (v: string) {
          row.type = v
          emitUpdate()
        },
      })
    },
  }, {
    title: '参数值',
    key: 'value',
    render(row) {
      return h(NInput, {
        'value': row.value,
        'size': 'small',
        'placeholder': '请输入参数值',
        'onUpdate:value': function (v: string) {
          row.value = v
          emitUpdate()
        },
      })
    },
  }, {
    title: '操作',
    key: 'actions',
    width: 50,
    align: 'center',
    render(_, index: number) {
      return h(NButton, { type: 'error', text: true, onClick: () => removeInput(index) }, { default: () => '删除' })
    },
  }]
}

// 监听props变化
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      inputs.value = [...newVal]
    }
  },
  { deep: true },
)
</script>

<template>
  <div class="flex-col gap-6px">
    <NDataTable
      :columns="createColumns()"
      :data="inputs"
      :bordered="false"
      size="small"
    />
    <NButton
      type="primary"
      size="small"
      class="self-start"
      @click="addInput"
    >
      添加参数
    </NButton>
  </div>
</template>

<style scoped>
.inputs {
  padding: 8px;
}

.add-button {
  width: 100%;
  margin-top: 16px;
}
</style>
