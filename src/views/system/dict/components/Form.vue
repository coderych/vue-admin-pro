<script setup lang="ts">
import type { IDict } from '@/api/system/dict'
import type { ProFormColumn } from '@/components/ProComponents'
import type { FormInst, FormRules } from 'naive-ui'
import { useDict } from '@/composables/dict'
import { Dict } from '@/enums/dict'
import { createExposeProxy } from '@/utils/common'

const model = defineModel<IDict>('value', { default: {} })
const formRef = ref<FormInst | null>(null)
const rules: FormRules = {
  name: { required: true, message: '请输入权限名称' },
  code: { required: true, message: '请输入权限编码' },
  type: { required: true, message: '请选择权限类型' },
  parentId: { required: true, message: '请选择父级权限' },
}
const { optionsOf } = useDict()

const columns = computed<ProFormColumn[]>(() => [
  {
    key: 'name',
    label: '字典名称',
    component: 'input',
    span: 12,
    placeholder: '请输入字典名称',
  },
  {
    key: 'code',
    label: '字典编码',
    component: 'input',
    span: 12,
    placeholder: '请输入字典编码',
  },
  {
    enabled: model.value.parentId === '0',
    key: 'type',
    label: '字典类型',
    component: 'select',
    span: 12,
    options: optionsOf(Dict.DictType),
  },
  {
    enabled: model.value.parentId === '0',
    key: 'dataType',
    label: '数据类型',
    component: 'select',
    span: 12,
    options: [
      { label: '字符', value: 'string' },
      { label: '数字', value: 'number' },
      { label: '布尔', value: 'boolean' },
    ],
  },
  {
    key: 'sort',
    label: '排序',
    component: 'input-number',
    span: 12,
  },
  {
    key: 'status',
    label: '状态',
    component: 'switch',
    span: 12,
    options: optionsOf(Dict.Status),
    checkedText: '启用',
    uncheckedText: '禁用',
    checkedValue: 1,
    uncheckedValue: 0,
  },
  {
    key: 'extra',
    label: '扩展属性',
    component: 'input',
    span: 24,
    type: 'textarea',
    rows: 2,
    placeholder: '请输入扩展属性',
    enabled: model.value.parentId !== '0',
  },
  {
    key: 'remark',
    label: '备注',
    component: 'input',
    type: 'textarea',
    span: 24,
    placeholder: '请输入备注',
    rows: 2,
  },
])

defineExpose(createExposeProxy(formRef))
</script>

<template>
  <ProForm ref="formRef" v-model:value="model" :columns="columns" :rules="rules" />
</template>

<style scoped>

</style>
