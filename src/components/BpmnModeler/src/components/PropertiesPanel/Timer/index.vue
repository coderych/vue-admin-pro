<script setup lang="ts">
import { NForm, NFormItem, NInput, NSelect } from 'naive-ui'
import { ref } from 'vue'

interface Timer {
  type: string
  value: string
}

const timer = ref<Timer>({
  type: 'none',
  value: '',
})

const typeOptions = [
  { label: '无', value: 'none' },
  { label: '日期', value: 'date' },
  { label: '持续时间', value: 'duration' },
  { label: '循环', value: 'cycle' },
]

function getPlaceholder(type: string) {
  switch (type) {
    case 'date':
      return 'ISO日期，例如：2024-01-01T00:00:00Z'
    case 'duration':
      return '持续时间，例如：PT1H（1小时）'
    case 'cycle':
      return '循环表达式，例如：R3/PT10H（每10小时执行一次，共3次）'
    case 'none':
      return ''
    default:
      return '请输入值'
  }
}
</script>

<template>
  <NForm label-placement="top" :show-feedback="false" class="flex-col gap-12px" size="small">
    <NFormItem label="定时器类型">
      <NSelect
        v-model:value="timer.type"
        :options="typeOptions"
        placeholder="请选择定时器类型"
      />
    </NFormItem>
    <NFormItem v-if="timer.type !== 'none'" label="值">
      <NInput
        v-model:value="timer.value"
        :placeholder="getPlaceholder(timer.type)"
      />
    </NFormItem>
  </NForm>
</template>

<style scoped>
</style>
