<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import { LogApi } from '@/api/system/log'
import ECharts from '@/components/ECharts'
import { useDict } from '@/composables/dict'
import { Dict } from '@/enums/dict.ts'

const { optionsOf } = useDict()
const data = ref<Record<string, any>>({})

async function init() {
  const { data: res } = await LogApi.chart()
  data.value = res
}

init()

function dateChartOption(): any {
  const dates = [...new Set(data.value?.dateChart?.map((item: any) => item.date))]
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    legend: {
      data: optionsOf(Dict.LogType).map((item: any) => item.label),
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '12%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true,
        },
        data: dates,
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLine: {
          show: true,
        },
      },
    ],
    series: optionsOf(Dict.LogType).map((item) => {
      const _data = data.value?.dateChart?.filter((i: any) => i.type === item.value).map((i: any) => {
        return i.count
      })
      return {
        name: item.label,
        type: 'line',
        data: _data,
        label: {
          show: true,
        },
      }
    }),
  } as EChartsOption
}

function typeChartOption(): any {
  return {
    title: {
      text: '总比例',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: optionsOf(Dict.LogType).map((item: any) => {
          return {
            value: data.value?.typeChart?.find((i: any) => i.type === item.value)?.count,
            name: item.label,
          }
        }),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  } as EChartsOption
}
</script>

<template>
  <n-grid :x-gap="12" :y-gap="12" :item-responsive="true" responsive="screen">
    <n-gi span="24 s:24 m:16">
      <n-card>
        <ECharts :option="dateChartOption()" :height="`${300}px`" />
      </n-card>
    </n-gi>

    <n-gi span="24 s:24 m:8">
      <n-card>
        <ECharts :option="typeChartOption()" :height="`${300}px`" />
      </n-card>
    </n-gi>
  </n-grid>
</template>

<style scoped>

</style>
