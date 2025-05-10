<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <PageWrapper :header="false">
    <iframe :src="`${route.meta.originPath}`" class="wh-full border-0" />
  </PageWrapper>
</template>

<style scoped>

</style>
