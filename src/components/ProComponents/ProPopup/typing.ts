import type { ExtractPublicPropTypes } from 'vue'
import { drawerProps, modalProps } from 'naive-ui'

export const proPopupProps = {
  ...modalProps,
  ...drawerProps,
  preset: {
    type: String as PropType<'drawer' | 'modal'>,
    default: 'drawer',
  },
  title: {
    type: String as PropType<string>,
    default: undefined,
  },
  width: {
    type: [Number, String] as PropType<number | string>,
    default: 800,
  },
  footer: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  header: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  loading: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
}

export type ProPopupProps = ExtractPublicPropTypes<typeof proPopupProps>
