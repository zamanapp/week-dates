/* eslint-disable no-console */

import { HWCWeekDays, ISOWeekDays, PlainWeekDate, Scales, getWeekDayName } from '../src'

const weekDate = new PlainWeekDate(2021, 1, 1)
const hijriWeekDate = new PlainWeekDate(1442, 1, 1, 'islamic-umalqura')

const customWeekDate = new PlainWeekDate(2021, 1, 1, 'iso8601', ISOWeekDays.Wednesday)
const customHijriWeekDate = new PlainWeekDate(1442, 1, 1, 'islamic-umalqura', HWCWeekDays.Friday)

console.log(weekDate.weekStartDay) // 1
console.log(hijriWeekDate.weekStartDay) // 1

console.log(customWeekDate.weekStartDay) // 3
console.log(customHijriWeekDate.weekStartDay) // 7

console.log(getWeekDayName(weekDate.dayOfWeek, Scales.Gregorian, weekDate.weekStartDay)) // Monday
console.log(getWeekDayName(hijriWeekDate.dayOfWeek, Scales.Hijri, hijriWeekDate.weekStartDay)) // Saturday

console.log(getWeekDayName(customWeekDate.dayOfWeek, Scales.Gregorian, customWeekDate.weekStartDay)) // Wednesday
console.log(getWeekDayName(customHijriWeekDate.dayOfWeek, Scales.Hijri, customHijriWeekDate.weekStartDay)) // Friday

// we use Sweden locale as it's format is very close to ISO 8601
console.log(weekDate.toPlainDate().toLocaleString('sv-SE')) // 2021-01-04
console.log(hijriWeekDate.toPlainDate().toLocaleString('sv-SE', { calendar: 'islamic-umalqura' })) // 1442-04-20

console.log(customWeekDate.toPlainDate().toLocaleString('sv-SE')) // 2021-01-06
console.log(customHijriWeekDate.toPlainDate().toLocaleString('sv-SE', { calendar: 'islamic-umalqura' })) // 1442-04-22
