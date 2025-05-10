import { composite } from 'seemly'

/**
 * Generate naive theme colors
 * @param key color key
 * @param color color value
 * @returns naive theme colors
 */
export function generateNaiveThemeColors(key = 'primary', color: string) {
  return {
    [`${key}Color`]: color,
    [`${key}ColorHover`]: composite(color, [255, 255, 255, 0.15]),
    [`${key}ColorPressed`]: composite(color, [0, 0, 0, 0.15]),
    [`${key}ColorSuppl`]: composite(color, [255, 255, 255, 0.15]),
  }
}
