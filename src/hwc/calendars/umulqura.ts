import { Temporal } from '@js-temporal/polyfill'
import { hijriDayOfWeek as _hijriDayOfWeek, fromHWCDate, hwcToCompactString, hwcToString, toHWCDate, totalHWCWeeks, validateHWC } from 'hijri-week-calendar'
import { HWCWeekDays, HWCtoISODay, ISOWeekDays } from '../../common/weekDays'
import { PlainWeekDate } from '../../plainWeekDate'
import type { SupportedNativeHijriCalendars } from '../../common/calendars'

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

  // returns only the representation. to turn this into a temporal object you need to use conversion primitives
  parseHWCString(hwcString: string): PlainWeekDate {
    // TODO: replace this to support custom weekDayStart
    const hwcDate = validateHWC(hwcString, this.superId)
    return new PlainWeekDate(hwcDate[0], hwcDate[1], hwcDate[2], this.id, this.weekDayStart)
  }

  // this will return the day of the week in the HWC representation
  dayOfWeek(date: string | Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainDateLike): number {
    const Hdate = Temporal.PlainDate.from(date).withCalendar(this.superId)
    // TODO: replace this to support custom weekDayStart
    return toHWCDate(Hdate.year, Hdate.month, Hdate.day, this.superId)[2]
  }

  yearOfWeek(date: string | Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainDateLike): number {
    const Hdate = Temporal.PlainDate.from(date).withCalendar(this.superId)
    // TODO: replace this to support custom weekDayStart
    return toHWCDate(Hdate.year, Hdate.month, Hdate.day, this.superId)[0]
  }

  weekOfYear(date: string | Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainDateLike): number {
    const Hdate = Temporal.PlainDate.from(date).withCalendar(this.superId)
    // TODO: replace this to support custom weekDayStart
    return toHWCDate(Hdate.year, Hdate.month, Hdate.day, this.superId)[1]
  }

  weeksInYear(date: string | Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainDateLike): number {
    const Hdate = Temporal.PlainDate.from(date)
    // TODO: replace this to support custom weekDayStart?
    return totalHWCWeeks(Hdate.year, this.superId)
  }

  toPlainWeekDate(date: string | Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainDateLike): PlainWeekDate {
    return new PlainWeekDate(this.yearOfWeek(date), this.weekOfYear(date), this.dayOfWeek(date), this.id, this.weekDayStart)
  }

  HWCString(date: string | Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainDateLike): string {
    return this.toPlainWeekDate(date).toString()
  }

  HWCCompactString(date: string | Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainDateLike): string {
    return this.toPlainWeekDate(date).toStringCompact()
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
