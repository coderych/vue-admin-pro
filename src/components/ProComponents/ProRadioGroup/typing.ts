import type { RadioProps } from 'naive-ui'
import type { ExtractPublicPropTypes } from 'vue'
import { radioGroupProps } from 'naive-ui'

export const proRadioGroupProps = {
  ...radioGroupProps,
  options: {
    type: Array as PropType<RadioProps[]>,
    default: () => [],
  },
  optionType: {
    type: String as PropType<'default' | 'button'>,
    default: 'button',
  },
  buttonStyle: {
    type: String as PropType<'solid' | 'outline'>,
    default: 'solid',
  },
}

export type ProRadioGroupProps = ExtractPublicPropTypes<typeof proRadioGroupProps>
