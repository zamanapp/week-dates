import { Temporal } from '@js-temporal/polyfill'
import { temporalInstantFromISOWeek, temporalToISOPlainDateWeek } from './iso/primitives'
import { HWCWeekDays, ISOWeekDays, getWeekDayCodeName } from './common/weekDays'
import type { Scale, SupportedCalendars, SupportedHijriCalendars } from './common/calendars'
import { getCalendarFormId, getCalendarSuperId, getScaleFromCalendarId } from './common/calendars'
import { instantToOtherTemporal, weekDatePartsFromString } from './common/utils'
import { temporalInstantFromHWCDate, temporalToHWCPlainDateWeek } from './hwc/primitives'

export interface ToStringOptions {
  // don't show the day of the week
  shortForm?: boolean
  // control if the calendar name should be shown
  calendarName?: 'auto' | 'never' | 'always'
  // control if the week start day should be shown
  weekStartDay?: 'auto' | 'never' | 'always'
}

export interface Reference {
  referenceTime?: Temporal.PlainDateTime | Temporal.ZonedDateTime | Temporal.PlainTime
  referenceTimezone?: Temporal.TimeZoneLike
}

export interface PlainWeekDateReference {
  calendar?: SupportedCalendars
  weekStartDay?: HWCWeekDays | ISOWeekDays
}

export interface PlainWeekDateLike {
  yearOfWeek: number
  weekOfYear: number
  dayOfWeek?: number
  calendarId?: SupportedCalendars
  weekStartDay?: HWCWeekDays | ISOWeekDays
  options?: ToStringOptions
}

export interface PlainWeekDateFields {
  yearOfWeek: number
  weekOfYear: number
  dayOfWeek: number
  calendarId: SupportedCalendars
  weekStartDay: HWCWeekDays | ISOWeekDays
}

export class PlainWeekDate {
  readonly yearOfWeek: number
  readonly weekOfYear: number
  readonly dayOfWeek: number
  readonly calendarId: SupportedCalendars
  readonly scale: Scale
  readonly weekStartDay: HWCWeekDays | ISOWeekDays
  readonly options: ToStringOptions

  readonly MIN_YEAR = -9999
  readonly MAX_YEAR = 9999
  readonly MIN_WEEK = 1
  readonly MAX_ISO_WEEK = 53
  readonly MAX_HWC_WEEK = 51
  readonly MIN_DAY = 1
  readonly MAX_DAY = 7

  constructor(yearOfWeek: number, weekOfYear: number, dayOfWeek: number, calendar: SupportedCalendars = 'iso8601', weekStartDay?: HWCWeekDays | ISOWeekDays, options?: ToStringOptions) {
    this.yearOfWeek = yearOfWeek
    this.weekOfYear = weekOfYear
    this.dayOfWeek = dayOfWeek
    this.scale = getScaleFromCalendarId(calendar)
    this.calendarId = calendar
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

    // checking for week start day
    if (weekStartDay) {
      if (weekStartDay < 1 || weekStartDay > 7)
        throw new RangeError(`Invalid week start day: ${weekStartDay} value must be >= 1 and <= 7`)
      this.weekStartDay = weekStartDay
    }
    else {
      if (this.scale === 'Hijri')
        this.weekStartDay = HWCWeekDays.Saturday
      else
        this.weekStartDay = ISOWeekDays.Monday
    }
  }

  weekDateFields(): PlainWeekDateFields {
    return {
      yearOfWeek: this.yearOfWeek,
      weekOfYear: this.weekOfYear,
      dayOfWeek: this.dayOfWeek,
      calendarId: this.calendarId,
      weekStartDay: this.weekStartDay,
    }
  }

  // TODO: document that the calendar part will always display the super id not the actual calendar id
  // string format: "yyyy-Www-d"
  toString(options?: ToStringOptions) {
    const optionsToUse = options ? Object.assign({}, this.options, options) : this.options
    const showWeekDay = optionsToUse.weekStartDay === 'always' || (optionsToUse.weekStartDay === 'auto' && this.weekStartDay !== 1)
    const showCalendar = optionsToUse.calendarName === 'always' || (optionsToUse.calendarName === 'auto' && this.calendarId !== 'iso8601')

    if (optionsToUse.shortForm)
      return `${this.yearOfWeek}-W${(`${this.weekOfYear}`).padStart(2, '0')}${showCalendar ? `[u-ca=${getCalendarSuperId(this.calendarId)}]` : ''}${showWeekDay ? `[${getWeekDayCodeName(this.weekStartDay, getScaleFromCalendarId(this.calendarId))}]` : ''}`
    else
      return `${this.yearOfWeek}-W${(`${this.weekOfYear}`).padStart(2, '0')}-${this.dayOfWeek}${showCalendar ? `[u-ca=${getCalendarSuperId(this.calendarId)}]` : ''}${showWeekDay ? `[${getWeekDayCodeName(this.weekStartDay, getScaleFromCalendarId(this.calendarId))}]` : ''}`
  }

  // string format: "yyyyWwwd"
  toStringCompact(options?: ToStringOptions) {
    const optionsToUse = options ? Object.assign({}, this.options, options) : this.options
    const showWeekDay = optionsToUse.weekStartDay === 'always' || (optionsToUse.weekStartDay === 'auto' && this.weekStartDay !== 1)
    const showCalendar = optionsToUse.calendarName === 'always' || (optionsToUse.calendarName === 'auto' && this.calendarId !== 'iso8601')
    if (optionsToUse.shortForm)
      return `${this.yearOfWeek}W${(`${this.weekOfYear}`).padStart(2, '0')}${showCalendar ? `[u-ca=${getCalendarSuperId(this.calendarId)}]` : ''}${showWeekDay ? `[${getWeekDayCodeName(this.weekStartDay, getScaleFromCalendarId(this.calendarId))}]` : ''}`
    else
      return `${this.yearOfWeek}W${(`${this.weekOfYear}`).padStart(2, '0')}${this.dayOfWeek}${showCalendar ? `[u-ca=${getCalendarSuperId(this.calendarId)}]` : ''}${showWeekDay ? `[${getWeekDayCodeName(this.weekStartDay, getScaleFromCalendarId(this.calendarId))}]` : ''}`
  }

  // calendar is ignored in the relativeTo parameter
  toInstant(weekStartDay: HWCWeekDays | ISOWeekDays = this.weekStartDay, reference?: Reference): Temporal.Instant {
    if (this.scale === 'Gregorian')
      return temporalInstantFromISOWeek(this.yearOfWeek, this.weekOfYear, this.dayOfWeek, weekStartDay as ISOWeekDays, reference)
    else
      return temporalInstantFromHWCDate(this.yearOfWeek, this.weekOfYear, this.dayOfWeek, getCalendarSuperId(this.calendarId) as SupportedHijriCalendars, weekStartDay as HWCWeekDays, reference)
  }

  toPlainDate(): Temporal.PlainDate {
    const calendar = getCalendarFormId(this.calendarId, this.weekStartDay)
    return instantToOtherTemporal(this.toInstant(), new Temporal.PlainDate(this.yearOfWeek, 1, 1, calendar))
  }

  toPlainDateTime(): Temporal.PlainDateTime {
    const calendar = getCalendarFormId(this.calendarId, this.weekStartDay)
    return instantToOtherTemporal(this.toInstant(), new Temporal.PlainDateTime(this.yearOfWeek, 1, 1, 0, 0, 0, 0, 0, 0, calendar))
  }

  toZonedDateTime(timeZone: Temporal.TimeZoneLike = 'UTC'): Temporal.ZonedDateTime {
    const calendar = getCalendarFormId(this.calendarId, this.weekStartDay)
    return this.toInstant(this.weekStartDay).toZonedDateTime({
      calendar,
      timeZone: 'UTC',
    }).withTimeZone(timeZone)
  }

  withCalendar(calendarId: SupportedCalendars, weekStartDay?: HWCWeekDays | ISOWeekDays): PlainWeekDate {
    if (this.calendarId === calendarId && this.weekStartDay === (weekStartDay || this.weekStartDay))
      return this
    const newStart = weekStartDay || this.weekStartDay
    const calendar = getCalendarFormId(calendarId, newStart)
    const newDate = this.toPlainDate().withCalendar(calendar)
    const newScale = getScaleFromCalendarId(calendarId)
    if (newScale === 'Gregorian')
      return temporalToISOPlainDateWeek(newDate, newStart as ISOWeekDays)

    else
      return temporalToHWCPlainDateWeek(newDate, newStart as HWCWeekDays)
  }

  withWeekStartDay(weekStartDay: HWCWeekDays | ISOWeekDays): PlainWeekDate {
    // convert the date to the new week start day
    if (this.weekStartDay === weekStartDay)
      return this
    const date = this.toPlainDate()
    let newWeekDate
    if (this.scale === 'Gregorian')
      newWeekDate = temporalToISOPlainDateWeek(date, weekStartDay as ISOWeekDays)
    else
      newWeekDate = temporalToHWCPlainDateWeek(date, weekStartDay as HWCWeekDays)

    return new PlainWeekDate(newWeekDate.yearOfWeek, newWeekDate.weekOfYear, newWeekDate.dayOfWeek, this.calendarId, weekStartDay)
  }
  // add with function

  // should support strings
  // should support different Temporal objects
  // should support plain object with the right properties
  // from should also accept a PlainWeekDay object and return a new object with the same properties
  // from should inherit weekStartDay from a Temporal objects that use extended calendars
  static from(from: string | Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime | PlainWeekDate | PlainWeekDateLike, reference?: PlainWeekDateReference): PlainWeekDate {
    if (typeof from === 'string') {
      const [yow, woy, dow, cal, wkst] = weekDatePartsFromString(from)
      return new PlainWeekDate(yow, woy, dow, cal, wkst).withCalendar(reference?.calendar ?? cal, reference?.weekStartDay ?? wkst)
    }
    else if (from instanceof PlainWeekDate) {
      // if we have a calendar and weekStart we should use them to convert the PlainWeekDate to a new instance
      return new PlainWeekDate(from.yearOfWeek, from.weekOfYear, from.dayOfWeek, from.calendarId, from.weekStartDay, from.options).withCalendar(reference?.calendar ?? from.calendarId, reference?.weekStartDay ?? from.weekStartDay)
    }
    else if (from instanceof Temporal.PlainDate || from instanceof Temporal.PlainDateTime || from instanceof Temporal.ZonedDateTime) {
      const cal = getCalendarFormId(from.calendarId as SupportedHijriCalendars)
      let scale = getScaleFromCalendarId(from.calendarId as SupportedHijriCalendars)
      // collect the weekStartDay from passed Temporal objects if they use extended calendars
      const wkst = reference?.weekStartDay ?? from.weekStartDay ?? 1
      // if we have a calendar and weekStart we should use them to convert the date before returning a new instance
      if (reference?.calendar && reference.calendar !== cal) {
        const refCal = getCalendarSuperId(reference.calendar)
        from = from.withCalendar(refCal)
        scale = getScaleFromCalendarId(reference.calendar)
      }
      if (scale === 'Gregorian')
        return temporalToISOPlainDateWeek(from, wkst)
      else
        return temporalToHWCPlainDateWeek(from, wkst)
    }
    else {
      // initialize a new PlainWeekDate object from the plain object
      const cal = from.calendarId ?? 'iso8601'
      const wkst = from.weekStartDay ?? 1
      return new PlainWeekDate(from.yearOfWeek, from.weekOfYear, from.dayOfWeek ?? 1, cal, wkst, from.options).withCalendar(reference?.calendar ?? cal, reference?.weekStartDay ?? wkst)
    }
  }

  sameScale(other: PlainWeekDate | Scale): boolean {
    if (other instanceof PlainWeekDate)
      return this.scale === other.scale
    else
      return this.scale === other
  }

  static sameScale(one: PlainWeekDate, other: PlainWeekDate | Scale): boolean {
    if (other instanceof PlainWeekDate)
      return one.scale === other.scale
    else
      return one.scale === other
  }

  compare(other: string | PlainWeekDate | PlainWeekDateLike): Temporal.ComparisonResult {
    const instantOther = PlainWeekDate.from(other)
    return Temporal.Instant.compare(this.toInstant(), instantOther.toInstant())
  }

  static compare(one: string | PlainWeekDate | PlainWeekDateLike, two: string | PlainWeekDate | PlainWeekDateLike): Temporal.ComparisonResult {
    const instantOne = PlainWeekDate.from(one)
    const instantTwo = PlainWeekDate.from(two)
    return Temporal.Instant.compare(instantOne.toInstant(), instantTwo.toInstant())
  }
}
