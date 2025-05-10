<script setup lang="ts">
import type { IRole } from '@/api/system/role'
import type { IUser } from '@/api/system/user'
import type { ProFormColumn } from '@/components/ProComponents'
import type { FormInst } from 'naive-ui'
import { DeptApi } from '@/api/system/dept'
import { RoleApi } from '@/api/system/role'
import { ProForm } from '@/components/ProComponents'
import { useDict } from '@/composables/dict'
import { Dict } from '@/enums/dict'
import { createExposeProxy } from '@/utils/common'
import { listToTree } from '@/utils/tree'
import { computedAsync } from '@vueuse/core'

const formRef = ref<FormInst | null>(null)
const model = defineModel<IUser>('value', { default: {} })
const { optionsOf } = useDict()

const roleList = computedAsync<IRole[]>(async () => {
  const { data } = await RoleApi.list({})
  return data
})
const deptList = computedAsync(async () => {
  const { data } = await DeptApi.list({})
  return listToTree(data)
})

const columns = computed<ProFormColumn[]>(() => [
  {
    key: 'username',
    label: '用户名',
    component: 'input',
    span: 24,
    rule: { required: true, message: '请输入用户名' },
  },
  {
    key: 'name',
    label: '姓名',
    component: 'input',
    span: 24,
    rule: { required: true, message: '请输入姓名' },
  },
  {
    key: 'email',
    label: '邮箱',
    component: 'input',
    span: 24,
    // rule: { trigger: 'blur', type: 'email', required: true, message: '邮箱格式不正确' },
  },
  {
    key: 'phone',
    label: '手机号',
    component: 'input',
    span: 24,
    // rule: { trigger: 'blur', type: 'pattern', pattern: /^1[3-9]\d{9}$/, required: true, message: '手机号格式不正确' },
  },
  {
    key: 'gender',
    label: '性别',
    component: 'select',
    rule: [{ required: true, message: '请选择性别' }],
    options: optionsOf(Dict.Gender),
    span: 24,
  },
  {
    key: 'birthday',
    label: '生日',
    component: 'date-picker',
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
    span: 24,
    rule: [{ type: 'date', required: true, message: '请选择生日' }],
  },
  {
    key: 'avatar',
    label: '头像',
    component: 'image',
    max: 1,
    span: 24,
  },
  {
    key: 'roleIds',
    label: '角色',
    component: 'select',
    options: roleList.value,
    labelField: 'name',
    valueField: 'id',
    multiple: true,
    span: 24,
  },
  {
    key: 'deptIds',
    label: '部门',
    component: 'tree-select',
    options: deptList.value,
    labelField: 'name',
    keyField: 'id',
    multiple: true,
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
