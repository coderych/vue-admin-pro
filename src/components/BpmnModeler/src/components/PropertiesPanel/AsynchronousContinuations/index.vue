<script setup lang="ts">
import { ref } from 'vue'

interface AsyncContinuations {
  before: boolean
  after: boolean
  exclusive: boolean
}

const asyncContinuations = ref<AsyncContinuations>({
  before: false,
  after: false,
  exclusive: false,
})
</script>

<template>
  <NForm label-placement="top" :show-feedback="false" class="flex-col gap-12px" size="small" :show-label="false">
    <NFormItem>
      <NCheckbox v-model:checked="asyncContinuations.before">
        Before
      </NCheckbox>
    </NFormItem>
    <NFormItem>
      <NCheckbox v-model:checked="asyncContinuations.after">
        After
      </NCheckbox>
    </NFormItem>
    <NFormItem>
      <NCheckbox v-model:checked="asyncContinuations.exclusive">
        Exclusive
      </NCheckbox>
    </NFormItem>
  </NForm>
</template>

<style scoped>
</style>
