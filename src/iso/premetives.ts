import { Temporal } from '@js-temporal/polyfill'
import { pymod, weekDatePartsFromString } from '../common/utils'
import { PlainWeekDate } from '../plainWeekDate'
import { ISOWeekDays, getWeekDayNumber } from '../common/weekDays'
import { Scales } from '../common/calendars'

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const MIN_YEAR = -9999
const MAX_YEAR = 9999
const MIN_WEEK = 1
const MIN_DAY = 1

const MILLISECONDS_PER_DAY = 86400000
const MILLISECONDS_PER_HOUR = 3600000
const MILLISECONDS_PER_MINUTE = 60000
const MILLISECONDS_PER_SECOND = 1000
const NANOSECOND_PER_MILLISECOND = 1000000

// -----------------------------------------------------------------------------

/*
 * temporalFromISOWeek converts an ISO week to a Temporal.Instant relative to a given Temporal Object (PlainDate, PlainDateTime, ZonedDateTime).
 */
export function temporalInstantFromISOWeek(
  year: number,
  week: number,
  day: number = MIN_DAY,
  weekStartDay = ISOWeekDays.Monday,
  reference?: Temporal.PlainDateTime | Temporal.ZonedDateTime,
): Temporal.Instant {
  // see https://regex101.com/r/DxQeva/1
  // see https://regex101.com/r/DxQeva/3

  if (day < MIN_DAY || day > 7)
    throw new RangeError(`Invalid day: ${day} must be >= ${MIN_DAY} and <= 7`)

  if (year < MIN_YEAR || year > MAX_YEAR)
    throw new RangeError(`Invalid year: ${year} must be >= ${MIN_YEAR} and <= ${MAX_YEAR}`)

  const MAX_WEEK = weeksInISOYear(year, weekStartDay)
  if (week <= 0 || week > MAX_WEEK) {
    throw new RangeError(
      `Invalid week: ${week} value must be > ${MIN_WEEK} and <= ${MAX_WEEK} the ISO week count for the year in question.`,
    )
  }

  if (weekStartDay < 1 || weekStartDay > 7)
    throw new RangeError(`Invalid week start day: ${weekStartDay} value must be >= 1 and <= 7`)

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
    reference = Temporal.Instant.fromEpochMilliseconds(time).toZonedDateTimeISO(reference.timeZoneId)
    const offset = reference.offsetNanoseconds / NANOSECOND_PER_MILLISECOND
    time += offset
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

export function temporalInstantFromISOWeekString(isoWeekDate: string, reference?: Temporal.PlainDateTime | Temporal.ZonedDateTime): Temporal.Instant {
  const [yow, woy, dow, calendar, weekStartDay] = weekDatePartsFromString(isoWeekDate)

  if (!['iso8601', 'iso8601-extended', 'gregorian'].includes(calendar))
    throw new RangeError(`Unsupported calendar: ${calendar}`)

  return temporalInstantFromISOWeek(yow, woy, dow, weekStartDay, reference)
}

/*
 * Convert daysFromYear into milleseconds...can feed into new Date()
 */
function timeFromYear(year: number) {
  return dayFromYear(year) * MILLISECONDS_PER_DAY
}

const pivotDayToISO = [4, 5, 6, 7, 1, 2, 3]

export function weeksInISOYear(year: number, weekStartDay = ISOWeekDays.Monday) {
  let startDay = new Temporal.PlainDate(year, 1, 1)
  const pivotDay = pivotDayToISO[weekStartDay - 1]
  while (startDay.dayOfWeek !== pivotDay)
    startDay = startDay.add({ days: 1 })

  let endDay = new Temporal.PlainDate(year + 1, 1, 1)
  while (endDay.dayOfWeek !== pivotDay)
    endDay = endDay.add({ days: 1 })

  // count all pivot days in the year
  const totalDays = endDay.since(startDay, { largestUnit: 'days' }).days
  return Math.floor(totalDays / 7)
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
  const yearStart = new Temporal.PlainDate(pivotDate.year, 1, 1)
  const woy = Math.ceil((pivotDate.since(yearStart).days + 1) / 7)

  // Day of week as 1-7
  return new PlainWeekDate(pivotDate.year, woy, dow, 'iso8601', weekStartDay)
}
