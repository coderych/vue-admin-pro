<script setup lang="ts">
import type { ILog } from '@/api/system/log'
import { Highlight } from '@/components/Highlight'
import 'highlight.js/styles/atom-one-dark.css'

const props = defineProps<{
  data?: ILog
}>()

const params = computed(() => {
  return formatJson(props.data?.params)
})

const result = computed(() => {
  if (props.data?.status === 1) {
    return formatJson(props.data?.result)
  }
  else {
    return props.data?.result || '无'
  }
})

function formatJson(json?: string) {
  if (!json || json === '{}') {
    return '无'
  }
  if (!json.startsWith('{') && !json.startsWith('[')) {
    return json
  }

  return JSON.stringify(JSON.parse(json), null, 2)
}
</script>

<template>
  <n-descriptions v-if="data" :column="1" bordered label-placement="left">
    <n-descriptions-item label="请求IP">
      {{ data.ip }}
    </n-descriptions-item>
    <n-descriptions-item label="IP地址">
      {{ data.address }}
    </n-descriptions-item>
    <n-descriptions-item label="浏览器">
      {{ data.browser }}
    </n-descriptions-item>
    <n-descriptions-item label="操作系统">
      {{ data.os }}
    </n-descriptions-item>
    <n-descriptions-item label="请求地址">
      {{ data.url }}
    </n-descriptions-item>
    <n-descriptions-item label="操作类">
      {{ data.method }}
    </n-descriptions-item>
    <n-descriptions-item label="操作时间">
      {{ data.operateTime }}
    </n-descriptions-item>
    <n-descriptions-item label="操作人">
      {{ data.operator }}
    </n-descriptions-item>
  </n-descriptions>

  <n-flex wrap class="mt-12px" :gap="6" :vertical="true">
    <div>
      请求参数
    </div>
    <Highlight :code="params" height="300px" language="javascript" />

    <div>
      请求结果
    </div>
    <Highlight :code="result" height="300px" language="javascript" />
  </n-flex>
</template>

<style scoped>
.hljs {
  width: 100%;
}
</style>
