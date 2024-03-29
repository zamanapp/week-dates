import { describe, expect, it } from 'vitest'
import { Scales, getCalendarFormId, getCalendarSuperId, getScaleFromCalendarId, isSupportedCalendar } from '../../src/common/calendars'
import { ISOExtended } from '../../src/iso/isoExtended'
import { ISOWeekDays } from '../../src/common/weekDays'

describe('calendars utilities should work', () => {
  it('should get calendars properly', () => {
    expect(getCalendarFormId('gregorian')).toBe('gregorian')
    expect(getCalendarFormId('iso8601')).toBe('iso8601')
    expect(getCalendarFormId('islamic-umalqura')).toBe('islamic-umalqura')
    expect(getCalendarFormId('islamic-civil')).toBe('islamic-civil')
    expect(getCalendarFormId('islamic-tbla')).toBe('islamic-tbla')
    // expect(getCalendarFormId('hwc-islamic-umalqura')).toBeInstanceOf(HWCUmalqura)
    // expect((getCalendarFormId('hwc-islamic-umalqura', 2) as HWCUmalqura)).toBeInstanceOf(HWCUmalqura)
    expect(getCalendarFormId('iso-extended')).toBeInstanceOf(ISOExtended)
    expect((getCalendarFormId('iso-extended', ISOWeekDays.Tuesday) as ISOExtended).weekDayStart).toBe(ISOWeekDays.Tuesday)
  })

  it('should get super calendars properly', () => {
    expect(getCalendarSuperId('gregorian')).toBe('gregorian')
    expect(getCalendarSuperId('iso8601')).toBe('iso8601')
    expect(getCalendarSuperId('islamic-umalqura')).toBe('islamic-umalqura')
    expect(getCalendarSuperId('islamic-civil')).toBe('islamic-civil')
    expect(getCalendarSuperId('islamic-tbla')).toBe('islamic-tbla')
    expect(getCalendarSuperId('hwc-islamic-umalqura')).toBe('islamic-umalqura')
    expect(getCalendarSuperId('hwc-islamic-civil')).toBe('islamic-civil')
    expect(getCalendarSuperId('hwc-islamic-tbla')).toBe('islamic-tbla')
    expect(getCalendarSuperId('iso-extended')).toBe('iso8601')
    expect(() => getCalendarSuperId('invalid')).toThrow()
  })

  it('should get scales properly', () => {
    expect(getScaleFromCalendarId('gregorian')).toBe(Scales.Gregorian)
    expect(getScaleFromCalendarId('iso8601')).toBe(Scales.Gregorian)
    expect(getScaleFromCalendarId('iso-extended')).toBe(Scales.Gregorian)
    expect(getScaleFromCalendarId('islamic-umalqura')).toBe(Scales.Hijri)
    expect(getScaleFromCalendarId('islamic-civil')).toBe(Scales.Hijri)
    expect(getScaleFromCalendarId('islamic-tbla')).toBe(Scales.Hijri)
    expect(getScaleFromCalendarId('hwc-islamic-umalqura')).toBe(Scales.Hijri)
    expect(getScaleFromCalendarId('hwc-islamic-civil')).toBe(Scales.Hijri)
    expect(getScaleFromCalendarId('hwc-islamic-tbla')).toBe(Scales.Hijri)
    expect(() => getScaleFromCalendarId('invalid')).toThrow()
  })

  it('should check if calendar is supported', () => {
    expect(isSupportedCalendar('gregorian')).toBe(true)
    expect(isSupportedCalendar('iso8601')).toBe(true)
    expect(isSupportedCalendar('iso-extended')).toBe(true)
    expect(isSupportedCalendar('islamic-umalqura')).toBe(true)
    expect(isSupportedCalendar('islamic-civil')).toBe(true)
    expect(isSupportedCalendar('islamic-tbla')).toBe(true)
    expect(isSupportedCalendar('hwc-islamic-umalqura')).toBe(true)
    expect(isSupportedCalendar('hwc-islamic-civil')).toBe(true)
    expect(isSupportedCalendar('hwc-islamic-tbla')).toBe(true)
    expect(isSupportedCalendar('invalid')).toBe(false)
  })
})
