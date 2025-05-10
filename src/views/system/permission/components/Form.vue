<script setup lang="ts">
import type { IPermission } from '@/api/system/permission'
import type { ProFormColumn } from '@/components/ProComponents'
import type { FormInst, FormRules } from 'naive-ui'
import { IconSelect } from '@/components/Form'
import { useDict } from '@/composables/dict'
import { Dict } from '@/enums/dict'
import { viewModules } from '@/router/generate-routes'
import { createExposeProxy } from '@/utils/common'
import { renderIcon } from '@/utils/render'
import { formProps, NCheckbox, NFlex } from 'naive-ui'

const props = defineProps({
  ...formProps,
  permissionList: {
    type: Array as PropType<IPermission[]>,
    default: () => [],
  },
})

const { optionsOf } = useDict()
const model = defineModel<IPermission>('value', { default: {} })
const formRef = ref<FormInst | null>(null)
const rules: FormRules = {
  name: { required: true, message: '请输入权限名称' },
  code: { required: true, message: '请输入权限编码' },
  type: { required: true, message: '请选择权限类型' },
  parentId: { required: true, message: '请选择父级权限' },
}

const componentOptions = computed(() => {
  return Object.keys(viewModules).filter(item => item.includes(`${model.value?.component}`)).map((key) => {
    // 移除前缀 /src/views/ 和 后缀.vue
    const path = key.replace('/src/views/', '').replace('.vue', '')
    return {
      value: path,
      label: path,
    }
  })
})

const option = {
  hideInMenu: '隐藏菜单',
  hideInBreadcrumb: '隐藏面包屑',
  hideInTab: '隐藏标签页',
  affix: '固钉多页签',
  keepAlive: '开启缓存',
  disabled: '禁用菜单',
  status: '状态',
}

const columns = computed<ProFormColumn[]>(() => [
  {
    key: 'name',
    label: '权限名称',
    component: 'input',
    span: 12,
    placeholder: '请输入权限名称',
  },
  {
    key: 'code',
    label: '权限编码',
    component: 'input',
    span: 12,
    placeholder: '请输入权限编码',
  },
  {
    key: 'type',
    label: '权限类型',
    component: 'select',
    span: 12,
    placeholder: '请选择权限类型',
    options: optionsOf(Dict.PermissionType),
  },
  {
    key: 'parentId',
    label: '父级权限',
    component: 'tree-select',
    placeholder: '请选择父级权限',
    span: 12,
    keyField: 'id',
    labelField: 'name',
    filterable: true,
    clearable: true,
    renderPrefix: ({ option }: any) => renderIcon(option.icon),
    options: [
      { id: '0', name: '顶级', children: props.permissionList },
    ],
  },
  {
    key: 'path',
    label: '地址',
    component: 'input',
    placeholder: '请输入地址',
    span: 12,
  },
  {
    key: 'component',
    label: '组件',
    component: 'auto-complete',
    placeholder: '请输入组件',
    span: 12,
    options: componentOptions.value,
  },
  {
    key: 'method',
    label: '请求方法',
    enabled: model.value?.type === 3,
    component: 'select',
    placeholder: '请选择请求方法',
    span: 12,
    options: optionsOf(Dict.RequestMethod),
  },
  {
    key: 'layout',
    label: '布局',
    component: 'select',
    placeholder: '请选择布局',
    span: 12,
    options: optionsOf(Dict.LayoutType),
  },
  {
    key: 'redirect',
    label: '重定向',
    component: 'input',
    placeholder: '请输入重定向',
    span: 12,
  },
  {
    key: 'icon',
    label: '图标',
    component: 'render',
    placeholder: '请选择图标',
    span: 12,
    render: () => h(IconSelect, {
      'value': model.value?.icon,
      'onUpdate:value': (value: string) => { model.value.icon = value },
    }),
  },
  {
    key: 'sort',
    label: '排序',
    component: 'input-number',
    placeholder: '请输入排序',
    span: 12,
  },
  {
    key: 'n1',
    component: 'none',
    span: 24,
  },
  {
    key: 'other',
    component: 'render',
    formItemProps: {
      showLabel: false,
    },
    span: 24,
    render: () => h(NFlex, {}, () => Object.keys(option).map((key) => {
      return h(NCheckbox, {
        checked: model.value?.[key],
        checkedValue: 1,
        uncheckedValue: 0,
        onUpdateChecked: (value: number) => {
          model.value[key] = value
        },
      }, () => option[key as keyof typeof option])
    })),
  },
])

defineExpose(createExposeProxy(formRef))
</script>

<template>
  <ProForm ref="formRef" v-model:value="model" :columns="columns" :rules="rules" />
</template>

<style scoped>

</style>
