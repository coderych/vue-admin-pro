import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(isBetween)

const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
const DATE_FORMAT = 'YYYY-MM-DD'
const TIME_FORMAT = 'HH:mm:ss'

export function format(date: Date, fmt: string = DATETIME_FORMAT): string {
  return dayjs(date).format(fmt)
}

export function parse(date: string, fmt: string = DATETIME_FORMAT): Date {
  return dayjs(date, fmt).toDate()
}

export function now(): Date {
  return dayjs().toDate()
}

export function today(): Date {
  return dayjs().startOf('day').toDate()
}

export function yesterday(): Date {
  return dayjs().subtract(1, 'day').startOf('day').toDate()
}

export function tomorrow(): Date {
  return dayjs().add(1, 'day').startOf('day').toDate()
}

export function datetime(date: any) {
  return format(date, DATETIME_FORMAT)
}

export function date(date: any): string {
  return format(date, DATE_FORMAT)
}

export function time(date: any): string {
  return format(date, TIME_FORMAT)
}

export function datehour(date: any): string {
  return format(date, 'YYYY-MM-DD HH')
}

export function datehourminute(date: any): string {
  return format(date, 'YYYY-MM-DD HH:mm')
}

export function year(date: any): string {
  return format(date, 'YYYY')
}

export function yearmonth(date: any): string {
  return format(date, 'YYYY-MM')
}

export function between(start: any, end: any, date: any = now()): boolean {
  return dayjs(date).isBetween(dayjs(start), dayjs(end))
}

export function le(date: any, refDate: any): boolean {
  return dayjs(date).isBefore(dayjs(refDate)) || dayjs(date).isSame(dayjs(refDate))
}

export function ge(date: any, refDate: any): boolean {
  return dayjs(date).isAfter(dayjs(refDate)) || dayjs(date).isSame(dayjs(refDate))
}

export function lt(date: any, refDate: any): boolean {
  return dayjs(date).isBefore(dayjs(refDate))
}

export function gt(date: any, refDate: any): boolean {
  return dayjs(date).isAfter(dayjs(refDate))
}

export function years(length: number, date: any = now()): string[] {
  return Array.from({ length }, (_, i) => dayjs(date).subtract(i, 'year').startOf('year').format('YYYY'))
}

export default dayjs
