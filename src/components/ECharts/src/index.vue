<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import type { CSSProperties } from 'vue'
import { getCssVar } from '@/utils/common'
import { useDark } from '@vueuse/core'
import { useEcharts } from './echarts'

const props = withDefaults(defineProps<{
  option: EChartsOption
  width?: string
  height?: string
  autoResize?: boolean
}>(), {
  autoResize: true,
  width: '100%',
  height: '100px',
})

const isDark = useDark()
const chartRef = ref<HTMLDivElement | null>(null)

const { setOption, setResizeListener, removeResizeListener, dispose, init } = useEcharts(chartRef)

function getBackgroundColor() {
  return getCssVar(chartRef, '--card-color')
}

const style = computed<CSSProperties>(() => ({
  width: `${props.width}`,
  height: `${props.height}`,
}))

watch(() => props.option, (value) => {
  nextTick(() => {
    setOption({ backgroundColor: getBackgroundColor(), ...value })
  })
}, { immediate: true })

watch(isDark, () => {
  dispose()
  init()
  setOption({ backgroundColor: getBackgroundColor(), ...props.option })
})

onMounted(() => {
  if (props.autoResize === true) {
    setResizeListener()
  }
  else {
    removeResizeListener()
  }
})
</script>

<template>
  <div ref="chartRef" :style="style" class="echarts-container" />
</template>

<style scoped>
</style>
