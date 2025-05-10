<script setup lang="ts">
import type { Component } from 'vue'
import { ApiOutlined, AudioOutlined, BranchesOutlined, ClockCircleOutlined, CodeOutlined, DoubleLeftOutlined, DoubleRightOutlined, FileTextOutlined, FormOutlined, SettingOutlined, TagsOutlined, ToolOutlined } from '@vicons/antd'
import { useBpmnModeler } from '../../context'
import { getBpmnIcon } from '../../helper'
import AsynchronousContinuations from './AsynchronousContinuations/index.vue'
import Condition from './Condition/index.vue'
import Documentation from './Documentation/index.vue'
import ExecutionListeners from './ExecutionListeners/index.vue'
import ExtensionProperties from './ExtensionProperties/index.vue'
import FieldInjections from './FieldInjections/index.vue'
import Forms from './Forms/index.vue'
import General from './General/index.vue'
import HistoryCleanup from './HistoryCleanup/index.vue'
import Implementation from './Implementation/index.vue'
import Inputs from './Inputs/index.vue'
import Outputs from './Outputs/index.vue'
import Script from './Script/index.vue'
import TaskListeners from './TaskListeners/index.vue'
import Timer from './Timer/index.vue'

const { elementData, showMap } = useBpmnModeler()
const show = computed(() => showMap.properties)
const width = ref(500)

const loading = ref(false)

const components = computed<{ name?: string, title?: string, component: Component, icon?: Component, show?: boolean }[]>(() => [
  {
    name: 'General',
    title: '常规',
    component: General,
    icon: SettingOutlined,
  },
  {
    name: 'Documentation',
    title: '描述文档',
    component: Documentation,
    icon: FileTextOutlined,
  },
  {
    name: 'Forms',
    title: '表单属性',
    component: Forms,
    icon: FormOutlined,
  },
  {
    name: 'TaskListeners',
    title: '任务监听器',
    component: TaskListeners,
    icon: AudioOutlined,
  },
  {
    name: 'Timer',
    title: '定时器',
    component: Timer,
    icon: ClockCircleOutlined,
  },
  {
    name: 'AsynchronousContinuations',
    title: '异步延续',
    component: AsynchronousContinuations,
    icon: ClockCircleOutlined,
  },
  {
    name: 'Condition',
    title: '条件配置',
    component: Condition,
    icon: BranchesOutlined,
  },
  {
    name: 'Implementation',
    title: '实现配置',
    component: Implementation,
    icon: CodeOutlined,
  },
  {
    name: 'FieldInjections',
    title: '字段注入',
    component: FieldInjections,
    icon: ToolOutlined,
  },
  {
    name: 'Inputs',
    title: '输入参数',
    component: Inputs,
    icon: ApiOutlined,
  },
  {
    name: 'Outputs',
    title: '输出参数',
    component: Outputs,
    icon: ApiOutlined,
  },
  {
    name: 'Script',
    title: '脚本配置',
    component: Script,
    icon: CodeOutlined,
  },
  {
    name: 'HistoryCleanup',
    title: '历史清理',
    component: HistoryCleanup,
    icon: ClockCircleOutlined,
  },
  {
    name: 'ExecutionListeners',
    title: '执行监听器',
    component: ExecutionListeners,
    icon: AudioOutlined,
  },
  {
    name: 'ExtensionProperties',
    title: '扩展属性',
    component: ExtensionProperties,
    icon: TagsOutlined,
  },
].filter((i: any) => i.show !== false))
</script>

<template>
  <div class="properties-panel">
    <n-button
      class="control absolute right-0 top-50% h-80px transform-translate-y--1/2" :style="{ right: `${show ? width : 0}px` }"
      size="tiny" :focusable="false" secondary @click="showMap.properties = !show"
    >
      <template #icon>
        <n-icon :component="show ? DoubleRightOutlined : DoubleLeftOutlined" />
      </template>
    </n-button>
    <n-drawer v-model:show="showMap.properties" v-model:width="width" :show-mask="false" :mask-closable="false" resizable to="#camunda-modeler" style="box-shadow: none;">
      <n-drawer-content :native-scrollbar="false" header-style="padding: 12px 24px;">
        <template #header>
          <n-flex align="center" :wrap="false">
            <span class="text-30px" :class="`${getBpmnIcon(elementData.type)}`" />
            <span class="flex-shrink-0 text-16px font-bold">
              {{ elementData?.id }}
            </span>
            <span class="truncate text-14px">
              {{ elementData?.name || '未命名' }}
            </span>
          </n-flex>
        </template>
        <n-collapse v-if="!loading">
          <n-collapse-item v-for="item in components" :key="item.name" :title="item.title">
            <component :is="item.component" />
            <template #header-extra>
              <n-icon :component="item.icon" />
            </template>
          </n-collapse-item>
        </n-collapse>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<style scoped>
.control {
  transition: all 0.3s var(--n-bezier);
}

:deep(.n-collapse-item__header-main) {
  user-select: none;
}
</style>
