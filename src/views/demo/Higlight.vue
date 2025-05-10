<script setup lang="ts">
import Highlight from '@/components/Highlight'

const code = `function sleep (ms = 1000) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
def say_hello():
    print('Hello Naive UI')
int main () {
  std::cout << "Hello Naive UI";
  return 0;
}`
</script>

<template>
  <PageWrapper preset="card">
    <n-flex :size="12">
      <Highlight :code="code" />
    </n-flex>
  </PageWrapper>
</template>

<style scoped>

</style>
