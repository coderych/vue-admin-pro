import type { ButtonProps, DialogOptions, FlexProps, IconProps, TagProps } from 'naive-ui'
import type { Component } from 'vue'
import * as icons from '@vicons/antd'
import { NButton, NDropdown, NFlex, NIcon, NTag, NTooltip } from 'naive-ui'

export function renderIcon(icon?: Component | string, props?: IconProps) {
  if (!icon) {
    return undefined
  }
  if (typeof icon === 'string') {
    const component = icons[icon as keyof typeof icons] as Component
    if (!component) {
      return undefined
    }
    return h(NIcon, { ...props }, {
      default: () => h(component),
    })
  }

  return h(NIcon, { ...props }, {
    default: () => h(icon),
  })
}

export function renderNIcon(icon?: Component | string, props?: IconProps) {
  if (!icon) {
    return undefined
  }
  if (typeof icon === 'string') {
    const component = icons[icon as keyof typeof icons] as Component
    if (!component) {
      return undefined
    }
    return () => h(NIcon, { ...props }, {
      default: () => h(component),
    })
  }

  return () => h(NIcon, { ...props }, {
    default: () => h(icon),
  })
}

export interface Option extends Record<string, any> {
  label: string
  value: any
  props?: Record<string, any>
  type?: TagProps['type']
}

export function renderTag(value: string, options: Option[]) {
  const option = options.find(item => item.value === value)
  if (!option) {
    return null
  }
  return h(NTag, { type: option.type, ...option.props }, () => option.label)
}

export interface RenderOperatesOption {
  max?: number
  flex?: FlexProps
}

export interface Operate extends ButtonProps {
  key: string
  icon?: Component
  label?: string
  handler?: (...args: any[]) => void | Promise<void>
  disabled?: boolean
  tooltip?: string
  enabled?: boolean
  dialog?: DialogOptions
}

export function renderOperates(operates: Operate[], option: RenderOperatesOption = { max: 3 }) {
  const { max = 3, flex = {} } = option
  const enabledOperates = operates.filter(item => item.enabled !== false)
  let count = enabledOperates.length
  if (count === 0) {
    return
  }
  if (count > max) {
    count = max - 1
  }
  const moreOperates = enabledOperates.slice(count)?.map(item => ({
    ...item,
    icon: renderNIcon(item.icon),
  }))

  const components = enabledOperates.slice(0, count).map((item) => {
    const { tooltip, dialog, label, icon } = item
    return h(NTooltip, { disabled: !item.tooltip }, {
      trigger: () => h(NButton, {
        text: true,
        type: 'primary',
        onClick: async (...args: any[]) => {
          if (dialog) {
            const d = window.$dialog?.warning({ title: '确认操作', positiveText: '确认', negativeText: '取消', onPositiveClick: async () => {
              d.loading = true
              await item.handler?.(...args)
              d.loading = false
            }, ...dialog })
          }
          else {
            item.handler?.(...args)
          }
        },
        ...item,
      }, {
        default: () => label,
        icon: renderNIcon(icon),
      }),
      default: () => tooltip,
    })
  })

  if (moreOperates?.length) {
    components.push(h(NDropdown, {
      showArrow: true,
      options: moreOperates,
      trigger: 'hover',
      renderOption: ({ node, option }) => (h(NTooltip, { style: 'width: max-content;', disabled: !option.tooltip }, {
        trigger: () => [node],
        default: () => option.tooltip,
      })),
      onSelect: (_, option = {}) => {
        const { dialog, handler } = option as Operate
        if (dialog) {
          const d: any = window.$dialog?.warning({
            title: '确认操作',
            positiveText: '确认',
            negativeText: '取消',
            ...dialog,
            onPositiveClick: async () => {
              d.loading = true
              await handler?.()
              d.loading = false
            },
          })
        }
        else {
          handler?.()
        }
      },
    }, () => h(NButton, { text: true, type: 'primary' }, {
      default: () => '更多',
      icon: renderNIcon(icons.MoreOutlined),
    })))
  }

  return h(NFlex, { align: 'center', justify: 'center', wrap: false, ...flex }, () => components)
}
