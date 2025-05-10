<script setup lang="ts">
import { ref } from 'vue'

const formFields = ref([])

function addFormField() {
  formFields.value.push({
    id: '',
    label: '',
    type: 'string',
    defaultValue: '',
    required: false,
  })
}

function removeFormField(index: number) {
  formFields.value.splice(index, 1)
}
</script>

<template>
  <n-form label-placement="top" :show-feedback="false" class="flex-col gap-12px" size="small">
    <div class="flex-col gap-12px">
      <div v-for="(field, index) in formFields" :key="index" class="flex-col gap-8px">
        <n-form-item label="字段ID" required>
          <n-input v-model:value="field.id" placeholder="请输入字段ID" />
        </n-form-item>
        <n-form-item label="标签">
          <n-input v-model:value="field.label" placeholder="请输入标签" />
        </n-form-item>
        <n-form-item label="类型">
          <n-select
            v-model:value="field.type"
            :options="[
              { label: '字符串', value: 'string' },
              { label: '长整型', value: 'long' },
              { label: '布尔值', value: 'boolean' },
              { label: '日期', value: 'date' },
              { label: '枚举', value: 'enum' },
            ]"
            placeholder="请选择字段类型"
          />
        </n-form-item>
        <n-form-item label="默认值">
          <n-input v-model:value="field.defaultValue" placeholder="请输入默认值" />
        </n-form-item>
        <n-form-item>
          <n-checkbox v-model:checked="field.required">
            必填
          </n-checkbox>
        </n-form-item>
        <n-button type="error" @click="removeFormField(index)">
          删除
        </n-button>
      </div>
    </div>
    <n-button type="primary" @click="addFormField">
      添加表单字段
    </n-button>
  </n-form>
</template>

<style scoped>
</style>
