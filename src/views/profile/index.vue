<script setup lang="ts">
import { BellOutlined, EditOutlined, LockOutlined, SaveOutlined } from '@vicons/antd'
import { NAvatar, NBadge, NButton, NCard, NForm, NFormItem, NGrid, NGridItem, NInput, NList, NListItem, NProgress, NSelect, NSpace, NStatistic, NTag, NThing, NTimeline, NTimelineItem } from 'naive-ui'

interface UserProfile {
  avatar: string
  username: string
  nickname: string
  email: string
  phone: string
  gender: string
  department: string
  position: string
  bio: string
}

const userProfile = ref<UserProfile>({
  avatar: '',
  username: 'admin',
  nickname: '管理员',
  email: 'admin@example.com',
  phone: '13800138000',
  gender: 'male',
  department: '技术部',
  position: '全栈开发工程师',
  bio: '热爱技术，专注开发',
})

// 技能标签
const skills = [
  { name: 'Vue.js', level: 90 },
  { name: 'TypeScript', level: 85 },
  { name: 'Node.js', level: 80 },
  { name: 'React', level: 75 },
  { name: 'Docker', level: 70 },
]

// 项目参与记录
const projects = [
  {
    name: '企业管理系统',
    role: '前端负责人',
    period: '2023.10 - 至今',
    description: '负责系统架构设计和核心功能开发',
  },
  {
    name: '电商平台',
    role: '全栈开发',
    period: '2023.05 - 2023.09',
    description: '负责商品管理和订单系统开发',
  },
  {
    name: '数据可视化平台',
    role: '前端开发',
    period: '2023.01 - 2023.04',
    description: '负责大屏展示和图表开发',
  },
]

const editing = ref(false)
const formRef = ref()

const genderOptions = [
  { label: '男', value: 'male' },
  { label: '女', value: 'female' },
]

const departmentOptions = [
  { label: '技术部', value: '技术部' },
  { label: '产品部', value: '产品部' },
  { label: '运营部', value: '运营部' },
  { label: '市场部', value: '市场部' },
]

async function handleSave() {
  await formRef.value?.validate()
  // TODO: 调用API保存用户信息
  editing.value = false
  window.$message?.success('保存成功')
}

function handleEdit() {
  editing.value = true
}

const rules = {
  nickname: { required: true, message: '请输入昵称', trigger: 'blur' },
  email: {
    required: true,
    message: '请输入邮箱',
    trigger: 'blur',
    validator: (rule: any, value: string) => {
      if (!value)
        return false
      const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/
      return emailRegex.test(value)
    },
  },
  phone: {
    required: true,
    message: '请输入手机号',
    trigger: 'blur',
    validator: (rule: any, value: string) => {
      if (!value)
        return false
      const phoneRegex = /^1[3-9]\d{9}$/
      return phoneRegex.test(value)
    },
  },
}

// 模拟数据
const statistics = [
  { label: '登录天数', value: 128 },
  { label: '操作次数', value: 1562 },
  { label: '活跃度', value: 98, suffix: '%' },
]

const recentActivities = [
  { type: 'info', title: '登录系统', content: '通过PC端登录系统', time: '2024-01-10 10:30:00' },
  { type: 'success', title: '更新资料', content: '修改了个人信息', time: '2024-01-09 15:20:00' },
  { type: 'warning', title: '修改密码', content: '成功修改登录密码', time: '2024-01-08 09:15:00' },
]

const notifications = [
  { title: '系统升级通知', content: '系统将于今晚22:00进行例行维护升级', time: '10分钟前', read: false },
  { title: '安全提醒', content: '检测到您的账号在新设备上登录', time: '2小时前', read: true },
  { title: '待办提醒', content: '您有3个待处理的任务需要关注', time: '1天前', read: true },
]

const securityScore = 85
</script>

<template>
  <PageWrapper>
    <NGrid :cols="24" :x-gap="16" :y-gap="16">
      <NGridItem :span="8">
        <NCard>
          <NSpace vertical align="center" justify="center" style="width: 100%">
            <NAvatar :size="128" :src="userProfile.avatar" />
            <h2>{{ userProfile.nickname }}</h2>
            <p class="text-gray-500">
              {{ userProfile.position }}
            </p>
            <p class="text-gray-500">
              {{ userProfile.department }}
            </p>
            <div class="skill-tags">
              <NTag
                v-for="skill in skills"
                :key="skill.name"
                :type="skill.level >= 85 ? 'success' : (skill.level >= 75 ? 'warning' : 'default')"
                class="skill-tag"
              >
                {{ skill.name }}
              </NTag>
            </div>
          </NSpace>
        </NCard>

        <!-- 活跃度统计 -->
        <NCard title="活跃度统计" class="mt-4">
          <NSpace vertical size="large">
            <NGrid :cols="3" :x-gap="12">
              <NGridItem v-for="stat in statistics" :key="stat.label">
                <NStatistic :label="stat.label" :value="stat.value" :suffix="stat.suffix" />
              </NGridItem>
            </NGrid>
          </NSpace>
        </NCard>

        <!-- 项目参与记录 -->
        <NCard title="项目参与" class="mt-4">
          <NList>
            <NListItem v-for="project in projects" :key="project.name">
              <NThing
                :title="project.name"
                :content="project.description"
              >
                <template #description>
                  <NSpace size="small" style="margin-top: 8px">
                    <NTag size="small" type="info">
                      {{ project.role }}
                    </NTag>
                    <span class="text-gray-500">{{ project.period }}</span>
                  </NSpace>
                </template>
              </NThing>
            </NListItem>
          </NList>
        </NCard>

        <!-- 账号安全 -->
        <NCard title="账号安全" class="mt-4">
          <NSpace vertical>
            <div class="security-score">
              <div class="score-label">
                安全评分
              </div>
              <NProgress
                type="circle"
                :percentage="securityScore"
                :color="securityScore >= 80 ? '#18a058' : (securityScore >= 60 ? '#f0a020' : '#d03050')"
              />
            </div>
            <NList>
              <NListItem>
                <NThing title="登录密码" content="已设置">
                  <template #header-extra>
                    <NButton text type="primary" @click="() => { window.$message.info('修改密码功能开发中') }">
                      <template #icon>
                        <n-icon><LockOutlined /></n-icon>
                      </template>
                      修改
                    </NButton>
                  </template>
                </NThing>
              </NListItem>
              <NListItem>
                <NThing title="安全手机" :content="userProfile.phone">
                  <template #header-extra>
                    <NButton text type="primary" @click="() => { window.$message?.info('绑定手机功能开发中') }">
                      修改
                    </NButton>
                  </template>
                </NThing>
              </NListItem>
            </NList>
          </NSpace>
        </NCard>
      </NGridItem>

      <NGridItem :span="16">
        <NCard
          title="个人资料"
          :bordered="false"
          size="large"
          :segmented="{ content: true }"
        >
          <template #header-extra>
            <NSpace>
              <NButton
                v-if="!editing"
                type="primary"
                @click="handleEdit"
              >
                <template #icon>
                  <n-icon>
                    <EditOutlined />
                  </n-icon>
                </template>
                编辑
              </NButton>
              <NButton
                v-else
                type="primary"
                @click="handleSave"
              >
                <template #icon>
                  <n-icon>
                    <SaveOutlined />
                  </n-icon>
                </template>
                保存
              </NButton>
            </NSpace>
          </template>

          <NForm
            ref="formRef"
            :model="userProfile"
            :rules="rules"
            label-placement="left"
            label-width="100"
            require-mark-placement="right-hanging"
            :disabled="!editing"
          >
            <NFormItem label="用户名" path="username">
              <NInput v-model:value="userProfile.username" disabled />
            </NFormItem>
            <NFormItem label="昵称" path="nickname">
              <NInput v-model:value="userProfile.nickname" />
            </NFormItem>
            <NFormItem label="性别" path="gender">
              <NSelect
                v-model:value="userProfile.gender"
                :options="genderOptions"
              />
            </NFormItem>
            <NFormItem label="邮箱" path="email">
              <NInput v-model:value="userProfile.email" />
            </NFormItem>
            <NFormItem label="手机号" path="phone">
              <NInput v-model:value="userProfile.phone" />
            </NFormItem>
            <NFormItem label="部门" path="department">
              <NSelect
                v-model:value="userProfile.department"
                :options="departmentOptions"
              />
            </NFormItem>
            <NFormItem label="职位" path="position">
              <NInput v-model:value="userProfile.position" />
            </NFormItem>
            <NFormItem label="个人简介" path="bio">
              <NInput
                v-model:value="userProfile.bio"
                type="textarea"
                :autosize="{
                  minRows: 3,
                  maxRows: 5,
                }"
              />
            </NFormItem>
          </NForm>
        </NCard>

        <!-- 最近操作记录 -->
        <NCard title="最近操作记录" class="mt-4">
          <NTimeline>
            <NTimelineItem
              v-for="activity in recentActivities"
              :key="activity.time"
              :type="activity.type as any"
              :title="activity.title"
              :content="activity.content"
              :time="activity.time"
            />
          </NTimeline>
        </NCard>

        <!-- 系统通知 -->
        <NCard title="系统通知" class="mt-4">
          <NList>
            <NListItem v-for="notice in notifications" :key="notice.title">
              <NThing
                :title="notice.title"
                :content="notice.content"
                :description="notice.time"
              >
                <template #avatar>
                  <NBadge :dot="!notice.read" :offset="[6, 6]">
                    <n-icon :component="BellOutlined" :size="24" />
                  </NBadge>
                </template>
              </NThing>
            </NListItem>
          </NList>
        </NCard>
      </NGridItem>
    </NGrid>
  </PageWrapper>
</template>

<style lang="less" scoped>
.text-gray-500 {
  color: #666;
  margin: 4px 0;
}

.mt-4 {
  margin-top: 16px;
}

.security-score {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0;

  .score-label {
    margin-bottom: 8px;
    font-size: 14px;
    color: #666;
  }
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-top: 8px;

  .skill-tag {
    margin: 0;
  }
}
</style>
