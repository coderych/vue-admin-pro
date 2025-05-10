import type { ExtractPublicPropTypes } from 'vue'
import { switchProps } from 'naive-ui'

export const proSwitchProps = {
  ...switchProps,
  checkedText: {
    type: String as PropType<string>,
    default: undefined,
  },
  uncheckedText: {
    type: String as PropType<string>,
    default: undefined,
  },
  icon: {
    type: Object as PropType<Component>,
    default: undefined,
  },
  checkedIcon: {
    type: Object as PropType<Component>,
    default: undefined,
  },
  uncheckedIcon: {
    type: Object as PropType<Component>,
    default: undefined,
  },
}

export type ProSwitchProps = ExtractPublicPropTypes<typeof proSwitchProps>
