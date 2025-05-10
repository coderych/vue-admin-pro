<script setup lang="ts">
import { ref } from 'vue'

const priority = ref('')
const dueDate = ref('')
const followUpDate = ref('')
const assignee = ref('')
const candidateUsers = ref('')
const candidateGroups = ref('')
</script>

<template>
  <n-form label-placement="top" :show-feedback="false" class="flex-col gap-12px" size="small">
    <n-form-item label="优先级">
      <n-input-number v-model:value="priority" placeholder="请输入优先级" />
    </n-form-item>
    <n-form-item label="到期时间">
      <n-date-picker
        v-model:value="dueDate"
        type="datetime"
        placeholder="请选择到期时间"
        clearable
      />
    </n-form-item>
    <n-form-item label="跟进时间">
      <n-date-picker
        v-model:value="followUpDate"
        type="datetime"
        placeholder="请选择跟进时间"
        clearable
      />
    </n-form-item>
    <n-form-item label="受理人">
      <n-input v-model:value="assignee" placeholder="请输入受理人" />
    </n-form-item>
    <n-form-item label="候选用户">
      <n-input v-model:value="candidateUsers" placeholder="请输入候选用户，多个用户用逗号分隔" />
    </n-form-item>
    <n-form-item label="候选组">
      <n-input v-model:value="candidateGroups" placeholder="请输入候选组，多个组用逗号分隔" />
    </n-form-item>
  </n-form>
</template>

<style scoped>
</style>
