<script setup lang="ts">
import { useBpmnModeler } from '../../../context'

const { updateProperties, elementData } = useBpmnModeler()
</script>

<template>
  <n-form label-placement="top" :model="elementData" :show-feedback="false" class="flex-col gap-12px" size="small">
    <n-form-item label="ID" required>
      <n-input :value="elementData?.id" placeholder="请输入ID" @update:value="updateProperties({ id: $event })" />
    </n-form-item>
    <n-form-item label="名称">
      <n-input :value="elementData?.name || null" placeholder="请输入名称" @update:value="updateProperties({ name: $event })" />
    </n-form-item>
  </n-form>
</template>

<style scoped>

</style>
