import { beforeEach, describe, expect, it } from 'vitest'
import { Temporal } from '@js-temporal/polyfill'
import { storage } from '../../scripts/store'
import { temporalInstantFromHWCDate, temporalInstantFromHWCWeekString, temporalToHWCPlainDateWeek } from '../../src/hwc/primitives'
import { PlainWeekDate } from '../../src/plainWeekDate'
import { getWeekDayCodeName } from '../../src/common/weekDays'
import { Scales } from '../../src/common/calendars'

interface PopulatedContext {
  umalqura: any[]
  civil: any[]
  tbla: any[]
  START_YEAR: number
  END_YEAR: number
}

beforeEach<PopulatedContext>(async (conxtext) => {
  const umalqura = await storage.getItem<number[][][]>('dates:islamic-umalqura')
  const civil = await storage.getItem<number[][][]>('dates:islamic-civil')
  const tbla = await storage.getItem<number[][][]>('dates:islamic-tbla')
  const START_YEAR = await storage.getItem<number>('START_YEAR')
  const END_YEAR = await storage.getItem<number>('END_YEAR')
  if (!umalqura || !civil || !tbla || !START_YEAR || !END_YEAR)
    throw new Error('Data is not generated yet')

  conxtext.umalqura = umalqura
  conxtext.civil = civil
  conxtext.tbla = tbla
  conxtext.START_YEAR = START_YEAR
  conxtext.END_YEAR = END_YEAR
})

describe.concurrent('hwc week date calculations primitives should work', () => {
  it<PopulatedContext>('should generate Temporal Instant from HWC week date parts', async ({ umalqura, civil, tbla }) => {
    for (let startDay = 1; startDay <= 7; startDay++) {
      for (let i = 0; i < umalqura.length; i++) {
        const row = umalqura[startDay - 1][i]
        const [y, m, d, yow, woy, dow] = row
        const instant = temporalInstantFromHWCDate(yow, woy, dow, 'islamic-umalqura', startDay)
        const date = instant.toZonedDateTime({
          timeZone: 'UTC',
          calendar: 'islamic-umalqura',
        })
        expect(instant).toBeInstanceOf(Temporal.Instant)
        expect(date.year).toBe(y)
        expect(date.month).toBe(m)
        expect(date.day).toBe(d)
      }
      for (let i = 0; i < civil.length; i++) {
        const row = civil[startDay - 1][i]
        const [y, m, d, yow, woy, dow] = row
        const instant = temporalInstantFromHWCDate(yow, woy, dow, 'islamic-civil', startDay)
        const date = instant.toZonedDateTime({
          timeZone: 'UTC',
          calendar: 'islamic-civil',
        })
        expect(instant).toBeInstanceOf(Temporal.Instant)
        expect(date.year).toBe(y)
        expect(date.month).toBe(m)
        expect(date.day).toBe(d)
      }
      for (let i = 0; i < tbla.length; i++) {
        const row = tbla[startDay - 1][i]
        const [y, m, d, yow, woy, dow] = row
        const instant = temporalInstantFromHWCDate(yow, woy, dow, 'islamic-tbla', startDay)
        const date = instant.toZonedDateTime({
          timeZone: 'UTC',
          calendar: 'islamic-tbla',
        })
        expect(instant).toBeInstanceOf(Temporal.Instant)
        expect(date.year).toBe(y)
        expect(date.month).toBe(m)
        expect(date.day).toBe(d)
      }
    }
  })
  it<PopulatedContext>('should generate Temporal Instant from HWC week date string', async ({ umalqura, civil, tbla }) => {
    for (let startDay = 1; startDay <= 7; startDay++) {
      for (let i = 0; i < umalqura.length; i++) {
        const row = umalqura[startDay - 1][i]
        const [y, m, d, yow, woy, dow] = row
        const instant = temporalInstantFromHWCWeekString(`${yow}-W${woy <= 9 ? '0' : ''}${woy}-${dow}[u-ca=islamic-umalqura][${getWeekDayCodeName(startDay, Scales.Hijri)}]`, { referenceCalendar: 'islamic-umalqura' })
        const date = instant.toZonedDateTime({
          timeZone: 'UTC',
          calendar: 'islamic-umalqura',
        })
        expect(instant).toBeInstanceOf(Temporal.Instant)
        expect(date.year).toBe(y)
        expect(date.month).toBe(m)
        expect(date.day).toBe(d)
      }
      for (let i = 0; i < civil.length; i++) {
        const row = civil[startDay - 1][i]
        const [y, m, d, yow, woy, dow] = row
        const instant = temporalInstantFromHWCWeekString(`${yow}-W${woy <= 9 ? '0' : ''}${woy}-${dow}[u-ca=islamic-civil][${getWeekDayCodeName(startDay, Scales.Hijri)}]`, { referenceCalendar: 'islamic-civil' })
        const date = instant.toZonedDateTime({
          timeZone: 'UTC',
          calendar: 'islamic-civil',
        })
        expect(instant).toBeInstanceOf(Temporal.Instant)
        expect(date.year).toBe(y)
        expect(date.month).toBe(m)
        expect(date.day).toBe(d)
      }
      for (let i = 0; i < tbla.length; i++) {
        const row = tbla[startDay - 1][i]
        const [y, m, d, yow, woy, dow] = row
        const instant = temporalInstantFromHWCWeekString(`${yow}-W${woy <= 9 ? '0' : ''}${woy}-${dow}[u-ca=islamic-tbla][${getWeekDayCodeName(startDay, Scales.Hijri)}]`, { referenceCalendar: 'islamic-tbla' })
        const date = instant.toZonedDateTime({
          timeZone: 'UTC',
          calendar: 'islamic-tbla',
        })
        expect(instant).toBeInstanceOf(Temporal.Instant)
        expect(date.year).toBe(y)
        expect(date.month).toBe(m)
        expect(date.day).toBe(d)
      }
    }
  })
  it<PopulatedContext>('should generate a PlainWeekDate from a Temporal Object', async ({ umalqura, civil, tbla }) => {
    for (let startDay = 1; startDay <= 7; startDay++) {
      for (let i = 0; i < umalqura.length; i++) {
        const row = umalqura[startDay - 1][i]
        const [y, m, d, yow, woy, dow] = row
        const date = Temporal.PlainDate.from({ year: y, month: m, day: d, calendar: 'islamic-umalqura' })
        const hwcDate = temporalToHWCPlainDateWeek(date, startDay)
        expect(hwcDate).toBeInstanceOf(PlainWeekDate)
        expect(hwcDate.yearOfWeek).toBe(yow)
        expect(hwcDate.weekOfYear).toBe(woy)
        expect(hwcDate.dayOfWeek).toBe(dow)
      }
      for (let i = 0; i < civil.length; i++) {
        const row = civil[startDay - 1][i]
        const [y, m, d, yow, woy, dow] = row
        const date = Temporal.PlainDate.from({ year: y, month: m, day: d, calendar: 'islamic-civil' })
        const hwcDate = temporalToHWCPlainDateWeek(date, startDay)
        expect(hwcDate).toBeInstanceOf(PlainWeekDate)
        expect(hwcDate.yearOfWeek).toBe(yow)
        expect(hwcDate.weekOfYear).toBe(woy)
        expect(hwcDate.dayOfWeek).toBe(dow)
      }
      for (let i = 0; i < tbla.length; i++) {
        const row = tbla[startDay - 1][i]
        const [y, m, d, yow, woy, dow] = row
        const date = Temporal.PlainDate.from({ year: y, month: m, day: d, calendar: 'islamic-tbla' })
        const hwcDate = temporalToHWCPlainDateWeek(date, startDay)
        expect(hwcDate).toBeInstanceOf(PlainWeekDate)
        expect(hwcDate.yearOfWeek).toBe(yow)
        expect(hwcDate.weekOfYear).toBe(woy)
        expect(hwcDate.dayOfWeek).toBe(dow)
      }
    }
  })
//   it<PopulatedContext>('should calculate number of weeks in a given Hijri year', ({ umalqura, civil, tbla }) => {})
})
