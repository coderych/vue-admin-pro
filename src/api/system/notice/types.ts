export interface INoticeQuery {
  /**
   * 内容
   */
  content?: string
  /**
   * 当前页码
   */
  current?: number
  /**
   * 标题
   */
  name?: string
  orderBy?: string
  /**
   * 备注
   */
  remark?: string
  /**
   * 每页记录数
   */
  size?: number
  /**
   * 状态
   */
  status?: number
  /**
   * 类型
   */
  type?: number
  [property: string]: any
}

export interface INotice {
  /**
   * 内容
   */
  content: string
  /**
   * 主键
   */
  id?: string
  /**
   * 标题
   */
  name: string
  /**
   * 备注
   */
  remark?: string
  /**
   * 状态
   */
  status?: number
  /**
   * 类型
   */
  type: number
  /**
   * 乐观锁
   */
  version?: number
  [property: string]: any
}
