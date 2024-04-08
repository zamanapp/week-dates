<script setup>
import PropertiesDefinition from "../components/PropertiesDefinitions.vue"
</script>

# ISO Extended Calendar

| <div class="w-[120px]">Id</div> | Extends | Description |
|----|---------|-------------|
| `iso-extended` | `iso8601` | Add Extended week date capabilities with support for custom week day start for `iso-8601` calendar. |

This calendar extends the `iso8601` calendar with additional week date capabilities. It also allows customizing the week day start.

## Constructor

<PropertiesDefinition property="new ISOExtended(weekStartDay: ISOWeekDays = ISOWeekDays.Monday)" />

Use the `ISOExtended` constructor to create a new instance of the `iso-extended` calendar. The `weekStartDay` parameter is optional and defaults to `ISOWeekDays.Monday`.

Example usage

```ts twoslash
import { ISOExtended, ISOWeekDays } from "week-dates";
import { Temporal } from "@js-temporal/polyfill";

const customCalendar = new ISOExtended()
const customCalendarWithStart = new ISOExtended(ISOWeekDays.Saturday)

const weekDate = Temporal.PlainDate.from({ year: 2021, month: 2, day: 3, calendar: customCalendar })
const weekDateWithCustomStart = Temporal.PlainDate.from({ year: 2021, month: 2, day: 3, calendar: customCalendarWithStart })
```

## Custom Properties

### `weekStartDay`

<PropertiesDefinition property="weekStartDay: ISOWeekDays" />

The `weekStartDay` property is the day of the week that the week starts on. It is an instance of the `ISOWeekDays` enum.

By default, the week starts on `ISOWeekDays.Monday` which is `1`.

Example usage

```ts twoslash
// @filename: index.d.ts
/// <reference types="@js-temporal/polyfill" />

import { Temporal } from '@js-temporal/polyfill'

declare module '@js-temporal/polyfill' {
  namespace Temporal {
    interface PlainDate {
      readonly weekStartDay: number
    }
  }
}
// @filename: example.ts
//---cut---
import { ISOExtended, ISOWeekDays } from "week-dates";
import { Temporal } from "@js-temporal/polyfill";

const customCalendar = new ISOExtended()
const customCalendarWithStart = new ISOExtended(ISOWeekDays.Saturday)

const weekDate = Temporal.PlainDate.from({ year: 2021, month: 2, day: 3, calendar: customCalendar })
const weekDateWithCustomStart = Temporal.PlainDate.from({ year: 2021, month: 2, day: 3, calendar: customCalendarWithStart })

console.log(customCalendar.weekStartDay) // 1
console.log(customCalendarWithStart.weekStartDay) // 6
console.log(weekDate.weekStartDay) // 1
console.log(weekDateWithCustomStart.weekStartDay) // 6
```

### `weeksInYear`

<PropertiesDefinition property="weeksInYear: number" />

The `weeksInYear` property is the number of weeks in the year. It is a read-only property.

In Gregorian calendar long years have 53 weeks, and short years have 52 weeks.

Example usage

```ts twoslash
// @filename: index.d.ts
/// <reference types="@js-temporal/polyfill" />

import { Temporal } from '@js-temporal/polyfill'

declare module '@js-temporal/polyfill' {
  namespace Temporal {
    interface PlainDate {
      readonly weeksInYear: number
    }
  }
}
// @filename: example.ts
//---cut---
import { ISOExtended, ISOWeekDays } from "week-dates";
import { Temporal } from "@js-temporal/polyfill";

const customCalendar = new ISOExtended()
const customCalendarWithStart = new ISOExtended(ISOWeekDays.Tuesday)

const weekDate = Temporal.PlainDate.from({ year: 2021, month: 2, day: 3, calendar: customCalendar })
const weekDateWithCustomStart = Temporal.PlainDate.from({ year: 2021, month: 2, day: 3, calendar: customCalendarWithStart })

console.log(customCalendar.weeksInYear(weekDate)) // 52
console.log(customCalendarWithStart.weeksInYear(weekDate)) // 53
console.log(weekDate.weeksInYear) // 52
console.log(weekDateWithCustomStart.weeksInYear) // 53
```

### `weekDate`

<PropertiesDefinition property="weekDate: PlainWeekDate" />

The `weekDate` property is an instance of the [`PlainWeekDate`](../classes/plain-week-date.md) class that represents the week date of the Temporal object.

Example usage

```ts twoslash
// @filename: index.d.ts
/// <reference types="@js-temporal/polyfill" />

import { Temporal } from '@js-temporal/polyfill'


declare module '@js-temporal/polyfill' {
  namespace Temporal {
    interface PlainDate {
      readonly weekDate: PlainWeekDate
    }
  }
}
// @filename: example.ts
//---cut---
import { ISOExtended, ISOWeekDays } from "week-dates";
import { Temporal } from "@js-temporal/polyfill";

const customCalendar = new ISOExtended()
const customCalendarWithStart = new ISOExtended(ISOWeekDays.Tuesday)

const weekDate = Temporal.PlainDate.from({ year: 2021, month: 2, day: 3, calendar: customCalendar })
const weekDateWithCustomStart = Temporal.PlainDate.from({ year: 2021, month: 2, day: 3, calendar: customCalendarWithStart })

console.log(weekDate.weekDate.toString()) // 2021-W05-3
console.log(weekDateWithCustomStart.weekDate.toString()) // 2021-W06-2[TU]
```

## Overridden Properties

Because the `ISOExtended` calendar supports custom week start day, it overrides some week date properties in the `iso8601` calendar.

### `yearOfWeek`

<PropertiesDefinition property="yearOfWeek: number" />

The `yearOfWeek` property is the year of the week. It is a read-only property.

The year of the week is the year that the week belongs to. It is different from the calendar year in some cases. A week is considered to belong to the year that contains the majority of its days.

Example usage

```ts twoslash
// @filename: index.d.ts
/// <reference types="@js-temporal/polyfill" />

import { Temporal } from '@js-temporal/polyfill'

declare module '@js-temporal/polyfill' {
  namespace Temporal {
    interface PlainDate {
      readonly yearOfWeek: number
    }
  }
}
// @filename: example.ts
//---cut---
import { ISOExtended, ISOWeekDays } from "week-dates";
import { Temporal } from "@js-temporal/polyfill";

const customCalendar = new ISOExtended()
const customCalendarWithStart = new ISOExtended(ISOWeekDays.Friday)

const weekDate = Temporal.PlainDate.from({ year: 2021, month: 12, day: 31, calendar: customCalendar })
const weekDateWithCustomStart = Temporal.PlainDate.from({ year: 2021, month: 12, day: 31, calendar: customCalendarWithStart })

console.log(weekDate.yearOfWeek) // 2021
console.log(weekDateWithCustomStart.yearOfWeek) // 2022
```

### `weekOfYear`

<PropertiesDefinition property="weekOfYear: number" />

The `weekOfYear` property is the week number of the year. It is a read-only property.

Example usage

```ts twoslash
// @filename: index.d.ts
/// <reference types="@js-temporal/polyfill" />

import { Temporal } from '@js-temporal/polyfill'

declare module '@js-temporal/polyfill' {
  namespace Temporal {
    interface PlainDate {
      readonly weekOfYear: number
    }
  }
}
// @filename: example.ts
//---cut---
import { ISOExtended, ISOWeekDays } from "week-dates";
import { Temporal } from "@js-temporal/polyfill";

const customCalendar = new ISOExtended()
const customCalendarWithStart = new ISOExtended(ISOWeekDays.Tuesday)

const weekDate = Temporal.PlainDate.from({ year: 2021, month: 2, day: 3, calendar: customCalendar })
const weekDateWithCustomStart = Temporal.PlainDate.from({ year: 2021, month: 2, day: 3, calendar: customCalendarWithStart })

console.log(weekDate.weekOfYear) // 5
console.log(weekDateWithCustomStart.weekOfYear) // 6
```

### `dayOfWeek`

<PropertiesDefinition property="dayOfWeek: number" />

The `dayOfWeek` property is the day of the week. It is a read-only property.

The day of the week is the day of the week that the date belongs to. It is not to be confused with the month day.

The day of the week is represented by a number from `1` to `7` where `1` is `Monday` and `7` is `Sunday` by default.

Using a custom week start day will change the day of the week representation.

Example usage

```ts twoslash
// @filename: index.d.ts
/// <reference types="@js-temporal/polyfill" />

import { Temporal } from '@js-temporal/polyfill'

declare module '@js-temporal/polyfill' {
  namespace Temporal {
    interface PlainDate {
      readonly dayOfWeek: number
    }
  }
}
// @filename: example.ts
//---cut---
import { ISOExtended, ISOWeekDays } from "week-dates";
import { Temporal } from "@js-temporal/polyfill";

const customCalendar = new ISOExtended()
const customCalendarWithStart = new ISOExtended(ISOWeekDays.Friday)

const weekDate = Temporal.PlainDate.from({ year: 2021, month: 12, day: 31, calendar: customCalendar })
const weekDateWithCustomStart = Temporal.PlainDate.from({ year: 2021, month: 12, day: 31, calendar: customCalendarWithStart })

// the day of the week for 2021-12-31 is a Friday
console.log(weekDate.dayOfWeek) // 5 in a week that starts on Monday
console.log(weekDateWithCustomStart.dayOfWeek) // 1 in a week that starts on Friday
```

# Caveats

Because of How the internals of Temporal work, the `ISOExtended` calendar will not have the method `toLocaleString` working as expected. This is because the `toLocaleString` method expects only native Temporal calendars to be used with it.

A workaround this is to convert the date first before calling `toLocaleString` method.

```ts twoslash
import { ISOExtended, ISOWeekDays } from "week-dates";
import { Temporal } from "@js-temporal/polyfill";

const customCalendar = new ISOExtended()
const weekDate = Temporal.PlainDate.from({ year: 2021, month: 2, day: 3, calendar: customCalendar })

console.log(weekDate.toLocaleString()) // this will throw an error
console.log(weekDate.withCalendar('iso8601').toLocaleString()) // this will work
```