<script setup lang="ts">
import type { ILog, ILogQuery } from '@/api/system/log/types'
import type { ProTableColumn, ProTableInst } from '@/components/ProComponents'
import { LogApi } from '@/api/system/log'
import { ProTable } from '@/components/ProComponents'
import { useCrud } from '@/composables/crud'
import { useDict } from '@/composables/dict'
import { Dict } from '@/enums/dict'
import { date } from '@/utils/date'
import { renderOperates } from '@/utils/render'
import { DeleteOutlined } from '@vicons/antd'
import Chart from './components/Chart.vue'
import Details from './components/Details.vue'

defineOptions({ name: 'SystemLog' })

const tableRef = ref<ProTableInst<ILog>>()

const checkedRowKeys = ref<string[]>([])
const {
  model,
  show,
  title,
  remove,
  getById,
} = useCrud<ILog>({
  name: '日志',
  initialValue: { status: 1 },
  removeByIdApi: LogApi.removeById,
  removeByIdsApi: LogApi.removeByIds,
  getByIdApi: LogApi.getById,
  refresh: async () => tableRef.value?.request(),
})
show.details = false

const { renderTag, optionsOf } = useDict()

const columns = computed<ProTableColumn<ILog>[]>(() => [
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
    width: 100,
    align: 'center',
    render: (_, index) => index + 1 + (tableRef.value?.index || 0),
  },
  {
    key: 'url',
    title: '请求URL',
    width: 240,
    ellipsis: { tooltip: true },
    search: true,
  },
  {
    key: 'method',
    title: '请求方法',
    width: 100,
    align: 'center',
    ellipsis: { tooltip: true },
    render: row => renderTag(Dict.RequestMethod, row.method),
    search: {
      component: 'select',
      options: optionsOf(Dict.RequestMethod),
    },
  },
  {
    key: 'type',
    title: '类型',
    width: 120,
    align: 'center',
    render: row => renderTag(Dict.LogType, row.type),
    search: {
      component: 'select',
      options: optionsOf(Dict.LogType),
    },
  },
  {
    key: 'ip',
    title: 'IP',
    width: 120,
    align: 'center',
    ellipsis: { tooltip: true },
    search: true,
  },
  {
    key: 'address',
    title: 'IP地址',
    width: 120,
    align: 'center',
    ellipsis: { tooltip: true },
    search: true,
  },
  {
    key: 'browser',
    title: '浏览器',
    width: 120,
    align: 'center',
    ellipsis: { tooltip: true },
    search: true,
  },
  {
    key: 'os',
    title: '设备',
    width: 220,
    align: 'center',
    ellipsis: { tooltip: true },
    search: true,
  },
  {
    key: 'cost',
    title: '耗时',
    width: 100,
    align: 'center',
    ellipsis: true,
    search: true,
    sorter: {
      multiple: 2,
    },
  },
  {
    key: 'operateTime',
    title: '操作时间',
    width: 180,
    align: 'center',
    ellipsis: true,
    sorter: {
      multiple: 3,
    },
    search: {
      key: 'operateTimestamp',
      component: 'date',
      type: 'daterange',
      onUpdate: (value: number[], row: ILogQuery) => {
        row.operateTime = value?.map(v => date(v))?.join(',')
      },
    } as any,
  },
  {
    key: 'operator',
    title: '操作人',
    width: 120,
    align: 'center',
    ellipsis: true,
    search: true,
  },
  {
    key: 'status',
    title: '状态',
    width: 120,
    align: 'center',
    ellipsis: true,
    render: row => renderTag(Dict.RequestStatus, row.status),
    search: {
      component: 'select',
      options: optionsOf(Dict.RequestStatus),
    },
  },
  {
    title: '操作',
    key: 'actions',
    width: 120,
    align: 'center',
    fixed: 'right',
    render: (row) => {
      return renderOperates([
        {
          key: 'details',
          label: '详情',
          handler: async () => {
            show.details = true
            getById(`${row.id}`)
            title.value = `日志详情`
          },
        },
      ])
    },
  },
])

const query = ref<ILogQuery>({
})

watch(() => tableRef.value?.params, (value) => {
  console.log('params changed', value)
})

async function request(params: any) {
  const { data } = await LogApi.page(params)

  return {
    data: data?.records,
    total: data?.total,
  }
}

onMounted(async () => {
  query.value = {
    method: 'GET',
    a: 'a',
  }
  tableRef.value?.updateParams(query.value)
})
</script>

<template>
  <PageWrapper>
    <Chart />
    <div class="mt-12px" />
    <ProTable ref="tableRef" v-model:checked-row-keys="checkedRowKeys" :columns="columns" :request="request">
      <template #header>
        <n-button :disabled="!checkedRowKeys.length" secondary type="error" @click="remove(checkedRowKeys, { content: '确认删除所选日志吗？' })">
          批量删除
          <template #icon>
            <DeleteOutlined />
          </template>
        </n-button>
        已选择 <span class="text-primary">{{ checkedRowKeys.length }}</span> 条日志
      </template>
      <template #form="{ key, params }">
        <template v-if="key === 'status'">
          <n-input v-model:value="params[key]" @update:value="tableRef?.search()" />
        </template>
      </template>
    </ProTable>

    <ProPopup v-model:show="show.details" :title="title" :footer="false">
      <Details :data="model" />
    </ProPopup>
  </PageWrapper>
</template>

<style scoped>

</style>
