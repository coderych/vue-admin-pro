export interface IPermissionQuery {
  /**
   * 权限码
   */
  code?: string
  /**
   * 当前页码
   */
  current?: number
  /**
   * 是否禁用
   */
  disabled?: number
  /**
   * 祖籍列表
   */
  ids?: string
  /**
   * 是否缓存
   */
  keepAlive?: number
  /**
   * 菜单key
   */
  activeMenu?: string
  /**
   * 层级
   */
  level?: number
  /**
   * 路由名称
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
   * 路径
   */
  path?: string
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

export interface IPermission {
  /**
   * 是否固定多页签
   */
  affix?: number
  /**
   * 权限码
   */
  code?: string
  /**
   * 组件
   */
  component?: string
  /**
   * 是否禁用
   */
  disabled?: number
  /**
   * 是否隐藏面包屑
   */
  hideInBreadcrumb?: number
  /**
   * 是否隐藏菜单
   */
  hideInMenu?: number
  /**
   * 是否隐藏标签页
   */
  hideInTab?: number
  /**
   * 图标
   */
  icon?: string
  /**
   * ID
   */
  id?: string
  /**
   * 是否缓存
   */
  keepAlive?: number
  /**
   * 菜单key
   */
  activeMenu?: string
  /**
   * 路由名称
   */
  name?: string
  /**
   * 父ID
   */
  parentId: string
  /**
   * 路径
   */
  path?: string
  /**
   * 重定向
   */
  redirect?: string
  /**
   * 布局
   */
  layout?: string
  /**
   * 排序
   */
  sort?: number
  /**
   * 状态
   */
  status?: number
  /**
   * 类型
   */
  type?: number
  /**
   * 乐观锁
   */
  version?: number
  [property: string]: any
}
