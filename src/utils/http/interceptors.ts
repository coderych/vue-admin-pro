import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import type { RequestConfig } from '.'
import { TOKEN_NAME, useAuthorization } from '@/composables/app'
import { PageEnum } from '@/enums/common'
import { ErrorCode, HttpErrorCode, NoAuthErrorCode } from '@/enums/http'
import router from '@/router'
import { useAppStore } from '@/stores/app'

/**
 * 处理请求配置
 * @param request 请求配置
 * @returns 处理后的请求配置
 */
export async function requestHandle(request: RequestConfig & InternalAxiosRequestConfig) {
  const { ignoreToken = false, withTimestamp = true, loading = true } = request
  if (!ignoreToken) {
    const token = useAuthorization()
    if (token.value) {
      request.headers.set(TOKEN_NAME, token.value)
    }
    else {
      // 跳转到登录页面
      await router.push(PageEnum.Login)
      return Promise.reject(new Error('Token is not available'))
    }
  }

  if (withTimestamp && request.method?.toUpperCase() === 'GET') {
    request.params = {
      ...request.params,
      timestamp: new Date().getTime(),
    }
  }

  if (loading) {
    const appStore = useAppStore()
    appStore.loadingCount++
  }

  return request
}

/**
 * 处理响应数据
 * @param response 响应数据
 * @returns 处理后的响应数据
 */
export async function responseHandle(response: AxiosResponse) {
  const { data = {}, config = {} as RequestConfig, status = 200, statusText } = response
  const { errorMsg = true, loading = true } = config as RequestConfig
  if (loading) {
    const appStore = useAppStore()
    appStore.loadingCount--
  }
  if (status !== 200) {
    throw new Error(statusText)
  }

  if (config?.responseType === 'blob') {
    return { data, success: true, code: 200, message: '请求成功', timestamp: new Date().getTime() }
  }

  const { success, message, code } = data as Result<any>
  if (NoAuthErrorCode.includes(code)) {
    const token = useAuthorization()
    token.value = ''
    window.$message?.error(ErrorCode[code] || message)
    await router.push(PageEnum.Login)
    return data
  }
  if (!success) {
    if (errorMsg) {
      window.$message?.error(ErrorCode[code] || message)
    }
    console.error('响应异常：', response)
    return Promise.reject(response)
  }
  return data
}

/**
 * 处理错误信息
 * @param error 错误信息
 * @returns 处理后的错误信息
 */
export async function errorHandle(error: AxiosError): Promise<AxiosError> {
  const { status, message } = error
  window.$message?.error(HttpErrorCode[status as keyof typeof HttpErrorCode] || message)
  return Promise.reject(error)
}

/**
 * 设置axios拦截器
 * @param instance axios实例
 */
export function setupInterceptors(instance: AxiosInstance) {
  instance.interceptors.request.use(requestHandle)
  instance.interceptors.response.use(responseHandle, errorHandle)
}
