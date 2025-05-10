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
import { NSwitch } from 'naive-ui'
import Form from './Form.vue'

const props = defineProps<{
  data: IDict
}>()

const emit = defineEmits(['update'])

const tableRef = ref<ProTableInst | null>(null)
const {
  show,
  formRef,
  remove,
  submit,
  model,
  updateById,
  loading,
  updateRow,
  checkedRowKeys,
  save,
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
const { optionsOf } = useDict()

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
    title: '名称',
    ellipsis: true,
    width: 150,
    align: 'center',
    search: true,
  },
  {
    key: 'code',
    title: '编码',
    ellipsis: true,
    width: 250,
    align: 'center',
    search: true,
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
    align: 'center',
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
        emit('update')
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
    width: 120,
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
    parentId: props.data?.id,
  })
  return {
    data: data.records,
    total: data.total,
  }
}

async function handleSubmit() {
  await submit()
  emit('update')
}

watch(() => props.data, () => {
  nextTick(() => {
    tableRef.value?.request()
  })
}, { immediate: true, deep: true })
</script>

<template>
  <ProTable ref="tableRef" v-model:checked-row-keys="checkedRowKeys" :columns="columns" :request="request" :manual="true">
    <template #header>
      <n-button
        type="error" secondary :disabled="checkedRowKeys.length === 0"
        @click="remove(checkedRowKeys, { content: `确认删除${checkedRowKeys.length}条数据？` })"
      >
        批量删除
        <template #icon>
          <DeleteOutlined />
        </template>
      </n-button>
    </template>
    <template #header-extra>
      <n-button type="primary" secondary @click="save({ parentId: data?.id, type: data?.type })">
        新增数据
        <template #icon>
          <PlusOutlined />
        </template>
      </n-button>
    </template>
  </ProTable>

  <ProPopup v-model:show="show.submit" :title="`新增数据 - ${data?.name}`" :loading="loading" preset="modal" @ok="handleSubmit()">
    <Form ref="formRef" v-model:value="model" />
  </ProPopup>
</template>

<style scoped>

</style>
