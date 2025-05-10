<script setup lang="ts">
import type { LoginForm } from '@/stores'
import type { FormInst, FormRules } from 'naive-ui'
import { CommonApi } from '@/api/common'
import { useAppStore } from '@/stores'
import { uuid } from '@/utils/common'
import {
  AlipayOutlined,
  LockOutlined,
  MobileOutlined,
  QqOutlined,
  RightCircleOutlined,
  SafetyOutlined,
  UserOutlined,
  WechatOutlined,
} from '@vicons/antd'
import { computedAsync } from '@vueuse/core'
import { throttle } from 'lodash-es'

const appStore = useAppStore()
const activeTab = ref('account')

const loading = ref(false)
const formRef = ref<FormInst | null>(null)
const model = ref<LoginForm>({
  username: 'admin',
  password: '123456',
  uuid: uuid(),
  captcha: '',
})
const rules: FormRules = {
  username: [{ required: true, message: '请输入账号' }],
  password: [{ required: true, message: '请输入密码' }],
  captcha: [{ required: true, message: '请输入验证码' }],
}
const captchaUrl = computedAsync(async () => {
  const { data } = await CommonApi.captcha(model.value.uuid)
  return URL.createObjectURL(data)
})

console.log('captchaUrl', captchaUrl.value)

const generateCaptcha = throttle(() => {
  model.value.uuid = uuid()
}, 1000)

async function login() {
  try {
    await formRef.value?.validate()
    loading.value = true
    await appStore.login(model.value)
  }
  catch (error) {
    generateCaptcha()
    model.value.captcha = ''
    console.error(error)
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <n-el>
    <n-grid :cols="5" item-responsive responsive="screen" class="h-screen">
      <n-gi span="0 m:2" class="f-c-c bg-[linear-gradient(135deg,#F9F9FA,#F9F9FC)]">
        <n-flex vertical :size="24" justify="center" align="center" class="max-w-90%">
          <h3 class="m-0 f-c-c text-32px font-600">
            <img src="/favicon.ico" alt="logo" class="mr-10px h-36px w-36px">
            <span class="title">
              Vue Admin Pro
            </span>
          </h3>
          <p class="m-0 text-center text-24px font-600">
            一个基于Vue3，TypeScript，Naive UI的后台管理系统模板
          </p>
          <p class="m-0 mb-30px text-center text-18px font-400">
            功能强大，UI设计精美，代码结构清晰
          </p>
          <img src="@/assets/images/coding.png" alt="bg" class="w-80%">
        </n-flex>
      </n-gi>
      <n-gi span="5 m:3" class="f-c-c">
        <n-flex vertical :size="12" class="max-w-420px w-full p-20px">
          <div class="mb-20px">
            <h3 class="m-0 mb-5px p-0 text-24px color-[var(--text-color-1)] font-500">
              登录你的账户
            </h3>
            <p class="m-0 text-14px color-[var(--text-color-2)]">
              没有账户？
              <n-button text type="primary">
                免费注册
                <n-icon :size="16" class="ml-1" :component="RightCircleOutlined" />
              </n-button>
            </p>
          </div>
          <n-tabs v-model:value="activeTab" type="segment" animated class="mb-20px">
            <n-tab name="account">
              账号密码登录
            </n-tab>
            <n-tab name="mobile">
              手机验证码登录
            </n-tab>
          </n-tabs>
          <n-form ref="formRef" :show-label="false" :rules="rules" :model="model">
            <template v-if="activeTab === 'account'">
              <n-form-item path="username">
                <n-input v-model:value="model.username" placeholder="请输入账号">
                  <template #prefix>
                    <n-icon :component="UserOutlined" />
                  </template>
                </n-input>
              </n-form-item>
              <n-form-item path="password">
                <n-input v-model:value="model.password" type="password" show-password-on="click" placeholder="请输入密码">
                  <template #prefix>
                    <n-icon :component="LockOutlined" />
                  </template>
                </n-input>
              </n-form-item>
              <n-form-item path="captcha">
                <n-input-group>
                  <n-input v-model:value="model.captcha" placeholder="请输入验证码" @keydown.enter.prevent="login">
                    <template #prefix>
                      <n-icon :component="SafetyOutlined" />
                    </template>
                    <template #suffix>
                      <img :src="captchaUrl" class="h-full w-100px cursor-pointer" @click="generateCaptcha">
                    </template>
                  </n-input>
                </n-input-group>
              </n-form-item>
              <n-form-item>
                <n-flex class="w-full" justify="space-between">
                  <n-checkbox type="primary" block>
                    自动登录
                  </n-checkbox>

                  <n-button text class="color-[var(--text-color-3)]">
                    忘记密码?
                  </n-button>
                </n-flex>
              </n-form-item>
            </template>

            <template v-if="activeTab === 'mobile'">
              <n-form-item>
                <n-input v-model:value="model.username" placeholder="请输入手机号">
                  <template #prefix>
                    <n-icon :component="MobileOutlined" />
                  </template>
                </n-input>
              </n-form-item>
              <n-form-item>
                <n-input placeholder="请输入验证码">
                  <template #prefix>
                    <n-icon :component="SafetyOutlined" />
                  </template>
                  <template #suffix>
                    <n-button text type="primary">
                      获取验证码
                    </n-button>
                  </template>
                </n-input>
              </n-form-item>
            </template>

            <n-button type="primary" secondary block :loading="loading" @click="login">
              登录
            </n-button>
          </n-form>
          <n-divider>
            <span class="text-14px color-[var(--text-color-3)]">
              其他登录方式
            </span>
          </n-divider>
          <n-flex justify="space-around">
            <n-button circle>
              <template #icon>
                <n-icon :component="WechatOutlined" />
              </template>
            </n-button>
            <n-button circle>
              <template #icon>
                <n-icon :component="QqOutlined" />
              </template>
            </n-button>
            <n-button circle>
              <template #icon>
                <n-icon :component="AlipayOutlined" />
              </template>
            </n-button>
          </n-flex>
        </n-flex>
      </n-gi>
    </n-grid>
  </n-el>
</template>

<style scoped>
.title {
  background: linear-gradient(135deg, #17ead9, #6078ea);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
