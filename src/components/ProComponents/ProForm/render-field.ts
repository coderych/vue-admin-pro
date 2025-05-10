import type { ProFormColumn } from './typing'
import { Editor, FileUpload, ImageUpload } from '@/components/Form'
import { NAutoComplete, NCascader, NCheckbox, NColorPicker, NDatePicker, NInput, NInputNumber, NRadio, NRate, NSelect, NSlider, NTimePicker, NTransfer, NTreeSelect } from 'naive-ui'
import ProCheckboxGroup from '../ProCheckboxGroup/index.vue'
import ProRadioGroup from '../ProRadioGroup/index.vue'
import ProSwitch from '../ProSwitch/index.vue'

const componentMap: Record<string, Component> = {
  'auto-complete': NAutoComplete,
  'cascader': NCascader,
  'color-picker': NColorPicker,
  'checkbox': NCheckbox,
  'checkbox-group': ProCheckboxGroup,
  'date-picker': NDatePicker,
  'input': NInput,
  'input-number': NInputNumber,
  'radio': NRadio,
  'radio-group': ProRadioGroup,
  'rate': NRate,
  'select': NSelect,
  'slider': NSlider,
  'switch': ProSwitch,
  'time-picker': NTimePicker,
  'transfer': NTransfer,
  'tree-select': NTreeSelect,
  'upload': FileUpload,
  'image': ImageUpload,
  'editor': Editor,
}

export function renderField(column: ProFormColumn, model: Record<string, any>) {
  if (!column.key) {
    console.warn('ProFormItem without key is not supported.')
    return
  }
  const props: any = {
    'clearable': true,
    'placeholder': column.label,
    'value': column.value ?? get(model, column.key) ?? null,
    'onUpdate:value': (value: any) => {
      set(model, column.key, value)
      column.onUpdate?.(value, model)
    },
    ...column,
  }

  const Component = componentMap[(column.component || 'input') as string]
  if (!Component) {
    console.warn(`ProFormItem component ${column.component} is not supported.`)
    return
  }
  return h(Component, props, column.slots)
}

function set(target: Record<string, any>, path: string, value: any) {
  if (!path) {
    return
  }
  const keys = path.split('.')
  if (keys.length === 1) {
    target[keys[0]] = value
    return
  }

  let obj = target
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (!obj[key] || typeof obj[key] !== 'object') {
      obj[key] = {}
    }
    obj = obj[key]
  }

  obj[keys[keys.length - 1]] = value
}

function get(target: Record<string, any>, path: string) {
  if (!path) {
    return target
  }
  const keys = path.split('.')
  if (keys.length === 1) {
    return target[keys[0]]
  }
  let obj = target
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (!obj[key]) {
      return undefined
    }
    obj = obj[key]
  }
  return obj
}
