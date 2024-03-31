import { Temporal } from '@js-temporal/polyfill'
import type { SupportedHijriCalendars } from '../common/calendars'
import { PlainWeekDate } from '../plainWeekDate'
import { HWCWeekDays, ISODayToHWCDay } from '../common/weekDays'
import { weekDatePartsFromString } from '../common/utils'

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const MIN_YEAR = -9999 // should we update to -271821 to align with Temporal?
const MAX_YEAR = 9999 // should we update to 275760 to align with Temporal?
const MIN_DAY = 1
const MIN_WEEK = 0

// ------------------------------------------------------------------------------

/*
 * temporalFromISOWeek converts an Hijri week to a Temporal.Instant relative to a given Temporal Object (PlainDate, PlainDateTime, ZonedDateTime).
 */
export function temporalInstantFromHWCDate(
  yearOfWeek: number,
  weekOfYear: number,
  dayOfWeek: number = MIN_DAY,
  calendar: SupportedHijriCalendars = 'islamic-umalqura',
  weekStartDay = HWCWeekDays.Saturday,
  reference?: {
    referenceTime?: Temporal.PlainDateTime | Temporal.ZonedDateTime | Temporal.PlainTime
    referenceTimezone?: Temporal.TimeZoneLike
  },
): Temporal.Instant {
  if (dayOfWeek < MIN_DAY || dayOfWeek > 7)
    throw new RangeError(`Invalid day: ${dayOfWeek} must be >= ${MIN_DAY} and <= 7`)

  if (yearOfWeek < MIN_YEAR || yearOfWeek > MAX_YEAR)
    throw new RangeError(`Invalid year: ${yearOfWeek} must be >= ${MIN_YEAR} and <= ${MAX_YEAR}`)

  const MAX_WEEK = weeksInHijriYear(yearOfWeek, calendar, weekStartDay)
  if (weekOfYear <= 0 || weekOfYear > MAX_WEEK) {
    throw new RangeError(
      `Invalid week: ${weekOfYear} value must be > ${MIN_WEEK} and <= ${MAX_WEEK} the ISO week count for the year ${yearOfWeek}.`,
    )
  }

  if (weekStartDay < 1 || weekStartDay > 7)
    throw new RangeError(`Invalid week start day: ${weekStartDay} value must be >= 1 and <= 7`)

  let date = Temporal.PlainDate.from({ year: yearOfWeek, month: 1, day: 4, calendar }) // 4th Muharram (yyyy-01-04)
  const dow = ISODayToHWCDay(date.dayOfWeek, weekStartDay)
  date = date.add({ days: (weekOfYear - 1) * 7 + dayOfWeek - dow })

  return date.toZonedDateTime({
    timeZone: reference?.referenceTimezone ?? 'UTC',
    plainTime: reference?.referenceTime ?? Temporal.PlainTime.from('00:00:00'),
  }).toInstant()
}

export function temporalInstantFromHWCWeekString(isoWeekDate: string, reference?: {
  referenceTime?: Temporal.PlainDateTime | Temporal.ZonedDateTime | Temporal.PlainTime
  referenceTimezone?: Temporal.TimeZoneLike
  referenceCalendar?: SupportedHijriCalendars
}): Temporal.Instant {
  const [yow, woy, dow, cal, weekStartDay] = weekDatePartsFromString(isoWeekDate)

  if (!['hwc-islamic-umalqura', 'hwc-islamic-civil', 'hwc-islamic-tbla', 'islamic-umalqura', 'islamic-civil', 'islamic-tbla'].includes(cal))
    throw new RangeError(`Unsupported calendar: ${cal}`)

  if (reference?.referenceCalendar && reference.referenceCalendar !== cal) {
    // we need to convert the date to the reference calendar
    const date = temporalInstantFromHWCDate(yow, woy, dow, cal as SupportedHijriCalendars, weekStartDay).toZonedDateTime({
      timeZone: reference.referenceTimezone ?? 'UTC',
      calendar: reference.referenceCalendar,
    }).toPlainDate()
    return date.toZonedDateTime({
      timeZone: reference.referenceTimezone ?? 'UTC',
      plainTime: reference.referenceTime ?? Temporal.PlainTime.from('00:00:00'),
    }).toInstant()
  }

  return temporalInstantFromHWCDate(yow, woy, dow, cal as SupportedHijriCalendars, weekStartDay, reference)
}

export function temporalToHWCPlainDateWeek(
  date: Temporal.ZonedDateTime | Temporal.PlainDate | Temporal.PlainDateTime,
  weekStartDay = HWCWeekDays.Saturday,
) {
  const calendar = date.calendarId as SupportedHijriCalendars
  if (!['hwc-islamic-umalqura', 'hwc-islamic-civil', 'hwc-islamic-tbla', 'islamic-umalqura', 'islamic-civil', 'islamic-tbla'].includes(calendar))
    throw new RangeError(`Unsupported Hijri calendar: ${calendar}`)

  const dow = ISODayToHWCDay(date.dayOfWeek, weekStartDay)
  const pivotDate = date.add({ days: 4 - dow }) // get the pivot day of the week
  const yowStart = Temporal.PlainDate.from({ year: pivotDate.year, month: 1, day: 1, calendar })
  const woy = Math.ceil((pivotDate.since(yowStart).days + 1) / 7) // calculate HWC week number

  return new PlainWeekDate(pivotDate.year, woy, dow, calendar, weekStartDay)
}

export function weeksInHijriYear(year: number, calendar: SupportedHijriCalendars = 'islamic-umalqura', weekDayStart = HWCWeekDays.Saturday): number {
  // check if we need to use PlainYearMonth instaid of PlainDate
  const date = Temporal.PlainDate.from({ year, month: 12, day: 30, calendar }).subtract({ days: 3 })
  return temporalToHWCPlainDateWeek(date, weekDayStart).weekOfYear
}
