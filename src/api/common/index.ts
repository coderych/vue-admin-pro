import type { LoginForm, UserInfo } from '@/stores'
import type { LoginResult } from './types'
import { useDelete, useGet, usePost } from '@/utils/http'

enum Api {
  loginApiUrl = '/api/v1/auth/login',
  logoutApiUrl = '/api/v1/auth/logout',
  profileApiUrl = '/api/v1/auth/profile',
  captchaApiUrl = 'api/v1/common/captcha',
  uploadApiUrl = '/api/v1/common/upload',
}

export const CommonApi = {
  captcha: (uuid: string) => useGet<Blob>(`${Api.captchaApiUrl}`, { uuid }, { responseType: 'blob', ignoreToken: true }),
  login: (data: LoginForm) => usePost<LoginResult>(Api.loginApiUrl, data, { ignoreToken: true }),
  logout: () => useDelete(Api.logoutApiUrl),
  profile: () => useGet<UserInfo>(Api.profileApiUrl),
  upload: (data: FormData) => usePost<string>(Api.uploadApiUrl, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
}

export * from './types'
