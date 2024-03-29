import { describe, expect, it } from 'vitest'
import { Temporal } from '@js-temporal/polyfill'
import { instantToOtherTemporal, pymod, weekDatePartsFromString } from '../../src/common/utils'
import { HWCWeekDays, ISOWeekDays } from '../../src/common/weekDays'

describe('utils should work as intended', () => {
  it('pymod should work', () => {
    expect(pymod(10, 3)).toBe(1)
    expect(pymod(10, -3)).toBe(-2)
    expect(pymod(-10, 3)).toBe(2)
    expect(pymod(-10, -3)).toBe(-1)
  })

  it('should retunr week date parts from string', () => {
    expect(weekDatePartsFromString('2021-W01-1')).toEqual([2021, 1, 1, 'iso8601', ISOWeekDays.Monday])
    expect(weekDatePartsFromString('2021-W01-1[u-ca=iso-extended]')).toEqual([2021, 1, 1, 'iso-extended', ISOWeekDays.Monday])
    expect(weekDatePartsFromString('2021-W01-1[u-ca=iso-extended][SA]')).toEqual([2021, 1, 1, 'iso-extended', ISOWeekDays.Saturday])
    expect(weekDatePartsFromString('2021-W01-1[SA]')).toEqual([2021, 1, 1, 'iso8601', ISOWeekDays.Saturday])
    expect(weekDatePartsFromString('1443-W01-1[u-ca=islamic-umalqura]')).toEqual([1443, 1, 1, 'islamic-umalqura', HWCWeekDays.Saturday])
    expect(weekDatePartsFromString('1443-W01-1[u-ca=islamic-umalqura][MO]')).toEqual([1443, 1, 1, 'islamic-umalqura', HWCWeekDays.Monday])
    // check weeks boundaries
    expect(weekDatePartsFromString('2021-W53-1')).toEqual([2021, 53, 1, 'iso8601', ISOWeekDays.Monday])
    expect(weekDatePartsFromString('2021-W53')).toEqual([2021, 53, 1, 'iso8601', ISOWeekDays.Monday])
    expect(weekDatePartsFromString('2022-W52')).toEqual([2022, 52, 1, 'iso8601', ISOWeekDays.Monday])
    expect(weekDatePartsFromString('1443-W50-1[u-ca=islamic-umalqura]')).toEqual([1443, 50, 1, 'islamic-umalqura', HWCWeekDays.Saturday])
    expect(weekDatePartsFromString('1443-W50[u-ca=islamic-umalqura]')).toEqual([1443, 50, 1, 'islamic-umalqura', HWCWeekDays.Saturday])
    expect(weekDatePartsFromString('1444-W51[u-ca=islamic-umalqura]')).toEqual([1444, 51, 1, 'islamic-umalqura', HWCWeekDays.Saturday])
    // check invalid inputs
    expect(() => weekDatePartsFromString('2021-W54-1')).toThrow()
    expect(() => weekDatePartsFromString('2021-W00-1')).toThrow()
    expect(() => weekDatePartsFromString('2021-W01-0')).toThrow()
    expect(() => weekDatePartsFromString('2021-W01-8')).toThrow()
    expect(() => weekDatePartsFromString('2021-W01-1[u-ca=invalid]')).toThrow()
    expect(() => weekDatePartsFromString('2021-W01-1[u-ca=iso-extended][invalid]')).toThrow()
    expect(() => weekDatePartsFromString('1444-W52-1[u-ca=islamic-umalqura]')).toThrow()
    expect(() => weekDatePartsFromString('1444-W53-1[u-ca=islamic-umalqura]')).toThrow()
  })

  it('should convert a Temporal Instant to any other Temporal object', () => {
    const instant = Temporal.Instant.from('2021-01-01T00:00:00Z')

    const plainDate = Temporal.PlainDate.from('2021-02-02')
    const plainDateTime = Temporal.PlainDateTime.from('2021-03-03T05:33:00')
    const zonedDateTime = Temporal.ZonedDateTime.from('2021-04-04T12:00:00Z[Asia/Riyadh]')
    const hijriPlainDate = Temporal.PlainDate.from('2021-02-02[u-ca=islamic-umalqura]')
    const hijriPlainDateTime = Temporal.PlainDateTime.from('2021-03-03T05:33:00[u-ca=islamic-umalqura]')
    const hijriZonedDateTime = Temporal.ZonedDateTime.from('2021-04-04T12:00:00Z[Asia/Riyadh][u-ca=islamic-umalqura]')

    expect(instantToOtherTemporal(instant, plainDate)).toBeInstanceOf(Temporal.PlainDate)
    expect(instantToOtherTemporal(instant, plainDate).toString()).toBe('2021-01-01')

    expect(instantToOtherTemporal(instant, plainDateTime)).toBeInstanceOf(Temporal.PlainDateTime)
    expect(instantToOtherTemporal(instant, plainDateTime).toString()).toBe('2021-01-01T00:00:00')

    expect(instantToOtherTemporal(instant, zonedDateTime)).toBeInstanceOf(Temporal.ZonedDateTime)
    expect(instantToOtherTemporal(instant, zonedDateTime).toString()).toBe('2021-01-01T03:00:00+03:00[Asia/Riyadh]')

    expect(instantToOtherTemporal(instant, hijriPlainDate)).toBeInstanceOf(Temporal.PlainDate)
    expect(instantToOtherTemporal(instant, hijriPlainDate).toString()).toBe('2021-01-01[u-ca=islamic-umalqura]')
    expect(instantToOtherTemporal(instant, hijriPlainDate).year).toBe(1442)

    expect(instantToOtherTemporal(instant, hijriPlainDateTime)).toBeInstanceOf(Temporal.PlainDateTime)
    expect(instantToOtherTemporal(instant, hijriPlainDateTime).toString()).toBe('2021-01-01T00:00:00[u-ca=islamic-umalqura]')
    expect(instantToOtherTemporal(instant, hijriPlainDateTime).year).toBe(1442)

    expect(instantToOtherTemporal(instant, hijriZonedDateTime)).toBeInstanceOf(Temporal.ZonedDateTime)
    expect(instantToOtherTemporal(instant, hijriZonedDateTime).toString()).toBe('2021-01-01T03:00:00+03:00[Asia/Riyadh][u-ca=islamic-umalqura]')
    expect(instantToOtherTemporal(instant, hijriZonedDateTime).year).toBe(1442)
  })
})
