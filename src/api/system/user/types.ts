export interface IUserQuery {
  /**
   * 头像
   */
  avatar?: string
  current?: number
  /**
   * 邮箱
   */
  email?: string
  /**
   * 性别
   */
  gender?: number
  /**
   * 姓名
   */
  name?: string
  /**
   * 排序字段
   */
  orderBy?: string
  /**
   * 密码
   */
  password?: string
  /**
   * 手机号
   */
  phone?: string
  /**
   * 角色ID列表
   */
  roleIds?: string
  /**
   * 盐
   */
  salt?: string
  size?: number
  /**
   * 状态
   */
  status?: number
  /**
   * 用户名
   */
  username?: string
  deptIds?: string
  dept?: string
  deptId?: string
  deptRole?: string
  [property: string]: any
}

export interface IUser {
  /**
   * 头像
   */
  avatar?: string
  /**
   * 生日
   */
  birthday?: string
  /**
   * 创建时间
   */
  createTime?: string
  /**
   * 创建者
   */
  creator?: string
  /**
   * 邮箱
   */
  email?: string
  /**
   * 性别
   */
  gender?: number
  /**
   * 用户ID
   */
  id?: string
  /**
   * 姓名
   */
  name?: string
  /**
   * 密码
   */
  password?: string
  /**
   * 手机号
   */
  phone?: string
  /**
   * 盐
   */
  salt?: string
  /**
   * 状态
   */
  status?: number
  /**
   * 更新者
   */
  updater?: string
  /**
   * 更新时间
   */
  updateTime?: string
  /**
   * 用户名
   */
  username?: string
  /**
   * 乐观锁
   */
  version?: number
  [property: string]: any
}
