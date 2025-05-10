<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import { ECharts } from '@/components/ECharts'
import { LineChartOutlined, ShoppingCartOutlined, TeamOutlined, WalletOutlined } from '@vicons/antd'
import { NCard, NGrid, NGridItem, NIcon, NNumberAnimation, NSpace } from 'naive-ui'

const visitorsOption: EChartsOption = {
  title: {
    text: '访问量趋势',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  },
  yAxis: {
    type: 'value',
  },
  series: [{
    data: [820, 932, 901, 934, 1290, 1330, 1320],
    type: 'line',
    smooth: true,
  }],
}

const salesOption: EChartsOption = {
  title: {
    text: '销售额分布',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
  },
  series: [{
    type: 'pie',
    radius: '50%',
    data: [
      { value: 1048, name: '服装' },
      { value: 735, name: '电子' },
      { value: 580, name: '食品' },
      { value: 484, name: '家居' },
      { value: 300, name: '其他' },
    ],
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
      },
    },
  }],
}

const revenueOption: EChartsOption = {
  title: {
    text: '收入统计',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月'],
  },
  yAxis: {
    type: 'value',
  },
  series: [{
    data: [120, 200, 150, 80, 70, 110],
    type: 'bar',
    showBackground: true,
    backgroundStyle: {
      color: 'rgba(180, 180, 180, 0.2)',
    },
  }],
}
</script>

<template>
  <PageWrapper>
    <NGrid :cols="24" :x-gap="12" :y-gap="12">
      <!-- 数据概览卡片 -->
      <NGridItem :span="6">
        <NCard>
          <NSpace align="center" justify="space-between">
            <div class="stat-info">
              <div class="stat-title">
                总访问量
              </div>
              <NNumberAnimation :from="0" :to="100000" />
            </div>
            <NIcon size="48" color="#2080f0">
              <LineChartOutlined />
            </NIcon>
          </NSpace>
        </NCard>
      </NGridItem>
      <NGridItem :span="6">
        <NCard>
          <NSpace align="center" justify="space-between">
            <div class="stat-info">
              <div class="stat-title">
                活跃用户
              </div>
              <NNumberAnimation :from="0" :to="25000" />
            </div>
            <NIcon size="48" color="#18a058">
              <TeamOutlined />
            </NIcon>
          </NSpace>
        </NCard>
      </NGridItem>
      <NGridItem :span="6">
        <NCard>
          <NSpace align="center" justify="space-between">
            <div class="stat-info">
              <div class="stat-title">
                订单数
              </div>
              <NNumberAnimation :from="0" :to="8500" />
            </div>
            <NIcon size="48" color="#f0a020">
              <ShoppingCartOutlined />
            </NIcon>
          </NSpace>
        </NCard>
      </NGridItem>
      <NGridItem :span="6">
        <NCard>
          <NSpace align="center" justify="space-between">
            <div class="stat-info">
              <div class="stat-title">
                总收入
              </div>
              <NNumberAnimation :from="0" :to="50000" />
            </div>
            <NIcon size="48" color="#d03050">
              <WalletOutlined />
            </NIcon>
          </NSpace>
        </NCard>
      </NGridItem>

      <!-- 图表区域 -->
      <NGridItem :span="16">
        <NCard title="访问趋势分析">
          <ECharts :option="visitorsOption" height="400px" />
        </NCard>
      </NGridItem>
      <NGridItem :span="8">
        <NCard title="销售分布">
          <ECharts :option="salesOption" height="400px" />
        </NCard>
      </NGridItem>
      <NGridItem :span="24">
        <NCard title="月度收入统计">
          <ECharts :option="revenueOption" height="300px" />
        </NCard>
      </NGridItem>
    </NGrid>
  </PageWrapper>
</template>

<style lang="less" scoped>
.dashboard-container {
  padding: 16px;

  .stat-info {
    .stat-title {
      font-size: 16px;
      color: #666;
      margin-bottom: 8px;
    }

    .n-number-animation {
      font-size: 24px;
      font-weight: bold;
      color: #333;
    }
  }
}
</style>
