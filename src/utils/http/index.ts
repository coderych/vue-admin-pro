import type { AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults, RawAxiosRequestHeaders } from 'axios'
import { useAppEnv } from '@/composables/app'
import axios from 'axios'
import { setupInterceptors } from './interceptors'

const { VITE_GLOB_API_BASE_URL } = useAppEnv()

export type RequestConfig = AxiosRequestConfig & {
  ignoreToken?: boolean
  withTimestamp?: boolean
  errorMsg?: boolean
  loading?: boolean
  headers?: Partial<RawAxiosRequestHeaders>
}

/**
 * 创建 axios 实例
 * @param options axios 配置项
 * @returns axios 实例
 */
export function createAxios(options: CreateAxiosDefaults = {}): AxiosInstance {
  const instance = axios.create({
    baseURL: VITE_GLOB_API_BASE_URL,
    timeout: 30000,
    ...options,
  })
  setupInterceptors(instance)
  return instance
}

/**
 * 默认的 axios 实例
 */
export const request = createAxios()

/**
 * 使用 axios 实例发送请求
 * @param config axios 请求配置项
 * @param instance axios 实例
 * @returns Promise
 */
export function useApi<T = any>(config?: Partial<RequestConfig>, instance: AxiosInstance = request): Promise<Result<T>> {
  return instance<T, Result<T>>(config as any)
}

export * from './api'
