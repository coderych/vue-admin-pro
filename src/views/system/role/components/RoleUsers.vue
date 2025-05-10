<script setup lang="ts">
import type { IUser } from '@/api/system/user'
import type { ProTableColumn, ProTableInst } from '@/components/ProComponents'
import { RoleApi } from '@/api/system/role'
import { UserApi } from '@/api/system/user'
import { ProTable } from '@/components/ProComponents'
import { useDict } from '@/composables/dict'
import { Dict } from '@/enums/dict'
import { DeleteOutlined, PlusOutlined } from '@vicons/antd'

const props = defineProps<{
  roleId: string
}>()

const checkedRowKeys = ref<string[]>([])
const userIds = ref<string[]>([])
const tableRef = ref<ProTableInst | null>(null)
const show = ref(false)
const { optionsOf, renderTag } = useDict()
const mode = ref<'add' | 'del'>('del')

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
  if (mode.value === 'del') {
    params.roleIds = props.roleId
  }
  const { data } = await UserApi.page(params)
  return {
    data: data.records,
    total: data.total,
  }
}
async function handleSubmit(type: 'add' | 'del') {
  const d: any = window.$dialog?.warning({
    title: '提示',
    content: type === 'add' ? '确定分配用户吗？' : '确定移除用户吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      d.loading = true
      await RoleApi.setRoleUsers({
        id: props.roleId,
        ids: type === 'add' ? userIds.value : checkedRowKeys.value,
        type: type === 'add' ? 1 : 2,
      })
      mode.value = 'del'
      tableRef.value?.request()
      d.loading = false
      show.value = false
      window.$message?.success('操作成功')
      checkedRowKeys.value = []
    },
  })
}

function handleAdd() {
  show.value = true
  mode.value = 'add'
}

watch(() => props.roleId, (value: string) => {
  if (value) {
    nextTick(() => {
      tableRef.value?.request()
    })
  }
}, { immediate: true })
</script>

<template>
  <ProTable ref="tableRef" v-model:checked-row-keys="checkedRowKeys" :columns="columns" :request="request" manual>
    <template #header>
      <n-button type="error" secondary :disabled="checkedRowKeys.length === 0" @click="handleSubmit('del')">
        移除关联
        <template #icon>
          <DeleteOutlined />
        </template>
      </n-button>
    </template>
    <template #header-extra>
      <n-flex>
        <n-button type="primary" secondary @click="handleAdd">
          分配用户
          <template #icon>
            <PlusOutlined />
          </template>
        </n-button>
      </n-flex>
    </template>
  </ProTable>

  <ProPopup v-model:show="show" preset="modal" title="选择用户" :width="1200" @ok="handleSubmit('add')" @update:show="mode = 'del'">
    <ProTable v-model:checked-row-keys="userIds" :columns="columns" :request="request" />
  </ProPopup>
</template>

<style scoped>

</style>
