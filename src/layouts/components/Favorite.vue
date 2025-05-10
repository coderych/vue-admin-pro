<script setup lang="ts">
import { renderIcon } from '@/utils/render'
import { DeleteOutlined, StarFilled, StarOutlined } from '@vicons/antd'
import { useStorage } from '@vueuse/core'
import { vDraggable } from 'vue-draggable-plus'
import TabAction from './TabAction.vue'

interface Favorite {
  key: string
  title: string
  name: string
  icon: string
}

const route = useRoute()
const router = useRouter()
const list = useStorage<Favorite[]>('__APP_FAVORITE__', [])
const exist = computed(() => route.name && list.value.some(item => item.name === route.name && item.key === route.fullPath))
const model = ref<Favorite>({
  name: '',
  title: '',
  key: '',
  icon: '',
})

function add() {
  model.value = {
    name: route.name as string,
    title: route.meta.title as string,
    key: route.fullPath,
    icon: route.meta.icon as string,
  }
  list.value.push(model.value)
}

function remove(name: string) {
  const index = list.value.findIndex(item => item.name === name)
  if (index !== -1) {
    list.value.splice(index, 1)
  }
}
</script>

<template>
  <n-popover trigger="click" placement="bottom-start">
    <template #trigger>
      <TabAction :component="!exist ? StarOutlined : StarFilled" />
    </template>
    <template #header>
      <n-flex justify="space-between" align="center">
        <span>
          我的收藏
        </span>

        <n-icon v-if="!exist" :component="StarOutlined" :size="18" class="cursor-pointer" @click="add()" />
        <n-icon v-else :component="StarFilled" :size="18" class="cursor-pointer" @click="remove(route.name as string)" />
      </n-flex>
    </template>
    <div class="min-h-120px min-w-284px">
      <n-grid
        v-if="list?.length" v-draggable="[
          list,
          {
            animation: 150,
            ghostClass: 'ghost',
          },
        ]" :x-gap="12" :y-gap="12"
      >
        <n-gi v-for="(item) in list" :key="item.key" :span="12">
          <n-button @click="router.push(item.key)">
            <template #icon>
              <component :is="renderIcon(item.icon)" />
            </template>
            <span class="w-60px text-ellipsis text-left">
              {{ item.title }}
            </span>
            <n-icon :component="DeleteOutlined" :size="16" class="ml-2" @click.stop="remove(item.name)" />
          </n-button>
        </n-gi>
      </n-grid>
      <n-empty v-else />
    </div>
  </n-popover>
</template>

<style scoped>

</style>
