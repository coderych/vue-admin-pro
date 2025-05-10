<script setup lang="ts">
import { useBpmnModeler } from '../../../context'

const { elementData, bpmnFactory, updateProperties } = useBpmnModeler()
function updateDocumentation(value: string) {
  const documentation = bpmnFactory.value?.create('bpmn:Documentation', { text: value })
  updateProperties({
    documentation: [documentation],
  })
}
</script>

<template>
  <n-form label-placement="top" :show-feedback="false" class="flex-col gap-12px" size="small">
    <n-form-item label="文档">
      <n-input :value="elementData.documentation" placeholder="请输入描述文档" type="textarea" @update:value="updateDocumentation" />
    </n-form-item>
  </n-form>
</template>

<style scoped>

</style>
