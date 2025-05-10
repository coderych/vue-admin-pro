<script setup lang="ts">
import Highlight from '@/components/Highlight'
import { AimOutlined, ClearOutlined, DownloadOutlined, FileAddOutlined, LeftOutlined, MinusOutlined, PictureOutlined, PlusOutlined, ReadOutlined, RightOutlined } from '@vicons/antd'
import { useBpmnModeler } from '../../context'

const {
  download,
  zoom,
  undo,
  redo,
  createDiagram,
  revocable,
  recoverable,
  importXML,
  xml,
  showMap,
  handlePreview,
} = useBpmnModeler()

const fileRef = ref<HTMLInputElement | null>(null)

async function loadXML() {
  if (!fileRef.value) {
    return
  }
  const file = fileRef.value.files![0]
  if (!file) {
    return
  }
  const reader = new FileReader()
  reader.readAsText(file)
  reader.onload = async (event) => {
    const xmlStr = event.target?.result as string
    if (!xmlStr) {
      return
    }
    console.log(xmlStr)
    await importXML(xmlStr)
  }
}
</script>

<template>
  <n-flex class="absolute bottom-0 left-0 z-999 m-2">
    <n-button-group size="small">
      <n-tooltip placement="top">
        <template #trigger>
          <n-button @click="fileRef?.click()">
            <n-icon :component="FileAddOutlined" />
            <input ref="fileRef" type="file" accept=".bpmn,.xml" class="hidden" @change="loadXML()">
          </n-button>
        </template>
        导入
      </n-tooltip>
      <n-tooltip placement="top">
        <template #trigger>
          <n-button @click="download('bpmn')">
            <n-icon :component="DownloadOutlined" />
          </n-button>
        </template>
        导出XML
      </n-tooltip>
      <n-tooltip placement="top">
        <template #trigger>
          <n-button @click="download('svg')">
            <n-icon :component="PictureOutlined" />
          </n-button>
        </template>
        导出SVG
      </n-tooltip>
    </n-button-group>

    <n-button-group size="small">
      <n-tooltip placement="top">
        <template #trigger>
          <n-button @click="handlePreview">
            <n-icon :component="ReadOutlined" />
          </n-button>
        </template>
        预览
      </n-tooltip>
    </n-button-group>
  </n-flex>

  <n-flex class="absolute bottom-50px right-0 z-999 m-1 p-2" vertical>
    <n-button-group size="small" vertical>
      <n-tooltip placement="left">
        <template #trigger>
          <n-button :disabled="!revocable" @click="undo()">
            <n-icon :component="LeftOutlined" />
          </n-button>
        </template>
        撤销
      </n-tooltip>
      <n-tooltip placement="left">
        <template #trigger>
          <n-button :disabled="!recoverable" @click="redo()">
            <n-icon :component="RightOutlined" />
          </n-button>
        </template>
        恢复
      </n-tooltip>
      <n-tooltip placement="left">
        <template #trigger>
          <n-button @click="createDiagram()">
            <n-icon :component="ClearOutlined" />
          </n-button>
        </template>
        清空
      </n-tooltip>
    </n-button-group>

    <n-button-group size="small" vertical>
      <n-tooltip placement="left">
        <template #trigger>
          <n-button @click="zoom(0.3)">
            <n-icon :component="PlusOutlined" />
          </n-button>
        </template>
        放大
      </n-tooltip>
      <n-tooltip placement="left">
        <template #trigger>
          <n-button @click="zoom(-0.3)">
            <n-icon :component="MinusOutlined" />
          </n-button>
        </template>
        缩小
      </n-tooltip>
      <n-tooltip placement="left">
        <template #trigger>
          <n-button @click="zoom()">
            <n-icon :component="AimOutlined" />
          </n-button>
        </template>
        还原
      </n-tooltip>
    </n-button-group>
  </n-flex>

  <n-modal v-model:show="showMap.preview" preset="card" title="预览XML" size="small" :segmented="true" :style="{ width: '80%' }">
    <Highlight :code="xml" language="xml" height="60vh" />
  </n-modal>
</template>

<style scoped>

</style>
