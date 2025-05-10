import type { Component } from 'vue'
import type { ProTableColumn, ProTableSearchOption } from '../typing'
import { NCascader, NDatePicker, NInput, NInputNumber, NSelect, NTreeSelect } from 'naive-ui'

const componentMap: Record<string, Component> = {
  'input': NInput,
  'select': NSelect,
  'number': NInputNumber,
  'date': NDatePicker,
  'cascader': NCascader,
  'tree-select': NTreeSelect,
}

export function renderField(column: ProTableColumn, model: Record<string, any>, onSearch: any) {
  const option = getSearchOption(column) || {}
  const key = option?.key || column?.key
  if (!key) {
    console.warn('column.key or column.search.key is required')
  }

  const commonProps: any = {
    'clearable': true,
    'placeholder': column.title,
    'value': model?.[key],
    ...option,
    'onUpdate:value': (value: any) => {
      model[key] = value
      option.onUpdate?.(value, model)
      onSearch?.()
    },
  }
  const component = option.component || 'input'

  if (component === 'render') {
    return option.render?.(commonProps, model)
  }

  return h(componentMap[component], commonProps)
}

export function getSearchOption(column: ProTableColumn): ProTableSearchOption | null {
  const search = column.search
  if (search instanceof Object) {
    return {
      ...search,
      key: search.key || column.key,
    }
  }
  if (search === true) {
    return { key: column.key }
  }
  return null
}
