import type { DataTableColumn, TreeOption } from 'naive-ui'
import type { _ProTableProps } from './typing'
import { createInjectionState } from '@vueuse/core'

export function proTableColumnState(props: _ProTableProps) {
  const data = ref<TreeOption[]>([])

  const keys = ref<string[]>([])
  const checkedKeys = ref<string[]>([])

  const isAllChecked = computed(() =>
    checkedKeys.value.length === keys.value.length,
  )
  const indeterminate = computed(() =>
    checkedKeys.value.length > 0 && checkedKeys.value.length < keys.value.length,
  )
  const columnsMap = computed(() => new Map(props.columns?.map(item => [item.key, item])))

  const init = () => {
    data.value = []
    checkedKeys.value = []
    keys.value = []
    for (const column of props.columns || []) {
      if (column.enabled === false) {
        continue
      }
      const option: TreeOption = {
        label: column.title as string,
        key: column.key,
        fixed: column.fixed,
      }
      data.value.push(option)
      if (column.show !== false) {
        checkedKeys.value.push(column.key as string)
      }
    }
    keys.value = data.value.map((item: any) => item.key as string)
  }

  const columns = computed<DataTableColumn[]>(() => {
    return data.value?.filter((item: TreeOption) => checkedKeys.value.includes(item.key as string)).map((item: TreeOption) => {
      const column = columnsMap.value.get(item.key as string)
      return {
        ...column,
        fixed: item.fixed,
      } as DataTableColumn
    })
  })

  const checkAll = (checked: boolean) => {
    if (checked) {
      checkedKeys.value = keys.value.slice()
    }
    else {
      checkedKeys.value = []
    }
  }

  const onUpdateCheckedKeys = (keys: string[]) => {
    checkedKeys.value = keys.slice()
  }

  watch(() => props.columns, () => {
    init()
  }, { immediate: true, deep: true })

  return {
    columns,
    data,
    indeterminate,
    checkedKeys,
    init,
    checkAll,
    isAllChecked,
    onUpdateCheckedKeys,
  }
}

const [useProTableColumnProvider, useProTableColumnInject] = createInjectionState(proTableColumnState)

export { useProTableColumnProvider }

export const useProTableColumnState = (): ReturnType<typeof proTableColumnState> => useProTableColumnInject()!
