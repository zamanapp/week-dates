# Introduction

::: warning
As discussed in [tc39/proposal-temporal#2854](https://github.com/tc39/proposal-temporal/issues/2854) custom calendars support will be removed from Temporal, and this library will be updated accordingly. you can still use the [primitives](../primitives/introduction.md) to achieve the same functionality.
:::

On top of [`PlainWeekDate`](../classes/plain-week-date.md) class, `week-date` library offers custom calendar classes to enhance native Temporal Objects with week date capabilities beyond what the Temporal API offers.

The library provides the following calendar classes:

| Class | Description |
| --- | --- |
| `ISOExtended` | Add extended week date capabilities with support for custom week day start for `iso-8601` calendar |
| `HWCUmalqura` | Hijri week calendar with support for custom week day start for `islamic-umalqura` calendar |
| `HWCCivil` | Hijri week calendar with support for custom week day start for `islamic-civil` calendar |
| `HWCTbla` | Hijri week calendar with support for custom week day start for `islamic-tbla` calendar |

All these custom calendars can be used with `Temporal.PlainDate`, `Temporal.PlainDateTime` and `Temporal.ZonedDateTime` objects.

## Typescript

To have enhanced type checking and intellisense, you can declare the type of the custom properties that these calendar enhance Temporal objects with in your `index.d.ts`.

::: code-group

```ts [index.d.ts]
/// <reference types="@js-temporal/polyfill" />

import { Temporal } from '@js-temporal/polyfill'
import { PlainWeekDate } from '@zamanapp/week-dates'

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
```
:::