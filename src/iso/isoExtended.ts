import { Temporal } from '@js-temporal/polyfill'
import { ISOWeekDays } from '../common/weekDays'
import { PlainWeekDate } from '../plainWeekDate'
import { temporalToISOPlainDateWeek, weeksInISOYear } from './premetives'

export class ISOExtended extends Temporal.Calendar {
  readonly id: string
  readonly superId: string
  readonly weekDayStart: ISOWeekDays // Default to Monday

  constructor(weekDayStart: ISOWeekDays = ISOWeekDays.Monday) {
    super('iso8601')
    this.id = 'iso-extended'
    this.superId = 'iso8601'
    this.weekDayStart = weekDayStart
  }

  // ISO accessors
  yearOfWeek(date: string | Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainDateLike): number {
    const tDate = Temporal.PlainDate.from(date).withCalendar(this.superId)
    return temporalToISOPlainDateWeek(tDate, this.weekDayStart).yearOfWeek
  }

  weekOfYear(date: string | Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainDateLike): number {
    const tDate = Temporal.PlainDate.from(date).withCalendar(this.superId)
    return temporalToISOPlainDateWeek(tDate, this.weekDayStart).weekOfYear
  }

  dayOfWeek(date: string | Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainDateLike): number {
    const tDate = Temporal.PlainDate.from(date).withCalendar(this.superId)
    return temporalToISOPlainDateWeek(tDate, this.weekDayStart).dayOfWeek
  }

  weeksInYear(date: string | Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainDateLike): number {
    const tDate = Temporal.PlainDate.from(date)
    return weeksInISOYear(tDate.year, this.weekDayStart)
  }

  toPlainWeekDate(date: string | Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainDateLike): PlainWeekDate {
    return PlainWeekDate.from(Temporal.PlainDate.from(date), {
      calendar: this.id as 'iso-extended',
      weekDayStart: this.weekDayStart,
    })
  }

  // overriding base calendar logic to use this calendar
  toJSON(): string {
    return this.id
  }

  toString(): string {
    return this.id
  }

  dateFromFields(fields: Temporal.YearOrEraAndEraYear & Temporal.MonthOrMonthCode & { day: number }, options?: Temporal.AssignmentOptions | undefined): Temporal.PlainDate {
    const native = Temporal.PlainDate.from({ ...fields, calendar: 'iso8601' }, options)
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
