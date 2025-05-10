import type { CheckboxProps } from 'naive-ui'
import type { ExtractPublicPropTypes } from 'vue'
import { checkboxGroupProps } from 'naive-ui'

export const proCheckboxGroupProps = {
  ...checkboxGroupProps,
  options: {
    type: Array as PropType<CheckboxProps[]>,
    default: () => [],
  },
}

export type ProCheckboxGroupProps = ExtractPublicPropTypes<typeof proCheckboxGroupProps>
