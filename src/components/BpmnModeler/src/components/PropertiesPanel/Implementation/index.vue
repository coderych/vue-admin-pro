<script setup lang="ts">
import type { FormInst } from 'naive-ui'
import { ref } from 'vue'
import { useBpmnModeler } from '../../../context'

const { elementData, updateProperties } = useBpmnModeler()

const formRef = ref<FormInst | null>(null)

const implementationTypeOptions = [
  {
    label: '无',
    value: 'none',
  },
  {
    label: 'Java类',
    value: 'class',
  },
  {
    label: '表达式',
    value: 'expression',
  },
  {
    label: '委托表达式',
    value: 'delegateExpression',
  },
]

// 获取输入框占位符
function getPlaceholder() {
  switch (elementData._implementationType) {
    case 'class':
      return '请输入Java类名'
    case 'expression':
      return '请输入表达式'
    case 'delegateExpression':
      return '请输入委托表达式'
    default:
      return '请输入实现值'
  }
}

const implementation = {
  expression: undefined,
  class: undefined,
  delegateExpression: undefined,
  resultVariable: undefined,
}

function onUpdateValue(value: any) {
  if (elementData._implementationType === 'none') {
    updateProperties({
      ...implementation,
    })
    return
  }

  updateProperties({
    ...{ ...implementation, [elementData._implementationType]: value },
    _implementationType: elementData._implementationType,
    _implementationValue: elementData._implementationValue,
    resultVariable: elementData.resultVariable || undefined,
  })
}
</script>

<template>
  <n-form ref="formRef" :show-feedback="false" size="small">
    <n-form-item label="实现类型">
      <n-select
        v-model:value="elementData._implementationType"
        :options="implementationTypeOptions"
        @update:value="onUpdateValue"
      />
    </n-form-item>

    <template v-if="elementData._implementationType !== 'none'">
      <n-form-item label="实现值">
        <n-input
          v-model:value="elementData._implementationValue"
          type="textarea"
          :placeholder="getPlaceholder()"
          @update:value="onUpdateValue"
        />
      </n-form-item>

      <n-form-item v-if="['expression'].includes(elementData._implementationType)" label="结果变量">
        <n-input
          v-model:value="elementData.resultVariable"
          @update:value="onUpdateValue"
        />
      </n-form-item>
    </template>
  </n-form>
</template>

<style scoped>
.n-form-item {
  margin-bottom: 16px;
}
</style>
