<script setup lang="ts">
import Simplebar from 'simplebar-vue'
import 'simplebar-vue/dist/simplebar.min.css'

withDefaults(defineProps<{
  xScrollable?: boolean
}>(), {
  xScrollable: false,
})

const emit = defineEmits(['scroll'])
</script>

<template>
  <Simplebar v-bind="$attrs" :class="{ 'overflow-x-hidden': !xScrollable }" @scroll="emit('scroll', $event)">
    <slot />
  </Simplebar>
</template>

<style>
</style>
