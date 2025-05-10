<script setup lang="ts">
import type { FormRules } from 'naive-ui'
import { computed, ref } from 'vue'

const assignment = ref({
  assignee: '',
  candidateUsers: '',
  candidateGroups: '',
  dueDate: null,
  followUpDate: null,
  priority: '50',
})

const expressionType = ref('static') // static, expression, script

const rules = computed<FormRules>(() => ({
  assignee: {
    required: true,
    message: expressionType.value === 'static' ? '请输入用户ID' : '请输入表达式',
    trigger: ['blur', 'input'],
  },
  candidateUsers: {
    trigger: ['blur', 'input'],
    validator: (rule, value) => {
      if (value && expressionType.value === 'static') {
        if (!value.split(',').every(id => id.trim())) {
          return new Error('用户ID格式不正确')
        }
      }
      return true
    },
  },
  candidateGroups: {
    trigger: ['blur', 'input'],
    validator: (rule, value) => {
      if (value && expressionType.value === 'static') {
        if (!value.split(',').every(id => id.trim())) {
          return new Error('组ID格式不正确')
        }
      }
      return true
    },
  },
  priority: {
    type: 'number',
    min: 0,
    max: 100,
    message: '优先级必须在0-100之间',
    trigger: ['blur', 'input'],
  },
}))
</script>

<template>
  <n-form
    ref="formRef"
    :model="assignment"
    :rules="rules"
    label-placement="top"
    :show-feedback="true"
    class="flex-col gap-12px"
    size="small"
  >
    <n-form-item label="表达式类型">
      <n-select
        v-model:value="expressionType"
        :options="[
          { label: '静态值', value: 'static' },
          { label: '表达式', value: 'expression' },
          { label: '脚本', value: 'script' },
        ]"
        placeholder="请选择表达式类型"
      />
    </n-form-item>
    <n-form-item label="受理人">
      <n-input
        v-model:value="assignment.assignee"
        :placeholder="expressionType === 'static' ? '请输入用户ID' : '请输入表达式'"
      />
    </n-form-item>
    <n-form-item label="候选用户">
      <n-input
        v-model:value="assignment.candidateUsers"
        :placeholder="expressionType === 'static' ? '请输入用户ID，多个用逗号分隔' : '请输入表达式'"
      />
    </n-form-item>
    <n-form-item label="候选组">
      <n-input
        v-model:value="assignment.candidateGroups"
        :placeholder="expressionType === 'static' ? '请输入组ID，多个用逗号分隔' : '请输入表达式'"
      />
    </n-form-item>
    <n-form-item label="到期日期">
      <n-date-picker
        v-if="expressionType === 'static'"
        v-model:value="assignment.dueDate"
        type="datetime"
        placeholder="请选择到期时间"
        clearable
      />
      <n-input
        v-else
        v-model:value="assignment.dueDate"
        placeholder="请输入表达式"
      />
    </n-form-item>
    <n-form-item label="跟进日期">
      <n-date-picker
        v-if="expressionType === 'static'"
        v-model:value="assignment.followUpDate"
        type="datetime"
        placeholder="请选择跟进时间"
        clearable
      />
      <n-input
        v-else
        v-model:value="assignment.followUpDate"
        placeholder="请输入表达式"
      />
    </n-form-item>
    <n-form-item label="优先级">
      <n-input-number
        v-model:value="assignment.priority"
        :min="0"
        :max="100"
        placeholder="请输入优先级（0-100）"
      />
    </n-form-item>
  </n-form>
</template>

<style scoped>
</style>
