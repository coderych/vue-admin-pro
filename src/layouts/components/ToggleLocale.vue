<script setup lang="ts">
import type { LocaleEnum } from '@/enums/common'
import { LocaleOptions } from '@/enums/common'
import { useAppStore } from '@/stores'
import { TranslateOutlined } from '@vicons/material'
import HeaderAction from './HeaderAction.vue'

const { toggleLocale } = useAppStore()

function handleSelect(value: LocaleEnum) {
  toggleLocale(value)
}
</script>

<template>
  <n-dropdown show-arrow trigger="hover" :options="LocaleOptions" @select="handleSelect">
    <HeaderAction :icon="TranslateOutlined" />
  </n-dropdown>
</template>

<style scoped>

</style>
