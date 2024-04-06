import { Temporal } from '@js-temporal/polyfill'
import type { ExtendedCalendarProtocol } from './common/calendars'

export {
  PlainWeekDate,
  PlainWeekDateLike,
  PlainWeekDateReference,
  Reference,
  ToStringOptions,
} from './plainWeekDate'
export {
  ISOExtended,
  temporalInstantFromISOWeek,
  temporalInstantFromISOWeekString,
  temporalToISOPlainDateWeek,
  weeksInISOYear,
} from './iso'
export {
  HWCCivil,
  HWCTbla,
  HWCUmalqura,
  temporalInstantFromHWCDate,
  temporalInstantFromHWCWeekString,
  temporalToHWCPlainDateWeek,
  weeksInHijriYear,
} from './hwc'
export {
  Scale,
  Scales,
  SupportedCalendars,
  SupportedHijriCalendars,
  SupportedNativeCalendars,
  SupportedNativeGregorianCalendars,
  SupportedNativeHijriCalendars,
  getCalendarFormId,
  getCalendarSuperId,
  getScaleFromCalendarId,
  isSupportedCalendar,
} from './common/calendars'
export {
  HWCWeekDays,
  HWCWeekDaysCodeNames,
  HWCWeekDaysCodes,
  HWCWeekDaysNames,
  HWCtoISODay,
  ISODayToHWCDay,
  ISOWeekDays,
  ISOWeekDaysCodeNames,
  ISOWeekDaysCodes,
  ISOWeekDaysNames,
  getWeekDayCodeName,
  getWeekDayCodeNumber,
  getWeekDayName,
  getWeekDayNumber,
} from './common/weekDays'
export {
  instantToOtherTemporal,
  weekDatePartsFromString,
  pymod,
} from './common/utils'

// defining extra properties on Temporal.PlainDate

Object.defineProperty(Temporal.PlainDate.prototype, 'weeksInYear', {
  get() {
    if (['hwc-islamic-umalqura', 'hwc-islamic-tbla', 'hwc-islamic-civil', 'iso-extended'].includes(this.calendarId))
      return (this.getCalendar() as ExtendedCalendarProtocol).weeksInYear(this)
    else
      throw new Error('weeksInYear is only available for extended week calendars')
  },
})

Object.defineProperty(Temporal.PlainDate.prototype, 'weekDate', {
  get() {
    if (['hwc-islamic-umalqura', 'hwc-islamic-tbla', 'hwc-islamic-civil', 'iso-extended'].includes(this.calendarId))
      return (this.getCalendar() as ExtendedCalendarProtocol).weekDate(this)
    else
      throw new Error('weekDate is only available extended week week calendars')
  },
})

// defining extra properties on Temporal.PlainDateTime

Object.defineProperty(Temporal.PlainDateTime.prototype, 'weeksInYear', {
  get() {
    if (['hwc-islamic-umalqura', 'hwc-islamic-tbla', 'hwc-islamic-civil', 'iso-extended'].includes(this.calendarId))
      return (this.getCalendar() as ExtendedCalendarProtocol).weeksInYear(this)
    else
      throw new Error('weeksInYear is only available for extended week calendars')
  },
})

Object.defineProperty(Temporal.PlainDateTime.prototype, 'weekDate', {
  get() {
    if (['hwc-islamic-umalqura', 'hwc-islamic-tbla', 'hwc-islamic-civil', 'iso-extended'].includes(this.calendarId))
      return (this.getCalendar() as ExtendedCalendarProtocol).weekDate(this)
    else
      throw new Error('weekDate is only available extended week week calendars')
  },
})

// defining extra properties on Temporal.ZonedDateTime

Object.defineProperty(Temporal.ZonedDateTime.prototype, 'weeksInYear', {
  get() {
    if (['hwc-islamic-umalqura', 'hwc-islamic-tbla', 'hwc-islamic-civil', 'iso-extended'].includes(this.calendarId))
      return (this.getCalendar() as ExtendedCalendarProtocol).weeksInYear(this)
    else
      throw new Error('weeksInYear is only available for extended week calendars')
  },
})

Object.defineProperty(Temporal.ZonedDateTime.prototype, 'weekDate', {
  get() {
    if (['hwc-islamic-umalqura', 'hwc-islamic-tbla', 'hwc-islamic-civil', 'iso-extended'].includes(this.calendarId))
      return (this.getCalendar() as ExtendedCalendarProtocol).weekDate(this)
    else
      throw new Error('weekDate is only available extended week week calendars')
  },
})
