/* eslint-disable test/consistent-test-it */
import { bench, describe } from 'vitest'
import { Temporal } from '@js-temporal/polyfill'
import { ISOWeekDays } from '../src/common/weekDays'

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
})
