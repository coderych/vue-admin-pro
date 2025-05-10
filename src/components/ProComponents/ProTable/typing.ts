import type { DataTableColumn, DataTableProps, DatePickerProps, FormProps, InputNumberProps, InputProps, SelectProps } from 'naive-ui'
import type { ExtractPropTypes, ExtractPublicPropTypes, VNodeChild } from 'vue'
import { dataTableProps } from 'naive-ui'

export type ProTableSearchOption = InputProps & SelectProps & InputNumberProps & DatePickerProps & {
  key?: string
  component?: 'input' | 'select' | 'number' | 'date' | 'tree-select' | 'cascader' | 'render'
  render?: (props: ProTableSearchOption, model: Record<string, any>) => VNodeChild
  // 配置是否启用
  enabled?: boolean
  sort?: number
  onUpdate?: (value: any, model: Record<string, any>) => boolean | void
  span?: number
}

export type ProTableColumn<T = any> = DataTableColumn<T> & {
  key: string
  sort?: number
  // 配置是否启用
  enabled?: boolean
  // 是否显示（在列中隐藏某些列，可在列配置中配置）
  show?: boolean
  title?: string
  search?: boolean | ProTableSearchOption
  onUpdate?: (value: any, record: T) => boolean | void
}

export type ProTableRequest = (params: Record<string, any>) => Promise<{ data: any[], total: number }>

export interface ProTablePageFields {
  page: string
  pageSize: string
}

export interface ProTableOption {
  // 刷新按钮
  reload?: boolean
  // 显示设置按钮
  setting?: boolean
  // 显示搜索框
  search?: boolean
  // 显示搜索按钮
  submit?: boolean
  // 密度
  size?: boolean
  // 全屏
  full?: boolean
}

export const proTableProps = {
  ...dataTableProps,
  columns: {
    type: Array as PropType<ProTableColumn[]>,
    default: () => [],
  },
  // 手动触发请求
  manual: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  request: {
    type: Function as PropType<ProTableRequest>,
    default: undefined,
  },
  pagination: {
    type: [Boolean, Object] as PropType<DataTableProps['pagination']>,
    default: () => ({}),
  },
  pageFields: {
    type: Object as PropType<ProTablePageFields>,
    default: () => ({ page: 'current', pageSize: 'size' }),
  },
  option: {
    type: [Object, Boolean] as PropType<false | ProTableOption>,
    default: () => ({ reload: true, setting: true }),
  },
  rowKey: {
    type: Function as PropType<DataTableProps['rowKey']>,
    default: (row: any) => row.id,
  },
  formProps: {
    type: Object as PropType<FormProps>,
    default: () => ({}),
  },
  renderCell: {
    type: Function as PropType<DataTableProps['renderCell']>,
    default: (value: any) => value || '-',
  },
}

export interface ProTableInst<T = any> {
  index: number
  data?: T[]
  params: Record<string, any>
  search: (params?: Record<string, any>) => void
  request: (params?: Record<string, any>) => void
  setParams: (params: Record<string, any>) => void
  updateParams: (params: Record<string, any>) => void
  reload: () => void
}

export interface ProTableFormSlotProps {
  key: string
  value: any
  option: ProTableSearchOption
  params: Record<string, any>
  column: ProTableColumn<any>
}

export type _ProTableProps = ExtractPropTypes<typeof proTableProps>
export type ProTableProps = ExtractPublicPropTypes<typeof proTableProps>
