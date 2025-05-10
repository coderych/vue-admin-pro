import type { OneToMany } from '@/api/common'
import type { IRole, IRoleQuery } from './types'
import { useDelete, useGet, usePost, usePut } from '@/utils/http'

enum Api {
  roleApiUrl = '/api/v1/admin/sys/role',
}

export const RoleApi = {
  page: (params: IRoleQuery) => useGet<Page<IRole>>(`${Api.roleApiUrl}/page`, params),
  list: (params: IRoleQuery) => useGet<IRole[]>(Api.roleApiUrl, params),
  getById: (id: string) => useGet<IRole>(`${Api.roleApiUrl}/${id}`),
  save: (data: IRole) => usePost(`${Api.roleApiUrl}`, data),
  updateById: (data: IRole) => usePut(`${Api.roleApiUrl}`, data),
  removeById: (id: string) => useDelete(`${Api.roleApiUrl}/${id}`),
  getRolePermissionIds: (id: string) => useGet<string[]>(`${Api.roleApiUrl}/${id}/permissions`),
  setRolePermissions: (data: OneToMany) => usePut(`${Api.roleApiUrl}/${data.id}/permissions`, data),
  setRoleUsers: (data: OneToMany) => usePut(`${Api.roleApiUrl}/${data.id}/users`, data),
}

export * from './types'
