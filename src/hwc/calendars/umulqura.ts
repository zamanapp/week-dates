import { Temporal } from '@js-temporal/polyfill'
import { HWCWeekDays } from '../../common/weekDays'
import { PlainWeekDate } from '../../plainWeekDate'
import type { SupportedNativeHijriCalendars } from '../../common/calendars'
import { temporalToHWCPlainDateWeek, weeksInHijriYear } from '../premitives'

export class HWCUmalquraExtended extends Temporal.Calendar {
  readonly id = 'hwc-islamic-umalqura'
  readonly superId: SupportedNativeHijriCalendars
  readonly weekDayStart: HWCWeekDays // Default to Saturday

  constructor(weekDayStart: HWCWeekDays = HWCWeekDays.Saturday) {
    super('islamic-umalqura')
    this.superId = 'islamic-umalqura'
    this.weekDayStart = weekDayStart
  }

  toJSON(): string {
    return this.id
  }

  toString(): string {
    return this.id
  }

  // HWC accessors

  // All these accessors need to be updated to use the weekStartDay
  // When converting to ISO use different weekStartDay

  // this will return the day of the week in the HWC representation
  dayOfWeek(date: string | Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainDateLike): number {
    const Hdate = Temporal.PlainDate.from(date).withCalendar(this.superId)
    return temporalToHWCPlainDateWeek(Hdate, this.weekDayStart).dayOfWeek
  }

  yearOfWeek(date: string | Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainDateLike): number {
    const Hdate = Temporal.PlainDate.from(date).withCalendar(this.superId)
    return temporalToHWCPlainDateWeek(Hdate, this.weekDayStart).yearOfWeek
  }

  weekOfYear(date: string | Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainDateLike): number {
    const Hdate = Temporal.PlainDate.from(date).withCalendar(this.superId)
    return temporalToHWCPlainDateWeek(Hdate, this.weekDayStart).weekOfYear
  }

  weeksInYear(date: string | Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainDateLike): number {
    const Hdate = Temporal.PlainDate.from(date)
    return weeksInHijriYear(Hdate.year, this.superId, this.weekDayStart)
  }

  toPlainWeekDate(date: string | Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainDateLike): PlainWeekDate {
    return PlainWeekDate.from(Temporal.PlainDate.from(date), {
      calendar: this.id as 'hwc-islamic-umalqura',
      weekDayStart: this.weekDayStart,
    })
  }

  // this is deprecated in favor of using withCalendar in PlainWeekDate
  // toISOWeek(start: ISOWeekDays = ISOWeekDays.Monday) {
  //   // use the weekDayStart
  // }

  // overriding base calendar logic to use this calendar
  dateFromFields(fields: Temporal.YearOrEraAndEraYear & Temporal.MonthOrMonthCode & { day: number }, options?: Temporal.AssignmentOptions | undefined): Temporal.PlainDate {
    const native = Temporal.PlainDate.from({ ...fields, calendar: 'islamic-umalqura' }, options)
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
