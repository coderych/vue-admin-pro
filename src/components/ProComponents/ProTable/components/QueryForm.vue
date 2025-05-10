<script setup lang="ts">
import type { FormProps } from 'naive-ui'
import type { ProTableColumn, ProTableFormSlotProps, ProTableSearchOption } from '../typing'
import { DownOutlined, UpOutlined } from '@vicons/antd'
import { useElementSize } from '@vueuse/core'
import { debounce } from 'lodash-es'
import { useProTableState } from '../context'
import { getSearchOption, renderField } from './render-field'

defineEmits<{
  'update:value': [value: Record<string, any>]
  'search': [value: Record<string, any>]
}>()

defineSlots<{
  suffix: () => void
  default: (props: ProTableFormSlotProps) => void
}>()

const { columns: tableColumns, search: searchFun, loading, option, formProps: queryFormProps } = useProTableState()
const model = defineModel<Record<string, any>>('value', { default: {} })
const initialValue: Record<string, any> = { ...model.value }

const columns = computed(() => {
  return tableColumns.value?.filter((column: ProTableColumn) => {
    if (typeof column.search === 'boolean') {
      return column.search
    }
    return column.search && column.search.enabled !== false
  })
})

const domRef = ref<HTMLElement>()
const { width } = useElementSize(domRef)
const collapsed = ref(false)
const itemCount = computed(() => {
  if (width.value < 513)
    return 1
  else if (width.value < 1062)
    return 2
  else if (width.value < 1352)
    return 3
  return 4
})
const items = computed(() => {
  if (collapsed.value) {
    if (itemCount.value <= 1) {
      return columns.value.slice(0, 1)
    }
    return columns.value.slice(0, itemCount.value - 1)
  }
  return columns.value
})
const suffixSpan = computed(() => {
  if (itemCount.value <= 1) {
    return 24
  }
  const rest = items.value.length % itemCount.value
  if (rest === 0) {
    return 24
  }
  return (24 / itemCount.value) * (itemCount.value - rest)
})

function reset() {
  const allKeys = columns.value.map(item => getSearchOption(item)?.key)
  const disabledKeys = columns.value.filter((item) => {
    const option = getSearchOption(item)
    return option?.disabled === true || option?.clearable === false
  }).map(item => getSearchOption(item)?.key)

  for (const key of allKeys) {
    if (disabledKeys.includes(key)) {
      continue
    }
    const _key = key as keyof typeof model.value
    model.value[_key] = initialValue[_key] || null
  }
  if (option.value === false || option.value?.submit !== true) {
    search()
  }
}

function search() {
  searchFun?.(model.value)
}

const onSearch = debounce(search, 500)

function getSlotProps(column: ProTableColumn): ProTableFormSlotProps {
  const option: ProTableSearchOption = typeof column.search === 'object' ? column.search : { key: column.key }
  const key = option.key || column.key
  return {
    option,
    params: model.value,
    key,
    value: model.value[key] || '',
    column,
  }
}

const formProps = computed<FormProps>(() => {
  return {
    showFeedback: false,
    showLabel: false,
    ...queryFormProps.value,
  }
})

function onUpdatedSearch() {
  if ((option.value === false || option.value?.submit !== true)) {
    onSearch()
  }
}
</script>

<template>
  <n-card v-if="items.length && (option && option.search !== false)" ref="domRef">
    <n-form :model="model" v-bind="formProps">
      <n-grid :cols="24" :x-gap="12" :y-gap="12">
        <n-form-item-gi v-for="item in items" :key="item.key" :label="item.title" :span="(item.search && item.search !== true && item.search.span) || (24 / itemCount)">
          <slot name="default" v-bind="getSlotProps(item)">
            <component :is="renderField(item, model, onUpdatedSearch)" />
          </slot>
        </n-form-item-gi>
        <n-gi :span="suffixSpan">
          <n-flex align="center" justify="flex-end" class="h-full">
            <slot name="suffix">
              <n-button size="small" :loading="loading" :focusable="false" strong @click="reset">
                重 置
              </n-button>
              <n-button v-if="option?.submit === true" :loading="loading" :focusable="false" type="primary" size="small" strong @click="search">
                搜 索
              </n-button>
            </slot>
            <n-button v-if="columns.length > itemCount" text type="primary" @click="collapsed = !collapsed">
              {{ collapsed ? '展开' : '收起' }}
              <template #icon>
                <n-icon :component="collapsed ? DownOutlined : UpOutlined" />
              </template>
            </n-button>
          </n-flex>
        </n-gi>
      </n-grid>
    </n-form>
  </n-card>
</template>

<style scoped>

</style>
