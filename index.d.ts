/// <reference types="@js-temporal/polyfill" />

import { Temporal } from '@js-temporal/polyfill'

declare module '@js-temporal/polyfill' {
  namespace Temporal {
    interface PlainDate {
      readonly weekStartDay: number
      readonly weeksInYear: number
      readonly weekDate: PlainWeekDate
    }
    interface PlainDateTime {
      readonly weekStartDay: number
      readonly weeksInYear: number
      readonly weekDate: PlainWeekDate
    }
    interface ZonedDateTime {
      readonly weekStartDay: number
      readonly weeksInYear: number
      readonly weekDate: PlainWeekDate
    }
  }
}
