<script setup lang="ts">
import { NForm, NFormItem, NInput, NSelect } from 'naive-ui'
import { ref, watchEffect } from 'vue'

const props = defineProps<{
  element?: any
  modeler?: any
}>()

const scriptFormat = ref('')
const scriptValue = ref('')
const scriptType = ref('inline') // 默认为内联脚本
const resourcePath = ref('') // 外部资源路径
const resultVariable = ref('') // 结果变量

const scriptFormats = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Groovy', value: 'groovy' },
  { label: 'Python', value: 'python' },
  { label: 'Ruby', value: 'ruby' },
]

const scriptTypes = [
  { label: 'External resource', value: 'external' },
  { label: 'Inline script', value: 'inline' },
]

// 监听元素变化，更新表单数据
watchEffect(() => {
  if (!props.element)
    return
  const modeling = props.modeler?.get('modeling')
  if (!modeling)
    return

  const businessObject = props.element.businessObject
  scriptFormat.value = businessObject.scriptFormat || ''
  scriptValue.value = businessObject.script || ''
  scriptType.value = businessObject.resource ? 'external' : 'inline'
  resourcePath.value = businessObject.resource || ''
  resultVariable.value = businessObject.resultVariable || ''
})

// 更新脚本格式
function updateScriptFormat(value: string) {
  if (!props.element)
    return
  const modeling = props.modeler?.get('modeling')
  if (!modeling)
    return

  modeling.updateProperties(props.element, {
    scriptFormat: value,
  })
}

// 更新脚本类型
function updateScriptType(value: string) {
  if (!props.element)
    return
  const modeling = props.modeler?.get('modeling')
  if (!modeling)
    return

  if (value === 'external') {
    modeling.updateProperties(props.element, {
      script: undefined,
      resource: resourcePath.value || '',
    })
  }
  else {
    modeling.updateProperties(props.element, {
      script: scriptValue.value || '',
      resource: undefined,
    })
  }
}

// 更新脚本内容
function updateScriptValue(value: string) {
  if (!props.element)
    return
  const modeling = props.modeler?.get('modeling')
  if (!modeling)
    return

  modeling.updateProperties(props.element, {
    script: value,
  })
}

// 更新资源路径
function updateResourcePath(value: string) {
  if (!props.element)
    return
  const modeling = props.modeler?.get('modeling')
  if (!modeling)
    return

  modeling.updateProperties(props.element, {
    resource: value,
  })
}

// 更新结果变量
function updateResultVariable(value: string) {
  if (!props.element)
    return
  const modeling = props.modeler?.get('modeling')
  if (!modeling)
    return

  modeling.updateProperties(props.element, {
    resultVariable: value,
  })
}
</script>

<template>
  <NForm :show-feedback="false" size="small" class="flex-col gap-12px">
    <NFormItem label="脚本类型">
      <NSelect
        v-model:value="scriptType"
        :options="scriptTypes"
        @update:value="updateScriptType"
      />
    </NFormItem>
    <NFormItem label="脚本格式">
      <NSelect
        v-model:value="scriptFormat"
        :options="scriptFormats"
        @update:value="updateScriptFormat"
      />
    </NFormItem>
    <template v-if="scriptType === 'inline'">
      <NFormItem label="脚本内容">
        <NInput
          v-model:value="scriptValue"
          type="textarea"
          :autosize="{
            minRows: 3,
            maxRows: 10,
          }"
          @update:value="updateScriptValue"
        />
      </NFormItem>
    </template>
    <template v-else>
      <NFormItem label="资源路径">
        <NInput
          v-model:value="resourcePath"
          @update:value="updateResourcePath"
        />
      </NFormItem>
    </template>
    <NFormItem label="结果变量">
      <NInput
        v-model:value="resultVariable"
        placeholder="请输入结果变量名称"
        @update:value="updateResultVariable"
      />
    </NFormItem>
  </NForm>
</template>

<style scoped>
</style>
