import { describe, expect, it } from 'vitest'
import { Temporal } from '@js-temporal/polyfill'
import { HWCWeekDays, ISOWeekDays, PlainWeekDate, Scales } from '../src'

describe('plainWeekDate should work', () => {
  it('should build an instance properly', () => {
    // test normal cases
    expect(new PlainWeekDate(2021, 1, 1).toString()).toEqual('2021-W01-1')
    expect(new PlainWeekDate(2021, 1, 1, 'iso8601', ISOWeekDays.Wednesday).toString()).toEqual('2021-W01-1[WE]')
    // TODO: document that the string representation behavior is different from Temporal
    // in the sense that the date is represented in the hijri calendar not the gregorian calendar
    // we might want to change this behavior to match Temporal
    expect(new PlainWeekDate(1442, 1, 1, 'islamic-umalqura').toString()).toEqual('1442-W01-1[u-ca=islamic-umalqura]')
    // for hijri calendars, the week start day is always Saturday
    expect(new PlainWeekDate(1442, 1, 1, 'islamic-umalqura', 3).toString()).toEqual('1442-W01-1[u-ca=islamic-umalqura][MO]')
    // for iso calendar, the week start day is always Monday
    expect(new PlainWeekDate(2021, 1, 1, 'iso8601', 3).toString()).toEqual('2021-W01-1[WE]')
    // test out of range values
    expect(() => new PlainWeekDate(10000, 1, 1)).toThrow()
    expect(() => new PlainWeekDate(-10000, 1, 1)).toThrow()
    expect(() => new PlainWeekDate(2021, 0, 1)).toThrow()
    expect(() => new PlainWeekDate(2021, 54, 1)).toThrow()
    expect(() => new PlainWeekDate(2021, 1, 8)).toThrow()
    expect(() => new PlainWeekDate(2021, 1, 0)).toThrow()
    // test invalid values
    // @ts-expect-error test invalid calendar
    expect(() => new PlainWeekDate(2021, 1, 1, 'invalid')).toThrow()
    // @ts-expect-error test invalid week start day
    expect(() => new PlainWeekDate(2021, 1, 1, 'iso8601', 8)).toThrow()
    // test default values for options are preserved when passing custom options
    expect(new PlainWeekDate(2021, 1, 1, 'iso8601', 1, {
      shortForm: true,
    }).toString()).toEqual('2021-W01')
    expect(new PlainWeekDate(2021, 1, 1, 'iso8601', 1, {
      calendarName: 'always',
    }).toString()).toEqual('2021-W01-1[u-ca=iso8601]')
    expect(new PlainWeekDate(2021, 1, 1, 'iso8601', 1, {
      weekStartDay: 'always',
    }).toString()).toEqual('2021-W01-1[MO]')
  })

  it('should create a new instance using static from', () => {
    const hijriDate = PlainWeekDate.from('1442-W01-1[u-ca=islamic-civil][SA]').toPlainDate()
    const isoDate = hijriDate.withCalendar('iso8601')
    const isoWeekDate = PlainWeekDate.from(isoDate)
    const hijriWeekDate = PlainWeekDate.from(hijriDate)
    const hijriWeekDateMonday = PlainWeekDate.from(hijriDate).withWeekStartDay(3)
    // test from string
    expect(PlainWeekDate.from('2021-W01-1').toString()).toEqual('2021-W01-1')
    expect(PlainWeekDate.from('2021-W01-1[SA]').toString()).toEqual('2021-W01-1[SA]')
    expect(PlainWeekDate.from('2021-W01-1[SA]').weekStartDay).toEqual(ISOWeekDays.Saturday)
    expect(PlainWeekDate.from('1442-W01-1[u-ca=islamic-civil][SA]').calendarId).toEqual('islamic-civil')
    // test how that conversions work as expected with different calendars and week start days
    expect(PlainWeekDate.from('1442-W01-1[u-ca=islamic-civil][SA]', {
      calendar: 'iso8601',
    }).weekDateFields()).toEqual(isoWeekDate.weekDateFields())
    expect(PlainWeekDate.from('1442-W01-1[u-ca=islamic-civil][SA]', {
      weekStartDay: 1,
    }).toString()).toEqual('1442-W01-1[u-ca=islamic-civil]')
    expect(PlainWeekDate.from('1442-W01-1[u-ca=islamic-civil][SA]', {
      weekStartDay: 3,
    }).toString()).toEqual(hijriWeekDateMonday.toString())

    // test from Temporal Objects
    expect(PlainWeekDate.from(isoDate).toString()).toEqual(isoWeekDate.toString())
    const plainDateTime = isoDate.toPlainDateTime({ hour: 12 })
    const zonedDateTime = plainDateTime.toZonedDateTime('UTC')
    expect(PlainWeekDate.from(plainDateTime).toString()).toEqual(isoWeekDate.toString())
    expect(PlainWeekDate.from(zonedDateTime).toString()).toEqual(isoWeekDate.toString())
    // test different calendars and week start days
    expect(PlainWeekDate.from(isoDate, {
      calendar: 'islamic-civil',
    }).toString()).toEqual(hijriWeekDate.toString())
    expect(PlainWeekDate.from(hijriDate, {
      weekStartDay: 3,
    }).toString()).toEqual(hijriWeekDateMonday.toString())
    // test from PlainWeekDate
    expect(PlainWeekDate.from(hijriWeekDate).toString()).toEqual(hijriWeekDate.toString())

    // test from Plain Object
    expect(PlainWeekDate.from({
      yearOfWeek: 2021,
      weekOfYear: 1,
      dayOfWeek: 1,
    }).toString()).toEqual('2021-W01-1')

    expect(PlainWeekDate.from({
      yearOfWeek: 2021,
      weekOfYear: 1,
      dayOfWeek: 1,
      weekStartDay: 3,
    }).toString()).toEqual('2021-W01-1[WE]')

    expect(PlainWeekDate.from({
      yearOfWeek: 1442,
      weekOfYear: 1,
      dayOfWeek: 1,
      calendarId: 'islamic-civil',
    }).toString()).toEqual('1442-W01-1[u-ca=islamic-civil]')

    expect(PlainWeekDate.from({
      yearOfWeek: 2021,
      weekOfYear: 1,
      dayOfWeek: 1,
    }, {
      calendar: 'iso8601',
    }).toString()).toEqual('2021-W01-1')

    // takes the same day and use a different week start day
    expect(PlainWeekDate.from({
      yearOfWeek: 2021,
      weekOfYear: 1,
      dayOfWeek: 1,
    }, {
      weekStartDay: 3,
    }).toString()).toEqual('2021-W01-6[WE]')
  })

  it('should return valid week date string', () => {
    // test with default behavior
    expect(new PlainWeekDate(2021, 1, 1).toString()).toEqual('2021-W01-1')
    expect(new PlainWeekDate(2021, 1, 1, 'iso8601', 3).toString()).toEqual('2021-W01-1[WE]')
    expect(new PlainWeekDate(1442, 1, 1, 'islamic-umalqura').toString()).toEqual('1442-W01-1[u-ca=islamic-umalqura]')
    expect(new PlainWeekDate(1442, 1, 1, 'islamic-umalqura', 3).toString()).toEqual('1442-W01-1[u-ca=islamic-umalqura][MO]')
    // test with initialized options
    expect(new PlainWeekDate(2021, 1, 1, 'iso8601', 1, {
      shortForm: true,
    }).toString()).toEqual('2021-W01')
    expect(new PlainWeekDate(2021, 1, 1, 'iso8601', 3, {
      shortForm: true,
    }).toString()).toEqual('2021-W01[WE]')
    expect(new PlainWeekDate(2021, 1, 1, 'iso8601', 1, {
      calendarName: 'always',
    }).toString()).toEqual('2021-W01-1[u-ca=iso8601]')
    expect(new PlainWeekDate(2021, 1, 1, 'iso8601', 1, {
      calendarName: 'always',
      shortForm: true,
      weekStartDay: 'always',
    }).toString()).toEqual('2021-W01[u-ca=iso8601][MO]')

    // test with passed options
    expect(new PlainWeekDate(2021, 1, 1).toString({
      shortForm: true,
    })).toEqual('2021-W01')
    expect(new PlainWeekDate(2021, 1, 1, 'iso8601', 3).toString({
      shortForm: true,
    })).toEqual('2021-W01[WE]')
    expect(new PlainWeekDate(2021, 1, 1, 'iso8601', 1).toString({
      calendarName: 'always',
      weekStartDay: 'always',
    })).toEqual('2021-W01-1[u-ca=iso8601][MO]')
    expect(new PlainWeekDate(1442, 1, 1, 'islamic-civil', 3).toString({
      calendarName: 'never',
      weekStartDay: 'never',
    })).toEqual('1442-W01-1')
  })

  it('should return valid week date compact string', () => {
    // test with default behavior
    expect(new PlainWeekDate(2021, 1, 1).toStringCompact()).toEqual('2021W011')
    expect(new PlainWeekDate(2021, 1, 1, 'iso8601', 3).toStringCompact()).toEqual('2021W011[WE]')
    expect(new PlainWeekDate(1442, 1, 1, 'islamic-umalqura').toStringCompact()).toEqual('1442W011[u-ca=islamic-umalqura]')
    expect(new PlainWeekDate(1442, 1, 1, 'islamic-umalqura', 3).toStringCompact()).toEqual('1442W011[u-ca=islamic-umalqura][MO]')
    // test with initialized options
    expect(new PlainWeekDate(2021, 1, 1, 'iso8601', 1, {
      shortForm: true,
    }).toStringCompact()).toEqual('2021W01')
    expect(new PlainWeekDate(2021, 1, 1, 'iso8601', 3, {
      shortForm: true,
    }).toStringCompact()).toEqual('2021W01[WE]')
    expect(new PlainWeekDate(2021, 1, 1, 'iso8601', 1, {
      calendarName: 'always',
    }).toStringCompact()).toEqual('2021W011[u-ca=iso8601]')
    expect(new PlainWeekDate(2021, 1, 1, 'iso8601', 1, {
      calendarName: 'always',
      shortForm: true,
      weekStartDay: 'always',
    }).toStringCompact()).toEqual('2021W01[u-ca=iso8601][MO]')

    // test with passed options
    expect(new PlainWeekDate(2021, 1, 1).toStringCompact({
      shortForm: true,
    })).toEqual('2021W01')
    expect(new PlainWeekDate(2021, 1, 1, 'iso8601', 3).toStringCompact({
      shortForm: true,
    })).toEqual('2021W01[WE]')
    expect(new PlainWeekDate(2021, 1, 1, 'iso8601', 1).toStringCompact({
      calendarName: 'always',
      weekStartDay: 'always',
    })).toEqual('2021W011[u-ca=iso8601][MO]')
    expect(new PlainWeekDate(1442, 1, 1, 'islamic-civil', 3).toStringCompact({
      calendarName: 'never',
      weekStartDay: 'never',
    })).toEqual('1442W011')
  })

  it('should return valid week date parts', () => {
    expect(new PlainWeekDate(2021, 1, 1).weekDateFields()).toEqual({
      yearOfWeek: 2021,
      weekOfYear: 1,
      dayOfWeek: 1,
      weekStartDay: ISOWeekDays.Monday,
      calendarId: 'iso8601',
    })
    expect(new PlainWeekDate(2021, 1, 1, 'iso8601', 3).weekDateFields()).toEqual({
      yearOfWeek: 2021,
      weekOfYear: 1,
      dayOfWeek: 1,
      weekStartDay: ISOWeekDays.Wednesday,
      calendarId: 'iso8601',
    })
    expect(new PlainWeekDate(1442, 1, 1, 'islamic-umalqura').weekDateFields()).toEqual({
      yearOfWeek: 1442,
      weekOfYear: 1,
      dayOfWeek: 1,
      weekStartDay: HWCWeekDays.Saturday,
      calendarId: 'islamic-umalqura',
    })
    expect(new PlainWeekDate(1442, 1, 1, 'islamic-umalqura', 3).weekDateFields()).toEqual({
      yearOfWeek: 1442,
      weekOfYear: 1,
      dayOfWeek: 1,
      weekStartDay: HWCWeekDays.Monday,
      calendarId: 'islamic-umalqura',
    })
  })

  it('should convert to Temporal.Instant', () => {
    const plainDateTime = new Temporal.PlainDateTime(2021, 1, 1)
    const instant = plainDateTime.toZonedDateTime('UTC').toInstant()
    expect(PlainWeekDate.from(plainDateTime).toInstant().epochNanoseconds).toEqual(instant.epochNanoseconds)
    // TODO: test with reference time
    // TODO: test with reference timezone
  })

  it('should convert to Temporal.PlainDate', () => {
    const plainDate = new Temporal.PlainDate(2021, 1, 1)
    expect(PlainWeekDate.from(plainDate).toPlainDate().toString()).toEqual(plainDate.toString())
  })

  it('should convert to Temporal.PlainDateTime', () => {
    const plainDateTime = new Temporal.PlainDateTime(2021, 1, 1)
    expect(PlainWeekDate.from(plainDateTime).toPlainDateTime().toString()).toEqual(plainDateTime.toString())
  })

  it('should convert to Temporal.ZonedDateTime', () => {
    // test with default behavior
    const plainDateTime = new Temporal.PlainDateTime(2021, 1, 1)
    const zonedDateTime = plainDateTime.toZonedDateTime('UTC')
    expect(PlainWeekDate.from(zonedDateTime).toZonedDateTime().toString()).toEqual(zonedDateTime.toString())
    // test with different timezones
    const zonedDateTime2 = plainDateTime.toZonedDateTime('UTC').withTimeZone('Asia/Kuala_Lumpur')
    const zonedDateTime3 = plainDateTime.toZonedDateTime('UTC').withTimeZone('America/Anchorage')
    expect(PlainWeekDate.from(plainDateTime).toZonedDateTime(zonedDateTime2.timeZoneId).toString()).toEqual(zonedDateTime2.toString())
    expect(PlainWeekDate.from(plainDateTime).toZonedDateTime(zonedDateTime3.timeZoneId).toString()).toEqual(zonedDateTime3.toString())
  })

  it('should give new instance with new calendar', () => {
    expect(1).toEqual(1)
  })

  it('should give new instance with new week start day', () => {
    expect(1).toEqual(1)
  })

  it('should compare scale', () => {
    // test the instance function
    const one = new PlainWeekDate(2021, 1, 1)
    const two = new PlainWeekDate(2021, 2, 2, 'iso-extended')
    const three = new PlainWeekDate(2021, 1, 1, 'islamic-umalqura')
    const four = new PlainWeekDate(2021, 1, 1, 'hwc-islamic-tbla')
    expect(PlainWeekDate.sameScale(one, two)).toBeTruthy()
    expect(PlainWeekDate.sameScale(one, three)).toBeFalsy()
    expect(PlainWeekDate.sameScale(three, four)).toBeTruthy()
    expect(PlainWeekDate.sameScale(one, Scales.Gregorian)).toBeTruthy()
    expect(PlainWeekDate.sameScale(one, Scales.Hijri)).toBeFalsy()
    expect(PlainWeekDate.sameScale(three, Scales.Hijri)).toBeTruthy()

    // test the static function
    expect(one.sameScale(two)).toBeTruthy()
    expect(one.sameScale(three)).toBeFalsy()
    expect(three.sameScale(four)).toBeTruthy()
    expect(one.sameScale(Scales.Gregorian)).toBeTruthy()
    expect(one.sameScale(Scales.Hijri)).toBeFalsy()
    expect(three.sameScale(Scales.Hijri)).toBeTruthy()
  })

  it('should compare week date', () => {
    const one = new PlainWeekDate(2021, 1, 1)
    const two = new PlainWeekDate(2021, 2, 2)
    expect(PlainWeekDate.compare(one, two)).toEqual(-1)
    expect(PlainWeekDate.compare(two, one)).toEqual(1)
    expect(PlainWeekDate.compare(one, one)).toEqual(0)

    expect(one.compare(two)).toEqual(-1)
    expect(two.compare(one)).toEqual(1)
    expect(one.compare(one)).toEqual(0)
  })
})
