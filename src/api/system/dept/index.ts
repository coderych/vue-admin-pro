import type { OneToMany } from '@/api/common'
import type { IDept, IDeptQuery } from './types'
import { useDelete, useGet, usePost, usePut } from '@/utils/http'

enum Api {
  deptApiUrl = '/api/v1/admin/sys/dept',
}

export const DeptApi = {
  page: (params: IDeptQuery) => useGet<Page<IDept>>(`${Api.deptApiUrl}/page`, params),
  list: (params: IDeptQuery) => useGet<IDept[]>(Api.deptApiUrl, params),
  getById: (id: string) => useGet<IDept>(`${Api.deptApiUrl}/${id}`),
  save: (data: IDept) => usePost(`${Api.deptApiUrl}`, data),
  updateById: (data: IDept) => usePut(`${Api.deptApiUrl}`, data),
  removeById: (id: string) => useDelete(`${Api.deptApiUrl}/${id}`),
  setUsers: (data: OneToMany) => usePost(`${Api.deptApiUrl}/${data.id}/users`, data),
}

export * from './types'
