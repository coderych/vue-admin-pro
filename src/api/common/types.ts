export interface LoginResult {
  token: string
  [property: string]: any
}

export interface OneToMany {
  id: string
  ids: string[]
  // 1 新增 2 删除
  type: 1 | 2
  role?: string
}

export interface IUploadForm {
  file: File
  biz?: string
}
