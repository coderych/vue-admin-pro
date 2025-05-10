<script setup lang="ts">
import { Firework, Watermark } from './components/Application'
import { useAppStore, useTabStore } from './stores'

const route = useRoute()
const appStore = useAppStore()
const {
  loading,
  theme,
  themeOverrides,
  locale,
  dateLocale,
  transitionName,
} = storeToRefs(appStore)
const {
  loaded,
  data,
} = storeToRefs(useTabStore())

const keepAliveNames = computed<string[]>(() => {
  return data.value.filter(route => route?.keepAlive).map(route => route.name).filter(Boolean) as string[]
})

const layoutMap = new Map()

const Layout = computed(() => {
  const layout = route.meta?.layout || 'basic'
  if (!layoutMap.has(layout)) {
    const component = markRaw(defineAsyncComponent(() => import(`@/layouts/${layout}.vue`)))
    layoutMap.set(layout, component)
  }
  return layoutMap.get(layout)
})
</script>

<template>
  <n-config-provider
    :abstract="true"
    :date-locale="dateLocale"
    :inline-theme-disabled="true"
    :locale="locale"
    :preflight-style-disabled="true"
    :theme="theme"
    :theme-overrides="themeOverrides"
  >
    <n-global-style />
    <n-el v-if="Layout">
      <router-view v-if="Layout" v-slot="{ Component, route: _route }">
        <component :is="Layout">
          <transition :name="_route.meta?.transitionName || transitionName" mode="out-in" appear>
            <keep-alive :include="keepAliveNames">
              <component :is="Component" v-if="loaded" :key="_route.fullPath" />
            </keep-alive>
          </transition>
        </component>
      </router-view>
    </n-el>
    <!-- 烟花组件 -->
    <Firework />
    <!-- API 加载组件 -->
    <n-spin v-show="loading" class="fixed right-0 top-0 z-999 p-6px" :size="14" />
    <!-- 水印组件 -->
    <Watermark />
  </n-config-provider>
</template>
