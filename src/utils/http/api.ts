import type { RequestConfig } from '.'
import { useApi } from '.'

export function useGet<T = any>(url: string, params?: Record<string, any>, config: Partial<RequestConfig> = {}) {
  return useApi<T>({ url, params, ...config, method: 'GET' })
}

export function usePost<T = any>(url: string, data?: Record<string, any>, config: Partial<RequestConfig> = {}) {
  return useApi<T>({ url, data, ...config, method: 'POST' })
}

export function usePut<T = any>(url: string, data?: Record<string, any>, config: Partial<RequestConfig> = {}) {
  return useApi<T>({ url, data, ...config, method: 'PUT' })
}

export function useDelete<T = any>(url: string, data?: Record<string, any>, config: Partial<RequestConfig> = {}) {
  return useApi<T>({ url, data, ...config, method: 'DELETE' })
}
