import type { GlobalThemeOverrides } from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
  Layout: {
    colorEmbedded: '#f0f2f5',
  },
  Card: {
    colorEmbedded: '#f0f2f5',
  },
}

const darkThemeOverrides: GlobalThemeOverrides = {
  Layout: {
    colorEmbedded: '#18181C',
  },
  Card: {
    colorEmbedded: '#18181C',
  },
}

export {
  darkThemeOverrides,
  themeOverrides,
}
