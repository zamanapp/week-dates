/* eslint-disable test/consistent-test-it */
import { bench, describe } from 'vitest'
import { Temporal } from '@js-temporal/polyfill'
import { ISOWeekDays, getWeekDayNumber } from '../src/common/weekDays'
import { temporalInstantFromISOWeek, temporalToISOPlainDateWeek } from '../src/iso/primitives'
import { Scales } from '../src/common/calendars'

const pivotDayToISO = [4, 5, 6, 7, 1, 2, 3]

export function weeksInISOYearLoop(year: number, weekStartDay = 0) {
  let startDay = new Temporal.PlainDate(year, 1, 1)
  const pivotDay = pivotDayToISO[weekStartDay]
  while (startDay.dayOfWeek !== pivotDay)
    startDay = startDay.add({ days: 1 })

  // count all pivot days in the year
  let count = 0
  while (startDay.year === year) {
    count++
    startDay = startDay.add({ days: 7 })
  }
  return count
}

function weeksInISOYear(year: number, weekStartDay = 0) {
  let startDay = new Temporal.PlainDate(year, 1, 1)
  const pivotDay = pivotDayToISO[weekStartDay]
  while (startDay.dayOfWeek !== pivotDay)
    startDay = startDay.add({ days: 1 })

  let endDay = new Temporal.PlainDate(year + 1, 1, 1)
  while (endDay.dayOfWeek !== pivotDay)
    endDay = endDay.add({ days: 1 })

  // count all pivot days in the year
  const totalDays = endDay.since(startDay, { largestUnit: 'days' }).days
  return Math.floor(totalDays / 7)
}

function weeksInISOYearTemporal(year: number, weekStartDay = ISOWeekDays.Monday) {
  const lastDay = new Temporal.PlainYearMonth(year, 12).daysInMonth
  const date = new Temporal.PlainDate(year, 12, lastDay).subtract({ days: 3 })
  const week = temporalToISOPlainDateWeek(date, weekStartDay).weekOfYear
  return week
}

describe('total week calculation performance', () => {
  bench('brut force', () => {
    weeksInISOYearLoop(1976)
    weeksInISOYearLoop(1980)
    weeksInISOYearLoop(1981)
    weeksInISOYearLoop(2008)
    weeksInISOYearLoop(2009)
    weeksInISOYearLoop(2020)
    weeksInISOYearLoop(2021)
    weeksInISOYearLoop(2023)
    // with different week start days
    weeksInISOYearLoop(2021, ISOWeekDays.Tuesday - 1)
    weeksInISOYearLoop(2021, ISOWeekDays.Wednesday - 1)
    weeksInISOYearLoop(2021, ISOWeekDays.Thursday - 1)
    weeksInISOYearLoop(2021, ISOWeekDays.Friday - 1)
    weeksInISOYearLoop(2021, ISOWeekDays.Saturday - 1)
    weeksInISOYearLoop(2021, ISOWeekDays.Sunday - 1)
  })

  bench('arithmetic operation', () => {
    weeksInISOYear(1976)
    weeksInISOYear(1980)
    weeksInISOYear(1981)
    weeksInISOYear(2008)
    weeksInISOYear(2009)
    weeksInISOYear(2020)
    weeksInISOYear(2021)
    weeksInISOYear(2023)
    // with different week start days
    weeksInISOYear(2021, ISOWeekDays.Tuesday - 1)
    weeksInISOYear(2021, ISOWeekDays.Wednesday - 1)
    weeksInISOYear(2021, ISOWeekDays.Thursday - 1)
    weeksInISOYear(2021, ISOWeekDays.Friday - 1)
    weeksInISOYear(2021, ISOWeekDays.Saturday - 1)
    weeksInISOYear(2021, ISOWeekDays.Sunday - 1)
  })

  bench('temporal', () => {
    weeksInISOYearTemporal(1976)
    weeksInISOYearTemporal(1980)
    weeksInISOYearTemporal(1981)
    weeksInISOYearTemporal(2008)
    weeksInISOYearTemporal(2009)
    weeksInISOYearTemporal(2020)
    weeksInISOYearTemporal(2021)
    weeksInISOYearTemporal(2023)
    // with different week start days
    weeksInISOYearTemporal(2021, ISOWeekDays.Tuesday - 1)
    weeksInISOYearTemporal(2021, ISOWeekDays.Wednesday - 1)
    weeksInISOYearTemporal(2021, ISOWeekDays.Thursday - 1)
    weeksInISOYearTemporal(2021, ISOWeekDays.Friday - 1)
    weeksInISOYearTemporal(2021, ISOWeekDays.Saturday - 1)
    weeksInISOYearTemporal(2021, ISOWeekDays.Sunday - 1)
  })
})

function IsoWeekDateToTemporal(
  year: number,
  weekOfYear: number,
  dayOfWeek: number,
  weekStartDay = ISOWeekDays.Monday,
): Temporal.Instant {
  // Calculate the day of the week for Jan 4th
  const jan4th = Temporal.PlainDate.from({ year, month: 1, day: 4 }) // 4th January (yyyy-01-04)
  const dow = getWeekDayNumber(jan4th.dayOfWeek, Scales.Gregorian, weekStartDay)
  return jan4th.add({ days: (weekOfYear - 1) * 7 + dayOfWeek - dow }).toZonedDateTime('UTC').toInstant()
}

// TODO: compare and see if we need to replace the arithmetic operations with the Temporal API once it lands
describe('iso week date to temporal', () => {
  bench('arithmetic', () => {
    temporalInstantFromISOWeek(2009, 53, 4)
    temporalInstantFromISOWeek(2009, 53, 5)
    temporalInstantFromISOWeek(2009, 53, 6)
    temporalInstantFromISOWeek(2009, 53, 7)
    temporalInstantFromISOWeek(2010, 1, 1)
    // Examples where the ISO year is three days into the previous Gregorian year
    temporalInstantFromISOWeek(2008, 52, 7)
    temporalInstantFromISOWeek(2009, 1, 1)
    temporalInstantFromISOWeek(2009, 1, 2)
    temporalInstantFromISOWeek(2009, 1, 3)
    temporalInstantFromISOWeek(2009, 1, 4)
  })
  bench('temporal', () => {
    IsoWeekDateToTemporal(2009, 53, 4)
    IsoWeekDateToTemporal(2009, 53, 5)
    IsoWeekDateToTemporal(2009, 53, 6)
    IsoWeekDateToTemporal(2009, 53, 7)
    IsoWeekDateToTemporal(2010, 1, 1)
    // Examples where the ISO year is three days into the previous Gregorian year
    IsoWeekDateToTemporal(2008, 52, 7)
    IsoWeekDateToTemporal(2009, 1, 1)
    IsoWeekDateToTemporal(2009, 1, 2)
    IsoWeekDateToTemporal(2009, 1, 3)
    IsoWeekDateToTemporal(2009, 1, 4)
  })
})
