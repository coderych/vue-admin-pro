<script setup lang="ts">
import Scrollbar from '@/components/Application/src/Scrollbar.vue'

const num = ref(10)
</script>

<template>
  <PageWrapper preset="default">
    <Scrollbar class="h-200px overflow-auto bg-red">
      <div class="sticky top-0 z-999 h-40px bg-blue-500 text-white">
        123
      </div>
      <div class="flex bg-amber">
        <div class="border-box z-100 w-full border-red bg-purple" style="border: 10px solid red;">
          <h1 v-for="i in 10" :key="i">
            Child
          </h1>
        </div>
      </div>
      <div class="sticky bottom-0 z-999 h-40px bg-blue-500 text-white">
        123
      </div>
    </Scrollbar>
    <div>
      <div class="box shadow-right">
        右侧阴影
      </div>
      <div class="box shadow-bottom">
        底部阴影
      </div>
      <div class="box shadow-top-left">
        左上阴影
      </div>
    </div>
    <div>
      <n-button @click="num++">
        {{ num }}++
      </n-button>
      <n-button @click="num--">
        {{ num }}--
      </n-button>

      <h1 v-for="i in num" :key="i" class="h-100px">
        {{ i }}
      </h1>
    </div>
  </PageWrapper>
</template>

<style scoped>
  .box {
  width: 200px;
  height: 200px;
  background-color: lightblue;
  margin: 50px;
}

.shadow-right {
  box-shadow: 10px 0 5px rgba(0, 0, 0, 0.3);
}

.shadow-bottom {
  box-shadow: 0 10px 5px rgba(0, 0, 0, 0.3);
}

.shadow-top-left {
  box-shadow: -10px -10px 5px rgba(0, 0, 0, 0.3);
}
</style>
