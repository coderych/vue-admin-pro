<script setup lang="ts">
import type { ModalProps } from 'naive-ui'
import { parseCssSize } from '@/utils/common'
import { omit, pick } from 'lodash-es'
import { drawerProps, modalProps } from 'naive-ui'
import { proPopupProps } from './typing'

const props = defineProps(proPopupProps)

const emit = defineEmits<{
  ok: []
  close: []
}>()

defineSlots<{
  'default': () => any
  'header': () => any
  'footer': () => any
  'header-extra': () => any
}>()

const show = defineModel<boolean>('show', { default: false })
</script>

<template>
  <n-drawer v-if="preset === 'drawer'" v-bind="pick(props, Object.keys(drawerProps))" v-model:show="show" :title="undefined">
    <n-drawer-content closable :native-scrollbar="false" :title="title">
      <template v-if="header" #header>
        <slot name="header">
          <n-flex align="center" justify="space-between">
            <span>{{ title }}</span>
            <slot name="header-extra" />
          </n-flex>
        </slot>
      </template>
      <slot name="default" />
      <template v-if="footer" #footer>
        <n-flex>
          <n-button @click="show = false">
            取消
          </n-button>
          <n-button type="primary" :loading="loading" @click="emit('ok')">
            确定
          </n-button>
        </n-flex>
      </template>
    </n-drawer-content>
  </n-drawer>
  <n-modal
    v-else-if="preset === 'modal'"
    v-bind="(omit(pick(props, Object.keys(modalProps)), ['footer', 'header']) as ModalProps)"
    v-model:show="show" preset="card" :style="{ width: `${parseCssSize(width)}` }"
  >
    <template v-if="header" #header>
      <slot name="header">
        {{ title }}
      </slot>
    </template>
    <template #header-extra>
      <slot name="header-extra" />
    </template>
    <slot name="default" />
    <template v-if="footer" #footer>
      <slot name="footer">
        <n-flex align="center" justify="end">
          <n-button @click="show = false">
            取消
          </n-button>
          <n-button type="primary" :loading="loading" @click="emit('ok')">
            确定
          </n-button>
        </n-flex>
      </slot>
    </template>
  </n-modal>
</template>

<style scoped>

</style>
