<script setup lang="ts">
import type { CardProps } from 'naive-ui'
import type { CSSProperties } from 'vue'
import { Scrollbar } from '@/components/Application'
import Breadcrumb from '@/layouts/components/Breadcrumb.vue'

const props = withDefaults(defineProps<{
  gap?: number
  preset?: 'card' | 'layout' | 'default'
  cardProps?: CardProps
  title?: string
  header?: boolean
  siderWidth?: number
}>(), {
  gap: 12,
  preset: 'default',
  cardProps: () => ({}),
  header: true,
  siderWidth: 220,
})

const slots = defineSlots<{
  'default': () => any
  'action': () => any
  'sider': () => any
  'header': () => any
  'title': () => any
  'header-extra': () => any
}>()

const route = useRoute()

const style = computed<CSSProperties>(() => ({
  padding: `${props.gap}px`,
  display: 'grid',
  height: '100%',
  overflow: 'hidden',
}))

const collapsed = ref(false)
</script>

<template>
  <div class="page-wrapper">
    <n-card v-if="header" :bordered="false" size="small">
      <n-page-header>
        <div v-if="Boolean(slots.header)" class="mt-12px">
          <slot name="header" />
        </div>
        <template #title>
          <slot name="title">
            <div class="truncate px-4px text-20px font-600">
              {{ title || route.meta?.title }}
            </div>
          </slot>
        </template>
        <template #header>
          <Breadcrumb />
        </template>
        <template #extra>
          <slot name="header-extra" />
        </template>
      </n-page-header>
    </n-card>

    <div :style="style" class="flex-1">
      <template v-if="preset === 'card'">
        <n-card :bordered="false" v-bind="cardProps">
          <slot />
          <template #action>
            <slot name="action" />
          </template>
        </n-card>
      </template>
      <template v-else-if="preset === 'layout'">
        <div class="flex overflow-hidden" :class="[`${!collapsed ? 'gap-6px' : '0'}`]">
          <div class="relative z-98 h-full flex-shrink-0 bg-[var(--base-color)] transition-transform duration-300 ease-in-out" :style="{ width: `${siderWidth}px`, transform: `translateX(${collapsed ? '-100%' : '0'})` }">
            <Scrollbar>
              <slot name="sider" />
            </Scrollbar>
            <div class="hamburger" @click="collapsed = !collapsed">
              <div v-if="!collapsed" class="i-ant-design:menu-fold-outlined" />
              <div v-else class="i-ant-design:menu-unfold-outlined" />
            </div>
          </div>
          <div class="w-full flex-1">
            <slot />
          </div>
        </div>
      </template>
      <template v-else-if="preset === 'default'">
        <slot />
      </template>
    </div>
  </div>
</template>

<style scoped lang="less">
.page-wrapper {
  min-height: var(--content-height);
  display: flex;
  flex-direction: column;
  user-select: text;
}

:deep(.n-page-header-content) {
  margin-top: 0 !important;
}

:deep(.n-page-header-header) {
  margin-bottom: 6px !important;
}

.hamburger {
  position: absolute;
  width: 30px;
  height: 30px;
  right: -30px;
  top: 30px;
  z-index: 99;
  background: var(--base-color);
  border: 1px solid #f5f5f5;
  border-left: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  cursor: pointer;
  font-size: 16px;
}
</style>
