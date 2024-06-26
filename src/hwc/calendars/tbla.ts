import { Temporal } from '@js-temporal/polyfill'
import { HWCWeekDays } from '../../common/weekDays'
import { PlainWeekDate } from '../../plainWeekDate'
import type { SupportedNativeHijriCalendars } from '../../common/calendars'
import { temporalToHWCPlainDateWeek, weeksInHijriYear } from '../primitives'

export class HWCTbla extends Temporal.Calendar {
  readonly id = 'hwc-islamic-tbla'
  readonly superId: SupportedNativeHijriCalendars
  readonly weekStartDay: HWCWeekDays // Default to Saturday

  constructor(weekStartDay: HWCWeekDays = HWCWeekDays.Saturday) {
    super('islamic-tbla')
    this.superId = 'islamic-tbla'
    this.weekStartDay = weekStartDay
  }

  // this will return the day of the week in the HWC representation
  dayOfWeek(date: string | Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainDateLike): number {
    const Hdate = Temporal.PlainDate.from(date).withCalendar(this.superId)
    return temporalToHWCPlainDateWeek(Hdate, this.weekStartDay).dayOfWeek
  }

  yearOfWeek(date: string | Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainDateLike): number {
    const Hdate = Temporal.PlainDate.from(date).withCalendar(this.superId)
    return temporalToHWCPlainDateWeek(Hdate, this.weekStartDay).yearOfWeek
  }

  weekOfYear(date: string | Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainDateLike): number {
    const Hdate = Temporal.PlainDate.from(date).withCalendar(this.superId)
    return temporalToHWCPlainDateWeek(Hdate, this.weekStartDay).weekOfYear
  }

  // custom accessors
  weeksInYear(date: string | Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainDateLike): number {
    const Hdate = Temporal.PlainDate.from(date)
    return weeksInHijriYear(Hdate.year, this.superId, this.weekStartDay)
  }

  weekDate(date: string | Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainDateLike): PlainWeekDate {
    return PlainWeekDate.from(Temporal.PlainDate.from(date), {
      calendar: this.id as 'hwc-islamic-tbla',
      weekStartDay: this.weekStartDay,
    })
  }

  // overriding base calendar logic to use this calenda§
  toJSON(): string {
    return this.id
  }

  toString(): string {
    return this.id
  }

  dateFromFields(fields: Temporal.YearOrEraAndEraYear & Temporal.MonthOrMonthCode & { day: number }, options?: Temporal.AssignmentOptions | undefined): Temporal.PlainDate {
    const native = Temporal.PlainDate.from({ ...fields, calendar: 'islamic-tbla' }, options)
    return native.withCalendar(this)
  }

  yearMonthFromFields(fields: Temporal.YearOrEraAndEraYear & Temporal.MonthOrMonthCode, options?: Temporal.AssignmentOptions): Temporal.PlainYearMonth {
    return Temporal.PlainYearMonth.from({ ...fields, calendar: this }, options)
  }

  monthDayFromFields(fields: Temporal.MonthCodeOrMonthAndYear & { day: number }, options?: Temporal.AssignmentOptions): Temporal.PlainMonthDay {
    return Temporal.PlainMonthDay.from({ ...fields, calendar: this }, options)
  }

  dateAdd(date: Temporal.PlainDate | Temporal.PlainDateLike | string, duration: Temporal.Duration | Temporal.DurationLike | string, options?: Temporal.ArithmeticOptions): Temporal.PlainDate {
    const hDate = Temporal.PlainDate.from(date).withCalendar(this)
    return hDate.add(duration, { ...options })
  }
}
