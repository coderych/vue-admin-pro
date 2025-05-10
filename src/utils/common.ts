import { cloneDeep, isEmpty, merge, omit, pick } from 'lodash-es'

export {
  cloneDeep,
  isEmpty,
  merge,
  omit,
  pick,
}

export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export function createExposeProxy(ref: MaybeRef) {
  return new Proxy({}, {
    get: (_, key) => ref.value?.[key],
    has: (_, key) => key in ref.value,
  })
}

export function parseCssSize(size: string | number) {
  if (typeof size === 'number') {
    return `${size}px`
  }
  if (size.endsWith('%')) {
    return size
  }

  return `${Number.parseInt(size, 10)}px`
}

export function getCssVar(ref: MaybeRef, name: string) {
  return getComputedStyle(unref(ref)).getPropertyValue(name)
}
