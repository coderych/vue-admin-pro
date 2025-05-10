import type { IDict, IDictQuery } from './types'
import { useDelete, useGet, usePost, usePut } from '@/utils/http'

enum Api {
  dictApiUrl = '/api/v1/admin/sys/dict',
}

export const DictApi = {
  page: (params: IDictQuery) => useGet<Page<IDict>>(`${Api.dictApiUrl}/page`, params),
  list: (params: IDictQuery) => useGet<IDict[]>(Api.dictApiUrl, params),
  getById: (id: string) => useGet<IDict>(`${Api.dictApiUrl}/${id}`),
  save: (data: IDict) => usePost(`${Api.dictApiUrl}`, data),
  updateById: (data: IDict) => usePut(`${Api.dictApiUrl}`, data),
  removeById: (id: string) => useDelete(`${Api.dictApiUrl}/${id}`),
}

export * from './types'
