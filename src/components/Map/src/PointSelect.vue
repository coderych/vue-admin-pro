<script setup lang="ts">
import { SearchOutlined } from '@vicons/antd'
import { inputProps } from 'naive-ui'

defineProps({
  ...inputProps,
})

const modelValue = defineModel<string>('value', { default: null })

const show = ref(false)

function handleSearch() {
}

function handleOk(key: string) {
  show.value = false
  modelValue.value = key
}
</script>

<template>
  <n-input-group>
    <n-input v-model:value="modelValue" />

    <n-popover v-model:show="show" trigger="click" scrollable>
      <template #trigger>
        <n-button :disabled="disabled" :focusable="false" @click="show = true">
          <template #icon>
            <n-icon :component="SearchOutlined" />
          </template>
          选择点位
        </n-button>
      </template>
      <template #header>
        <n-input placeholder="输入图标名称" clearable @update:value="handleSearch" />
      </template>
      地图
      <template #footer>
        <n-flex justify="center" align="center">
          <a-button type="primary" @click="handleOk('1')">
            确定
          </a-button>
          <a-button type="default" @click="show = false">
            取消
          </a-button>
        </n-flex>
      </template>
    </n-popover>
  </n-input-group>
</template>

<style scoped>

</style>
