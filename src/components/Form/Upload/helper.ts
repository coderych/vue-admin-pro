export function getFileName(url: string): string {
  const arr = url.split('/')
  return arr[arr.length - 1]
}

export function generateFileId(): string {
  return Math.random().toString(36).substring(2)
}
