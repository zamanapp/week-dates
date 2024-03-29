import { Temporal } from '@js-temporal/polyfill'
import { type SupportedHijriCalendars, type SupportedNativeHijriCalendars, getCalendarSuperId } from '../../common/calendars'
import { PlainWeekDate } from '../../plainWeekDate'

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const MIN_YEAR = -9999 // TODO: update to -271821 to align with Temporal
const MAX_YEAR = 9999 // TODO: update to 275760 to align with Temporal
const MIN_DAY = 1
const SATURDAY = 1

const MILLISECONDS_PER_DAY = 86400000
const MILLISECONDS_PER_HOUR = 3600000
const MILLISECONDS_PER_MINUTE = 60000
const MILLISECONDS_PER_SECOND = 1000
const NANOSECOND_PER_MILLISECOND = 1000000

// ------------------------------------------------------------------------------

/*
 * temporalFromISOWeek converts an Hijri week to a Temporal.Instant relative to a given Temporal Object (PlainDate, PlainDateTime, ZonedDateTime).
 */
export function temporalInstantFromHijriWeek(
  year: number,
  week: number,
  day: number = MIN_DAY,
  weekStartDay = SATURDAY,
  reference?: Temporal.PlainDateTime | Temporal.ZonedDateTime,
): Temporal.Instant {
  // see https://regex101.com/r/DxQeva/1
  // see https://regex101.com/r/DxQeva/3

  if (day < MIN_DAY || day > 7)
    throw new RangeError(`Day must be >= ${MIN_DAY} and <= 7`)

  if (year < MIN_YEAR || year > MAX_YEAR)
    throw new RangeError(`Year must be >= ${MIN_YEAR} and <= ${MAX_YEAR}`)

  if (week <= 0 || week > weeksInISOYear(year)) {
    throw new RangeError(
      'Week must be > 0 and <= the ISO week count for the year in question.',
    )
  }

  if (weekStartDay < 0 || weekStartDay > 6)
    throw new RangeError('Week start day must be >= 0 and <= 6')

  const ordinalDate = ordinalDateFromWeekDate(year, week, day, weekStartDay)
  let time = timeFromYear(year) + (ordinalDate - 1) * MILLISECONDS_PER_DAY
  if (reference instanceof Temporal.PlainDateTime) {
    time += reference.hour * MILLISECONDS_PER_HOUR
    time += reference.minute * MILLISECONDS_PER_MINUTE
    time += reference.second * MILLISECONDS_PER_SECOND
    time += reference.millisecond
  }

  if (reference instanceof Temporal.ZonedDateTime) {
    // figure out the offset
    const offset = reference.offsetNanoseconds / NANOSECOND_PER_MILLISECOND
    time -= offset
  }

  return Temporal.Instant.fromEpochMilliseconds(time)
}

export function temporalToHijriPlainDateWeek(
  date: Temporal.ZonedDateTime | Temporal.PlainDate | Temporal.PlainDateTime,
  weekStartDay = SATURDAY,
): PlainWeekDate {
  let year = date.year
  const month = date.month
  const day = date.day
  const hijriCalendar = getCalendarSuperId(date.calendarId as SupportedHijriCalendars) as SupportedNativeHijriCalendars

  const doy = monthStartDay(month, isLeapYear(year)) + day - 1
  const dow = (weekday(year, month, day) + 7 - weekStartDay) % 7

  // Calculate the ordinal date for Jan 4th and adjust for the week start day
  const jan4Dow = (weekday(year, 1, 4) + 7 - weekStartDay) % 7
  const firstWeekStart = 4 - jan4Dow

  // Calculate week number
  let woy
  if (doy < firstWeekStart) {
    woy = weeksInISOYear(year - 1)
    year-- // Adjust the year backward if the week belongs to the previous year
  }
  else {
    woy = Math.floor((doy - firstWeekStart) / 7) + 1
    if (woy > weeksInISOYear(year)) {
      woy = 1
      year++ // Adjust the year forward if the week belongs to the next year
    }
  }

  // Day of week as 1-7
  return new PlainWeekDate(year, woy, dow + 1, hijriCalendar, weekStartDay)
}

export function weeksInHijriYear(year: number, calendar: SupportedHijriCalendars = 'islamic-umalqura'): number {
  const date = Temporal.PlainDate.from({ year, month: 12, day: 30, calendar }).subtract({ days: 3 })
  return toHWCDate(year, 12, date.day, calendar)[1]
}
