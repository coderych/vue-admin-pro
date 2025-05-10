<script setup lang="ts">
import { NForm, NFormItem, NInput } from 'naive-ui'
import { ref, watchEffect } from 'vue'

const props = defineProps<{
  element?: any
  modeler?: any
}>()

const timeToLive = ref('')

// 监听元素变化，更新表单数据
watchEffect(() => {
  if (!props.element)
    return
  const modeling = props.modeler?.get('modeling')
  if (!modeling)
    return

  const businessObject = props.element.businessObject
  timeToLive.value = businessObject.historyTimeToLive || ''
})

// 更新生存时间
function updateTimeToLive(value: string) {
  if (!props.element)
    return
  const modeling = props.modeler?.get('modeling')
  if (!modeling)
    return

  modeling.updateProperties(props.element, {
    historyTimeToLive: value,
  })
}
</script>

<template>
  <NForm :show-feedback="false" size="small" class="flex-col gap-12px">
    <NFormItem label="生存时间">
      <NInput
        v-model:value="timeToLive"
        placeholder="请输入历史数据保留时间（天）"
        @update:value="updateTimeToLive"
      />
    </NFormItem>
  </NForm>
</template>

<style scoped>
</style>
