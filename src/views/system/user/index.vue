<script setup lang="ts">
import type { IUser } from '@/api/system/user/types'
import type { ProTableColumn, ProTableInst } from '@/components/ProComponents'
import { UserApi } from '@/api/system/user'
import { ProTable } from '@/components/ProComponents'
import { useCrud } from '@/composables/crud'
import { useDict } from '@/composables/dict'
import { renderOperates } from '@/utils/render'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@vicons/antd'
import { NImage } from 'naive-ui'
import Form from './components/Form.vue'

defineOptions({ name: 'SystemUser' })

const tableRef = ref<ProTableInst<IUser>>()

const {
  model,
  formRef,
  show,
  title,
  save,
  remove,
  updateById,
  submit,
  loading,
} = useCrud<IUser>({
  name: '用户',
  initialValue: { status: 1 },
  saveApi: UserApi.save,
  removeByIdApi: UserApi.removeById,
  updateByIdApi: UserApi.updateById,
  getByIdApi: UserApi.getById,
  refresh: async () => tableRef.value?.request(),
})
const { renderTag, optionsOf, Dict } = useDict()

const columns = computed<ProTableColumn<IUser>[]>(() => [
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
    width: 60,
    align: 'center',
    render: (_, index) => index + 1 + (tableRef.value?.index || 0),
  },
  {
    title: '头像',
    key: 'avatar',
    width: 80,
    align: 'center',
    render: row => h(NImage, { src: row.avatar, height: 40, width: 40 }),
  },
  {
    title: '用户名',
    key: 'username',
    width: 120,
    search: true,
    align: 'center',
  },
  {
    title: '姓名',
    key: 'name',
    width: 120,
    align: 'center',
    search: true,
  },
  {
    title: '邮箱',
    key: 'email',
    width: 120,
    align: 'center',
    ellipsis: { tooltip: true },
    search: false,
  },
  {
    title: '手机号',
    key: 'phone',
    width: 120,
    align: 'center',
    search: true,
  },
  {
    title: '性别',
    key: 'gender',
    width: 60,
    align: 'center',
    render: row => renderTag(Dict.Gender, row.gender),
  },
  {
    title: '状态',
    key: 'status',
    width: 120,
    align: 'center',
    render: row => renderTag(Dict.Status, row.status),
    search: {
      component: 'select',
      options: optionsOf(Dict.Status),
    },
  },
  {
    title: '创建时间',
    key: 'createTime',
    width: 200,
    align: 'center',
    sorter: true,
    defaultSortOrder: 'ascend',
  },
  {
    title: '更新时间',
    key: 'updateTime',
    width: 200,
    align: 'center',
  },
  {
    title: '操作',
    key: 'actions',
    width: 150,
    align: 'center',
    fixed: 'right',
    render: (row) => {
      return renderOperates([
        {
          key: 'edit',
          label: '编辑',
          type: 'warning',
          icon: EditOutlined,
          handler: () => {
            updateById(row.id)
          },
        },
        {
          key: 'delete',
          label: '删除',
          type: 'error',
          icon: DeleteOutlined,
          handler: async () => {
            await remove(row.id)
          },
        },
      ])
    },
  },
])

async function request(params: any) {
  const { data } = await UserApi.page(params)

  return {
    data: data?.records,
    total: data?.total,
  }
}
</script>

<template>
  <PageWrapper>
    <ProTable ref="tableRef" :columns="columns" :request="request">
      <template #header-extra>
        <n-button type="primary" secondary @click="save()">
          新增
          <template #icon>
            <PlusOutlined />
          </template>
        </n-button>
      </template>
    </ProTable>

    <ProPopup v-model:show="show.submit" :title="title" :width="500" :loading="loading" @ok="submit()">
      <Form ref="formRef" v-model:value="model" />
    </ProPopup>
  </PageWrapper>
</template>

<style scoped>

</style>
