<script setup lang="ts">
import { useTabStore } from '@/stores'

const tabStore = useTabStore()
const { resetTab } = tabStore
const { activeTab, canBack, canForward } = storeToRefs(tabStore)

onMounted(() => {
  resetTab({ title: `3s 后变成"哈哈哈"` })
})

setTimeout(() => {
  resetTab({ title: `哈哈哈` })
}, 3000)
</script>

<template>
  <PageWrapper preset="card">
    <n-flex :size="12" :wrap="true" vertical>
      <n-input :value="activeTab?.title" @update:value="(value) => resetTab({ title: value })" />
      <n-alert type="info">
        是否可回退： {{ canBack }}
      </n-alert>
      <n-alert type="info">
        是否可前进： {{ canForward }}
      </n-alert>
    </n-flex>
  </PageWrapper>
</template>

<style scoped>

</style>
