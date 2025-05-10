<script setup lang="ts">
import type { IPermission } from '@/api/system/permission'
import type { ProTableColumn, ProTableInst } from '@/components/ProComponents'
import { PermissionApi } from '@/api/system/permission'
import { useCrud } from '@/composables/crud'
import { useDict } from '@/composables/dict'
import { renderIcon, renderOperates } from '@/utils/render'
import { listToTree } from '@/utils/tree'
import { DeleteOutlined, PlusOutlined } from '@vicons/antd'
import { NSwitch, NTooltip } from 'naive-ui'
import Form from './components/Form.vue'

const tableRef = ref<ProTableInst | null>(null)
const { renderTag, Dict } = useDict()
const permissionList = ref<IPermission[]>([])
const {
  show,
  formRef,
  save,
  remove,
  submit,
  model,
  updateById,
  loading,
  title,
  updateRow,
  checkedRowKeys,
} = useCrud<IPermission>({
  name: '权限',
  initialValue: {
    parentId: '0',
    hideInMenu: 0,
    hideInBreadcrumb: 0,
    hideInTab: 0,
    disabled: 0,
    status: 1,
    layout: 'basic',
  },
  saveApi: PermissionApi.save,
  getByIdApi: PermissionApi.getById,
  removeByIdApi: PermissionApi.removeById,
  updateByIdApi: PermissionApi.updateById,
  removeByIdsApi: PermissionApi.removeByIds,
  refresh: async () => tableRef.value?.request(),
})

const columns = computed<ProTableColumn<IPermission>[]>(() => [
  {
    key: 'id',
    type: 'selection',
    title: '选项',
    width: 60,
    fixed: 'left',
  },
  {
    key: 'name',
    title: '名称',
    width: 200,
    ellipsis: true,
    search: true,
  },
  {
    key: 'type',
    title: '类型',
    width: 100,
    align: 'center',
    ellipsis: true,
    render: row => renderTag(Dict.PermissionType, row.type),
  },
  {
    key: 'icon',
    title: '图标',
    width: 60,
    align: 'center',
    render: row => h(NTooltip, {}, {
      trigger: () => row.icon ? renderIcon(row.icon) : '-',
      default: () => row.icon,
    }),
  },
  {
    key: 'path',
    title: '路径',
    width: 200,
    ellipsis: true,
  },
  {
    key: 'component',
    title: '组件',
    width: 200,
    ellipsis: true,
  },
  {
    key: 'sort',
    title: '显示顺序',
    width: 80,
    align: 'center',
    ellipsis: true,
  },
  {
    key: 'status',
    title: '状态',
    width: 100,
    align: 'center',
    fixed: 'right',
    render: (row) => {
      return h(NSwitch, { value: row.status === 1, onUpdateValue: (value) => {
        row.status = value ? 1 : 0
        updateRow({ ...row })
      } }, {
        checked: () => '启用',
        unchecked: () => '禁用',
      })
    },
  },
  {
    key: 'actions',
    title: '操作',
    width: 100,
    align: 'center',
    fixed: 'right',
    render: (row) => {
      return renderOperates([
        {
          key: 'edit',
          label: '编辑',
          handler: () => {
            updateById(`${row.id}`)
          },
        },
        {
          key: 'delete',
          label: '删除',
          type: 'error',
          handler: () => {
            remove(`${row.id}`, { content: '确认删除该权限？' })
          },
        },
      ])
    },
  },
])

async function request(params: any) {
  const { data } = await PermissionApi.list(params)
  permissionList.value = data
  return {
    data: listToTree(data),
    total: data.length,
  }
}
</script>

<template>
  <PageWrapper>
    <ProTable
      ref="tableRef" v-model:checked-row-keys="checkedRowKeys" :columns="columns" :request="request"
      :pagination="false" cascade
    >
      <template #header>
        <n-button
          type="error" secondary :disabled="checkedRowKeys.length === 0"
          @click="remove(checkedRowKeys, { content: `确认删除${checkedRowKeys.length}条权限？` })"
        >
          批量删除
          <template #icon>
            <DeleteOutlined />
          </template>
        </n-button>
      </template>
      <template #header-extra>
        <n-button type="primary" secondary @click="save()">
          新增
          <template #icon>
            <n-icon :component="PlusOutlined" />
          </template>
        </n-button>
      </template>
    </ProTable>
    <ProPopup v-model:show="show.submit" :title="title" :width="1000" :loading="loading" @ok="submit()">
      <Form ref="formRef" v-model:value="model" :permission-list="permissionList" />
    </ProPopup>
  </PageWrapper>
</template>

<style scoped>

</style>
