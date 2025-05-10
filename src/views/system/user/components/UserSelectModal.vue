<script setup lang="ts">
import type { IUser, IUserQuery } from '@/api/system/user'
import type { ProTableColumn, ProTableInst } from '@/components/ProComponents'
import { UserApi } from '@/api/system/user'
import { ProPopup, ProTable } from '@/components/ProComponents'
import { useDict } from '@/composables/dict'
import { Dict } from '@/enums/dict'

const props = defineProps<{
  params?: IUserQuery
  loading?: boolean
}>()

const emit = defineEmits<{
  ok: [keys: string[], rows: IUser[]]
}>()

const show = defineModel<boolean>('show', { default: false })
const checkedRowKeys = defineModel<string[]>('value', { default: [] })

const tableRef = ref<ProTableInst | null>(null)
const { optionsOf, renderTag } = useDict()
const checkedRows = ref<IUser[]>([])

const columns = computed<ProTableColumn<IUser>[]>(() => [
  {
    key: 'selection',
    type: 'selection',
    align: 'center',
    width: 60,
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
    title: '用户名',
    key: 'username',
    search: true,
  },
  {
    title: '姓名',
    key: 'name',
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
    title: '状态',
    key: 'status',
    width: 100,
    align: 'center',
    search: { component: 'select', options: optionsOf(Dict.Status) },
    render: row => renderTag(Dict.Status, row.status),
  },
  {
    title: '创建时间',
    key: 'createTime',
    width: 200,
    align: 'center',
  },
  {
    title: '更新时间',
    key: 'updateTime',
    width: 200,
    align: 'center',
  },
])

async function request(params: Record<string, any>) {
  const { data } = await UserApi.page({
    ...params,
    ...props.params,
  })
  return {
    data: data.records,
    total: data.total,
  }
}

function onUpdateCheckedRowKeys(keys: any[], rows: any[]) {
  checkedRowKeys.value = keys
  checkedRows.value = rows
}
</script>

<template>
  <ProPopup v-model:show="show" preset="modal" title="选择用户" :width="1200" :loading="loading" @ok="emit('ok', checkedRowKeys, checkedRows)">
    <ProTable v-model:checked-row-keys="checkedRowKeys" :columns="columns" :request="request" @update-checked-row-keys="onUpdateCheckedRowKeys">
      <template #header>
        已选用户：{{ checkedRows.length }}
      </template>
    </ProTable>
  </ProPopup>
</template>

<style scoped>

</style>
