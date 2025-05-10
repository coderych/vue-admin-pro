import type { AutoCompleteProps, CascaderProps, CheckboxProps, ColorPickerProps, DatePickerProps, FormItemProps, FormItemRule, InputNumberProps, InputProps, RadioProps, RateProps, SelectProps, SliderProps, TimePickerProps, TransferProps, TreeSelectProps, UploadProps } from 'naive-ui'
import type { ExtractPropTypes, ExtractPublicPropTypes, VNodeChild } from 'vue'
import type { ProCheckboxGroupProps } from '../ProCheckboxGroup/typing'
import type { ProRadioGroupProps } from '../ProRadioGroup/typing'
import type { ProSwitchProps } from '../ProSwitch/typing'
import { formProps, gridProps } from 'naive-ui'

export type ComponentProps = AutoCompleteProps | CascaderProps | ColorPickerProps | CheckboxProps | ProCheckboxGroupProps | DatePickerProps
  | InputProps | InputNumberProps | RadioProps | ProRadioGroupProps | RateProps | SelectProps | SliderProps | ProSwitchProps | TimePickerProps
  | TransferProps | TreeSelectProps | UploadProps

export type ProFormColumn = ComponentProps & {
  key: string
  label?: string
  component?: 'auto-complete' | 'cascader' | 'color-picker' | 'checkbox' | 'checkbox-group' | 'date-picker' | 'input' | 'input-number' | 'editor'
    | 'radio' | 'radio-group' | 'rate' | 'select' | 'slider' | 'switch' | 'time-picker' | 'transfer' | 'tree-select' | 'upload' | 'image' | 'render' | 'none'
  enabled?: boolean
  sort?: number
  span?: number
  value?: any
  render?: (props: { column: ProFormColumn, model: Record<string, any> }) => VNodeChild
  onUpdate?: (value: any, model: Record<string, any>) => boolean | void
  rule?: FormItemRule | FormItemRule[]
  formItemProps?: FormItemProps
  slots?: any
}

export const proFormProps = {
  ...formProps,
  ...gridProps,
  gap: {
    type: Number as PropType<number>,
    default: 12,
  },
  columns: {
    type: Array as PropType<ProFormColumn[]>,
    default: () => [],
  },
}

export type ProFormProps = ExtractPublicPropTypes<typeof proFormProps>
export type _ProFormProps = ExtractPropTypes<typeof proFormProps>
