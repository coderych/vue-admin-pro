export enum PageEnum {
  Home = '/dashboard',
  Login = '/login',
}

export enum LocaleEnum {
  Default = 'zh-CN',
  English = 'en-US',
  Chinese = 'zh-CN',
}

export const LocaleOptions = [
  { label: '中文', value: LocaleEnum.Chinese, key: LocaleEnum.Chinese },
  { label: 'English', value: LocaleEnum.English, key: LocaleEnum.English },
]
