import { Temporal } from '@js-temporal/polyfill'
import { getScaleFromCalendarId, isSupportedCalendar } from './calendars'
import type { Scale, SupportedCalendars } from './calendars'
import { getWeekDayCodeNumber } from './weekDays'

const MIN_WEEK = 1
const MAX_ISO_WEEK = 53
const MAX_HWC_WEEK = 51
const MIN_DAY = 1
const MAX_DAY = 7

const isInRange = (num: number, min: number, max: number) => num >= min && num <= max

function throwErr(component: string) {
  throw new Error(`Invalid ${component} in week date string.`)
}

// convert HWC date string "yyyy-Www-d" to [year, week, day]
// convert compact HWC date string "yyyyWwwd" to [year, week, day]
// if day missing will be converted to [year, week, 1]
// if week missing will be converted to [year, 1, 1]
export function weekDatePartsFromString(weekDateString: string): [number, number, number, SupportedCalendars, number] {
  if (typeof weekDateString !== 'string')
    throw new Error('Expected a string')

  // take away the weekDayStart and calendar if present
  const mainParts = weekDateString.split('[')
  let weekDayStart = 1
  let calendar = 'iso8601'
  if (mainParts.length === 3) {
    weekDateString = mainParts[0]
    calendar = mainParts[1].split(']')[0].replace(/u-ca=/g, '')
    weekDayStart = getWeekDayCodeNumber(mainParts[2].split(']')[0], getScaleFromCalendarId(calendar as SupportedCalendars))
  }
  else if (mainParts.length === 2) {
    // we need to figure out what the second chunk is as it could be either weekDayStart or calendar
    weekDateString = mainParts[0]
    const secondChunk = mainParts[1].split(']')[0]
    if (secondChunk.includes('u-ca='))
      calendar = secondChunk.replace(/u-ca=/g, '')
    else
      weekDayStart = getWeekDayCodeNumber(secondChunk, getScaleFromCalendarId(calendar as SupportedCalendars))
  }
  if (!isSupportedCalendar(calendar))
    throw new Error(`Unsupported calendar in week date string: ${calendar}`)
  // check for 0 and negative week numbers
  if (weekDateString.match(/w/i) && Number(weekDateString.split(/w/i)[1].split('-')[0]) === 0)
    throwErr('Week')

  weekDateString = weekDateString.replace(/\s+/g, '').trim() // remove spaces
  const sign = weekDateString.startsWith('-') ? -1 : 1 // remember negative years
  weekDateString = weekDateString.replace(/-/g, '') // remove dashes if any

  const [year, weekAndDay] = weekDateString.split(/w/i)
  const yearOfWeek = Number(year) * sign // restore sign

  if (Number.isNaN(yearOfWeek))
    throwErr('Year')
  if (weekAndDay === undefined)
    return [yearOfWeek, 1, 1, calendar as SupportedCalendars, weekDayStart] // year only return [year, 1, 1, weekDayStart, calendar]
  if (weekAndDay.length > 3)
    throwErr('Weekday')
  const weekOfYear = +weekAndDay.slice(0, 2)
  const scale = getScaleFromCalendarId(calendar as SupportedCalendars)
  const MAX_WEEK = scale === 'Hijri' ? MAX_HWC_WEEK : MAX_ISO_WEEK
  if (Number.isNaN(weekOfYear) || !isInRange(weekOfYear, MIN_WEEK, MAX_WEEK))
    throwErr('Week')
  let dayOfWeek: string | number = weekAndDay.slice(2)
  if (dayOfWeek === '')
    dayOfWeek = 1
  if (dayOfWeek === '0' || dayOfWeek === '00')
    throwErr('Weekday')
  dayOfWeek = Number(dayOfWeek)

  if (Number.isNaN(dayOfWeek) || !isInRange(dayOfWeek, MIN_DAY, MAX_DAY))
    throwErr('Weekday')
  return [yearOfWeek, weekOfYear, dayOfWeek, calendar as SupportedCalendars, weekDayStart]
}

// given an instant we convert it to any temporal object (PlainDateTime, ZonedDateTime, PlainDate)
export function instantToOtherTemporal<T>(instant: Temporal.Instant, target: T): T {
  // convert a Temporal.Instant to a Temporal.PlainDateTime or Temporal.ZonedDateTime or Temporal.PlainDate
  if (target instanceof Temporal.PlainDateTime) {
    return instant.toZonedDateTime({
      timeZone: 'UTC',
      calendar: target.calendarId,
    }).toPlainDateTime() as T
  }
  else if (target instanceof Temporal.ZonedDateTime) {
    return instant.toZonedDateTime({
      timeZone: target.timeZoneId,
      calendar: target.calendarId,
    }) as T
  }
  else if (target instanceof Temporal.PlainDate) {
    return instant.toZonedDateTime({
      timeZone: 'UTC',
      calendar: target.calendarId,
    }).toPlainDate() as T
  }
  else {
    throw new TypeError('Invalid date type')
  }
}

/**
 * closure/goog/math/math.js:modulo
 * Copyright 2006 The Closure Library Authors.
 * The % operator in JavaScript returns the remainder of a / b, but differs from
 * some other languages in that the result will have the same sign as the
 * dividend. For example, -1 % 8 == -1, whereas in some other languages
 * (such as Python) the result would be 7. This function emulates the more
 * correct modulo behavior, which is useful for certain applications such as
 * calculating an offset index in a circular list.
 *
 * @param {number} a The dividend.
 * @param {number} b The divisor.
 * @return {number} a % b where the result is between 0 and b (either 0 <= x < b
 * or b < x <= 0, depending on the sign of b).
 */
export const pymod = function (a: number, b: number) {
  const r = a % b
  // If r and b differ in sign, add b to wrap the result to the correct sign.
  return r * b < 0 ? r + b : r
}
