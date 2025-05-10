<script setup lang="ts">
import type { ButtonProps, DropdownOption, TreeOption } from 'naive-ui'
import { ColumnHeightOutlined, DragOutlined, FullscreenExitOutlined, FullscreenOutlined, ReloadOutlined, SettingOutlined, VerticalLeftOutlined, VerticalRightOutlined } from '@vicons/antd'
import { NButton, NFlex, NIcon } from 'naive-ui'
import { VueDraggable } from 'vue-draggable-plus'
import { useProTableState } from '../context'
import { useProTableColumnState } from '../table-column'

defineSlots<{
  title: () => void
  extra: () => void
}>()

const { option, request, size, isFull } = useProTableState()
const { isAllChecked, indeterminate, checkAll, init, checkedKeys, data } = useProTableColumnState()

function renderSuffix({ option }: { option: TreeOption }) {
  const buttonProps = (fixed: 'left' | 'right' | undefined): ButtonProps => {
    const props: ButtonProps = {
      focusable: false,
      size: 'tiny',
      circle: true,
      quaternary: true,
      onClick: (e: Event) => {
        e.stopPropagation()
        option.fixed = option.fixed === fixed ? undefined : fixed
      },
    }
    if (option.fixed === fixed) {
      props.secondary = true
      props.type = 'primary'
    }
    return props
  }

  return h(NFlex, { align: 'center', justify: 'center' }, {
    default: () => [
      h(NButton, { ...buttonProps('left') }, { icon: () => h(NIcon, { component: VerticalRightOutlined, size: 15 }) }),
      h(NButton, { ...buttonProps('right') }, { icon: () => h(NIcon, { component: VerticalLeftOutlined, size: 15 }) }),
      h(NIcon, { component: DragOutlined, class: 'handle', size: 18 }),
    ],
  })
}

const sizeOptions: DropdownOption[] = [
  { label: '紧凑', key: 'small' },
  { label: '默认', key: 'medium' },
  { label: '宽松', key: 'large' },
]

function handleSizeSelect(key: 'large' | 'medium' | 'small') {
  size.value = key
}
</script>

<template>
  <NFlex justify="space-between" align="center" class="mb-12px">
    <NFlex align="center" :wrap="false">
      <slot name="title">
        <div />
      </slot>
    </NFlex>
    <NFlex align="center" :wrap="false">
      <slot name="extra" />
      <!-- Reload -->
      <n-tooltip v-if="option !== false && option?.reload !== false">
        <template #trigger>
          <NButton :focusable="false" text @click="request()">
            <template #icon>
              <NIcon :component="ReloadOutlined" />
            </template>
          </NButton>
        </template>
        <span>刷新</span>
      </n-tooltip>

      <!-- Size -->
      <n-dropdown show-arrow trigger="click" :options="sizeOptions" @select="handleSizeSelect">
        <n-tooltip v-if="option !== false && option?.size !== false">
          <template #trigger>
            <NButton :focusable="false" text>
              <template #icon>
                <NIcon :component="ColumnHeightOutlined" />
              </template>
            </NButton>
          </template>
          <span>密度</span>
        </n-tooltip>
      </n-dropdown>

      <!-- Setting -->
      <n-tooltip v-if="option !== false && option?.setting !== false">
        <template #trigger>
          <n-popover trigger="click" placement="bottom-end" header-style="padding: 0;" content-style="padding: 0;">
            <template #trigger>
              <NButton :focusable="false" text>
                <template #icon>
                  <NIcon :component="SettingOutlined" />
                </template>
              </NButton>
            </template>
            <template #header>
              <div class="w-240px flex items-center justify-between px-28px py-12px">
                <n-checkbox :checked="isAllChecked" :indeterminate="indeterminate" @update:checked="checkAll">
                  列展示
                </n-checkbox>
                <NButton text type="primary" @click="init">
                  重置
                </NButton>
              </div>
            </template>
            <div class="py-6px">
              <VueDraggable
                v-model="data" target=".n-tree" handle=".handle"
                :animation="150"
              >
                <n-tree
                  v-model:checked-keys="checkedKeys"
                  :data="data"
                  :selectable="false"
                  checkable check-on-click block-line block-node
                  :render-suffix="renderSuffix"
                />
              </VueDraggable>
            </div>
          </n-popover>
        </template>
        <span>设置</span>
      </n-tooltip>

      <!-- Full -->
      <n-tooltip v-if="option !== false && option?.size !== false">
        <template #trigger>
          <NButton :focusable="false" text @click="isFull = !isFull">
            <template #icon>
              <NIcon :component="isFull ? FullscreenExitOutlined : FullscreenOutlined" />
            </template>
          </NButton>
        </template>
        <span>
          {{ isFull ? '退出全屏' : '全屏' }}
        </span>
      </n-tooltip>
    </NFlex>
  </NFlex>
</template>

<style scoped>
:deep(.n-tree-node-switcher--hide) {
  display: none;
}

:deep(.n-tree-node) {
  padding: 0 24px;
}
</style>
