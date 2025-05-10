export interface IDeptQuery {
  /**
   * 编码
   */
  code?: string
  /**
   * 当前页码
   */
  current?: number
  /**
   * 名称
   */
  name?: string
  /**
   * 排序字段
   */
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
   * 排序
   */
  sort?: number
  /**
   * 状态
   */
  status?: number
  [property: string]: any
}

export interface IDept {
  /**
   * 编码
   */
  code?: string
  /**
   * ID
   */
  id?: string
  /**
   * 名称
   */
  name?: string
  /**
   * 备注
   */
  remark?: string
  /**
   * 排序
   */
  sort?: number
  /**
   * 状态
   */
  status?: number
  /**
   * 乐观锁
   */
  version?: number
  [property: string]: any
}
