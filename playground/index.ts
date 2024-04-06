/* eslint-disable no-console */

import { Temporal } from '@js-temporal/polyfill'
import { PlainWeekDate } from '../src'

const date = new Temporal.PlainDate(2021, 1, 1, 'islamic-civil')
const date2 = Temporal.PlainDate.from({ year: 2021, month: 1, day: 1, calendar: 'islamic-civil' })
const date3 = new Temporal.PlainDate(2021, 1, 1).withCalendar('islamic-civil')
console.log(date.toString(), 'year', date.year) // -> 2021-01-01[u-ca=islamic-civil] year 1442
console.log(date2.toString(), 'year', date2.year) // -> 2582-05-25[u-ca=islamic-civil] year 2021
console.log(date3.toString(), 'year', date3.year) // -> 2021-01-01[u-ca=islamic-civil] year 1442

const weekDate = PlainWeekDate.from({ yearOfWeek: 2021, weekOfYear: 1, dayOfWeek: 1 })
console.log(weekDate.toString()) // 2021-W01-01
console.log(weekDate.toPlainDate().toString()) // 2021-01-04

const plainDate = Temporal.PlainDate.from({ year: 2021, month: 1, day: 4 })
const weekDate2 = PlainWeekDate.from(plainDate)
console.log(weekDate2.toString()) // 2021-W01-01
