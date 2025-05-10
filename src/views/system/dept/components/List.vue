<script setup lang="ts">
import type { IDept, IDeptQuery } from '@/api/system/dept'
import type { ProTableColumn, ProTableInst } from '@/components/ProComponents'
import { DeptApi } from '@/api/system/dept'
import { ProPopup, ProTable } from '@/components/ProComponents'
import { useCrud } from '@/composables/crud'
import { useDict } from '@/composables/dict'
import { renderOperates } from '@/utils/render'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@vicons/antd'
import Form from './Form.vue'

const props = defineProps<{
  params?: IDeptQuery
}>()

const emit = defineEmits<{
  reload: []
}>()

const tableRef = ref<ProTableInst | null>(null)
const { renderTag, Dict } = useDict()

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
} = useCrud<IDept>({
  name: '部门',
  initialValue: { status: 1 },
  saveApi: DeptApi.save,
  removeByIdApi: DeptApi.removeById,
  updateByIdApi: DeptApi.updateById,
  getByIdApi: DeptApi.getById,
  refresh: async () => {
    tableRef.value?.request()
    emit('reload')
  },
})

const columns = computed<ProTableColumn<IDept>[]>(() => [
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
    title: '部门名称',
    ellipsis: true,
    width: 200,
    align: 'center',
    search: true,
  },
  {
    key: 'remark',
    title: '备注',
    ellipsis: true,
    width: 200,
    align: 'center',
  },
  {
    title: '状态',
    key: 'status',
    width: 120,
    align: 'center',
    render: row => renderTag(Dict.Status, row.status),
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

async function request(params?: any) {
  const { data } = await DeptApi.page({
    ...params,
    ...props.params,
  })
  return {
    data: data.records,
    total: data.total,
  }
}

watch(() => props.params, () => {
  nextTick(() => {
    tableRef.value?.request()
  })
}, { deep: true, immediate: true })
</script>

<template>
  <ProTable ref="tableRef" :columns="columns" :request="request" :manual="true">
    <template #header-extra>
      <n-button type="primary" secondary @click="save()">
        新增
        <template #icon>
          <PlusOutlined />
        </template>
      </n-button>
    </template>
  </ProTable>

  <ProPopup v-model:show="show.submit" :title="title" :loading="loading" :width="500" @ok="submit()">
    <Form ref="formRef" v-model:value="model" />
  </ProPopup>
</template>

<style scoped>

</style>
