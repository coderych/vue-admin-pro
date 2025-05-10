export interface ILogQuery {
  /**
   * 耗时
   */
  cost?: number
  /**
   * 当前页码
   */
  current?: number
  /**
   * IP
   */
  ip?: string
  /**
   * 方法
   */
  method?: string
  /**
   * 操作人
   */
  operator?: string
  orderBy?: string
  /**
   * 参数
   */
  params?: string
  /**
   * 结果
   */
  result?: string
  /**
   * 每页记录数
   */
  size?: number
  /**
   * 状态
   */
  status?: number
  /**
   * 请求方式
   */
  type?: string
  /**
   * 请求URL
   */
  url?: string
  [property: string]: any
}

export interface ILog {
  /**
   * 耗时
   */
  cost?: number
  /**
   * 主键
   */
  id?: number
  /**
   * IP
   */
  ip?: string
  /**
   * 地址
   */
  address?: string
  /**
   * 浏览器
   */
  browser?: string
  /**
   * 设备
   */
  os?: string
  /**
   * 方法
   */
  method?: string
  /**
   * 操作时间
   */
  operateTime?: string
  /**
   * 操作人
   */
  operator?: string
  /**
   * 参数
   */
  params?: string
  /**
   * 结果
   */
  result?: string
  /**
   * 状态
   */
  status?: number
  /**
   * 请求方式
   */
  type?: string
  /**
   * 请求URL
   */
  url?: string
  [property: string]: any
}
