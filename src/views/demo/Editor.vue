<script setup lang="ts">
import type { EditorInst } from '@/components/Form/Editor/typing'
import { Editor, EditorContent } from '@/components/Form'

const editorRef = ref<EditorInst>()
const editor = computed(() => editorRef.value?.getInstance())
const value = ref<string>('')

function handleClick() {
  console.log(editor.value)

  console.log(editor.value?.getHtml())
}
</script>

<template>
  <PageWrapper preset="card">
    <n-flex :size="12" vertical>
      <n-button @click="handleClick">
        点击
      </n-button>
      <n-input v-model:value="value" />
      <Editor ref="editorRef" v-model:value="value" />
      <EditorContent :value="value" />
    </n-flex>
  </PageWrapper>
</template>

<style scoped>

</style>
