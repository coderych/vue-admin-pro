<script setup>
import { PageWrapper, Scrollbar } from '@/components/Application'
</script>

<template>
  <PageWrapper preset="card">
    <Scrollbar class="h-100px">
      <div v-for="n in 10" :key="n">
        Example content
      </div>
    </Scrollbar>

    <Scrollbar class="h-100px">
      <div class="w-10000px">
        123
      </div>
    </Scrollbar>
  </PageWrapper>
</template>

<style lang="less">
.simplebar-scrollbar::before {
  background-color: var(--scrollbar-color-hover);
  border-radius: var(--scrollbar-border-radius);
}

.simplebar-horizontal {
  .simplebar-scrollbar::before {
    height: var(--scrollbar-height) !important;
  }
}

.simplebar-vertical {
  .simplebar-scrollbar::before {
    width: var(--scrollbar-width) !important;
  }
}
</style>
