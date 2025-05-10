<script setup lang="ts">
import type { IDict } from '@/api/system/dict'
import type { ProTableColumn, ProTableInst } from '@/components/ProComponents'
import { DictApi } from '@/api/system/dict'
import { ProTable } from '@/components/ProComponents'
import { useCrud } from '@/composables/crud'
import { useDict } from '@/composables/dict'
import { Dict } from '@/enums/dict'
import { renderOperates } from '@/utils/render'
import { DeleteOutlined, PlusOutlined } from '@vicons/antd'
import { NButton, NSwitch } from 'naive-ui'
import Data from './components/Data.vue'
import Form from './components/Form.vue'

const tableRef = ref<ProTableInst | null>(null)
const {
  show,
  formRef,
  remove,
  submit,
  model,
  updateById,
  loading,
  title,
  updateRow,
  save,
  checkedRowKeys,
} = useCrud<IDict>({
  name: '字典',
  initialValue: {
    parentId: '0',
    status: 1,
  },
  saveApi: DictApi.save,
  getByIdApi: DictApi.getById,
  removeByIdApi: DictApi.removeById,
  updateByIdApi: DictApi.updateById,
  refresh: async () => tableRef.value?.request(),
})
show.data = false

const { optionsOf, renderTag } = useDict()

const columns = computed<ProTableColumn<IDict>[]>(() => [
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
    title: '字典名称',
    ellipsis: true,
    width: 200,
    align: 'center',
    search: true,
    render: row => h(NButton, { text: true, type: 'primary', onClick: () => {
      model.value = { ...row }
      show.data = true
    } }, () => row.name),
  },
  {
    key: 'code',
    title: '字典编码',
    ellipsis: true,
    width: 200,
    align: 'center',
    search: true,
  },
  {
    key: 'type',
    title: '字典类型',
    ellipsis: true,
    width: 100,
    align: 'center',
    render: row => renderTag(Dict.DictType, row.type),
    search: { component: 'select', options: optionsOf(Dict.DictType) },
  },
  {
    key: 'sort',
    title: '显示顺序',
    width: 80,
    align: 'center',
    ellipsis: true,
  },
  {
    key: 'remark',
    title: '备注',
    ellipsis: true,
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
    key: 'actions',
    title: '操作',
    width: 180,
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
          key: 'options',
          label: '数据',
          type: 'success',
          handler: () => {
            model.value = { ...row }
            show.data = true
          },
        },
        {
          key: 'delete',
          label: '删除',
          type: 'error',
          handler: () => {
            remove(`${row.id}`, { content: '确定删除该字典吗？' })
          },
        },
      ])
    },
  },
])

async function request(params: any) {
  const { data } = await DictApi.page({
    ...params,
    parentId: 0,
  })
  return {
    data: data.records,
    total: data.total,
  }
}

async function handleSubmit() {
  await submit()
}
</script>

<template>
  <PageWrapper>
    <ProTable ref="tableRef" v-model:checked-row-keys="checkedRowKeys" :columns="columns" :request="request">
      <template #header>
        <NButton
          type="error" secondary :disabled="checkedRowKeys.length === 0"
          @click="remove(checkedRowKeys, { content: `确认删除${checkedRowKeys.length}条字典？` })"
        >
          批量删除
          <template #icon>
            <DeleteOutlined />
          </template>
        </NButton>
      </template>
      <template #header-extra>
        <NButton type="primary" secondary @click="save({ parentId: '0' })">
          新增字典
          <template #icon>
            <PlusOutlined />
          </template>
        </NButton>
      </template>
    </ProTable>

    <ProPopup v-model:show="show.submit" :title="title" :loading="loading" @ok="handleSubmit()">
      <Form ref="formRef" v-model:value="model" />
    </ProPopup>

    <ProPopup v-model:show="show.data" :title="`${model.name} - 数据`" :footer="false" :width="1200">
      <Data :data="model" />
    </ProPopup>
  </PageWrapper>
</template>

<style scoped>

</style>
