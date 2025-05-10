<script setup lang="ts">
import type { UploadFileInfo, UploadProps } from 'naive-ui'
import { CommonApi } from '@/api/common'
import { UploadOutlined } from '@vicons/antd'
import { debounce, pick } from 'lodash-es'
import { uploadProps } from 'naive-ui'
import { generateFileId, getFileName } from './helper'

const props = defineProps({
  ...uploadProps,
  text: {
    type: String as PropType<string>,
    default: '上传文件',
  },
  biz: {
    type: String as PropType<string>,
    default: '/temp',
  },
})

const slots = defineSlots<{
  default: () => any
}>()

const modelValue = defineModel<string>('value', { default: null })

const fileList = ref<UploadFileInfo[]>([])
const uploading = ref(false)

const _props = computed<UploadProps>(() => ({
  ...pick(props, Object.keys(uploadProps)),
  disabled: uploading.value || props.disabled,
  showRemoveButton: !uploading.value && props.showRemoveButton,
  onUpdateFileList: debounce(async () => {
    uploading.value = true
    await Promise.all(fileList.value.map(async (item) => {
      if (item.status === 'finished' || item.status === 'uploading') {
        return
      }
      item.status = 'uploading'
      item.percentage = 0
      const interval = setInterval(() => {
        if (item.percentage! <= 90) {
          item.percentage! += 5
        }
      }, 100)
      const data = new FormData()
      data.append('file', item.file!)
      data.append('biz', props.biz)
      return await CommonApi.upload(data).then((res) => {
        clearInterval(interval)
        item.percentage = 100
        item.status = 'finished'
        item.url = res.data
        window.$message?.success('文件上传成功')
        console.log(res, item)
      }).catch((err) => {
        console.error(err)
        item.status = 'error'
      })
    }))

    modelValue.value = fileList.value.filter(item => item.status === 'finished').map(item => item.url).join(',')
    nextTick(() => {
      uploading.value = false
    })
  }),
}))

watch(modelValue, async (value) => {
  if (uploading.value) {
    return
  }
  if (!value) {
    fileList.value = []
    return
  }

  fileList.value = value.split(',').map(url => ({
    id: generateFileId(),
    name: getFileName(url),
    url,
    status: 'finished',
  }))
}, { immediate: true })
</script>

<template>
  <n-upload v-bind="_props" v-model:file-list="fileList">
    <slot v-if="text || Boolean(slots.default)" name="default">
      <n-button>
        {{ text }}
        <template #icon>
          <UploadOutlined />
        </template>
      </n-button>
    </slot>
  </n-upload>
</template>

<style scoped>

</style>
