<script setup lang="ts">
import Simplebar from 'simplebar-vue'
import 'simplebar-vue/dist/simplebar.min.css'

withDefaults(defineProps<{
  xScrollable?: boolean
}>(), {
  xScrollable: false,
})

const emit = defineEmits(['scroll'])

const simplebarRef = ref<any>()

defineExpose(new Proxy({}, {
  get: (_, key) => simplebarRef.value?.[key],
  has: (_, key) => key in simplebarRef.value,
}))
</script>

<template>
  <Simplebar ref="simplebarRef" v-bind="$attrs" class="h-full" :class="{ 'overflow-x-hidden': !xScrollable }" @scroll="emit('scroll', $event)">
    <slot />
  </Simplebar>
</template>

<style>
</style>
