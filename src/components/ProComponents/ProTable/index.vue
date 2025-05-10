<script setup lang="ts">
import type { DataTableProps } from 'naive-ui'
import type { ProTableFormSlotProps, ProTableInst } from './typing'
import { debounce, pick } from 'lodash-es'
import { dataTableProps } from 'naive-ui'
import QueryForm from './components/QueryForm.vue'
import TableHeader from './components/TableHeader.vue'
import { useProTableProvider } from './context'
import { useProTableColumnProvider } from './table-column'
import { proTableProps } from './typing'

const props = defineProps(proTableProps)

defineSlots<{
  'default': () => any
  'header': () => any
  'header-extra': () => any
  'form': (props: ProTableFormSlotProps) => any
}>()

const { pagination, data, remote, loading, scrollX, onUpdateSorter, size, isFull, params, search, request } = useProTableProvider(props)
const { columns } = useProTableColumnProvider(props)

const loaded = ref(true)

watch(() => props.size, (value) => {
  size.value = value
}, { immediate: true })

const tableProps = computed<DataTableProps>(() => {
  return {
    ...pick(props, Object.keys(dataTableProps)),
    columns: columns.value,
    remote: remote.value,
    pagination: pagination.value,
    loading: loading.value,
    data: data.value,
    scrollX: scrollX.value,
    size: size.value,
    onUpdateSorter: onUpdateSorter.value,
  }
})

defineExpose<ProTableInst>({
  data: computed(() => data.value) as any,
  index: computed<number>(() => {
    if (!pagination.value) {
      return 0
    }
    return ((pagination.value.page || 1) - 1) * (pagination.value.pageSize || 10)
  }) as any,
  params,
  search: debounce(search, 500),
  request,
  setParams: (newParams: Record<string, any>) => {
    params.value = { ...newParams }
  },
  updateParams: (newParams: Record<string, any>) => {
    params.value = { ...params.value, ...newParams }
  },
  reload: () => {
    loaded.value = false
    nextTick(() => {
      loaded.value = true
    })
  },
})
</script>

<template>
  <div v-if="loaded" class="pro-table-container" :class="{ 'pro-table--full': isFull }">
    <n-scrollbar :content-class="`${isFull ? 'p-12px' : ''}`">
      <QueryForm v-model:value="params" class="mb-12px">
        <template #default="slotProps">
          <slot name="form" v-bind="slotProps" />
        </template>
      </QueryForm>
      <n-card>
        <TableHeader>
          <template #title>
            <slot name="header" />
          </template>
          <template #extra>
            <slot name="header-extra" />
          </template>
        </TableHeader>
        <slot name="default" v-bind="props">
          <n-data-table v-bind="tableProps" />
        </slot>
      </n-card>
    </n-scrollbar>
  </div>
</template>

<style scoped>
.pro-table-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;
  box-sizing: border-box;
}

.pro-table--full {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: var(--base-color);
}
</style>
