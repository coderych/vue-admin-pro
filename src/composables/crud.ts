import type { DialogOptions, FormInst } from 'naive-ui'

export interface ICrudOption<T = any> {
  name?: string
  initialValue?: T
  saveApi?: (data: T) => Promise<any>
  updateByIdApi?: (data: T) => Promise<any>
  removeByIdApi?: (id: any) => Promise<any>
  removeByIdsApi?: (ids: any[]) => Promise<any>
  getByIdApi?: (id: any) => Promise<any>
  refresh?: () => Promise<any>
}

export function useCrud<T extends Record<string, any> = any>(option: ICrudOption<T> = {}) {
  const { name = '', initialValue = {} as T, saveApi, updateByIdApi, removeByIdApi, removeByIdsApi, getByIdApi, refresh } = option

  const model = ref<T>({ ...initialValue }) as MaybeRef<T>
  const currentId = ref<string | null>(null)
  const formRef = ref<FormInst | null>(null)
  const loading = ref<boolean>(false)
  const show = reactive<Record<string, boolean>>({
    submit: false,
    details: false,
  })
  const title = ref<string>(name)
  const checkedRowKeys = ref<string[]>([])

  const save = async (data?: T) => {
    title.value = `${name} - 新增`

    resetModel({ ...initialValue, ...data })

    await nextTick(() => {
      show.submit = true
    })
  }

  const updateById = async (id?: string, data?: T) => {
    if (!id) {
      return
    }
    currentId.value = id
    title.value = `${name} - 更新`
    if (!id) {
      resetModel({ ...initialValue, ...data })
    }
    if (!getByIdApi) {
      throw new Error('getByIdApi is required')
    }
    loading.value = true
    await nextTick(() => {
      show.submit = true
    })
    try {
      const { success, message, data: responseData } = await getByIdApi(id)
      if (!success) {
        throw new Error(message)
      }
      model.value = { ...responseData, ...data }
    }
    finally {
      loading.value = false
    }
  }

  const remove = async (id?: string | string[], dialog?: DialogOptions) => {
    if (!id) {
      return
    }
    const func = async () => {
      if (!id) {
        return
      }
      const api = Array.isArray(id) ? removeByIdsApi : removeByIdApi
      if (!api) {
        throw new Error('if id is array, removeBatchApi is required, otherwise removeByIdApi is required')
      }
      try {
        loading.value = true
        const { success, message: msg } = await api(id as string & string[])
        if (!success) {
          window.$message?.error(msg)
          throw new Error(msg)
        }
        refresh?.()
      }
      finally {
        loading.value = false
      }
    }
    if (dialog !== null) {
      await new Promise((resolve) => {
        const d: any = window.$dialog?.warning({
          positiveText: '确定',
          negativeText: '取消',
          title: '危险操作',
          content: '确定要删除吗？',
          onPositiveClick: async () => {
            d.loading = true
            await func()
            d.loading = false
            resolve(void 0)
          },
          ...dialog,
        })
      })
    }
    else {
      await func()
    }
  }

  const submit = async (data?: T | null, dialog?: DialogOptions, keyField = 'id') => {
    const submitData = { ...model.value, ...data }
    const api = submitData?.[keyField] ? updateByIdApi : saveApi
    if (!api) {
      throw new Error('saveApi or updateApi is required')
    }
    const func = async () => {
      try {
        loading.value = true
        await formRef.value?.validate?.()
        const { success, message: msg } = await api(submitData)
        if (!success) {
          window.$message?.error(msg)
          throw new Error(msg)
        }
        show.submit = false
        refresh?.()
      }
      finally {
        loading.value = false
      }
    }
    if (dialog) {
      await new Promise((resolve) => {
        const d: any = window.$dialog?.warning({
          positiveText: '确定',
          negativeText: '取消',
          title: '警告',
          onPositiveClick: async () => {
            d.loading = true
            await func()
            d.loading = false
            resolve(null)
          },
          ...dialog,
        })
      })
    }
    else {
      await func()
    }
  }

  function resetModel(data: T = {} as T) {
    [...Object.keys(model.value), ...Object.keys(data || {})].forEach((key) => {
      model.value[key] = data?.[key] || null
    })
  }

  async function getById(id: string) {
    if (!getByIdApi) {
      throw new Error('getByIdApi is required')
    }
    try {
      loading.value = true
      const { success, message, data } = await getByIdApi(id)
      if (!success) {
        throw new Error(message)
      }
      model.value = { ...data }
    }
    finally {
      loading.value = false
    }
  }

  const updateRow = async (row: T) => {
    if (!updateByIdApi) {
      throw new Error('updateApi is required')
    }
    try {
      loading.value = true
      const { success, message } = await updateByIdApi(row)
      if (!success) {
        throw new Error(message)
      }
      refresh?.()
    }
    finally {
      loading.value = false
    }
  }

  return {
    currentId,
    model,
    formRef,
    loading,
    show,
    title,
    checkedRowKeys,
    save,
    getById,
    updateById,
    remove,
    submit,
    resetModel,
    updateRow,
  }
}
