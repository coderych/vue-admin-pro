<script setup lang="ts">
import type { ScrollbarInst } from 'naive-ui'
import type { RouteRecordRaw } from 'vue-router'
import { useAppStore } from '@/stores'
import { renderIcon } from '@/utils/render'
import { ArrowDownOutlined, ArrowUpOutlined, EnterOutlined, SearchOutlined } from '@vicons/antd'
import { onKeyStroke } from '@vueuse/core'
import HeaderAction from './HeaderAction.vue'

const router = useRouter()
const { routeOptions } = storeToRefs(useAppStore())

const show = ref(false)
const keyword = ref('')
const list = ref<RouteRecordRaw[]>([])
const activeIndex = ref(0)
const scrollbarRef = ref<ScrollbarInst | null>(null)
const resultRef = ref<HTMLDivElement[] | null>(null)
const history = ref<RouteRecordRaw[]>([])

function handleSearch() {
  if (!keyword.value) {
    list.value = []
    return
  }

  list.value = routeOptions.value.filter((route) => {
    return route.meta?.title?.includes(keyword.value)
      || (route.name as string)?.includes(keyword.value)
      || (route.path)?.includes(keyword.value)
  })
  activeIndex.value = 0
}

function handleEnter() {
  const item = list.value[activeIndex.value]
  if (item) {
    router.push(item.path)
    show.value = false
    keyword.value = ''
    if (!history.value.includes(item)) {
      history.value.push(item)
    }
  }
}

onKeyStroke(['ArrowDown'], (e: KeyboardEvent) => {
  e.preventDefault()
  if (activeIndex.value === list.value.length - 1) {
    activeIndex.value = 0
  }
  else {
    activeIndex.value++
  }
  handleScroll()
})

onKeyStroke(['ArrowUp'], (e: KeyboardEvent) => {
  e.preventDefault()
  if (activeIndex.value === 0) {
    activeIndex.value = list.value.length - 1
  }
  else {
    activeIndex.value--
  }
  handleScroll()
})

onKeyStroke(['k'], (e: KeyboardEvent) => {
  e.preventDefault()
  if (e.ctrlKey) {
    show.value = !show.value
  }
})

onKeyStroke(['Enter'], (e: KeyboardEvent) => {
  e.preventDefault()
  handleEnter()
})

function handleScroll() {
  // 滚动
  if (!resultRef.value || !scrollbarRef.value) {
    return
  }
  const currentRef = resultRef.value[activeIndex.value]

  scrollbarRef.value.scrollTo({ top: currentRef.offsetTop + currentRef.offsetHeight - 360, behavior: 'auto' })
}
</script>

<template>
  <HeaderAction :icon="SearchOutlined" tooltip="搜索 Ctrl+K" @click="show = !show" />

  <n-modal
    v-model:show="show" preset="card" :closable="false"
    segmented
    :style="{ width: '640px', marginTop: '80px', borderRadius: '16px' }"
    :content-style="{ padding: '0' }"
    :header-style="{ padding: '20px' }"
    :footer-style="{ padding: '20px' }"
  >
    <template #header>
      <n-input
        v-model:value="keyword" placeholder="搜索" size="large" clearable class="search-input"
        :input-props="{ style: { height: '100%' } }"
        @update:value="handleSearch"
      >
        <template #prefix>
          <n-icon :component="SearchOutlined" />
        </template>
      </n-input>
    </template>

    <n-scrollbar ref="scrollbarRef" :style="{ maxHeight: '380px' }">
      <n-el v-if="list.length" class="search-result-list">
        <div
          v-for="(item, index) in list" :key="index" ref="resultRef"
          class="search-result-list__item" :class="{ active: activeIndex === index }"
          @mouseenter="activeIndex = index" @click="handleEnter"
        >
          <component :is="renderIcon(item.meta?.icon, { size: 18 })" v-if="item.meta?.icon" />
          <span>
            {{ item.meta?.title }}
          </span>
          <n-icon v-if="index === activeIndex" :component="EnterOutlined" class="ml-auto" />
        </div>
      </n-el>

      <n-empty v-else class="my-20px" />
    </n-scrollbar>

    <template #footer>
      <n-flex align="center" class="search-footer">
        <span>
          <n-icon :component="EnterOutlined" />
        </span>
        确认
        <span>
          <n-icon :component="ArrowUpOutlined" />
        </span>
        <span>
          <n-icon :component="ArrowDownOutlined" />
        </span>
        切换

        <span class="esc">
          Esc
        </span>
        关闭
      </n-flex>
    </template>
  </n-modal>
</template>

<style scoped lang="less">
.search-input {
  width: 100%;
  height: 48px;
  border-radius: 8px;
  border: 1px solid var(--n-border-color);
}

.search-result-list {
  padding: 10px 20px;
}

.search-result-list__item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 14px 12px;
  margin: 8px 0;
  background: var(--divider-color);
  border-radius: 5px;
  cursor: pointer;

  &.active {
    background-color: var(--primary-color);
    color: #fff;
  }
}

.search-footer {
  font-size: 12px;

  & > span {
    font-size: 12px;
    display: block;
    cursor: pointer;
    box-shadow: 0 0 0 1px var(--n-border-color);
    width: 20px;
    aspect-ratio: 1/1;
    display: flex;
    align-items: center;
    justify-content: center;

    &.esc {
      font-size: 10px;
    }
  }
}
</style>
