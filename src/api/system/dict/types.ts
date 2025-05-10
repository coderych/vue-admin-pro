export interface IDictQuery {
  /**
   * 分类
   */
  type?: string
  /**
   * 当前页码
   */
  current?: number
  /**
   * 扩展信息
   */
  extra?: string
  /**
   * 祖籍列表
   */
  ids?: string
  /**
   * 字典名
   */
  label?: string
  /**
   * 排序字段
   */
  orderBy?: string
  /**
   * 父ID
   */
  parentId?: string
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
  /**
   * 数据类型
   */
  dataType?: string
  /**
   * 字典值
   */
  value?: string
  category?: string
  [property: string]: any
}

export interface IDict {
  /**
   * 分类
   */
  type?: string
  /**
   * 当前页码
   */
  current?: number
  /**
   * 扩展信息
   */
  extra?: string
  /**
   * 祖籍列表
   */
  ids?: string
  /**
   * 字典名
   */
  name?: string
  /**
   * 排序字段
   */
  orderBy?: string
  /**
   * 父ID
   */
  parentId?: string
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
  /**
   * 数据类型
   */
  dataType?: string
  /**
   * 字典值
   */
  code?: string
  [property: string]: any
}
