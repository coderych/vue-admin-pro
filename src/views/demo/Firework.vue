<script setup lang="ts">
import { Fire, FIRERWORK_EMITTER_KEY } from '@/components/Application'
import { useEmitter } from '@/composables/app'

let timer: any
const disabled = ref(false)
const emitter = useEmitter()

function handle(firework: string | null, count: number = 1) {
  if (timer) {
    clearInterval(timer)
  }
  disabled.value = true
  let i = 0
  timer = setInterval(() => {
    emitter.emit(FIRERWORK_EMITTER_KEY, firework || Fire[Object.keys(Fire)[Math.floor(Math.random() * Object.keys(Fire).length)]])
    i++
    if (i >= count) {
      clearInterval(timer)
      timer = null
      disabled.value = false
    }
  }, 1000)
}
</script>

<template>
  <PageWrapper preset="card">
    <n-flex :size="12">
      <n-button type="primary" :disabled="disabled" @click="handle(Fire.hb)">
        红包
      </n-button>

      <n-button type="primary" :disabled="disabled" @click="handle(Fire.sd)">
        雪花
      </n-button>

      <n-button type="primary" :disabled="disabled" @click="handle(Fire.xc)">
        烟花
      </n-button>

      <n-button type="primary" :disabled="disabled" @click="handle(Fire.hb, 10)">
        红包雨
      </n-button>

      <n-button type="primary" :disabled="disabled" @click="handle(Fire.sd, 10)">
        雪花飘落
      </n-button>

      <n-button type="primary" :disabled="disabled" @click="handle(Fire.xc, 10)">
        烟花表演
      </n-button>

      <n-button type="primary" :disabled="disabled" @click="handle(null, 30)">
        随机
      </n-button>
    </n-flex>
  </PageWrapper>
</template>

<style scoped>

</style>
