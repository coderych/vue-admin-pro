<script setup lang="ts">
import type { Component } from 'vue'
import { useAppStore } from '@/stores/app'
import { SettingOutlined } from '@vicons/antd'
import { NColorPicker, NDivider, NFlex, NInput, NInputNumber, NSelect, NSwitch } from 'naive-ui'
import HeaderAction from './HeaderAction.vue'

interface Item {
  key: string
  label?: string
  value: any
  component: 'switch' | 'select' | 'input' | 'color' | 'number' | 'divider'
  props?: any
}

const components: Record<string, Component> = {
  switch: NSwitch,
  select: NSelect,
  input: NInput,
  color: NColorPicker,
  number: NInputNumber,
  divider: NDivider,
}

const show = ref(false)
const appStore = useAppStore()

const list = computed<Item[]>(() => [
  {
    key: 'mode',
    label: '布局',
    value: appStore.mode,
    component: 'select',
    props: {
      options: [
        { label: '侧边布局', value: 'side' },
        { label: '顶部布局', value: 'top' },
        { label: '混合布局', value: 'mix' },
      ],
    },
  },
  {
    key: 'dark',
    label: '主题',
    value: appStore.dark,
    component: 'select',
    props: {
      options: [
        { label: '自动', value: 'auto' },
        { label: '暗黑', value: 'dark' },
        { label: '亮色', value: 'light' },
      ],
    },
  },
  {
    key: 'primaryColor',
    label: '主题色',
    value: appStore.primaryColor,
    component: 'color',
    props: {
      modes: ['hex'],
    },
  },
  {
    key: 'siderTheme',
    label: '侧边导航主题',
    value: appStore.siderTheme,
    component: 'color',
    props: {
      modes: ['hex'],
      actions: ['clear'],
      showAlpha: false,
      onClear: () => {
        appStore.siderTheme = 'transparent'
      },
    },
  },
  {
    key: 'headerTheme',
    label: '顶部导航主题',
    value: appStore.headerTheme,
    component: 'color',
    props: {
      modes: ['hex'],
      actions: ['clear'],
      showAlpha: false,
      onClear: () => {
        appStore.headerTheme = 'transparent'
      },
    },
  },
  {
    key: 'collapsed',
    label: '侧边栏收起',
    value: appStore.collapsed,
    component: 'switch',
  },
  {
    key: 'd1',
    component: 'divider',
    value: '',
    label: '界面功能',
  },
  {
    key: 'isFull',
    label: '内容全屏',
    value: appStore.isFull,
    component: 'switch',
  },
  {
    key: 'splitMenu',
    label: '分割菜单',
    value: appStore.splitMenu,
    component: 'switch',
  },
  {
    key: 'siderFixed',
    label: '侧边栏固定',
    value: appStore.siderFixed,
    component: 'switch',
  },
  {
    key: 'headerFixed',
    label: '顶部导航固定',
    value: appStore.headerFixed,
    component: 'switch',
    props: {
      onUpdateValue: (val: boolean) => {
        appStore.headerFixed = val
        if (!val) {
          appStore.prefixFixed = false
          appStore.suffixFixed = false
        }
      },
    },
  },
  {
    key: 'prefixFixed',
    label: '内容头部固定',
    value: appStore.prefixFixed,
    component: 'switch',
    props: {
      onUpdateValue: (val: boolean) => {
        appStore.prefixFixed = val
        if (val) {
          appStore.headerFixed = true
        }
        else {
          appStore.suffixFixed = false
        }
      },
    },
  },
  {
    key: 'suffixFixed',
    label: '内容尾部固定',
    value: appStore.suffixFixed,
    component: 'switch',
    props: {
      onUpdateValue: (val: boolean) => {
        appStore.suffixFixed = val
        if (val) {
          appStore.headerFixed = true
          appStore.prefixFixed = true
        }
      },
    },
  },
  {
    key: 'siderWidth',
    label: '侧边导航宽度',
    value: appStore.siderWidth,
    component: 'number',
    props: {
      min: 200,
      max: 300,
      step: 5,
    },
  },
  {
    key: 'siderCollapsedWidth',
    label: '侧边导航收起宽度',
    value: appStore.siderCollapsedWidth,
    component: 'number',
    props: {
      min: 48,
      max: 80,
      step: 2,
    },
  },
  {
    key: 'headerHeight',
    label: '顶部导航高度',
    value: appStore.headerHeight,
    component: 'number',
    props: {
      min: 48,
      max: 80,
      step: 2,
    },
  },
  {
    key: 'prefixHeight',
    label: '内容头部高度',
    value: appStore.prefixHeight,
    component: 'number',
    props: {
      min: 36,
      max: 64,
      step: 2,
    },
  },
  {
    key: 'suffixHeight',
    label: '内容底部高度',
    value: appStore.suffixHeight,
    component: 'number',
    props: {
      min: 32,
      max: 64,
      step: 2,
    },
  },
  {
    key: 'accordion',
    label: '菜单手风琴',
    value: appStore.accordion,
    component: 'switch',
  },
  {
    key: 'tabPersist',
    label: '标签页持久化',
    value: appStore.tabPersist,
    component: 'switch',
  },
  {
    key: 'watermark',
    label: '水印',
    value: appStore.watermark,
    component: 'switch',
  },
  {
    key: 'watermarkContent',
    label: '水印内容',
    value: appStore.watermarkContent,
    component: 'input',
  },
  {
    key: 'transitionName',
    label: '切换动画',
    value: appStore.transitionName,
    component: 'select',
    props: {
      options: [
        { label: '默认', value: '' },
        { label: '淡入淡出', value: 'fade' },
        { label: '淡入滑动', value: 'fade-slide' },
        { label: '淡入下滑', value: 'fade-bottom' },
        { label: '淡入缩放', value: 'fade-scale' },
        { label: '缩放淡出', value: 'zoom-fade' },
        { label: '缩小消失', value: 'zoom-out' },
      ],
    },
  },
  {
    key: 'd1',
    component: 'divider',
    value: '',
    label: '界面显示',
  },
  {
    key: 'round',
    label: '圆角',
    value: appStore.round,
    component: 'number',
    props: {
      min: 0,
      max: 10,
      step: 1,
    },
  },
  {
    key: 'tabStyle',
    label: '标签页风格',
    value: appStore.tabStyle,
    component: 'select',
    props: {
      options: [
        { label: '线条', value: 'bar' },
        { label: '按钮', value: 'button' },
        { label: '卡片', value: 'card' },
      ],
    },
  },
  {
    key: 'tabIcon',
    label: '标签页图标',
    value: appStore.tabIcon,
    component: 'switch',
  },
  {
    key: 'colorWeak',
    label: '色弱模式',
    value: appStore.colorWeak,
    component: 'switch',
  },
  {
    key: 'colorGray',
    label: '灰色模式',
    value: appStore.colorGray,
    component: 'switch',
  },
  {
    key: 'header',
    label: '顶部导航',
    value: appStore.header,
    component: 'switch',
  },
  {
    key: 'sider',
    label: '侧边导航',
    value: appStore.sider,
    component: 'switch',
  },
  {
    key: 'prefix',
    label: '内容头部内容',
    value: appStore.prefix,
    component: 'switch',
  },
  {
    key: 'suffix',
    label: '内容底部内容',
    value: appStore.suffix,
    component: 'switch',
  },
  {
    key: 'logo',
    label: '顶部logo',
    value: appStore.logo,
    component: 'switch',
  },
  {
    key: 'breadcrumb',
    label: '面包屑',
    value: appStore.breadcrumb,
    component: 'switch',
  },
  {
    key: 'breadcrumbIcon',
    label: '面包屑图标',
    value: appStore.breadcrumbIcon,
    component: 'switch',
  },
])

function render() {
  return list.value.map((item: Item) => {
    const { key, label, props, component, value } = item
    if (!key) {
      return null
    }
    const _component = components[component]
    if (component === 'divider') {
      return h(_component, { titlePlacement: 'center' }, { default: () => label })
    }
    return h(NFlex, { align: 'center', justify: label ? 'space-between' : 'center', wrap: false }, {
      default: () => [
        label && h('span', { class: 'flex-1' }, label),
        _component && h(_component, {
          value,
          style: { 'width': '140px', 'justify-content': 'flex-end' },
          onUpdateValue: (val: any) => {
            appStore.$patch({ [key]: val })
          },
          ...props,
        }, {}),
      ],
    })
  })
}
</script>

<template>
  <HeaderAction v-if="appStore.header" :icon="SettingOutlined" tooltip="页面配置" @click="show = true" />
  <n-float-button v-else :icon="SettingOutlined" tooltip="页面配置" :right="20" :bottom="20" @click="show = true">
    <n-icon :component="SettingOutlined" />
  </n-float-button>

  <n-drawer v-model:show="show" :width="380" close-on-esc>
    <n-drawer-content title="页面配置" :native-scrollbar="false" closable>
      <NFlex vertical :size="12">
        <component :is="render" />
      </NFlex>
      <template #footer>
        <NFlex>
          <n-button secondary @click="appStore.reset">
            重置
          </n-button>
          <n-button strong type="primary" @click="appStore.copy">
            复制配置
          </n-button>
        </NFlex>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>

</style>
