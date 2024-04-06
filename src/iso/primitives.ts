import { Temporal } from '@js-temporal/polyfill'
import { pymod, weekDatePartsFromString } from '../common/utils'
import { PlainWeekDate } from '../plainWeekDate'
import { ISOWeekDays, getWeekDayNumber } from '../common/weekDays'
import { Scales } from '../common/calendars'

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const MIN_YEAR = -9999 // should we update to -271821 to align with Temporal?
const MAX_YEAR = 9999 // should we update to 275760 to align with Temporal?
const MIN_WEEK = 1
const MIN_DAY = 1

const MILLISECONDS_PER_DAY = 86400000
const MILLISECONDS_PER_HOUR = 3600000
const MILLISECONDS_PER_MINUTE = 60000
const MILLISECONDS_PER_SECOND = 1000
const NANOSECOND_PER_MILLISECOND = 1000000

// -----------------------------------------------------------------------------

// currently although convoluted the arithmetical method is faster then using temporal
// see benchmarks/performance.bench.ts
// We will revisit this in the future once Temporal lands in the browsers to see
// if it's better to use this method over arithmetical method
// export function temporalInstantFromISOWeek(
//   yearOfWeek: number,
//   weekOfYear: number,
//   dayOfWeek: number = MIN_DAY,
//   weekStartDay = ISOWeekDays.Monday,
//   reference?: {
//     referenceTime?: Temporal.PlainDateTime | Temporal.ZonedDateTime | Temporal.PlainTime
//     referenceTimezone?: Temporal.TimeZoneLike
//   },
// ): Temporal.Instant {
//   if (dayOfWeek < MIN_DAY || dayOfWeek > 7)
//     throw new RangeError(`Invalid day: ${dayOfWeek} must be >= ${MIN_DAY} and <= 7`)

//   if (yearOfWeek < MIN_YEAR || yearOfWeek > MAX_YEAR)
//     throw new RangeError(`Invalid year: ${yearOfWeek} must be >= ${MIN_YEAR} and <= ${MAX_YEAR}`)

//   const MAX_WEEK = weeksInISOYear(yearOfWeek, weekStartDay)
//   if (weekOfYear <= 0 || weekOfYear > MAX_WEEK) {
//     throw new RangeError(
//       `Invalid week: ${weekOfYear} value must be > ${MIN_WEEK} and <= ${MAX_WEEK} the ISO week count for the year ${yearOfWeek}.`,
//     )
//   }

//   if (weekStartDay < 1 || weekStartDay > 7)
//     throw new RangeError(`Invalid week start day: ${weekStartDay} value must be >= 1 and <= 7`)
//   // Calculate the day of the week for Jan 4th
//   const jan4th = Temporal.PlainDate.from({ year: yearOfWeek, month: 1, day: 4 }) // 4th January (yyyy-01-04)
//   const dow = getWeekDayNumber(jan4th.dayOfWeek, Scales.Gregorian, weekStartDay)
//   return jan4th.add({ days: (weekOfYear - 1) * 7 + dayOfWeek - dow })
//     .toZonedDateTime({
//       timeZone: reference?.referenceTimezone ?? 'UTC',
//       plainTime: reference?.referenceTime ?? Temporal.PlainTime.from('00:00:00'),
//     }).toInstant()
// }

/*
 * temporalFromISOWeek converts an ISO week to a Temporal.Instant relative to a given Temporal Object (PlainDate, PlainDateTime, ZonedDateTime).
 */
export function temporalInstantFromISOWeek(
  year: number,
  week: number,
  day: number = MIN_DAY,
  weekStartDay = ISOWeekDays.Monday,
  reference?: {
    referenceTime?: Temporal.PlainDateTime | Temporal.ZonedDateTime | Temporal.PlainTime
    referenceTimezone?: Temporal.TimeZoneLike
  },
): Temporal.Instant {
  if (day < MIN_DAY || day > 7)
    throw new RangeError(`Invalid day: ${day} must be >= ${MIN_DAY} and <= 7`)

  if (year < MIN_YEAR || year > MAX_YEAR)
    throw new RangeError(`Invalid year: ${year} must be >= ${MIN_YEAR} and <= ${MAX_YEAR}`)

  const MAX_WEEK = weeksInISOYear(year, weekStartDay)
  if (week <= 0 || week > MAX_WEEK) {
    throw new RangeError(
      `Invalid week: ${week} value must be > ${MIN_WEEK} and <= ${MAX_WEEK} the ISO week count for the year ${year}.`,
    )
  }

  if (weekStartDay < 1 || weekStartDay > 7)
    throw new RangeError(`Invalid week start day: ${weekStartDay} value must be >= 1 and <= 7`)

  const ordinalDate = ordinalDateFromWeekDate(year, week, day, weekStartDay)
  let time = timeFromYear(year) + (ordinalDate - 1) * MILLISECONDS_PER_DAY
  if (reference?.referenceTime) {
    const temp = reference.referenceTime
    time += temp.hour * MILLISECONDS_PER_HOUR
    time += temp.minute * MILLISECONDS_PER_MINUTE
    time += temp.second * MILLISECONDS_PER_SECOND
    time += temp.millisecond
  }

  if (reference?.referenceTimezone) {
    // figure out the offset
    const temp = Temporal.Instant.fromEpochMilliseconds(time).toZonedDateTimeISO(reference?.referenceTimezone)
    const offset = temp.offsetNanoseconds / NANOSECOND_PER_MILLISECOND
    time -= offset
  }

  return Temporal.Instant.fromEpochMilliseconds(time)
}

function ordinalDateFromWeekDate(
  year: number,
  weekOfYear: number,
  dayOfWeek: number,
  weekStartDay = ISOWeekDays.Monday,
): number {
  // Calculate the day of the week for Jan 4th
  const jan4Dow = weekday(year, 1, 4)

  // Adjust for the week start day
  const dayShift = pymod(jan4Dow - (weekStartDay - 1), 7)

  // Calculate the ordinal date of the first day of the first week
  const firstDayOfFirstWeek = 4 - dayShift

  // Adjust the day of the week according to the week start day
  const adjustedDayOfWeek = pymod(dayOfWeek - 1, 7) // Subtract 1 to align days with 0-based index

  // Calculate the ordinal date for the given week and day
  return firstDayOfFirstWeek + (weekOfYear - 1) * 7 + adjustedDayOfWeek
}

export function temporalInstantFromISOWeekString(isoWeekDate: string, reference?: {
  referenceTime?: Temporal.PlainDateTime | Temporal.ZonedDateTime | Temporal.PlainTime
  referenceTimezone?: Temporal.TimeZoneLike
}): Temporal.Instant {
  const [yow, woy, dow, calendar, weekStartDay] = weekDatePartsFromString(isoWeekDate)

  if (!['iso8601', 'iso8601-extended', 'gregorian'].includes(calendar))
    throw new RangeError(`Unsupported calendar: ${calendar}`)

  return temporalInstantFromISOWeek(yow, woy, dow, weekStartDay, reference)
}

/*
 * Convert daysFromYear into milliseconds...can feed into new Date()
 */
function timeFromYear(year: number) {
  return dayFromYear(year) * MILLISECONDS_PER_DAY
}

export function weeksInISOYear(year: number, weekStartDay = ISOWeekDays.Monday) {
  const lastDay = new Temporal.PlainYearMonth(year, 12).daysInMonth
  const date = new Temporal.PlainDate(year, 12, lastDay).subtract({ days: 3 })
  return temporalToISOPlainDateWeek(date, weekStartDay).weekOfYear
}

/*
 * Zeller's congruence.  Computes day of week for any day.
 * Returns integer representing day of week (Monday=0...Sunday=6).
 * see https://en.wikipedia.org/wiki/Zeller%27s_congruence
 */
function weekday(year: number, month: number, day: number) {
  if (month === 1) {
    month = 13
    year--
  }
  else if (month === 2) {
    month = 14
    year--
  }

  const dow
    = Math.floor(
      day
      + (13 * (month + 1)) / 5
      + year
      + Math.floor(year / 4)
      - Math.floor(year / 100)
      + Math.floor(year / 400),
    ) % 7

  return (7 + (dow - 2)) % 7
}

/*
 * Given a year, how many days since or before 1970.
 *
 */
function dayFromYear(year: number) {
  return (
    365 * (year - 1970)
    + Math.floor((year - 1969) / 4)
    - Math.floor((year - 1901) / 100)
    + Math.floor((year - 1601) / 400)
  )
}

// -----------------------------------------------------------------------------

export function temporalToISOPlainDateWeek(
  date: Temporal.ZonedDateTime | Temporal.PlainDate | Temporal.PlainDateTime,
  weekStartDay = ISOWeekDays.Monday,
): PlainWeekDate {
  // get the day of the week
  const dow = getWeekDayNumber(date.dayOfWeek, Scales.Gregorian, weekStartDay)
  const pivotDate = date.add({ days: 4 - dow }) // get the pivot day of the week
  const yowStart = pivotDate.with({ month: 1, day: 1 })
  const woy = Math.ceil((pivotDate.since(yowStart, { largestUnit: 'days' }).days + 1) / 7)

  // Day of week as 1-7
  return new PlainWeekDate(pivotDate.year, woy, dow, 'iso8601', weekStartDay)
}
