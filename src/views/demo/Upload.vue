<script setup lang="ts">
import { FileUpload, ImageUpload } from '@/components/Form'

const value = ref<string>('')
</script>

<template>
  <PageWrapper preset="card">
    <div>
      <FileUpload v-model:value="value" :max="10" :multiple="true" />
      <ImageUpload v-model:value="value" />
      {{ value }}
    </div>
  </PageWrapper>
</template>

<style scoped>

</style>
