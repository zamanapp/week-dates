import { Temporal } from '@js-temporal/polyfill'
import { describe, expect, it } from 'vitest'
import { temporalInstantFromISOWeek, temporalInstantFromISOWeekString, temporalToISOPlainDateWeek, weeksInISOYear } from '../../src/iso/premetives'
import { ISOWeekDays } from '../../src/common/weekDays'
import { PlainWeekDate } from '../../src/plainWeekDate'

const dateWithTime = Temporal.PlainDateTime.from({
  year: 2021,
  month: 1,
  day: 1,
  hour: 12,
  minute: 30,
  second: 45,
  millisecond: 0,
})

const klTimezone = Temporal.ZonedDateTime.from({
  year: 2021,
  month: 1,
  day: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0,
  timeZone: 'Asia/Kuala_Lumpur',
})

const alaskaTimezone = Temporal.ZonedDateTime.from({
  year: 2021,
  month: 1,
  day: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0,
  timeZone: 'America/Anchorage',
})

describe('iso week date calculations primitives should work', () => {
  it('should generate Temporal Instant from ISO week date parts', () => {
    expect(temporalInstantFromISOWeek(2021, 1, 1)).toBeInstanceOf(Temporal.Instant)
    expect(temporalInstantFromISOWeek(2021, 1, 1).toString()).toBe('2021-01-04T00:00:00Z')
    expect(temporalInstantFromISOWeek(2024, 1, 1).toString()).toBe('2024-01-01T00:00:00Z')
    expect(temporalInstantFromISOWeek(2023, 52, 7).toString()).toBe('2023-12-31T00:00:00Z')

    // testing same year boundary
    expect(temporalInstantFromISOWeek(2023, 1, 1).toString()).toBe('2023-01-02T00:00:00Z')
    expect(temporalInstantFromISOWeek(2023, 52, 7).toString()).toBe('2023-12-31T00:00:00Z')
    // testing week 53
    expect(temporalInstantFromISOWeek(1981, 53, 7).toString()).toBe('1982-01-03T00:00:00Z')
    expect(temporalInstantFromISOWeek(1976, 53, 6).toString()).toBe('1977-01-01T00:00:00Z')
    expect(temporalInstantFromISOWeek(1981, 53, 4).toString()).toBe('1981-12-31T00:00:00Z')
    expect(temporalInstantFromISOWeek(1981, 53, 5).toString()).toBe('1982-01-01T00:00:00Z')
    expect(temporalInstantFromISOWeek(1981, 53, 6).toString()).toBe('1982-01-02T00:00:00Z')
    expect(temporalInstantFromISOWeek(1981, 53, 7).toString()).toBe('1982-01-03T00:00:00Z')
    // cross over year boundary
    expect(temporalInstantFromISOWeek(1981, 53, 7).toString()).toBe('1982-01-03T00:00:00Z')
    expect(temporalInstantFromISOWeek(2022, 52, 7).toString()).toBe('2023-01-01T00:00:00Z')
    expect(temporalInstantFromISOWeek(2019, 1, 1).toString()).toBe('2018-12-31T00:00:00Z')
    // thursday in new year
    expect(temporalInstantFromISOWeek(2022, 1, 4).toString()).toBe('2022-01-06T00:00:00Z')
    expect(temporalInstantFromISOWeek(1981, 1, 4).toString()).toBe('1981-01-01T00:00:00Z')
    // middle of the year
    expect(temporalInstantFromISOWeek(2022, 26, 4).toString()).toBe('2022-06-30T00:00:00Z')
    // work for leap years
    expect(temporalInstantFromISOWeek(1980, 1, 1).toString()).toBe('1979-12-31T00:00:00Z')
    expect(temporalInstantFromISOWeek(1980, 1, 2).toString()).toBe('1980-01-01T00:00:00Z')
    expect(temporalInstantFromISOWeek(1980, 52, 7).toString()).toBe('1980-12-28T00:00:00Z')
    expect(temporalInstantFromISOWeek(2020, 9, 6).toString()).toBe('2020-02-29T00:00:00Z')

    // testing week 1 of 2021 with different week start days
    expect(temporalInstantFromISOWeek(2021, 1, 1, ISOWeekDays.Saturday).toString()).toBe('2021-01-02T00:00:00Z')
    expect(temporalInstantFromISOWeek(2021, 1, 1, ISOWeekDays.Sunday).toString()).toBe('2021-01-03T00:00:00Z')
    expect(temporalInstantFromISOWeek(2021, 1, 1, ISOWeekDays.Monday).toString()).toBe('2021-01-04T00:00:00Z')
    expect(temporalInstantFromISOWeek(2021, 1, 1, ISOWeekDays.Tuesday).toString()).toBe('2020-12-29T00:00:00Z')
    expect(temporalInstantFromISOWeek(2021, 1, 1, ISOWeekDays.Wednesday).toString()).toBe('2020-12-30T00:00:00Z')
    expect(temporalInstantFromISOWeek(2021, 1, 1, ISOWeekDays.Thursday).toString()).toBe('2020-12-31T00:00:00Z')
    expect(temporalInstantFromISOWeek(2021, 1, 1, ISOWeekDays.Friday).toString()).toBe('2021-01-01T00:00:00Z')

    // testing last week of 2021 with different week start days
    expect(temporalInstantFromISOWeek(2021, 53, 1, ISOWeekDays.Tuesday).toString()).toBe('2021-12-28T00:00:00Z')
    expect(temporalInstantFromISOWeek(2021, 52, 1, ISOWeekDays.Wednesday).toString()).toBe('2021-12-22T00:00:00Z')
    expect(temporalInstantFromISOWeek(2021, 52, 1, ISOWeekDays.Thursday).toString()).toBe('2021-12-23T00:00:00Z')
    expect(temporalInstantFromISOWeek(2021, 52, 1, ISOWeekDays.Friday).toString()).toBe('2021-12-24T00:00:00Z')
    expect(temporalInstantFromISOWeek(2021, 52, 1, ISOWeekDays.Saturday).toString()).toBe('2021-12-25T00:00:00Z')
    expect(temporalInstantFromISOWeek(2021, 52, 1, ISOWeekDays.Sunday).toString()).toBe('2021-12-26T00:00:00Z')

    // support for timezone and DST
    // positive timezone
    expect(temporalInstantFromISOWeek(1980, 1, 1, ISOWeekDays.Monday, { referenceTimezone: klTimezone }).toString()).toBe('1979-12-30T16:30:00Z')
    expect(temporalInstantFromISOWeek(1981, 53, 7, ISOWeekDays.Monday, { referenceTimezone: klTimezone }).toString()).toBe('1982-01-02T16:00:00Z')
    // negative timezone
    expect(temporalInstantFromISOWeek(2021, 1, 1, ISOWeekDays.Monday, { referenceTimezone: alaskaTimezone }).toString()).toBe('2021-01-04T09:00:00Z')
    expect(temporalInstantFromISOWeek(2024, 11, 1, ISOWeekDays.Monday, { referenceTimezone: alaskaTimezone }).toString()).toBe('2024-03-11T08:00:00Z')

    // support for time
    expect(temporalInstantFromISOWeek(2021, 1, 1, ISOWeekDays.Monday, { referenceTime: dateWithTime }).toString()).toBe('2021-01-04T12:30:45Z')
    // additional test cases from: https://calendars.fandom.com/wiki/ISO_week_date
    expect(temporalInstantFromISOWeek(2004, 53, 6).toString()).toBe('2005-01-01T00:00:00Z')
    expect(temporalInstantFromISOWeek(2004, 53, 7).toString()).toBe('2005-01-02T00:00:00Z')
    expect(temporalInstantFromISOWeek(2005, 52, 6).toString()).toBe('2005-12-31T00:00:00Z')
    expect(temporalInstantFromISOWeek(2007, 1, 1).toString()).toBe('2007-01-01T00:00:00Z')
    expect(temporalInstantFromISOWeek(2007, 52, 7).toString()).toBe('2007-12-30T00:00:00Z')
    expect(temporalInstantFromISOWeek(2008, 1, 1).toString()).toBe('2007-12-31T00:00:00Z')
    expect(temporalInstantFromISOWeek(2008, 1, 2).toString()).toBe('2008-01-01T00:00:00Z')
    expect(temporalInstantFromISOWeek(2009, 1, 1).toString()).toBe('2008-12-29T00:00:00Z')
    expect(temporalInstantFromISOWeek(2009, 1, 3).toString()).toBe('2008-12-31T00:00:00Z')
    expect(temporalInstantFromISOWeek(2009, 1, 4).toString()).toBe('2009-01-01T00:00:00Z')
    expect(temporalInstantFromISOWeek(2009, 53, 4).toString()).toBe('2009-12-31T00:00:00Z')
    expect(temporalInstantFromISOWeek(2009, 53, 7).toString()).toBe('2010-01-03T00:00:00Z')
    // Examples where the ISO year is three days into the next Gregorian year
    expect(temporalInstantFromISOWeek(2009, 53, 4).toString()).toBe('2009-12-31T00:00:00Z')
    expect(temporalInstantFromISOWeek(2009, 53, 5).toString()).toBe('2010-01-01T00:00:00Z')
    expect(temporalInstantFromISOWeek(2009, 53, 6).toString()).toBe('2010-01-02T00:00:00Z')
    expect(temporalInstantFromISOWeek(2009, 53, 7).toString()).toBe('2010-01-03T00:00:00Z')
    expect(temporalInstantFromISOWeek(2010, 1, 1).toString()).toBe('2010-01-04T00:00:00Z')
    // Examples where the ISO year is three days into the previous Gregorian year
    expect(temporalInstantFromISOWeek(2008, 52, 7).toString()).toBe('2008-12-28T00:00:00Z')
    expect(temporalInstantFromISOWeek(2009, 1, 1).toString()).toBe('2008-12-29T00:00:00Z')
    expect(temporalInstantFromISOWeek(2009, 1, 2).toString()).toBe('2008-12-30T00:00:00Z')
    expect(temporalInstantFromISOWeek(2009, 1, 3).toString()).toBe('2008-12-31T00:00:00Z')
    expect(temporalInstantFromISOWeek(2009, 1, 4).toString()).toBe('2009-01-01T00:00:00Z')
  })

  it('should generate Temporal Instant from ISO week date string', () => {
    // we should be able to replicate all the tests from the previous test
    expect(temporalInstantFromISOWeekString('2021-W01-1')).toBeInstanceOf(Temporal.Instant)
    expect(temporalInstantFromISOWeekString('2021-W01-1').toString()).toBe('2021-01-04T00:00:00Z')
    expect(temporalInstantFromISOWeekString('2024-W01-1').toString()).toBe('2024-01-01T00:00:00Z')
    expect(temporalInstantFromISOWeekString('2023-W52-7').toString()).toBe('2023-12-31T00:00:00Z')
    // testing same year boundary
    expect(temporalInstantFromISOWeekString('2023-W01-1').toString()).toBe('2023-01-02T00:00:00Z')
    expect(temporalInstantFromISOWeekString('2023-W52-7').toString()).toBe('2023-12-31T00:00:00Z')
    // testing week 53
    expect(temporalInstantFromISOWeekString('1981-W53-7').toString()).toBe('1982-01-03T00:00:00Z')
    expect(temporalInstantFromISOWeekString('1976-W53-6').toString()).toBe('1977-01-01T00:00:00Z')
    expect(temporalInstantFromISOWeekString('1981-W53-4').toString()).toBe('1981-12-31T00:00:00Z')
    expect(temporalInstantFromISOWeekString('1981-W53-5').toString()).toBe('1982-01-01T00:00:00Z')
    expect(temporalInstantFromISOWeekString('1981-W53-6').toString()).toBe('1982-01-02T00:00:00Z')
    expect(temporalInstantFromISOWeekString('1981-W53-7').toString()).toBe('1982-01-03T00:00:00Z')
    // cross over year boundary
    expect(temporalInstantFromISOWeekString('1981-W53-7').toString()).toBe('1982-01-03T00:00:00Z')
    expect(temporalInstantFromISOWeekString('2022-W52-7').toString()).toBe('2023-01-01T00:00:00Z')
    expect(temporalInstantFromISOWeekString('2019-W01-1').toString()).toBe('2018-12-31T00:00:00Z')
    // thursday in new year
    expect(temporalInstantFromISOWeekString('2022-W01-4').toString()).toBe('2022-01-06T00:00:00Z')
    expect(temporalInstantFromISOWeekString('1981-W01-4').toString()).toBe('1981-01-01T00:00:00Z')
    // middle of the year
    expect(temporalInstantFromISOWeekString('2022-W26-4').toString()).toBe('2022-06-30T00:00:00Z')
    // work for leap years
    expect(temporalInstantFromISOWeekString('1980-W01-1').toString()).toBe('1979-12-31T00:00:00Z')
    expect(temporalInstantFromISOWeekString('1980-W01-2').toString()).toBe('1980-01-01T00:00:00Z')
    expect(temporalInstantFromISOWeekString('1980-W52-7').toString()).toBe('1980-12-28T00:00:00Z')
    expect(temporalInstantFromISOWeekString('2020-W09-6').toString()).toBe('2020-02-29T00:00:00Z')

    // testing week 1 of 2021 with different week start days
    expect(temporalInstantFromISOWeekString('2021-W01-1[SA]').toString()).toBe('2021-01-02T00:00:00Z')
    expect(temporalInstantFromISOWeekString('2021-W01-1[SU]').toString()).toBe('2021-01-03T00:00:00Z')
    expect(temporalInstantFromISOWeekString('2021-W01-1[MO]').toString()).toBe('2021-01-04T00:00:00Z')
    expect(temporalInstantFromISOWeekString('2021-W01-1[TU]').toString()).toBe('2020-12-29T00:00:00Z')
    expect(temporalInstantFromISOWeekString('2021-W01-1[WE]').toString()).toBe('2020-12-30T00:00:00Z')
    expect(temporalInstantFromISOWeekString('2021-W01-1[TH]').toString()).toBe('2020-12-31T00:00:00Z')
    expect(temporalInstantFromISOWeekString('2021-W01-1[FR]').toString()).toBe('2021-01-01T00:00:00Z')

    // testing last week of 2021 with different week start days
    expect(temporalInstantFromISOWeekString('2021-W53-1[TU]').toString()).toBe('2021-12-28T00:00:00Z')
    expect(temporalInstantFromISOWeekString('2021-W52-1[WE]').toString()).toBe('2021-12-22T00:00:00Z')
    expect(temporalInstantFromISOWeekString('2021-W52-1[TH]').toString()).toBe('2021-12-23T00:00:00Z')
    expect(temporalInstantFromISOWeekString('2021-W52-1[FR]').toString()).toBe('2021-12-24T00:00:00Z')
    expect(temporalInstantFromISOWeekString('2021-W52-1[SA]').toString()).toBe('2021-12-25T00:00:00Z')
    expect(temporalInstantFromISOWeekString('2021-W52-1[SU]').toString()).toBe('2021-12-26T00:00:00Z')

    // support for timezone and DST
    // positive timezone
    expect(temporalInstantFromISOWeekString('1980-W01-1[MO]', { referenceTimezone: klTimezone }).toString()).toBe('1979-12-30T16:30:00Z')
    expect(temporalInstantFromISOWeekString('1981-W53-7[MO]', { referenceTimezone: klTimezone }).toString()).toBe('1982-01-02T16:00:00Z')
    // negative timezone
    expect(temporalInstantFromISOWeekString('2021-W01-1[MO]', { referenceTimezone: alaskaTimezone }).toString()).toBe('2021-01-04T09:00:00Z')
    expect(temporalInstantFromISOWeekString('2024-W11-1[MO]', { referenceTimezone: alaskaTimezone }).toString()).toBe('2024-03-11T08:00:00Z')

    // support for time
    expect(temporalInstantFromISOWeekString('2021-W01-1[MO]', { referenceTime: dateWithTime }).toString()).toBe('2021-01-04T12:30:45Z')

    // additional test cases from: https://calendars.fandom.com/wiki/ISO_week_date
    expect(temporalInstantFromISOWeekString('2004-W53-6').toString()).toBe('2005-01-01T00:00:00Z')
    expect(temporalInstantFromISOWeekString('2004-W53-7').toString()).toBe('2005-01-02T00:00:00Z')
    expect(temporalInstantFromISOWeekString('2005-W52-6').toString()).toBe('2005-12-31T00:00:00Z')
    expect(temporalInstantFromISOWeekString('2007-W01-1').toString()).toBe('2007-01-01T00:00:00Z')
    expect(temporalInstantFromISOWeekString('2007-W52-7').toString()).toBe('2007-12-30T00:00:00Z')
    expect(temporalInstantFromISOWeekString('2008-W01-1').toString()).toBe('2007-12-31T00:00:00Z')
    expect(temporalInstantFromISOWeekString('2008-W01-2').toString()).toBe('2008-01-01T00:00:00Z')
    expect(temporalInstantFromISOWeekString('2009-W01-1').toString()).toBe('2008-12-29T00:00:00Z')
    expect(temporalInstantFromISOWeekString('2009-W01-3').toString()).toBe('2008-12-31T00:00:00Z')
    expect(temporalInstantFromISOWeekString('2009-W01-4').toString()).toBe('2009-01-01T00:00:00Z')
    expect(temporalInstantFromISOWeekString('2009-W53-4').toString()).toBe('2009-12-31T00:00:00Z')
    expect(temporalInstantFromISOWeekString('2009-W53-7').toString()).toBe('2010-01-03T00:00:00Z')
    // Examples where the ISO year is three days into the next Gregorian year
    expect(temporalInstantFromISOWeekString('2009-W53-4').toString()).toBe('2009-12-31T00:00:00Z')
    expect(temporalInstantFromISOWeekString('2009-W53-5').toString()).toBe('2010-01-01T00:00:00Z')
    expect(temporalInstantFromISOWeekString('2009-W53-6').toString()).toBe('2010-01-02T00:00:00Z')
    expect(temporalInstantFromISOWeekString('2009-W53-7').toString()).toBe('2010-01-03T00:00:00Z')
    expect(temporalInstantFromISOWeekString('2010-W01-1').toString()).toBe('2010-01-04T00:00:00Z')
    // Examples where the ISO year is three days into the previous Gregorian year
    expect(temporalInstantFromISOWeekString('2008-W52-7').toString()).toBe('2008-12-28T00:00:00Z')
    expect(temporalInstantFromISOWeekString('2009-W01-1').toString()).toBe('2008-12-29T00:00:00Z')
    expect(temporalInstantFromISOWeekString('2009-W01-2').toString()).toBe('2008-12-30T00:00:00Z')
    expect(temporalInstantFromISOWeekString('2009-W01-3').toString()).toBe('2008-12-31T00:00:00Z')
    expect(temporalInstantFromISOWeekString('2009-W01-4').toString()).toBe('2009-01-01T00:00:00Z')
  })

  it('should generate a PlainWeekDate from a Temporal Object', () => {
    // we should be able to reverse all the tests from the previous tests§
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2021-01-04'))).toBeInstanceOf(PlainWeekDate)
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2021-01-04')).toString()).toBe('2021-W01-1')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2024-01-01')).toString()).toBe('2024-W01-1')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2023-12-31')).toString()).toBe('2023-W52-7')
    // testing same year boundary
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2023-01-02')).toString()).toBe('2023-W01-1')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2023-12-31')).toString()).toBe('2023-W52-7')
    // testing week 53
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('1982-01-03')).toString()).toBe('1981-W53-7')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('1977-01-01')).toString()).toBe('1976-W53-6')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('1981-12-31')).toString()).toBe('1981-W53-4')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('1982-01-01')).toString()).toBe('1981-W53-5')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('1982-01-02')).toString()).toBe('1981-W53-6')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('1982-01-03')).toString()).toBe('1981-W53-7')
    // cross over year boundary
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('1982-01-03')).toString()).toBe('1981-W53-7')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2023-01-01')).toString()).toBe('2022-W52-7')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2018-12-31')).toString()).toBe('2019-W01-1')
    // thursday in new year
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2022-01-06')).toString()).toBe('2022-W01-4')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('1981-01-01')).toString()).toBe('1981-W01-4')
    // middle of the year
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2022-06-30')).toString()).toBe('2022-W26-4')
    // work for leap years
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('1979-12-31')).toString()).toBe('1980-W01-1')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('1980-01-01')).toString()).toBe('1980-W01-2')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('1980-12-28')).toString()).toBe('1980-W52-7')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2020-02-29')).toString()).toBe('2020-W09-6')

    // testing week 1 of 2021 with different week start days
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2021-01-02'), ISOWeekDays.Saturday).toString()).toBe('2021-W01-1[SA]')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2021-01-03'), ISOWeekDays.Sunday).toString()).toBe('2021-W01-1[SU]')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2021-01-04'), ISOWeekDays.Monday).toString()).toBe('2021-W01-1')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2020-12-29'), ISOWeekDays.Tuesday).toString()).toBe('2021-W01-1[TU]')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2020-12-30'), ISOWeekDays.Wednesday).toString()).toBe('2021-W01-1[WE]')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2020-12-31'), ISOWeekDays.Thursday).toString()).toBe('2021-W01-1[TH]')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2021-01-01'), ISOWeekDays.Friday).toString()).toBe('2021-W01-1[FR]')

    // testing last week of 2021 with different week start days
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2021-12-28'), ISOWeekDays.Tuesday).toString()).toBe('2021-W53-1[TU]') // FIXME: week calculation is wrong
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2021-12-22'), ISOWeekDays.Wednesday).toString()).toBe('2021-W52-1[WE]')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2021-12-23'), ISOWeekDays.Thursday).toString()).toBe('2021-W52-1[TH]')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2021-12-24'), ISOWeekDays.Friday).toString()).toBe('2021-W52-1[FR]')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2021-12-25'), ISOWeekDays.Saturday).toString()).toBe('2021-W52-1[SA]')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2021-12-26'), ISOWeekDays.Sunday).toString()).toBe('2021-W52-1[SU]')

    // support for timezone and DST
    // positive timezone
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('1979-12-31')).toZonedDateTime(klTimezone.timeZoneId).toString()).toBe('1979-12-31T07:30:00+07:30[Asia/Kuala_Lumpur]')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('1979-12-31')).toString()).toBe('1980-W01-1')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('1982-01-03')).toZonedDateTime(klTimezone.timeZoneId).toString()).toBe('1982-01-03T08:00:00+08:00[Asia/Kuala_Lumpur]')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('1982-01-03')).toString()).toBe('1981-W53-7')
    // negative timezone
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2021-01-04')).toZonedDateTime(alaskaTimezone.timeZoneId).toString()).toBe('2021-01-03T15:00:00-09:00[America/Anchorage]')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2021-01-04')).toString()).toBe('2021-W01-1')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2024-03-11')).toZonedDateTime(alaskaTimezone.timeZoneId).toString()).toBe('2024-03-10T16:00:00-08:00[America/Anchorage]')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2024-03-11')).toString()).toBe('2024-W11-1')

    // support for time
    const weekDate = temporalToISOPlainDateWeek(Temporal.PlainDateTime.from('2021-01-04T00:00:00'))
    expect(weekDate.toString()).toBe('2021-W01-1')
    // expect(weekDate.toPlainDateTime().toString()).toBe('2021-W01-1') // TODO needs to be able to pass dateTime and get the same Time back

    // additional test cases from: https://calendars.fandom.com/wiki/ISO_week_date
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2005-01-01')).toString()).toBe('2004-W53-6')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2005-01-02')).toString()).toBe('2004-W53-7')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2005-12-31')).toString()).toBe('2005-W52-6')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2007-01-01')).toString()).toBe('2007-W01-1')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2007-12-30')).toString()).toBe('2007-W52-7')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2007-12-31')).toString()).toBe('2008-W01-1')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2008-01-01')).toString()).toBe('2008-W01-2')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2008-12-29')).toString()).toBe('2009-W01-1')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2008-12-31')).toString()).toBe('2009-W01-3')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2009-01-01')).toString()).toBe('2009-W01-4')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2009-12-31')).toString()).toBe('2009-W53-4')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2010-01-03')).toString()).toBe('2009-W53-7')
    // Examples where the ISO year is three days into the next Gregorian year
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2009-12-31')).toString()).toBe('2009-W53-4')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2010-01-01')).toString()).toBe('2009-W53-5')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2010-01-02')).toString()).toBe('2009-W53-6')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2010-01-03')).toString()).toBe('2009-W53-7')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2010-01-04')).toString()).toBe('2010-W01-1')
    // Examples where the ISO year is three days into the previous Gregorian year
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2008-12-28')).toString()).toBe('2008-W52-7')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2008-12-29')).toString()).toBe('2009-W01-1')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2008-12-30')).toString()).toBe('2009-W01-2')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2008-12-31')).toString()).toBe('2009-W01-3')
    expect(temporalToISOPlainDateWeek(Temporal.PlainDate.from('2009-01-01')).toString()).toBe('2009-W01-4')
  })

  it('should calculate number of weeks in a given proleptic Gregorian year', () => {
    // we should be able to replicate all the tests from the previous tests
    expect(weeksInISOYear(1976)).toBe(53)
    expect(weeksInISOYear(1980)).toBe(52)
    expect(weeksInISOYear(1981)).toBe(53)
    expect(weeksInISOYear(2008)).toBe(52)
    expect(weeksInISOYear(2009)).toBe(53)
    expect(weeksInISOYear(2020)).toBe(53)
    expect(weeksInISOYear(2021)).toBe(52)
    expect(weeksInISOYear(2023)).toBe(52)
    // with different week start days
    expect(weeksInISOYear(2021, ISOWeekDays.Tuesday)).toBe(53)
    expect(weeksInISOYear(2021, ISOWeekDays.Wednesday)).toBe(52)
    expect(weeksInISOYear(2021, ISOWeekDays.Thursday)).toBe(52)
    expect(weeksInISOYear(2021, ISOWeekDays.Friday)).toBe(52)
    expect(weeksInISOYear(2021, ISOWeekDays.Saturday)).toBe(52)
    expect(weeksInISOYear(2021, ISOWeekDays.Sunday)).toBe(52)
  })
})
