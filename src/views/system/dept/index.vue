<script setup lang="ts">
import type { IDept } from '@/api/system/dept'
import type { TreeOption } from 'naive-ui'
import { DeptApi } from '@/api/system/dept'
import { useCrud } from '@/composables/crud'
import { useDict } from '@/composables/dict'
import { renderOperates } from '@/utils/render'
import { listToTree } from '@/utils/tree'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@vicons/antd'
import DeptUsers from './components/DeptUsers.vue'
import Form from './components/Form.vue'
import List from './components/List.vue'

const { optionsOf, Dict } = useDict()

const {
  formRef,
  save,
  remove,
  submit,
  model,
  updateById,
  loading,
  title,
  show,
} = useCrud<IDept>({
  name: '权限',
  initialValue: {
  },
  saveApi: DeptApi.save,
  getByIdApi: DeptApi.getById,
  removeByIdApi: DeptApi.removeById,
  updateByIdApi: DeptApi.updateById,
  refresh: init,
})

const list = ref<IDept[]>([])
const data = ref<IDept[]>([])
const pattern = ref('')
const selectedKey = ref<string>('')
const activeTab = ref('children')

async function init() {
  const { data: deptList } = await DeptApi.list({})
  list.value = deptList
  data.value = listToTree(deptList)
  selectedKey.value = `${data.value?.[0]?.id}`
}

init()

function nodeProps({ option }: { option: TreeOption }) {
  return {
    onMouseenter: () => {
      option.showAction = true
    },
    onMouseleave: () => {
      option.showAction = false
    },
    onClick: () => {
      selectedKey.value = `${option?.id}`
    },
  }
}

function renderSuffix({ option }: { option: TreeOption }) {
  if (!option.showAction && selectedKey.value !== `${option.id}`) {
    return null
  }
  return renderOperates([
    {
      key: 'update',
      type: 'success',
      icon: EditOutlined,
      handler: async (e: MouseEvent) => {
        e?.stopPropagation()
        updateById(`${option.id}`)
      },
    },
    {
      key: 'delete',
      type: 'error',
      icon: DeleteOutlined,
      handler: async () => {
        await remove(`${option.id}`, { title: '删除权限', content: '确认删除该权限？' })
        window.$message?.success('删除成功')
      },
    },
  ])
}
</script>

<template>
  <PageWrapper preset="layout">
    <template #sider>
      <div class="flex-col gap-12px p-12px">
        <n-input-group>
          <n-input v-model:value="pattern" placeholder="搜索部门" clearable />
          <n-button type="primary" @click="save({ parentId: '0' })">
            新增
            <template #icon>
              <PlusOutlined />
            </template>
          </n-button>
        </n-input-group>
        <n-tree
          :selected-keys="[selectedKey]" :data="data" key-field="id"
          label-field="name" block-line block-node
          :pattern="pattern" default-expand-all :render-suffix="renderSuffix"
          :node-props="nodeProps"
        />
      </div>
    </template>

    <n-card v-if="selectedKey" content-class="flex-col gap-12px" :bordered="false">
      <n-tabs v-model:value="activeTab" type="line">
        <n-tab name="children">
          部门列表
        </n-tab>
        <n-tab v-for="item in optionsOf(Dict.DEPT_ROLE)" :key="item.value" :name="`${item.value}`">
          {{ item.label }}
        </n-tab>
      </n-tabs>

      <List v-if="activeTab === 'children'" :params="{ ids: selectedKey }" @reload="init()" />
      <DeptUsers v-else :params="{ deptId: selectedKey, deptRole: activeTab }" />
    </n-card>
    <n-empty v-else class="mt-10%" size="huge" description="请选择部门" />

    <ProPopup v-model:show="show.submit" :title="title" :loading="loading" :width="500" @ok="submit()">
      <Form ref="formRef" v-model:value="model" />
    </ProPopup>
  </PageWrapper>
</template>

<style scoped>

</style>
