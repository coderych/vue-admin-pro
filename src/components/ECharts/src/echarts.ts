import type { ECharts, EChartsOption } from 'echarts'
import type { Ref } from 'vue'
import { useDark } from '@vueuse/core'
import * as echarts from 'echarts'
import { BarChart, LineChart, MapChart, PictorialBarChart, PieChart, RadarChart } from 'echarts/charts'
import { AriaComponent, CalendarComponent, DatasetComponent, DataZoomComponent, GraphicComponent, GridComponent, LegendComponent, ParallelComponent, PolarComponent, RadarComponent, TimelineComponent, TitleComponent, ToolboxComponent, TooltipComponent, TransformComponent, VisualMapComponent } from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers'

(echarts as any).use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PolarComponent,
  AriaComponent,
  ParallelComponent,
  LegendComponent,
  RadarComponent,
  ToolboxComponent,
  DatasetComponent,
  DataZoomComponent,
  VisualMapComponent,
  TimelineComponent,
  CalendarComponent,
  GraphicComponent,
  TransformComponent,
  CanvasRenderer,
  SVGRenderer,
  LabelLayout,
  UniversalTransition,
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  RadarChart,
  PictorialBarChart,
])

export function useEcharts(el: Ref<HTMLDivElement | null>) {
  const isDark = useDark()

  const instance = shallowRef<ECharts | null>(null)

  function init() {
    const value = unref(el)
    if (!value) {
      console.warn('容器未找到')
      return
    }

    instance.value = echarts.init(value, isDark.value ? 'dark' : 'light')
  }

  function setOption(option: EChartsOption) {
    if (!instance.value) {
      console.warn('ECharts 实例未初始化')
      return
    }
    instance.value.setOption(option)
  }

  function dispose() {
    removeResizeListener()
    instance.value?.dispose()
    instance.value = null
  }

  function resize() {
    if (!instance.value) {
      console.warn('ECharts 实例未初始化')
      return
    }
    instance.value.resize()
  }

  function setResizeListener() {
    console.info('useEcharts setResizeListener')
    window.addEventListener('resize', resize)
  }

  function removeResizeListener() {
    console.info('useEcharts removeResizeListener')
    window.removeEventListener('resize', resize)
  }

  onMounted(() => {
    init()
  })

  onBeforeUnmount(() => {
    dispose()
  })

  onDeactivated(() => {
    removeResizeListener()
  })

  return {
    instance,
    init,
    setOption,
    resize,
    dispose,
    setResizeListener,
    removeResizeListener,
  }
}
