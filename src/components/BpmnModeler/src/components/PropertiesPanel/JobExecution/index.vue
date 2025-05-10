<script setup lang="ts">
import { NForm, NFormItem, NInput } from 'naive-ui'
import { ref } from 'vue'

interface JobExecution {
  retryTimeCycle: string
  priority: string
}

const jobExecution = ref<JobExecution>({
  retryTimeCycle: '',
  priority: '',
})
</script>

<template>
  <NForm label-placement="top" :show-feedback="false" class="flex-col gap-12px" size="small">
    <NFormItem label="重试时间周期">
      <NInput
        v-model:value="jobExecution.retryTimeCycle"
        placeholder="例如：R3/PT10M（每10分钟重试一次，最多3次）"
      />
    </NFormItem>
    <NFormItem label="优先级">
      <NInput
        v-model:value="jobExecution.priority"
        placeholder="请输入任务优先级"
      />
    </NFormItem>
  </NForm>
</template>

<style scoped>
</style>
