import type { Temporal } from '@js-temporal/polyfill'
import { ISOExtended } from '../iso/isoExtended'
import { HWCUmalquraExtended } from '../hwc'
import type { HWCWeekDays, ISOWeekDays } from './weekDays'

export enum Scales {
  Gregorian = 'Gregorian',
  Hijri = 'Hijri',
}

export type Scale = 'Gregorian' | 'Hijri'
export type SupportedCalendars = 'islamic-umalqura' | 'islamic-civil' | 'islamic-tbla' | 'iso8601' | 'gregorian' | 'hwc-islamic-umalqura' | 'hwc-islamic-civil' | 'hwc-islamic-tbla' | 'iso-extended'
export type SupportedNativeHijriCalendars = 'islamic-umalqura' | 'islamic-civil' | 'islamic-tbla'
export type SupportedNativeGregorianCalendars = 'iso8601' | 'gregorian'
export type SupportedNativeCalendars = SupportedNativeHijriCalendars | SupportedNativeGregorianCalendars
export type SupportedHijriCalendars = SupportedNativeHijriCalendars | 'hwc-islamic-umalqura' | 'hwc-islamic-civil' | 'hwc-islamic-tbla'

export function getCalendarFormId(id: SupportedCalendars, weekStartDay: HWCWeekDays | ISOWeekDays = 1): Temporal.CalendarLike {
  if (id === 'iso-extended')
    return new ISOExtended(weekStartDay as ISOWeekDays)
  else if (id === 'hwc-islamic-umalqura')
    return new HWCUmalquraExtended(weekStartDay as HWCWeekDays)
    // TODO: add more calendars
  else
    return id
}

export function getCalendarSuperId(id: SupportedCalendars): SupportedNativeCalendars {
  if (id === 'hwc-islamic-umalqura')
    return 'islamic-umalqura'
  else if (id === 'hwc-islamic-civil')
    return 'islamic-civil'
  else if (id === 'hwc-islamic-tbla')
    return 'islamic-tbla'
  else if (id === 'iso-extended')
    return 'iso8601'
  else if (!['iso8601', 'gregorian', 'islamic-umalqura', 'islamic-civil', 'islamic-tbla'].includes(id))
    throw new Error('Invalid calendar')
  else
    return id
}

export function getScaleFromCalendarId(id: SupportedCalendars): Scale {
  if (id === 'iso-extended' || id === 'iso8601' || id === 'gregorian')
    return 'Gregorian'
  else if (id === 'hwc-islamic-umalqura' || id === 'hwc-islamic-civil' || id === 'hwc-islamic-tbla' || id === 'islamic-umalqura' || id === 'islamic-civil' || id === 'islamic-tbla')
    return 'Hijri'
  else
    throw new Error('Invalid calendar')
}

export function isSupportedCalendar(id: string): id is SupportedCalendars {
  return ['iso-extended', 'hwc-islamic-umalqura', 'hwc-islamic-civil', 'hwc-islamic-tbla', 'iso8601', 'gregorian', 'islamic-umalqura', 'islamic-civil', 'islamic-tbla'].includes(id)
}
