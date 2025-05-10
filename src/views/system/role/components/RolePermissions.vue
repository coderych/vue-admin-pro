<script setup lang="ts">
import { PermissionApi } from '@/api/system/permission'
import { RoleApi } from '@/api/system/role'
import { listToTree } from '@/utils/tree'
import { computedAsync } from '@vueuse/core'

const props = defineProps<{
  roleId: string
}>()

const cascade = ref(false)
const expandAll = ref(false)
const keyword = ref('')
const checkedKeys = ref<string[]>([])
const permissionIds = ref<string[]>([])
const permissions = computedAsync(async () => {
  const { data } = await PermissionApi.list({})
  permissionIds.value = data.map(item => item.id) as string[]
  return listToTree(data)
})

async function getRolePermissions() {
  const { data } = await RoleApi.getRolePermissionIds(props.roleId)
  checkedKeys.value = data || []
}

async function setRolePermissions() {
  try {
    await RoleApi.setRolePermissions({
      id: props.roleId,
      ids: checkedKeys.value,
      type: 1,
    })
    window.$message?.success('权限保存成功')
  }
  catch (error) {
    console.error(error)
    window.$message?.error('权限保存失败')
  }
}

watch(() => props.roleId, () => {
  nextTick(() => {
    getRolePermissions()
  })
}, { immediate: true })

function handleCheckAll(checked: boolean) {
  checkedKeys.value = checked ? permissionIds.value : []
}
defineExpose({
  submit: setRolePermissions,
})
</script>

<template>
  <div>
    <n-flex :gap="12" :wrap="false" align="center" justify="space-between" class="mb-12px">
      <n-input v-model:value="keyword" clearable placeholder="角色名称" style="width: 240px" />
      <!-- 级联 -->
      <n-flex align="center" :wrap="false">
        <n-checkbox v-model:checked="cascade">
          级联
        </n-checkbox>
        <!-- 全选 -->
        <n-checkbox @update:checked="handleCheckAll">
          全选
        </n-checkbox>
        <!-- 展开 -->
        <n-checkbox v-model:checked="expandAll">
          展开
        </n-checkbox>
      </n-flex>
    </n-flex>

    <n-tree
      v-model:checked-keys="checkedKeys"
      :data="(permissions as any)" :cascade="cascade" :default-expand-all="expandAll"
      label-field="name" key-field="id" :pattern="keyword"
      block-line block-node checkable check-on-click
    />
  </div>
</template>

<style scoped>

</style>
