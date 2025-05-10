<script setup lang="ts">
import type { IDept } from '@/api/system/dept'
import type { ProFormColumn } from '@/components/ProComponents'
import type { FormInst, FormRules } from 'naive-ui'
import { DeptApi } from '@/api/system/dept'
import { createExposeProxy } from '@/utils/common'
import { listToTree } from '@/utils/tree'
import { computedAsync } from '@vueuse/core'
import { formProps } from 'naive-ui'

defineProps({
  ...formProps,
})

const model = defineModel<IDept>('value', { default: {} })
const formRef = ref<FormInst | null>(null)
const rules: FormRules = {
  name: { required: true, message: '请输入权限名称' },
  code: { required: true, message: '请输入权限编码' },
  type: { required: true, message: '请选择权限类型' },
  parentId: { required: true, message: '请选择父级权限' },
}

const deptList = computedAsync(async () => {
  const { data } = await DeptApi.list({})
  return listToTree(data)
})

const columns = computed<ProFormColumn[]>(() => [
  {
    key: 'name',
    label: '权限名称',
    component: 'input',
    span: 24,
    placeholder: '请输入权限名称',
  },
  {
    key: 'parentId',
    label: '父级组织',
    component: 'tree-select',
    placeholder: '请选择父级组织',
    span: 24,
    keyField: 'id',
    labelField: 'name',
    filterable: true,
    clearable: true,
    options: [
      { id: '0', name: '顶级', children: deptList.value },
    ],
  },
  {
    key: 'sort',
    label: '排序',
    component: 'input-number',
    placeholder: '请输入排序',
    span: 24,
  },
  {
    key: 'remark',
    label: '备注',
    component: 'input',
    type: 'textarea',
    placeholder: '请输入备注',
    span: 24,
  },
])

defineExpose(createExposeProxy(formRef))
</script>

<template>
  <ProForm ref="formRef" v-model:value="model" :columns="columns" :rules="rules" />
</template>

<style scoped>

</style>
