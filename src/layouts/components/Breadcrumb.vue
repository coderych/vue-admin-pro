<script setup lang="ts">
import type { Menu } from '@/stores'
import { useAppStore } from '@/stores/app.ts'

const route = useRoute()
const router = useRouter()
const map = new Map()
const { breadcrumbIcon, breadcrumb, menuOptions } = storeToRefs(useAppStore())

const breadcrumbs = computed(() => {
  const path = route.meta?.activeMenu || route.path

  if (map.has(path)) {
    return map.get(path)
  }
  const parents = getParents(menuOptions.value, path).filter(item => item.hideInBreadcrumb !== true)

  map.set(path, parents)
  return parents
})

function getParents(tree: Menu[], key: string, parents: Menu[] = []): Menu[] {
  for (const item of tree) {
    if (item.key === key) {
      return [...parents, item]
    }
    if (item.children?.length) {
      const result = getParents(item.children, key, [...parents, item])
      if (result.length) {
        return result
      }
    }
  }
  return []
}

function select(key: string) {
  router.push(key)
}
</script>

<template>
  <n-breadcrumb v-if="breadcrumb">
    <n-breadcrumb-item v-for="item in breadcrumbs" :key="item.key">
      <n-dropdown :options="item.children?.filter((item: any) => item.hideInBreadcrumb !== true)" show-arrow @select="select">
        <div class="trigger">
          <component :is="item.icon" v-if="breadcrumbIcon" />
          {{ item.label }}
        </div>
      </n-dropdown>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<style scoped>

</style>
