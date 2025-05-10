import type { ILog, ILogQuery } from './types'
import { useDelete, useGet } from '@/utils/http'

enum Api {
  logApiUrl = '/api/v1/admin/sys/log',
}

export const LogApi = {
  page: (params: ILogQuery) => useGet<Page<ILog>>(`${Api.logApiUrl}/page`, params),
  list: (params: ILogQuery) => useGet<ILog[]>(Api.logApiUrl, params),
  getById: (id: string) => useGet<ILog>(`${Api.logApiUrl}/${id}`),
  removeById: (id: string) => useDelete(`${Api.logApiUrl}/${id}`),
  removeByIds: (ids: string[]) => useDelete(`${Api.logApiUrl}`, ids),
  chart: () => useGet<any>(`${Api.logApiUrl}/chart`),
}

export * from './types'
