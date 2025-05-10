import type { IUser, IUserQuery } from './types'
import { useDelete, useGet, usePost, usePut } from '@/utils/http'

enum Api {
  userApiUrl = '/api/v1/admin/sys/user',
}

export const UserApi = {
  page: (params: IUserQuery) => useGet<Page<IUser>>(`${Api.userApiUrl}/page`, params),
  list: (params: IUserQuery) => useGet<IUser[]>(Api.userApiUrl, params),
  getById: (id: string) => useGet<IUser>(`${Api.userApiUrl}/${id}`),
  save: (data: IUser) => usePost(`${Api.userApiUrl}`, data),
  updateById: (data: IUser) => usePut(`${Api.userApiUrl}`, data),
  removeById: (id: string) => useDelete(`${Api.userApiUrl}/${id}`),
}

export * from './types'
