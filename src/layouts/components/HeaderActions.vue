<script setup lang="ts">
import ProjectSetting from './ProjectSetting.vue'
import Search from './Search.vue'
import ToggleFullscreen from './ToggleFullscreen.vue'
import ToggleLocale from './ToggleLocale.vue'
import ToggleTheme from './ToggleTheme.vue'
import UserAvatar from './UserAvatar.vue'
</script>

<template>
  <n-flex :wrap="false" align="center" class="mx-12px h-full" :size="6">
    <Search />
    <ToggleTheme />
    <ToggleLocale />
    <ToggleFullscreen />
    <ProjectSetting />
    <UserAvatar />
  </n-flex>
</template>

<style scoped>
</style>
