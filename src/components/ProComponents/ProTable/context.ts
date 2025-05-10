import type { DataTableProps, DataTableSortState, PaginationInfo, PaginationProps } from 'naive-ui'
import type { _ProTableProps, ProTableColumn } from './typing'
import { createInjectionState } from '@vueuse/core'
import { computed, reactive, ref } from 'vue'

export function proTableState(props: _ProTableProps) {
  const loading = ref<boolean>(false)
  const data = ref<any[]>()
  const columns = computed<ProTableColumn[]>(() => props.columns)
  const tableWidth = computed(() => props.columns?.reduce((acc, cur) => acc + (parseWidth(cur.width || 100)) || 0, 0) || 0)
  const option = computed(() => props.option)
  const pageField = computed(() => props.pageFields?.page || 'current')
  const pageSizeField = computed(() => props.pageFields?.pageSize || 'size')
  const pagination: PaginationProps = reactive({
    page: 1,
    pageSize: 10,
    showSizePicker: true,
    showQuickJumper: true,
    pageSizes: [10, 20, 50, 100],
    prefix: (info: PaginationInfo) => `共${info.itemCount}条`,
  })
  const size = ref<DataTableProps['size']>(props.size || 'medium')
  const isFull = ref<boolean>(false)
  const params = ref<Record<string, any>>({})

  const formProps = computed(() => props.formProps)
  let queryForm: Record<string, any> | undefined = {}
  let orderBy: string | undefined = ''
  const remote = computed<boolean | undefined>(() => {
    if (props.request) {
      return true
    }
    return props.remote
  })

  const request = async (_params?: Record<string, any>) => {
    if (!props.request) {
      return
    }

    try {
      loading.value = true

      params.value = {
        ...params.value,
        orderBy,
        ...queryForm,
        ..._params,
        [pageField.value]: pagination.page,
        [pageSizeField.value]: pagination.pageSize,
      }

      const { data: records = [], total = 0 } = (await props.request(params.value) || {})
      data.value = records
      pagination.itemCount = total

      const page = (pagination.page || 1)

      if (records.length === 0 && page > 1) {
        pagination.page = page - 1
        request().then()
      }
    }
    finally {
      loading.value = false
    }
  }

  pagination['onUpdate:page'] = (page: number) => {
    pagination.page = page
    request().then()
  }

  pagination['onUpdate:pageSize'] = (pageSize: number) => {
    pagination.page = 1
    pagination.pageSize = pageSize
    request().then()
  }

  const search = async (params?: Record<string, any>) => {
    const query = {
      ...params,
      [pageField.value]: 1,
    }
    queryForm = {}
    pagination.page = 1
    await request(query)
    queryForm = params
  }

  const onUpdateSorter = async (options: DataTableSortState | DataTableSortState[] | null) => {
    orderBy = undefined
    const optionsArr = (Array.isArray(options) ? options : [options]).filter(item => item !== null && item.order !== false)
    if (!optionsArr.length) {
      await request()
      return
    }
    const sorter: string = optionsArr.map(item => `${item?.columnKey} ${item?.order === 'ascend' ? 'asc' : 'desc'}`).join(',')
    await request({
      orderBy: sorter,
    })
    orderBy = sorter
  }

  onMounted(() => {
    if (!props.manual) {
      nextTick(() => {
        request().then()
      })
    }
  })

  return {
    columns,
    option,
    remote,
    formProps,
    data: computed(() => {
      if (props.request) {
        return data.value
      }
      return props.data
    }),
    pagination: computed(() => {
      if (props.pagination === false) {
        return false
      }
      if (props.request) {
        return {
          ...props.pagination,
          ...pagination,
        }
      }
      return props.pagination
    }),
    loading: computed(() => {
      if (props.request) {
        return props.loading || loading.value
      }
      return props.loading
    }),
    params,
    request,
    search,
    tableWidth,
    scrollX: computed(() => props.scrollX || tableWidth.value),
    onUpdateSorter: computed(() => props.onUpdateSorter || onUpdateSorter),
    size,
    isFull,
  }
}

const [useProTableProvider, useProTableInject] = createInjectionState(proTableState)

export { useProTableProvider }

export const useProTableState = (): ReturnType<typeof proTableState> => useProTableInject()!

function parseWidth(width: number | string): number {
  if (typeof width === 'number') {
    return width
  }
  return Number.parseInt(width.replace('px', ''))
}
