<script setup lang="ts">
import type { IUser, IUserQuery } from '@/api/system/user'
import type { ProTableColumn, ProTableInst } from '@/components/ProComponents'
import { DeptApi } from '@/api/system/dept'
import { UserApi } from '@/api/system/user'
import { ProTable } from '@/components/ProComponents'
import { useDict } from '@/composables/dict'
import { useLoading } from '@/composables/loading'
import { renderOperates } from '@/utils/render'
import { DeleteOutlined, PlusOutlined } from '@vicons/antd'
import UserSelectModal from '../../user/components/UserSelectModal.vue'

const props = defineProps<{
  params?: IUserQuery
}>()

const checkedRowKeys = ref<string[]>([])
const { labelOf, Dict, renderTag } = useDict()
const tableRef = ref<ProTableInst | null>(null)
const show = ref(false)
const { isLoading, start, end } = useLoading()

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
    width: 80,
    align: 'center',
    render: (_, index) => (tableRef.value?.index || 0) + index + 1,
  },
  {
    key: 'name',
    title: '姓名',
    ellipsis: true,
    width: 200,
    align: 'center',
    search: true,
  },
  {
    key: 'username',
    title: '用户名',
    ellipsis: true,
    width: 200,
    align: 'center',
  },
  {
    key: 'phone',
    title: '手机号',
    ellipsis: true,
    width: 200,
    align: 'center',
  },
  {
    key: 'email',
    title: '邮箱',
    ellipsis: true,
    width: 200,
    align: 'center',
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
          key: 'delete',
          label: '删除',
          type: 'error',
          icon: DeleteOutlined,
          handler: async () => {
            handleDelete([`${row.id}`])
          },
        },
      ])
    },
  },
])

async function request(params?: any) {
  const { data } = await UserApi.page({
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

async function handleDelete(ids: string[]) {
  try {
    const hide = await window.$Dialog?.warning({ content: `确定从该部门中删除用户吗？` })
    await DeptApi.setUsers({
      id: `${props.params?.deptId}`,
      ids,
      type: 2,
      role: props.params?.deptRole,
    })
    window.$message?.success('删除成功')
    hide()
    tableRef.value?.request()
  }
  catch (error) {
    console.error(error)
  }
}

async function save() {
  show.value = true
  checkedRowKeys.value = []
}

async function handleSave() {
  try {
    start('setUsers')
    await DeptApi.setUsers({
      id: `${props.params?.deptId}`,
      ids: checkedRowKeys.value,
      type: 1,
      role: props.params?.deptRole,
    })
    show.value = false
    checkedRowKeys.value = []
    window.$message?.success('保存成功')
    tableRef.value?.request()
    end('setUsers')
  }
  catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <ProTable ref="tableRef" v-model:checked-row-keys="checkedRowKeys" :columns="columns" :request="request" :manual="true">
    <template #header>
      <n-button type="error" secondary :disabled="!checkedRowKeys.length" @click="handleDelete(checkedRowKeys)">
        批量移除
        <template #icon>
          <DeleteOutlined />
        </template>
      </n-button>
    </template>
    <template #header-extra>
      <n-button type="primary" secondary @click="save()">
        新增{{ labelOf(Dict.DEPT_ROLE, `${params?.deptRole}`) }}
        <template #icon>
          <PlusOutlined />
        </template>
      </n-button>
    </template>
  </ProTable>

  <UserSelectModal v-model:show="show" v-model:value="checkedRowKeys" :loading="isLoading('setUsers')" @ok="handleSave" />
</template>

<style scoped>

</style>
