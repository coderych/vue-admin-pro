<script setup lang="ts">
import { ref } from 'vue'

const multiInstanceType = ref('none')
const loopCardinality = ref('')
const collection = ref('')
const elementVariable = ref('')
const completionCondition = ref('')
</script>

<template>
  <n-form label-placement="top" :show-feedback="false" class="flex-col gap-12px" size="small">
    <n-form-item label="多实例类型">
      <n-select
        v-model:value="multiInstanceType"
        :options="[
          { label: '无', value: 'none' },
          { label: '并行多重事件', value: 'parallel' },
          { label: '时序多重事件', value: 'sequential' },
        ]"
        placeholder="请选择多实例类型"
      />
    </n-form-item>
    <template v-if="multiInstanceType !== 'none'">
      <n-form-item label="循环基数">
        <n-input v-model:value="loopCardinality" placeholder="请输入循环基数" />
      </n-form-item>
      <n-form-item label="集合">
        <n-input v-model:value="collection" placeholder="请输入集合" />
      </n-form-item>
      <n-form-item label="元素变量">
        <n-input v-model:value="elementVariable" placeholder="请输入元素变量" />
      </n-form-item>
      <n-form-item label="完成条件">
        <n-input
          v-model:value="completionCondition"
          type="textarea"
          placeholder="请输入完成条件"
        />
      </n-form-item>
    </template>
  </n-form>
</template>

<style scoped>
</style>
