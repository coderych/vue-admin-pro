import type { DictOption, ValueType } from '@/stores'
import type { SelectOption } from 'naive-ui'
import { Dict } from '@/enums/dict'
import { useAppStore } from '@/stores'
import { NTag } from 'naive-ui'

// 使用Map作缓存， 避免重复请求
const cache = new Map<string, SelectOption[]>([])
const optionCache = new Map<string, SelectOption>()

export function useDict() {
  const appStore = useAppStore()
  const options = computed<SelectOption[]>(() => (appStore.userInfo?.dict || []).map(item => typeOf(item)))

  const optionsOf = (code: string): SelectOption[] => {
    if (isNullOrUndefined(code)) {
      console.log('optionsOf: code is null or undefined')
      return []
    }
    if (cache.has(code)) {
      return cache.get(code)!
    }

    const list = (options.value?.filter(item => item.type === code) || [])
    if (!list.length) {
      console.log(`optionsOf: ${code} not found in options`)
      return []
    }
    cache.set(code, list)
    return list
  }

  const optionOf = (code: string, value: ValueType) => {
    if (isNullOrUndefined(value)) {
      console.log('optionOf: value is null or undefined')
      return null
    }
    const key = `${code}_${value}`
    if (optionCache.has(key)) {
      return optionCache.get(key)
    }
    const option = optionsOf(code)?.find(item => item.type === code && item.value === value)
    if (!option) {
      return null
    }
    optionCache.set(key, option)
    return option
  }

  const labelOf = (code: string, value: string) => {
    if (isNullOrUndefined(value)) {
      console.log('labelOf: value is null or undefined')
      return
    }
    return optionOf(code, value)?.label || ''
  }

  const valueOf = (code: string, label: string) => {
    const option = optionsOf(code)?.find(item => item.type === code && item.label === label)
    return option?.value || ''
  }

  const renderTag = (code: string, value?: ValueType) => {
    if (isNullOrUndefined(value)) {
      return null
    }
    const option = optionOf(code, value!) as DictOption
    if (!option) {
      return null
    }
    const { label = '', extra = '{}' } = option
    const props = parseExtra(extra)
    return h(NTag, { ...props }, () => label)
  }

  return {
    optionsOf,
    labelOf,
    valueOf,
    optionOf,
    renderTag,
    Dict,
  }
}

function typeOf(option: DictOption): SelectOption {
  const { dataType = 'string' } = option
  if (dataType === 'number') {
    return {
      ...option,
      value: Number(option.value),
    }
  }
  return { ...option } as SelectOption
}

// 判断是否为null 或者 undefined
function isNullOrUndefined(value: any) {
  return value === null || value === undefined
}

function parseExtra(extra: string) {
  try {
    return JSON.parse(extra)
  }
  catch (error) {
    console.error(error)
    return {}
  }
}
