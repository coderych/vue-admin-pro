import type { IPermission, IPermissionQuery } from './types'
import { useDelete, useGet, usePost, usePut } from '@/utils/http'

enum Api {
  permissionApiUrl = '/api/v1/admin/sys/permission',
}

export const PermissionApi = {
  page: (params: IPermissionQuery) => useGet<Page<IPermission>>(`${Api.permissionApiUrl}/page`, params),
  list: (params: IPermissionQuery) => useGet<IPermission[]>(Api.permissionApiUrl, params),
  getById: (id: string) => useGet<IPermission>(`${Api.permissionApiUrl}/${id}`),
  save: (data: IPermission) => usePost(`${Api.permissionApiUrl}`, data),
  updateById: (data: IPermission) => usePut(`${Api.permissionApiUrl}`, data),
  removeById: (id: string) => useDelete(`${Api.permissionApiUrl}/${id}`),
  removeByIds: (ids: string[]) => useDelete(`${Api.permissionApiUrl}`, { ids }),
  checkPath: (path: string) => useGet<boolean>(`${Api.permissionApiUrl}/check-path`, { path }),
}

export * from './types'
