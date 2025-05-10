<script setup lang="ts">
import Icon from '@/components/Application/src/Icon.vue'

const value = ref<string>('')
</script>

<template>
  <PageWrapper preset="card">
    <div :size="12" :wrap="false">
      <IconSelect v-model:value="value" />

      <i class="i-svg:logo?mask h-100px w-100px color-primary" />
      <Icon name="svg:logo" color="primary" :size="60" />
    </div>
  </PageWrapper>
</template>

<style scoped>

</style>
