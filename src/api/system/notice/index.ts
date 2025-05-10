import type { INotice, INoticeQuery } from './types'
import { useDelete, useGet, usePost, usePut } from '@/utils/http'

enum Api {
  noticeApiUrl = '/api/v1/admin/sys/notice',
}

export const NoticeApi = {
  page: (params: INoticeQuery) => useGet<Page<INotice>>(`${Api.noticeApiUrl}/page`, params),
  list: (params: INoticeQuery) => useGet<INotice[]>(Api.noticeApiUrl, params),
  getById: (id: string) => useGet<INotice>(`${Api.noticeApiUrl}/${id}`),
  save: (data: INotice) => usePost(`${Api.noticeApiUrl}`, data),
  updateById: (data: INotice) => usePut(`${Api.noticeApiUrl}`, data),
  removeById: (id: string) => useDelete(`${Api.noticeApiUrl}/${id}`),
}

export * from './types'
