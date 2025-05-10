declare interface Result<T = any> {
  success: boolean
  code: number
  message: string
  data: T
  timestamp: number
}

declare interface Page<T = any> {
  current: number
  size: number
  total: number
  pages: number
  records: T[]
}
