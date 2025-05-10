<script setup lang="ts">
import type { DropdownOption } from 'naive-ui'
import router from '@/router'
import { useAppStore } from '@/stores'
import { renderNIcon } from '@/utils/render'
import { LogoutOutlined, ReloadOutlined, UserOutlined } from '@vicons/antd'
import { NAvatar } from 'naive-ui'

const appStore = useAppStore()
const userInfo = computed(() => appStore.userInfo)

const options: DropdownOption[] = [
  {
    key: 'header',
    type: 'render',
    render: () => h('div', { class: 'flex items-center px-12px gap-12px min-w-160px' }, [
      h(NAvatar, { src: userInfo.value?.avatar }),
      h('div', { class: 'flex flex-col justify-between' }, [
        h('span', { class: 'text-14px' }, { default: () => `${userInfo.value?.name}（${userInfo.value?.username}）` }),
        h('span', { class: 'text-12px' }, { default: () => userInfo.value?.phone }),
      ]),
    ]),
  },
  {
    key: 'header-divider',
    type: 'divider',
  },
  {
    label: '个人中心',
    key: 'profile',
    icon: renderNIcon(UserOutlined),
  },
  {
    label: '刷新缓存',
    key: 'reload',
    icon: renderNIcon(ReloadOutlined),
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderNIcon(LogoutOutlined),
  },
]

function onSelect(key: string) {
  if (key === 'profile') {
    router.push({ name: 'Profile' })
  }
  else if (key === 'logout') {
    appStore.logout()
  }
}
</script>

<template>
  <n-dropdown :options="options" show-arrow @select="onSelect">
    <n-flex align="center" class="user-avatar cursor-pointer">
      <span>
        {{ userInfo?.name || '未登录' }}
      </span>
      <NAvatar :src="userInfo?.avatar" />
    </n-flex>
  </n-dropdown>
</template>

<style scoped>
.user-avatar {
  cursor: pointer;
  margin-left: 6px;
}
</style>
