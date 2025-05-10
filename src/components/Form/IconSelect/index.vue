<script setup lang="ts">
import type { InputProps } from 'naive-ui'
import { SearchOutlined } from '@vicons/antd'
import * as icons from '@vicons/antd'
import { inputProps as nInputProps } from 'naive-ui'

const props = defineProps({
  ...nInputProps,
})

const emit = defineEmits<{
  updateValue: [value: string]
}>()

const model = defineModel<string>('value', { default: undefined })
const show = ref(false)
const params = reactive({
  name: '',
  current: 1,
  size: 96,
})
const total = ref(0)
const list = ref<any[]>([])

function init() {
  const keys = Object.keys(icons).filter(key => key.includes(params.name))
  total.value = keys.length

  list.value = keys.slice(params.size * (params.current - 1), params.size * params.current).map(key => ({
    key,
    component: markRaw(icons[key as keyof typeof icons]),
  }))
}
init()

function handleSearch() {
  params.current = 1
  init()
}

const Component = computed(() => {
  if (model.value) {
    return icons[model.value as keyof typeof icons] as any
  }
  return null
})

const inputProps = computed<InputProps>(() => ({
  placeholder: '请输入图标名称',
  ...props,
  clearable: true,
}))

function handleOk(key: string) {
  model.value = key
  show.value = false
  emit('updateValue', model.value)
}
</script>

<template>
  <n-input-group>
    <n-input-group-label v-if="Component" class="flex items-center">
      <n-icon :component="Component" />
    </n-input-group-label>
    <n-input v-bind="inputProps" v-model:value="model" />

    <n-popover v-model:show="show" trigger="click" scrollable>
      <template #trigger>
        <n-button :disabled="disabled" :focusable="false" @click="show = true">
          <template #icon>
            <n-icon :component="SearchOutlined" />
          </template>
          选择图标
        </n-button>
      </template>
      <template #header>
        <n-input v-model:value="params.name" placeholder="输入图标名称" clearable @update:value="handleSearch" />
      </template>
      <n-grid :x-gap="12" :y-gap="12">
        <n-grid-item v-for="item in list" :key="item.key" :span="2">
          <n-tooltip>
            <template #trigger>
              <n-button size="small" @click="handleOk(item.key)">
                <template #icon>
                  <n-icon :component="item.component" />
                </template>
              </n-button>
            </template>
            {{ item.key }}
          </n-tooltip>
        </n-grid-item>
      </n-grid>
      <template #footer>
        <n-flex justify="center" align="center">
          <n-pagination
            v-model:page="params.current" v-model:page-size="params.size" :item-count="total" show-quick-jumper @update-page="init" @update-page-size="init"
          />
        </n-flex>
      </template>
    </n-popover>
  </n-input-group>
</template>
