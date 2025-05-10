<script setup lang="ts">
import type { LocaleEnum } from '@/enums/common'
import { useLocale } from '@/composables/locale'
import { LocaleOptions } from '@/enums/common'

const { locale, t, toggle } = useLocale()
</script>

<template>
  <PageWrapper preset="card">
    <div :size="12" :wrap="false">
      <pro-radio-group v-model:value="locale" :options="LocaleOptions" @update:value="(v) => toggle(v as LocaleEnum)" />
      <n-alert type="info">
        {{ t('locale') }}: {{ locale }}
      </n-alert>
    </div>
  </PageWrapper>
</template>

<style scoped>

</style>
