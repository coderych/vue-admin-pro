<script setup lang="ts">
import type { DropdownOption } from 'naive-ui'
import { useAppStore, useTabStore } from '@/stores'
import { renderIcon, renderNIcon } from '@/utils/render'
import { CloseCircleOutlined, CloseOutlined, ColumnWidthOutlined, CompressOutlined, ExpandOutlined, HomeOutlined, LeftOutlined, MoreOutlined, ReloadOutlined, RightOutlined, VerticalLeftOutlined, VerticalRightOutlined } from '@vicons/antd'
import { NIcon } from 'naive-ui'
import Favorite from './Favorite.vue'
import TabAction from './TabAction.vue'

const router = useRouter()
const tabStore = useTabStore()
const { isFull, prefixHeight, tabStyle, tabIcon } = storeToRefs(useAppStore())
const {
  currentIndex,
  currentKey,
  data,
  activeKey,
  canBack,
  canForward,
} = storeToRefs(tabStore)

function handleReload() {
  tabStore.reload()
}

const options = computed<DropdownOption[]>(() => ([
  {
    label: '关闭当前',
    key: 'current',
    icon: renderNIcon(CloseOutlined),
    disabled: data.value.length === 1,
  },
  {
    type: 'divider',
    key: 'd1',
  },
  {
    label: '关闭左侧',
    key: 'left',
    icon: renderNIcon(VerticalRightOutlined),
    disabled: currentIndex.value === 0,
  },
  {
    label: '关闭右侧',
    key: 'right',
    icon: renderNIcon(VerticalLeftOutlined),
    disabled: currentIndex.value === data.value.length - 1,
  },
  {
    type: 'divider',
    key: 'd2',
  },
  {
    label: '关闭其他',
    key: 'other',
    icon: renderNIcon(ColumnWidthOutlined),
    disabled: data.value.length === 1,
  },
  {
    label: '关闭全部',
    key: 'all',
    icon: renderNIcon(CloseCircleOutlined),
    disabled: data.value.length === 1,
  },
]))

const x = ref(0)
const y = ref(0)
const show = ref(false)

function onClickoutside() {
  show.value = false
}

function onContextMenu(e: MouseEvent, key: string) {
  e.preventDefault()
  currentKey.value = key

  show.value = false
  nextTick().then(() => {
    show.value = true
    x.value = e.clientX
    y.value = e.clientY
  })
}

function onSelect(key: string) {
  tabStore.closeTab(currentKey.value, key as any)
  show.value = false
}
</script>

<template>
  <div class="tabs-container" :style="{ height: `${prefixHeight}px` }" :class="`tabs--${tabStyle}-type`">
    <n-tabs
      v-model:value="activeKey"
      :type="tabStyle === 'card' ? 'card' : 'bar'"
      size="small"
      :tab-style="{ height: `${prefixHeight * 0.8}px` }"
    >
      <n-tab
        v-for="item in data"
        :key="item.key"
        :name="item.key"
        @click.stop="router.push(`${item.key}`)"
        @contextmenu.stop.prevent="onContextMenu($event, item.key)"
      >
        <span v-if="item.icon && tabIcon" class="flex items-center">
          <component :is="renderIcon(item.icon)" />
        </span>
        <span class="tabs-tab-title">
          {{ item.title }}
        </span>
        <span class="tabs-tab-close" @click.stop.prevent="tabStore.closeTab(item.key, 'current')">
          <NIcon :component="CloseOutlined" />
        </span>
      </n-tab>

      <template #prefix>
        <n-flex :size="16">
          <TabAction :component="LeftOutlined" :disabled="!canBack" @click="router.back" />
          <TabAction :component="RightOutlined" :disabled="!canForward" @click="router.forward" />
          <TabAction :component="HomeOutlined" @click="() => router.push('/')" />
        </n-flex>
      </template>
      <template #suffix>
        <n-flex :size="16">
          <n-dropdown
            show-arrow
            placement="bottom-end"
            trigger="click"
            :options="options"
            @select="onSelect"
          >
            <TabAction :component="MoreOutlined" @click="() => currentKey = activeKey" />
          </n-dropdown>
          <TabAction :component="ReloadOutlined" @click="handleReload" />
          <Favorite />
          <TabAction :component="isFull ? CompressOutlined : ExpandOutlined" @click="() => isFull = !isFull" />
        </n-flex>
      </template>
    </n-tabs>
  </div>

  <n-dropdown
    show-arrow
    placement="bottom-start"
    trigger="manual"
    :x="x"
    :y="y"
    :options="options"
    :show="show"
    :on-clickoutside="onClickoutside"
    @select="onSelect"
  />
</template>

<style lang="less">
.tabs-container {
  display: flex;
  align-items: center;
  user-select: none;
  width: 100%;
  box-sizing: border-box;
  padding: 0 12px;

  .n-tabs-tab {
    .tabs-tab-close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 0;
      overflow: hidden;
      transition:
        width 0.2s ease,
        opacity 0.2s ease;
      vertical-align: middle;
      border-radius: var(--n-close-border-radius);
      padding: 0;
      font-size: var(--n-close-icon-size);
      opacity: 0;
      color: var(--n-close-icon-color);
      background-color: transparent;

      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
    .n-tabs-tab__label {
      gap: 6px;
    }

    &:hover,
    &--active {
      & .tabs-tab-close {
        width: var(--n-close-size);
        height: var(--n-close-size);
        opacity: 1;
      }
    }
  }
}

.tabs--button-type {
  border-bottom: 1px solid var(--n-border-color);

  .n-tabs-bar {
    display: none;
  }

  .n-tabs-tab-pad {
    width: 12px;
  }

  .n-tabs-tab {
    padding: 0px 12px !important;
    border-radius: var(--border-radius);
    font-size: 13px;
    display: flex;
    align-items: center;

    & .tabs-tab-close {
      color: #fff !important;
    }

    &.n-tabs-tab--active {
      background-color: var(--primary-color) !important;
      color: #fff !important;
    }

    &:hover {
      background-color: var(--hover-color);
      color: var(--text-color);
      & .tabs-tab-close {
        color: var(--text-color) !important;
      }
    }
  }
}

.tabs--bar-type {
  border-bottom: 1px solid var(--n-border-color);

  .n-tabs-tab-pad {
    width: 12px;
  }

  .n-tabs-tab {
    padding: 0px 12px;

    .n-tabs-tab__label {
      gap: 6px;
    }

    .tabs-tab-close {
      width: var(--n-close-size);
      height: var(--n-close-size);
    }
  }
}

.tabs--card-type {
  .n-tabs-tab {
    padding-right: 10px;

    &:hover,
    &--active {
      padding-right: 10px;
    }
  }
  .tabs-tab-close {
    width: var(--n-close-size) !important;
    opacity: 1 !important;
  }
}
</style>
