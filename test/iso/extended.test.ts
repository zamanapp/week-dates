import { Temporal } from '@js-temporal/polyfill'
import { describe, expect, it } from 'vitest'
import { ISOExtended } from '../../src'

describe('custom HWC Civil calendar should work', () => {
  it('should be instantiated without errors', () => {
    let customCalendar: Temporal.Calendar
    expect(() => customCalendar = new ISOExtended()).not.toThrow()
    expect(() => Temporal.PlainDate.from({ year: 2021, month: 2, day: 3, calendar: customCalendar })).not.toThrow()
    // with custom week start day
    expect(() => customCalendar = new ISOExtended(5)).not.toThrow()
    expect(() => Temporal.PlainDate.from({ year: 2021, month: 2, day: 3, calendar: customCalendar })).not.toThrow()
  })

  it('should have the right calendarId', () => {
    const HWCDate = Temporal.PlainDate.from({ year: 2021, month: 2, day: 3, calendar: new ISOExtended() })
    const HWCDateTime = Temporal.PlainDateTime.from({ year: 2021, month: 2, day: 3, calendar: new ISOExtended() })
    const HWCZonedDate = Temporal.ZonedDateTime.from({ year: 2021, month: 2, day: 3, timeZone: 'Asia/Riyadh', calendar: new ISOExtended() })
    expect(HWCDate.calendarId).toBe('iso-extended')
    expect(HWCDateTime.calendarId).toBe('iso-extended')
    expect(HWCZonedDate.calendarId).toBe('iso-extended')
    // with custom week start day
    const customCalendar = new ISOExtended(5)
    const HWCDate2 = Temporal.PlainDate.from({ year: 2021, month: 2, day: 3, calendar: customCalendar })
    const HWCDateTime2 = Temporal.PlainDateTime.from({ year: 2021, month: 2, day: 3, calendar: customCalendar })
    const HWCZonedDate2 = Temporal.ZonedDateTime.from({ year: 2021, month: 2, day: 3, timeZone: 'Asia/Riyadh', calendar: customCalendar })
    expect(customCalendar.id).toBe('iso-extended')
    expect(customCalendar.superId).toBe('iso8601')
    expect(customCalendar.toJSON()).toBe('iso-extended')
    expect(customCalendar.toString()).toBe('iso-extended')
    expect(HWCDate2.calendarId).toBe('iso-extended')
    expect(HWCDateTime2.calendarId).toBe('iso-extended')
    expect(HWCZonedDate2.calendarId).toBe('iso-extended')
  })

  it('should return the correct year of week', () => {
    const customCalendar = new ISOExtended()
    const HWCdate = Temporal.PlainDate.from({ year: 2021, month: 12, day: 30, calendar: customCalendar })
    const HWCdateTime = Temporal.PlainDateTime.from({ year: 2021, month: 12, day: 30, calendar: customCalendar })
    const HWCzonedDate = Temporal.ZonedDateTime.from({ year: 2021, month: 12, day: 30, timeZone: 'Asia/Riyadh', calendar: customCalendar })
    expect(customCalendar.yearOfWeek(HWCdate)).toBe(2021) // pass
    expect(HWCdate.yearOfWeek).toBe(2021)
    expect(HWCdateTime.yearOfWeek).toBe(2021)
    expect(HWCzonedDate.yearOfWeek).toBe(2021)
    // with custom week start day
    const customCalendar2 = new ISOExtended(4)
    const HWCdate2 = Temporal.PlainDate.from({ year: 2021, month: 12, day: 30, calendar: customCalendar2 })
    const HWCdateTime2 = Temporal.PlainDateTime.from({ year: 2021, month: 12, day: 30, calendar: customCalendar2 })
    const HWCzonedDate2 = Temporal.ZonedDateTime.from({ year: 2021, month: 12, day: 30, timeZone: 'Asia/Riyadh', calendar: customCalendar2 })
    expect(customCalendar2.yearOfWeek(HWCdate2)).toBe(2022)
    expect(HWCdate2.yearOfWeek).toBe(2022)
    expect(HWCdateTime2.yearOfWeek).toBe(2022)
    expect(HWCzonedDate2.yearOfWeek).toBe(2022)
  })

  it('should return the correct week of year', () => {
    const customCalendar = new ISOExtended()
    const HWCDate = Temporal.PlainDate.from({ year: 2021, month: 12, day: 30, calendar: customCalendar })
    const HWCDateTime = Temporal.PlainDateTime.from({ year: 2021, month: 12, day: 30, calendar: customCalendar })
    const HWCZonedDate = Temporal.ZonedDateTime.from({ year: 2021, month: 12, day: 30, timeZone: 'Asia/Riyadh', calendar: customCalendar })
    expect(customCalendar.weekOfYear(HWCDate)).toBe(52)
    expect(HWCDate.weekOfYear).toBe(52)
    expect(HWCDateTime.weekOfYear).toBe(52)
    expect(HWCZonedDate.weekOfYear).toBe(52)
    // with custom week start day
    const customCalendar2 = new ISOExtended(4)
    const HWCDate2 = Temporal.PlainDate.from({ year: 2021, month: 12, day: 30, calendar: customCalendar2 })
    const HWCDateTime2 = Temporal.PlainDateTime.from({ year: 2021, month: 12, day: 30, calendar: customCalendar2 })
    const HWCZonedDate2 = Temporal.ZonedDateTime.from({ year: 2021, month: 12, day: 30, timeZone: 'Asia/Riyadh', calendar: customCalendar2 })
    expect(customCalendar2.weekOfYear(HWCDate2)).toBe(1)
    expect(HWCDate2.weekOfYear).toBe(1)
    expect(HWCDateTime2.weekOfYear).toBe(1)
    expect(HWCZonedDate2.weekOfYear).toBe(1)
  })

  it('should return the correct day of week', () => {
    const customCalendar = new ISOExtended()
    const HWCDate = Temporal.PlainDate.from({ year: 2021, month: 12, day: 30, calendar: customCalendar })
    const HWCDateTime = Temporal.PlainDateTime.from({ year: 2021, month: 12, day: 30, calendar: customCalendar })
    const HWCZonedDate = Temporal.ZonedDateTime.from({ year: 2021, month: 12, day: 30, timeZone: 'Asia/Riyadh', calendar: customCalendar })
    expect(customCalendar.dayOfWeek(HWCDate)).toBe(4)
    expect(HWCDate.dayOfWeek).toBe(4)
    expect(HWCDateTime.dayOfWeek).toBe(4)
    expect(HWCZonedDate.dayOfWeek).toBe(4)
    // with custom week start day
    const customCalendar2 = new ISOExtended(3)
    const HWCDate2 = Temporal.PlainDate.from({ year: 2021, month: 12, day: 30, calendar: customCalendar2 })
    const HWCDateTime2 = Temporal.PlainDateTime.from({ year: 2021, month: 12, day: 30, calendar: customCalendar2 })
    const HWCZonedDate2 = Temporal.ZonedDateTime.from({ year: 2021, month: 12, day: 30, timeZone: 'Asia/Riyadh', calendar: customCalendar2 })
    expect(customCalendar2.dayOfWeek(HWCDate2)).toBe(2)
    expect(HWCDate2.dayOfWeek).toBe(2)
    expect(HWCDateTime2.dayOfWeek).toBe(2)
    expect(HWCZonedDate2.dayOfWeek).toBe(2)
  })

  it('should return the correct weeks in year count', () => {
    const customCalendar = new ISOExtended()
    const HWCDate = Temporal.PlainDate.from({ year: 2021, month: 2, day: 3, calendar: customCalendar })
    const HWCDateTime = Temporal.PlainDateTime.from({ year: 2021, month: 2, day: 3, calendar: customCalendar })
    const HWCZonedDate = Temporal.ZonedDateTime.from({ year: 2021, month: 2, day: 3, timeZone: 'Asia/Riyadh', calendar: customCalendar })
    expect(customCalendar.weeksInYear(HWCDate)).toBe(52)
    expect(HWCDate.weeksInYear).toBe(52)
    expect(HWCDateTime.weeksInYear).toBe(52)
    expect(HWCZonedDate.weeksInYear).toBe(52)
    // with custom week start day
    const customCalendar2 = new ISOExtended(2)
    const HWCDate2 = Temporal.PlainDate.from({ year: 2021, month: 2, day: 3, calendar: customCalendar2 })
    const HWCDateTime2 = Temporal.PlainDateTime.from({ year: 2021, month: 2, day: 3, calendar: customCalendar2 })
    const HWCZonedDate2 = Temporal.ZonedDateTime.from({ year: 2021, month: 2, day: 3, timeZone: 'Asia/Riyadh', calendar: customCalendar2 })
    expect(customCalendar2.weeksInYear(HWCDate2)).toBe(53)
    expect(HWCDate2.weeksInYear).toBe(53)
    expect(HWCDateTime2.weeksInYear).toBe(53)
    expect(HWCZonedDate2.weeksInYear).toBe(53)
  })

  it('should return the correct plainWeekDate', () => {
    const customCalendar = new ISOExtended()
    const HWCDate = Temporal.PlainDate.from({ year: 2021, month: 2, day: 3, calendar: customCalendar })
    const HWCDateTime = Temporal.PlainDateTime.from({ year: 2021, month: 2, day: 3, calendar: customCalendar })
    const HWCZonedDate = Temporal.ZonedDateTime.from({ year: 2021, month: 2, day: 3, timeZone: 'Asia/Riyadh', calendar: customCalendar })
    expect(customCalendar.weekDate(HWCDate).toString()).toBe('2021-W05-3')
    expect(HWCDate.weekDate.toString()).toBe('2021-W05-3')
    expect(HWCDateTime.weekDate.toString()).toBe('2021-W05-3')
    expect(HWCZonedDate.weekDate.toString()).toBe('2021-W05-3')
    // with custom week start day
    const customCalendar2 = new ISOExtended(3)
    const HWCDate2 = Temporal.PlainDate.from({ year: 2021, month: 2, day: 3, calendar: customCalendar2 })
    const HWCDateTime2 = Temporal.PlainDateTime.from({ year: 2021, month: 2, day: 3, calendar: customCalendar2 })
    const HWCZonedDate2 = Temporal.ZonedDateTime.from({ year: 2021, month: 2, day: 3, timeZone: 'Asia/Riyadh', calendar: customCalendar2 })
    expect(customCalendar2.weekDate(HWCDate2).toString()).toBe('2021-W06-1[WE]')
    expect(HWCDate2.weekDate.toString()).toBe('2021-W06-1[WE]')
    expect(HWCDateTime2.weekDate.toString()).toBe('2021-W06-1[WE]')
    expect(HWCZonedDate2.weekDate.toString()).toBe('2021-W06-1[WE]')
  })
})
