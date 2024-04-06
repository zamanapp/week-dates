import { Temporal } from '@js-temporal/polyfill'
import { describe, expect, it } from 'vitest'
import { HWCUmalqura } from '../../src'

describe('custom HWC Umulqura calendar should work', () => {
  it('should be instantiated without errors', () => {
    let customCalendar: Temporal.Calendar
    expect(() => customCalendar = new HWCUmalqura()).not.toThrow()
    expect(() => Temporal.PlainDate.from({ year: 1444, month: 2, day: 3, calendar: customCalendar })).not.toThrow()
    // with custom week start day
    expect(() => customCalendar = new HWCUmalqura(5)).not.toThrow()
    expect(() => Temporal.PlainDate.from({ year: 1444, month: 2, day: 3, calendar: customCalendar })).not.toThrow()
  })

  it('should have the right calendarId', () => {
    const HWCDate = Temporal.PlainDate.from({ year: 1444, month: 2, day: 3, calendar: new HWCUmalqura() })
    const HWCDateTime = Temporal.PlainDateTime.from({ year: 1444, month: 2, day: 3, calendar: new HWCUmalqura() })
    const HWCZonedDate = Temporal.ZonedDateTime.from({ year: 1444, month: 2, day: 3, timeZone: 'Asia/Riyadh', calendar: new HWCUmalqura() })
    expect(HWCDate.calendarId).toBe('hwc-islamic-umalqura')
    expect(HWCDateTime.calendarId).toBe('hwc-islamic-umalqura')
    expect(HWCZonedDate.calendarId).toBe('hwc-islamic-umalqura')
    // with custom week start day
    const customCalendar = new HWCUmalqura(5)
    const HWCDate2 = Temporal.PlainDate.from({ year: 1444, month: 2, day: 3, calendar: customCalendar })
    const HWCDateTime2 = Temporal.PlainDateTime.from({ year: 1444, month: 2, day: 3, calendar: customCalendar })
    const HWCZonedDate2 = Temporal.ZonedDateTime.from({ year: 1444, month: 2, day: 3, timeZone: 'Asia/Riyadh', calendar: customCalendar })
    expect(customCalendar.id).toBe('hwc-islamic-umalqura')
    expect(customCalendar.superId).toBe('islamic-umalqura')
    expect(customCalendar.toJSON()).toBe('hwc-islamic-umalqura')
    expect(customCalendar.toString()).toBe('hwc-islamic-umalqura')
    expect(HWCDate2.calendarId).toBe('hwc-islamic-umalqura')
    expect(HWCDateTime2.calendarId).toBe('hwc-islamic-umalqura')
    expect(HWCZonedDate2.calendarId).toBe('hwc-islamic-umalqura')
  })

  it('should return the correct year of week', () => {
    const customCalendar = new HWCUmalqura()
    const HWCdate = Temporal.PlainDate.from({ year: 1444, month: 12, day: 29, calendar: customCalendar })
    const HWCdateTime = Temporal.PlainDateTime.from({ year: 1444, month: 12, day: 29, calendar: customCalendar })
    const HWCzonedDate = Temporal.ZonedDateTime.from({ year: 1444, month: 12, day: 29, timeZone: 'Asia/Riyadh', calendar: customCalendar })
    expect(customCalendar.yearOfWeek(HWCdate)).toBe(1444) // pass
    expect(HWCdate.yearOfWeek).toBe(1444)
    expect(HWCdateTime.yearOfWeek).toBe(1444)
    expect(HWCzonedDate.yearOfWeek).toBe(1444)
    // with custom week start day
    const customCalendar2 = new HWCUmalqura(2)
    const HWCdate2 = Temporal.PlainDate.from({ year: 1444, month: 12, day: 29, calendar: customCalendar2 })
    const HWCdateTime2 = Temporal.PlainDateTime.from({ year: 1444, month: 12, day: 29, calendar: customCalendar2 })
    const HWCzonedDate2 = Temporal.ZonedDateTime.from({ year: 1444, month: 12, day: 29, timeZone: 'Asia/Riyadh', calendar: customCalendar2 })
    expect(customCalendar2.yearOfWeek(HWCdate2)).toBe(1445)
    expect(HWCdate2.yearOfWeek).toBe(1445)
    expect(HWCdateTime2.yearOfWeek).toBe(1445)
    expect(HWCzonedDate2.yearOfWeek).toBe(1445)
  })

  it('should return the correct week of year', () => {
    const customCalendar = new HWCUmalqura()
    const HWCDate = Temporal.PlainDate.from({ year: 1444, month: 12, day: 29, calendar: customCalendar })
    const HWCDateTime = Temporal.PlainDateTime.from({ year: 1444, month: 12, day: 29, calendar: customCalendar })
    const HWCZonedDate = Temporal.ZonedDateTime.from({ year: 1444, month: 12, day: 29, timeZone: 'Asia/Riyadh', calendar: customCalendar })
    expect(customCalendar.weekOfYear(HWCDate)).toBe(51)
    expect(HWCDate.weekOfYear).toBe(51)
    expect(HWCDateTime.weekOfYear).toBe(51)
    expect(HWCZonedDate.weekOfYear).toBe(51)
    // with custom week start day
    const customCalendar2 = new HWCUmalqura(2)
    const HWCDate2 = Temporal.PlainDate.from({ year: 1444, month: 12, day: 29, calendar: customCalendar2 })
    const HWCDateTime2 = Temporal.PlainDateTime.from({ year: 1444, month: 12, day: 29, calendar: customCalendar2 })
    const HWCZonedDate2 = Temporal.ZonedDateTime.from({ year: 1444, month: 12, day: 29, timeZone: 'Asia/Riyadh', calendar: customCalendar2 })
    expect(customCalendar2.weekOfYear(HWCDate2)).toBe(1)
    expect(HWCDate2.weekOfYear).toBe(1)
    expect(HWCDateTime2.weekOfYear).toBe(1)
    expect(HWCZonedDate2.weekOfYear).toBe(1)
  })

  it('should return the correct day of week', () => {
    const customCalendar = new HWCUmalqura()
    const HWCDate = Temporal.PlainDate.from({ year: 1444, month: 12, day: 29, calendar: customCalendar })
    const HWCDateTime = Temporal.PlainDateTime.from({ year: 1444, month: 12, day: 29, calendar: customCalendar })
    const HWCZonedDate = Temporal.ZonedDateTime.from({ year: 1444, month: 12, day: 29, timeZone: 'Asia/Riyadh', calendar: customCalendar })
    expect(customCalendar.dayOfWeek(HWCDate)).toBe(3)
    expect(HWCDate.dayOfWeek).toBe(3)
    expect(HWCDateTime.dayOfWeek).toBe(3)
    expect(HWCZonedDate.dayOfWeek).toBe(3)
    // with custom week start day

    const customCalendar2 = new HWCUmalqura(3)
    const HWCDate2 = Temporal.PlainDate.from({ year: 1444, month: 12, day: 29, calendar: customCalendar2 })
    const HWCDateTime2 = Temporal.PlainDateTime.from({ year: 1444, month: 12, day: 29, calendar: customCalendar2 })
    const HWCZonedDate2 = Temporal.ZonedDateTime.from({ year: 1444, month: 12, day: 29, timeZone: 'Asia/Riyadh', calendar: customCalendar2 })
    expect(customCalendar2.dayOfWeek(HWCDate2)).toBe(1)
    expect(HWCDate2.dayOfWeek).toBe(1)
    expect(HWCDateTime2.dayOfWeek).toBe(1)
    expect(HWCZonedDate2.dayOfWeek).toBe(1)
  })

  it('should return the correct weeks in year count', () => {
    const customCalendar = new HWCUmalqura()
    const HWCDate = Temporal.PlainDate.from({ year: 1444, month: 2, day: 3, calendar: customCalendar })
    const HWCDateTime = Temporal.PlainDateTime.from({ year: 1444, month: 2, day: 3, calendar: customCalendar })
    const HWCZonedDate = Temporal.ZonedDateTime.from({ year: 1444, month: 2, day: 3, timeZone: 'Asia/Riyadh', calendar: customCalendar })
    expect(customCalendar.weeksInYear(HWCDate)).toBe(51)
    expect(HWCDate.weeksInYear).toBe(51)
    expect(HWCDateTime.weeksInYear).toBe(51)
    expect(HWCZonedDate.weeksInYear).toBe(51)
    // with custom week start day
    const customCalendar2 = new HWCUmalqura(2)
    const HWCDate2 = Temporal.PlainDate.from({ year: 1444, month: 2, day: 3, calendar: customCalendar2 })
    const HWCDateTime2 = Temporal.PlainDateTime.from({ year: 1444, month: 2, day: 3, calendar: customCalendar2 })
    const HWCZonedDate2 = Temporal.ZonedDateTime.from({ year: 1444, month: 2, day: 3, timeZone: 'Asia/Riyadh', calendar: customCalendar2 })
    expect(customCalendar2.weeksInYear(HWCDate2)).toBe(50)
    expect(HWCDate2.weeksInYear).toBe(50)
    expect(HWCDateTime2.weeksInYear).toBe(50)
    expect(HWCZonedDate2.weeksInYear).toBe(50)
  })

  it('should return the correct plainWeekDate', () => {
    const customCalendar = new HWCUmalqura()
    const HWCDate = Temporal.PlainDate.from({ year: 1444, month: 2, day: 3, calendar: customCalendar })
    const HWCDateTime = Temporal.PlainDateTime.from({ year: 1444, month: 2, day: 3, calendar: customCalendar })
    const HWCZonedDate = Temporal.ZonedDateTime.from({ year: 1444, month: 2, day: 3, timeZone: 'Asia/Riyadh', calendar: customCalendar })
    expect(customCalendar.weekDate(HWCDate).toString()).toBe('1444-W05-4[u-ca=islamic-umalqura]')
    expect(HWCDate.weekDate.toString()).toBe('1444-W05-4[u-ca=islamic-umalqura]')
    expect(HWCDateTime.weekDate.toString()).toBe('1444-W05-4[u-ca=islamic-umalqura]')
    expect(HWCZonedDate.weekDate.toString()).toBe('1444-W05-4[u-ca=islamic-umalqura]')
    // with custom week start day
    const customCalendar2 = new HWCUmalqura(3)
    const HWCDate2 = Temporal.PlainDate.from({ year: 1444, month: 2, day: 3, calendar: customCalendar2 })
    const HWCDateTime2 = Temporal.PlainDateTime.from({ year: 1444, month: 2, day: 3, calendar: customCalendar2 })
    const HWCZonedDate2 = Temporal.ZonedDateTime.from({ year: 1444, month: 2, day: 3, timeZone: 'Asia/Riyadh', calendar: customCalendar2 })
    expect(customCalendar2.weekDate(HWCDate2).toString()).toBe('1444-W05-2[u-ca=islamic-umalqura][MO]')
    expect(HWCDate2.weekDate.toString()).toBe('1444-W05-2[u-ca=islamic-umalqura][MO]')
    expect(HWCDateTime2.weekDate.toString()).toBe('1444-W05-2[u-ca=islamic-umalqura][MO]')
    expect(HWCZonedDate2.weekDate.toString()).toBe('1444-W05-2[u-ca=islamic-umalqura][MO]')
  })
})
