import { Temporal } from '@js-temporal/polyfill'
import { fromHWCDate, toHWCDate } from 'hijri-week-calendar'
import { temporalInstantFromISOWeek, temporalToISOPlainDateWeek } from './iso/premetives'
import { HWCWeekDays, ISOWeekDays, getWeekDayCodeName } from './common/weekDays'
import type { Scale, SupportedCalendars, SupportedHijriCalendars } from './common/calendars'
import { getCalendarFormId, getCalendarSuperId, getScaleFromCalendarId } from './common/calendars'
import { instantToOtherTemporal, weekDatePartsFromString } from './common/utils'

interface ToStringOptions {
  // don't show the day of the week
  shortForm?: boolean
  // control if the calendar name should be shown
  calendarName: 'auto' | 'never' | 'always'
  // control if the week start day should be shown
  weekStartDay: 'auto' | 'never' | 'always'
}

// TODO: add static methods from and compare
export class PlainWeekDate {
  readonly yearOfWeek: number
  readonly weekOfYear: number
  readonly dayOfWeek: number
  readonly calendarId: SupportedCalendars
  readonly scale: Scale
  readonly weekDayStart: HWCWeekDays | ISOWeekDays
  readonly options: ToStringOptions

  readonly MIN_YEAR = -9999
  readonly MAX_YEAR = 9999
  readonly MIN_WEEK = 1
  readonly MAX_ISO_WEEK = 53
  readonly MAX_HWC_WEEK = 51
  readonly MIN_DAY = 1
  readonly MAX_DAY = 7

  constructor(yearOfWeek: number, weekOfYear: number, dayOfWeek: number, calendar: SupportedCalendars = 'iso8601', weekDayStart?: HWCWeekDays | ISOWeekDays, options?: ToStringOptions) {
    this.yearOfWeek = yearOfWeek
    this.weekOfYear = weekOfYear
    this.dayOfWeek = dayOfWeek
    this.scale = getScaleFromCalendarId(calendar)
    this.options = Object.assign({
      shortForm: false,
      calendarName: 'auto',
      weekStartDay: 'auto',
    }, options)

    if (yearOfWeek < this.MIN_YEAR || yearOfWeek > this.MAX_YEAR)
      throw new RangeError(`Invalid year of week: ${yearOfWeek} value must be >= ${this.MIN_YEAR} and <= ${this.MAX_YEAR}`)

    if (this.scale === 'Gregorian') {
      if (weekOfYear < this.MIN_WEEK || weekOfYear > this.MAX_ISO_WEEK)
        throw new RangeError(`Invalid week of year: ${weekOfYear} value must be >= ${this.MIN_WEEK} and <= ${this.MAX_ISO_WEEK}`)
    }
    else {
      if (weekOfYear < this.MIN_WEEK || weekOfYear > this.MAX_HWC_WEEK)
        throw new RangeError(`Invalid week of year: ${weekOfYear} value must be >= ${this.MIN_WEEK} and <= ${this.MAX_HWC_WEEK}`)
    }

    // console.log('dayOfWeek', dayOfWeek)
    if (dayOfWeek < this.MIN_DAY || dayOfWeek > this.MAX_DAY)
      throw new RangeError(`Invalid day of week: ${dayOfWeek} value must be >= ${this.MIN_DAY} and <= ${this.MAX_DAY}`)

    if (calendar) {
      if (this.scale === 'Gregorian' && !['iso8601', 'gregorian', 'iso-extended'].includes(calendar))
        throw new Error('Invalid calendar for Gregorian scale')

      this.calendarId = calendar
    }
    else {
      if (this.scale === 'Hijri')
        this.calendarId = 'islamic-umalqura'
      else
        this.calendarId = 'iso8601'
    }
    if (weekDayStart) {
      this.weekDayStart = weekDayStart
    }
    else {
      if (this.scale === 'Hijri')
        this.weekDayStart = HWCWeekDays.Saturday
      else
        this.weekDayStart = ISOWeekDays.Monday
    }
  }

  // string format: "yyyy-Www-d"
  toString(options?: ToStringOptions) {
    const optionsToUse = options ? Object.assign({}, this.options, options) : this.options // Fix: Assign merged options to a new object
    const showWeekDay = optionsToUse.weekStartDay === 'always' || (optionsToUse.weekStartDay === 'auto' && this.weekDayStart !== 1)
    const showCalendar = optionsToUse.calendarName === 'always' || (optionsToUse.calendarName === 'auto' && this.calendarId !== 'iso8601')
    if (optionsToUse.shortForm)
      return `${this.yearOfWeek}-W${(`${this.weekOfYear}`).padStart(2, '0')}${showWeekDay ? `[${getWeekDayCodeName(this.weekDayStart, getScaleFromCalendarId(this.calendarId))}]` : ''}${showCalendar ? `[u-ca=${this.calendarId}]` : ''}`
    else
      return `${this.yearOfWeek}-W${(`${this.weekOfYear}`).padStart(2, '0')}-${this.dayOfWeek}${showWeekDay ? `[${getWeekDayCodeName(this.weekDayStart, getScaleFromCalendarId(this.calendarId))}]` : ''}${showCalendar ? `[u-ca=${this.calendarId}]` : ''}`
  }

  // string format: "yyyyWwwd"
  toStringCompact(options?: ToStringOptions) {
    const optionsToUse = options ? Object.assign({}, this.options, options) : this.options
    const showWeekDay = optionsToUse.weekStartDay === 'always' || (optionsToUse.weekStartDay === 'auto' && this.dayOfWeek !== 1)
    const showCalendar = optionsToUse.calendarName === 'always' || (optionsToUse.calendarName === 'auto' && this.calendarId !== 'iso8601')
    if (optionsToUse.shortForm)
      return `${this.yearOfWeek}W${(`${this.weekOfYear}`).padStart(2, '0')}${showCalendar ? `[u-ca=${this.calendarId}]` : ''}${showWeekDay ? `[${getWeekDayCodeName(this.weekDayStart, getScaleFromCalendarId(this.calendarId))}]` : ''}`
    else
      return `${this.yearOfWeek}W${(`${this.weekOfYear}`).padStart(2, '0')}${this.dayOfWeek}${showCalendar ? `[u-ca=${this.calendarId}]` : ''}${showWeekDay ? `[${getWeekDayCodeName(this.weekDayStart, getScaleFromCalendarId(this.calendarId))}]` : ''}`
  }

  // calendar is ignored in the relativeTo parameter
  toTemporalInstant(weekDayStart: HWCWeekDays | ISOWeekDays = this.weekDayStart, relativeTo?: Temporal.PlainDateTime | Temporal.ZonedDateTime): Temporal.Instant {
    if (this.scale === 'Gregorian') {
      return temporalInstantFromISOWeek(this.yearOfWeek, this.weekOfYear, this.dayOfWeek, weekDayStart, relativeTo)
    }
    else {
      // check how to convert to HWC
      // TODO: replace this to support custom weekDayStart
      const dateInfo = fromHWCDate([this.yearOfWeek, this.weekOfYear, this.dayOfWeek], getCalendarSuperId(this.calendarId) as SupportedHijriCalendars)
      if (relativeTo) {
        if (relativeTo instanceof Temporal.ZonedDateTime) {
          return Temporal.ZonedDateTime.from({
            year: dateInfo[0],
            month: dateInfo[1],
            day: dateInfo[2],
            calendar: getCalendarFormId(this.calendarId),
            hour: relativeTo.hour,
            minute: relativeTo.minute,
            second: relativeTo.second,
            timeZone: relativeTo.timeZoneId,
          }).toInstant()
        }
        else {
          return Temporal.ZonedDateTime.from({
            year: dateInfo[0],
            month: dateInfo[1],
            day: dateInfo[2],
            calendar: getCalendarFormId(this.calendarId),
            hour: relativeTo.hour,
            minute: relativeTo.minute,
            second: relativeTo.second,
            timeZone: 'UTC',
          }).toInstant()
        }
      }
      else {
        return Temporal.ZonedDateTime.from({
          year: dateInfo[0],
          month: dateInfo[1],
          day: dateInfo[2],
          calendar: getCalendarFormId(this.calendarId),
          hour: 0,
          minute: 0,
          second: 0,
          timeZone: 'UTC',
        }).toInstant()
      }
    }
  }

  toPlainDate(): Temporal.PlainDate {
    const calendar = getCalendarFormId(this.calendarId, this.weekDayStart)
    return instantToOtherTemporal(this.toTemporalInstant(), new Temporal.PlainDate(this.yearOfWeek, 1, 1, calendar))
  }

  toPlainDateTime(): Temporal.PlainDateTime {
    const calendar = getCalendarFormId(this.calendarId, this.weekDayStart)
    return instantToOtherTemporal(this.toTemporalInstant(), new Temporal.PlainDateTime(this.yearOfWeek, 1, 1, 0, 0, 0, 0, 0, 0, calendar))
  }

  toZonedDateTime(timeZone: Temporal.TimeZoneLike = 'UTC'): Temporal.ZonedDateTime {
    const calendar = getCalendarFormId(this.calendarId, this.weekDayStart)
    return this.toTemporalInstant(this.weekDayStart).toZonedDateTime({
      calendar,
      timeZone: 'UTC',
    }).withTimeZone(timeZone)
  }

  sameScale(other: PlainWeekDate | Scale): boolean {
    if (other instanceof PlainWeekDate)
      return this.scale === other.scale
    else
      return this.scale === other
  }

  withCalendar(calendarId: SupportedCalendars, weekDayStart?: HWCWeekDays | ISOWeekDays): PlainWeekDate {
    const newStart = weekDayStart || this.weekDayStart
    const calendar = getCalendarFormId(calendarId, newStart)
    const newDate = this.toPlainDate().withCalendar(calendar)
    const newScale = getScaleFromCalendarId(calendarId)
    if (newScale === 'Gregorian') {
      return temporalToISOPlainDateWeek(newDate, newStart)
    }
    else {
      // TODO: replace this to support custom weekDayStart
      const [yow, woy, dow] = toHWCDate(newDate.year, newDate.month, newDate.day, getCalendarSuperId(calendarId) as SupportedHijriCalendars)
      return new PlainWeekDate(yow, woy, dow, calendarId, newStart)
    }
  }

  withWeekDayStart(weekDayStart: HWCWeekDays | ISOWeekDays): PlainWeekDate {
    // TODO: replace this to support custom weekDayStart
    return new PlainWeekDate(this.yearOfWeek, this.weekOfYear, this.dayOfWeek, this.calendarId, weekDayStart)
  }
  // add with function

  // add a from
  // from should support strings, different Temporal objects and plain object with the right properties
  // from should inherit weekDayStart from a Temporal objects that use extended calendars
  // from should also accept a PlainWeekDay object and return a new object with the same properties
  static from(from: string | Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime | PlainWeekDate, calendar: SupportedCalendars = 'iso8601', weekDayStart: HWCWeekDays | ISOWeekDays = 1): PlainWeekDate {
    if (typeof from === 'string') {
      // TODO: extract weekDayStart and calendar from the string
      const [yow, woy, dow, wkst, cal] = weekDatePartsFromString(from, getScaleFromCalendarId(calendar))
      return new PlainWeekDate(yow, woy, dow, calendar ?? cal, weekDayStart ?? wkst)
    }
    else if (from instanceof PlainWeekDate) {
      // if we have a calendar and weekStart we should use them to convert the PlainWeekDate to a new instance
      return new PlainWeekDate(from.yearOfWeek, from.weekOfYear, from.dayOfWeek, calendar, weekDayStart)
    }
    else {
      // if we have a calendar and weekStart we should use them to convert the date before returning a new instance
      const calendarId = getCalendarSuperId(from.calendarId as SupportedHijriCalendars)
      const [yow, woy, dow] = toHWCDate(from.year, from.month, from.day, calendarId as SupportedHijriCalendars)
      return new PlainWeekDate(yow, woy, dow, from.calendarId as SupportedHijriCalendars, weekDayStart)
    }
  }

  static sameScale(one: PlainWeekDate, other: PlainWeekDate | Scale): boolean {
    if (other instanceof PlainWeekDate)
      return one.scale === other.scale
    else
      return one.scale === other
  }
}
