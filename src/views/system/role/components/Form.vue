<script setup lang="ts">
import type { IRole } from '@/api/system/role/types'
import type { ProFormColumn } from '@/components/ProComponents'
import type { FormInst } from 'naive-ui'
import { createExposeProxy } from '@/utils/common'

const model = defineModel<IRole>('value', {})
const formRef = ref<FormInst | null>(null)

const columns = computed<ProFormColumn[]>(() => [
  {
    key: 'name',
    label: '角色名称',
    component: 'input',
    span: 24,
    rule: { required: true, message: '请输入角色名称' },
  },
  {
    key: 'code',
    label: '角色编码',
    component: 'input',
    span: 24,
    rule: { required: true, message: '请输入角色编码' },
  },
  {
    key: 'sort',
    label: '排序',
    component: 'input-number',
    span: 24,
    rule: { required: true, message: '请输入排序' },
  },
  {
    key: 'status',
    label: '状态',
    component: 'switch',
    span: 24,
    checkedText: '启用',
    uncheckedText: '禁用',
    checkedValue: 1,
    uncheckedValue: 0,
  },
  {
    key: 'remark',
    label: '备注',
    component: 'input',
    type: 'textarea',
    span: 24,
  },
])

defineExpose(createExposeProxy(formRef))
</script>

<template>
  <ProForm ref="formRef" v-model:value="model" :columns="columns" />
</template>

<style scoped>

</style>
