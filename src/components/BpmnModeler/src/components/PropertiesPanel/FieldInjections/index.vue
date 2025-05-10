<script setup lang="ts">
import type { TableColumn } from 'naive-ui/es/data-table/src/interface'
import { NButton, NDataTable, NInput, NSelect } from 'naive-ui'
import { h, ref, watch } from 'vue'

interface FieldInjection {
  name: string
  type: string
  value: string
}

const props = defineProps<{
  modelValue?: FieldInjection[]
}>()

const emit = defineEmits(['update:modelValue'])

const fields = ref<FieldInjection[]>(props.modelValue || [])

const fieldTypeOptions = [
  { label: '字符串', value: 'string' },
  { label: '表达式', value: 'expression' },
]

function addField() {
  fields.value.push({
    name: '',
    type: 'string',
    value: '',
  })
  emitUpdate()
}

function removeField(index: number) {
  fields.value.splice(index, 1)
  emitUpdate()
}

function emitUpdate() {
  emit('update:modelValue', fields.value)
}

function createColumns(): TableColumn<FieldInjection>[] {
  return [{
    title: '字段名称',
    key: 'name',
    width: 120,
    render(row) {
      return h(NInput, {
        'value': row.name,
        'size': 'small',
        'placeholder': '请输入字段名称',
        'onUpdate:value': function (v: string) {
          row.name = v
          emitUpdate()
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
        'size': 'small',
        'options': fieldTypeOptions,
        'placeholder': '请选择字段类型',
        'onUpdate:value': function (v: string) {
          row.type = v
          emitUpdate()
        },
      })
    },
  }, {
    title: '字段值',
    key: 'value',
    render(row) {
      return h(NInput, {
        'value': row.value,
        'size': 'small',
        'placeholder': '请输入字段值',
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
      return h(NButton, { type: 'error', text: true, onClick: () => removeField(index) }, { default: () => '删除' })
    },
  }]
}

// 监听props变化
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      fields.value = [...newVal]
    }
  },
  { deep: true },
)
</script>

<template>
  <div class="flex-col gap-6px">
    <NDataTable
      :columns="createColumns()"
      :data="fields"
      :bordered="false"
      size="small"
    />
    <NButton
      type="primary"
      size="small"
      class="self-start"
      @click="addField"
    >
      添加字段
    </NButton>
  </div>
</template>

<style scoped>
.field-injections {
  padding: 8px;
}

.add-button {
  width: 100%;
  margin-top: 16px;
}
</style>
