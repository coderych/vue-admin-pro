<script setup lang="ts">
import type { IRole } from '@/api/system/role'
import type { ProTableColumn, ProTableInst } from '@/components/ProComponents'
import { RoleApi } from '@/api/system/role'
import { PageWrapper } from '@/components/Application'
import { useCrud } from '@/composables/crud'
import { useDict } from '@/composables/dict'
import { Dict } from '@/enums/dict.ts'
import { renderOperates } from '@/utils/render'
import RolePermissions from '@/views/system/role/components/RolePermissions.vue'
import RoleUsers from '@/views/system/role/components/RoleUsers.vue'
import { DeleteOutlined, PlusOutlined } from '@vicons/antd'
import { NSwitch } from 'naive-ui'
import Form from './components/Form.vue'

const tableRef = ref<ProTableInst>()
const permissionsRef = ref<InstanceType<typeof RolePermissions>>()
const { optionsOf } = useDict()
const {
  formRef,
  show,
  title,
  save,
  model,
  remove,
  updateById,
  submit,
  loading,
  updateRow,
  checkedRowKeys,
} = useCrud<IRole>({
  name: '角色',
  initialValue: { status: 1 },
  saveApi: RoleApi.save,
  removeByIdApi: RoleApi.removeById,
  updateByIdApi: RoleApi.updateById,
  getByIdApi: RoleApi.getById,
  refresh: async () => tableRef.value?.request(),
})

show.permissions = false
show.users = false

const columns = computed<ProTableColumn<IRole>[]>(() => [
  {
    key: 'selection',
    type: 'selection',
    width: 50,
    align: 'center',
    title: '选择',
    fixed: 'left',
  },
  {
    key: 'index',
    title: '序号',
    width: 80,
    align: 'center',
    render: (_, index) => (tableRef.value?.index || 0) + index + 1,
  },
  {
    key: 'name',
    title: '名称',
    ellipsis: true,
    width: 200,
    align: 'center',
    search: true,
  },
  {
    key: 'code',
    title: '编码',
    width: 200,
    align: 'center',
    ellipsis: true,
    search: true,
  },
  {
    key: 'sort',
    title: '显示顺序',
    width: 100,
    align: 'center',
    sorter: true,
  },
  {
    key: 'remark',
    title: '备注',
    ellipsis: { tooltip: true },
  },
  {
    key: 'status',
    title: '状态',
    width: 100,
    align: 'center',
    fixed: 'right',
    render: (row) => {
      return h(NSwitch, { value: row.status === 1, onUpdateValue: async (value) => {
        row.status = value ? 1 : 0
        await updateRow({ ...row })
      } }, {
        checked: () => '启用',
        unchecked: () => '禁用',
      })
    },
    search: { component: 'select', options: optionsOf(Dict.Status) },
  },
  {
    key: 'option',
    title: '操作',
    width: 220,
    align: 'center',
    fixed: 'right',
    render: (row) => {
      return renderOperates([
        {
          key: 'users',
          label: '用户',
          handler: async () => {
            model.value = row
            title.value = '角色用户'
            show.users = true
          },
        },
        {
          key: 'permissions',
          label: '权限',
          handler: async () => {
            model.value = row
            title.value = '角色权限'
            show.permissions = true
          },
        },
        {
          key: 'edit',
          label: '编辑',
          handler: async () => {
            await updateById(`${row.id}`)
          },
        },
        {
          key: 'delete',
          label: '删除',
          type: 'error',
          handler: async () => {
            await remove(`${row.id}`, { content: `确认删除【${row.name}】吗？` })
          },
        },
      ], { max: 4 })
    },
  },
])

async function request(params: any) {
  const { data } = await RoleApi.page(params)
  return {
    data: data.records,
    total: data.total,
  }
}

async function handleSubmit() {
  await submit()
}

async function setPermissions() {
  loading.value = true
  await permissionsRef.value?.submit()
  show.permissions = false
  loading.value = false
}
</script>

<template>
  <PageWrapper>
    <ProTable ref="tableRef" v-model:checked-row-keys="checkedRowKeys" :columns="columns" :request="request">
      <template #header>
        <n-button
          type="error" secondary :disabled="checkedRowKeys.length === 0"
          @click="remove(checkedRowKeys, { content: `确认删除${checkedRowKeys.length}条角色？` })"
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

    <ProPopup v-model:show="show.submit" :title="title" :loading="loading" :width="600" @ok="handleSubmit()">
      <Form ref="formRef" v-model:value="model" />
    </ProPopup>

    <ProPopup v-model:show="show.users" :title="title" :loading="loading" :width="1200" :footer="false">
      <RoleUsers :role-id="model.id!" />
    </ProPopup>

    <ProPopup v-model:show="show.permissions" :title="title" :loading="loading" :width="600" @ok="setPermissions()">
      <RolePermissions ref="permissionsRef" :role-id="model.id!" />
    </ProPopup>
  </PageWrapper>
</template>

<style scoped>

</style>
