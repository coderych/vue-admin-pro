<script setup lang="ts">
import type { MenuProps } from '@/components/AdminLayout'
import logoUrl from '@/assets/logo.svg'
// import AdminLayout, { adminLayoutProps } from '@/components/AdminLayout'
import { useAppEnv, useQueryBreakpoints } from '@/composables/app'
import { onUpdateMenuValue } from '@/router/generate-routes'
import { useRouteListener } from '@/router/route-listener'
import { useAppStore } from '@/stores'
import { pick } from 'lodash-es'
import { NMenu } from 'naive-ui'
import { AdminLayout, adminLayoutProps } from 'vue3-admin-layout'
import HeaderActions from './components/HeaderActions.vue'
import ProjectSetting from './components/ProjectSetting.vue'
import Tab from './components/Tab.vue'
import 'vue3-admin-layout/dist/style.css'

const appStore = useAppStore()
const { collapsed, menuOptions } = storeToRefs(appStore)
const { VITE_GLOB_APP_TITLE } = useAppEnv()

const { isMobile, isPad, isDesktop } = useQueryBreakpoints()

watch(isPad, (value) => {
  if (!isDesktop) {
    collapsed.value = !!value
  }
}, { immediate: true })

const activeKey = ref('')
useRouteListener((to) => {
  console.log('route listener', to)
  activeKey.value = to.meta?.activeMenu || to.path
}, { immediate: true })

function renderMenu(props: MenuProps) {
  const { collapsedWidth = 64, collapsed = true, accordion = true } = props
  return h(NMenu, {
    ...props,
    collapsedIconSize: (collapsedWidth / 2.4),
    themeOverrides: {
      itemHeight: `${collapsed ? collapsedWidth / 1.5 : 42}px`,
    },
    accordion,
    onUpdateValue: onUpdateMenuValue,
  })
}
</script>

<template>
  <AdminLayout
    v-bind="pick(appStore.app, Object.keys(adminLayoutProps))" v-model:collapsed="collapsed" v-model:sider-fixed="appStore.siderFixed"
    :menu-options="(menuOptions as any)" :is-mobile="isMobile" :title="VITE_GLOB_APP_TITLE"
    :render-menu="renderMenu" :logo-url="logoUrl" :is-full="appStore.isFull" :active-key="activeKey"
  >
    <template #prefix>
      <Tab />
    </template>
    <template #suffix>
      <p class="text-xs text-gray-400">
        Copyright &copy; 2019 - {{ new Date().getFullYear() }} YCH. All Rights Reserved. YCH 版权所有
      </p>
    </template>
    <template #header-prefix>
      <p v-if="isDesktop" class="px-2">
        欢迎使用 {{ VITE_GLOB_APP_TITLE }}
      </p>
    </template>
    <template #header-suffix>
      <HeaderActions />
    </template>
    <template #header />
    <!-- <template #sider>
      <n-scrollbar>
        <div v-for="i in 20" :key="i" class="h-100px b-b-1 b-b-amber b-b-solid">
          {{ i }}
        </div>
      </n-scrollbar>
    </template> -->
    <!-- <template #sider-left="{ open, show }">
      <Scrollbar>
        <div v-for="i in 30" :key="i" class="h-100px b-b-1 b-b-amber b-b-solid">
          {{ i }}
        </div>
      </Scrollbar>
    </template> -->
    <!-- <template #sider-right>
      <n-scrollbar>
        <div v-for="i in 30" :key="i" class="h-100px b-b-1 b-b-amber b-b-solid">
          {{ i }}
        </div>
      </n-scrollbar>
    </template> -->
    <slot />
    <ProjectSetting v-if="!appStore.header" />
  </AdminLayout>
</template>

<style scoped>

</style>
