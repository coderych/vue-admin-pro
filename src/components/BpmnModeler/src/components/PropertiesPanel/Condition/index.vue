<script setup lang="ts">
import type { FormInst } from 'naive-ui'
import { ref } from 'vue'
import { useBpmnModeler } from '../../../context'

const { elementData, updateConditionExpression } = useBpmnModeler()
const formRef = ref<FormInst | null>(null)

const conditionTypeOptions = [
  {
    label: '无',
    value: 'none',
  },
  {
    label: '表达式',
    value: 'expression',
  },
  {
    label: '脚本',
    value: 'script',
  },
]

const scriptTypeOptions = [
  {
    label: '内联脚本',
    value: 'inline',
  },
  {
    label: '外部资源',
    value: 'external',
  },
]
</script>

<template>
  <n-form ref="formRef" :show-feedback="false" size="small">
    <n-form-item label="条件类型">
      <n-select
        v-model:value="elementData.conditionExpression._type"
        :options="conditionTypeOptions"
        @update:value="updateConditionExpression()"
      />
    </n-form-item>

    <template v-if="elementData.conditionExpression._type === 'script'">
      <n-form-item label="脚本格式">
        <n-input
          v-model:value="elementData.conditionExpression.language"
          placeholder="请输入脚本格式"
          @update:value="updateConditionExpression()"
        />
      </n-form-item>

      <n-form-item label="脚本类型">
        <n-select
          v-model:value="elementData.conditionExpression._scriptType"
          :options="scriptTypeOptions"
          @update:value="updateConditionExpression()"
        />
      </n-form-item>

      <n-form-item v-if="elementData.conditionExpression._scriptType === 'external'" label="资源路径">
        <n-input
          v-model:value="elementData.conditionExpression.resource"
          placeholder="请输入资源路径"
          @update:value="updateConditionExpression()"
        />
      </n-form-item>

      <n-form-item v-if="elementData.conditionExpression._scriptType === 'inline'" label="脚本内容">
        <n-input
          v-model:value="elementData.conditionExpression.body"
          type="textarea"
          placeholder="请输入脚本内容"
          @update:value="updateConditionExpression()"
        />
      </n-form-item>
    </template>

    <n-form-item v-else-if="elementData.conditionExpression._type === 'expression'" label="条件内容">
      <n-input
        v-model:value="elementData.conditionExpression.body"
        type="textarea"
        placeholder="请输入条件表达式"
        @update:value="updateConditionExpression()"
      />
    </n-form-item>
  </n-form>
</template>

<style scoped>
.n-form-item {
  margin-bottom: 16px;
}
</style>
