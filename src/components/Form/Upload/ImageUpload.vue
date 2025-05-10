<script setup lang="ts">
import type { UploadProps } from 'naive-ui'
import { pick } from 'lodash-es'
import { uploadProps } from 'naive-ui'
import FileUpload from './FileUpload.vue'

const props = defineProps({
  ...uploadProps,
  text: {
    type: String as PropType<string>,
    default: '上传图片',
  },
  biz: {
    type: String as PropType<string>,
    default: '/temp',
  },
})

defineSlots<{
  default: () => any
}>()

const modelValue = defineModel<string>('value', { default: null })

const _props = computed<UploadProps>(() => ({
  ...pick(props, Object.keys(uploadProps)),
  listType: 'image-card',
  accept: 'image/*',
}))
</script>

<template>
  <FileUpload v-bind="_props" v-model:value="modelValue" text="" :biz="biz">
    <slot v-if="text" name="default">
      {{ text }}
    </slot>
  </FileUpload>
</template>

<style scoped>

</style>
