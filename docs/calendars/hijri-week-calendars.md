<script setup>
import PropertiesDefinition from "../components/PropertiesDefinitions.vue"
</script>

# Hijri Week Calendars

The Hijri week calendar is a counterpart to the ISO 8601 week calendar. For more information on the Hijri week calendar, see the [Hijri week calendar](https://github.com/khawarizmus/hijri-week-calendar-proposal) standard proposal.

The `week-dates` library offers three custom calendars that extend the Temporal API with Hijri week date capabilities:

| <div class="w-[160px]">Id</div> | <div class="w-[130px]">Extends</div> | Description |
|----|---------|-------------|
| `hwc-islamic-umalqura` | `islamic-umalqura` | Hijri week calendar with support for custom week day start derived from `islamic-umalqura` calendar |
| `hwc-islamic-civil` | `islamic-civil` | Hijri week calendar with support for custom week day start derived from `islamic-civil` calendar |
| `hwc-islamic-tbla` | `islamic-tbla` | Hijri week calendar with support for custom week day start derived from `islamic-tbla` calendar |

## Constructors

### `HWCUmalqura`

<PropertiesDefinition property="new HWCUmalqura(weekStartDay: HijriWeekDays = HijriWeekDays.Saturday)" />

Use the `HWCUmalqura` constructor to create a new instance of the `hwc-islamic-umalqura` calendar. The `weekStartDay` parameter is optional and defaults to `HijriWeekDays.Saturday`.

Example usage

```ts twoslash
import { HWCUmalqura, HWCWeekDays } from "week-dates";
import { Temporal } from "@js-temporal/polyfill";

const customCalendar = new HWCUmalqura()
const customCalendarWithStart = new HWCUmalqura(HWCWeekDays.Monday)

const weekDate = Temporal.PlainDate.from({ year: 1442, month: 6, day: 3, calendar: customCalendar })
const weekDateWithCustomStart = Temporal.PlainDate.from({ year: 1442, month: 6, day: 3, calendar: customCalendarWithStart })
```

### `HWCCivil`

<PropertiesDefinition property="new HWCCivil(weekStartDay: HijriWeekDays = HijriWeekDays.Saturday)" />

Use the `HWCCivil` constructor to create a new instance of the `hwc-islamic-civil` calendar. The `weekStartDay` parameter is optional and defaults to `HijriWeekDays.Saturday`.

Example usage

```ts twoslash
import { HWCCivil, HWCWeekDays } from "week-dates";
import { Temporal } from "@js-temporal/polyfill";

const customCalendar = new HWCCivil()
const customCalendarWithStart = new HWCCivil(HWCWeekDays.Monday)

const weekDate = Temporal.PlainDate.from({ year: 1442, month: 6, day: 3, calendar: customCalendar })
const weekDateWithCustomStart = Temporal.PlainDate.from({ year: 1442, month: 6, day: 3, calendar: customCalendarWithStart })
```

### `HWCTbla`

<PropertiesDefinition property="new HWCTbla(weekStartDay: HijriWeekDays = HijriWeekDays.Saturday)" />

Use the `HWCTbla` constructor to create a new instance of the `hwc-islamic-tbla` calendar. The `weekStartDay` parameter is optional and defaults to `HijriWeekDays.Saturday`.

Example usage

```ts twoslash
import { HWCTbla, HWCWeekDays } from "week-dates";
import { Temporal } from "@js-temporal/polyfill";

const customCalendar = new HWCTbla()
const customCalendarWithStart = new HWCTbla(HWCWeekDays.Monday)

const weekDate = Temporal.PlainDate.from({ year: 1442, month: 6, day: 3, calendar: customCalendar })
const weekDateWithCustomStart = Temporal.PlainDate.from({ year: 1442, month: 6, day: 3, calendar: customCalendarWithStart })
```

## Custom Properties

### `weekStartDay`

<PropertiesDefinition property="weekStartDay: HWCWeekDays" />

The `weekStartDay` property is the day of the week that the week starts on. It is an instance of the `HWCWeekDays` enum.

By default, the week starts on `HWCWeekDays.Monday` which is `1`.

Example usage

::: code-group
```ts twoslash [UmAlQura]
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
import { HWCUmalqura, HWCWeekDays } from "week-dates";
import { Temporal } from "@js-temporal/polyfill";

const customCalendar = new HWCUmalqura()
const customCalendarWithStart = new HWCUmalqura(HWCWeekDays.Monday)

const weekDate = Temporal.PlainDate.from({ year: 1442, month: 2, day: 3, calendar: customCalendar })
const weekDateWithCustomStart = Temporal.PlainDate.from({ year: 1442, month: 2, day: 3, calendar: customCalendarWithStart })

console.log(customCalendar.weekStartDay) // 1
console.log(customCalendarWithStart.weekStartDay) // 3
console.log(weekDate.weekStartDay) // 1
console.log(weekDateWithCustomStart.weekStartDay) // 3
```

```ts twoslash [Civil]
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
import { HWCCivil, HWCWeekDays } from "week-dates";
import { Temporal } from "@js-temporal/polyfill";

const customCalendar = new HWCCivil()
const customCalendarWithStart = new HWCCivil(HWCWeekDays.Monday)

const weekDate = Temporal.PlainDate.from({ year: 1442, month: 2, day: 3, calendar: customCalendar })
const weekDateWithCustomStart = Temporal.PlainDate.from({ year: 1442, month: 2, day: 3, calendar: customCalendarWithStart })

console.log(customCalendar.weekStartDay) // 1
console.log(customCalendarWithStart.weekStartDay) // 3
console.log(weekDate.weekStartDay) // 1
console.log(weekDateWithCustomStart.weekStartDay) // 3
```

```ts twoslash [Tabular]
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
import { HWCTbla, HWCWeekDays } from "week-dates";
import { Temporal } from "@js-temporal/polyfill";

const customCalendar = new HWCTbla()
const customCalendarWithStart = new HWCTbla(HWCWeekDays.Monday)

const weekDate = Temporal.PlainDate.from({ year: 1442, month: 2, day: 3, calendar: customCalendar })
const weekDateWithCustomStart = Temporal.PlainDate.from({ year: 1442, month: 2, day: 3, calendar: customCalendarWithStart })

console.log(customCalendar.weekStartDay) // 1
console.log(customCalendarWithStart.weekStartDay) // 3
console.log(weekDate.weekStartDay) // 1
console.log(weekDateWithCustomStart.weekStartDay) // 3
```
:::

### `weeksInYear`

<PropertiesDefinition property="weeksInYear: number" />

The `weeksInYear` property is the number of weeks in the year. It is a read-only property.

In Hijri calendars long years have 51 weeks, and short years have 50 weeks.

Example usage

::: code-group

```ts twoslash [UmAlQura]
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
import { HWCUmalqura, HWCWeekDays } from "week-dates";
import { Temporal } from "@js-temporal/polyfill";

const customCalendar = new HWCUmalqura()
const customCalendarWithStart = new HWCUmalqura(HWCWeekDays.Thursday)

const weekDate = Temporal.PlainDate.from({ year: 1442, month: 2, day: 3, calendar: customCalendar })
const weekDateWithCustomStart = Temporal.PlainDate.from({ year: 1442, month: 2, day: 3, calendar: customCalendarWithStart })

console.log(customCalendar.weeksInYear(weekDate)) // 50
console.log(customCalendarWithStart.weeksInYear(weekDate)) // 51
console.log(weekDate.weeksInYear) // 50
console.log(weekDateWithCustomStart.weeksInYear) // 51
```

```ts twoslash [Civil]
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
import { HWCCivil, HWCWeekDays } from "week-dates";
import { Temporal } from "@js-temporal/polyfill";

const customCalendar = new HWCCivil()
const customCalendarWithStart = new HWCCivil(HWCWeekDays.Thursday)

const weekDate = Temporal.PlainDate.from({ year: 1442, month: 2, day: 3, calendar: customCalendar })
const weekDateWithCustomStart = Temporal.PlainDate.from({ year: 1442, month: 2, day: 3, calendar: customCalendarWithStart })

console.log(customCalendar.weeksInYear(weekDate)) // 50
console.log(customCalendarWithStart.weeksInYear(weekDate)) // 51
console.log(weekDate.weeksInYear) // 50
console.log(weekDateWithCustomStart.weeksInYear) // 51
```

```ts twoslash [Tabular]
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
import { HWCTbla, HWCWeekDays } from "week-dates";
import { Temporal } from "@js-temporal/polyfill";

const customCalendar = new HWCTbla()
const customCalendarWithStart = new HWCTbla(HWCWeekDays.Thursday)

const weekDate = Temporal.PlainDate.from({ year: 1442, month: 2, day: 3, calendar: customCalendar })
const weekDateWithCustomStart = Temporal.PlainDate.from({ year: 1442, month: 2, day: 3, calendar: customCalendarWithStart })

console.log(customCalendar.weeksInYear(weekDate)) // 50
console.log(customCalendarWithStart.weeksInYear(weekDate)) // 51
console.log(weekDate.weeksInYear) // 50
console.log(weekDateWithCustomStart.weeksInYear) // 51
```
:::

### `weekDate`

<PropertiesDefinition property="weekDate: PlainWeekDate" />

The `weekDate` property is an instance of the [`PlainWeekDate`](../classes/plain-week-date.md) class that represents the week date of the Temporal object.

Example usage

::: code-group

```ts twoslash [UmAlQura]
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
import { HWCUmalqura, HWCWeekDays } from "week-dates";
import { Temporal } from "@js-temporal/polyfill";

const customCalendar = new HWCUmalqura()
const customCalendarWithStart = new HWCUmalqura(HWCWeekDays.Thursday)

const weekDate = Temporal.PlainDate.from({ year: 1442, month: 12, day: 28, calendar: customCalendar })
const weekDateWithCustomStart = Temporal.PlainDate.from({ year: 1442, month: 12, day: 28, calendar: customCalendarWithStart })

console.log(weekDate.weekDate.toString()) // 1443-W01-1[u-ca=islamic-umalqura]
console.log(weekDateWithCustomStart.weekDate.toString()) // 1442-W51-3[u-ca=islamic-umalqura][TH]
```

```ts twoslash [Civil]
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
import { HWCCivil, HWCWeekDays } from "week-dates";
import { Temporal } from "@js-temporal/polyfill";

const customCalendar = new HWCCivil()
const customCalendarWithStart = new HWCCivil(HWCWeekDays.Thursday)

const weekDate = Temporal.PlainDate.from({ year: 1442, month: 12, day: 28, calendar: customCalendar })
const weekDateWithCustomStart = Temporal.PlainDate.from({ year: 1442, month: 12, day: 28, calendar: customCalendarWithStart })

console.log(weekDate.weekDate.toString()) // 1443-W01-1[u-ca=islamic-civil]
console.log(weekDateWithCustomStart.weekDate.toString()) // 1442-W51-3[u-ca=islamic-civil][TH]
```

```ts twoslash [Tabular]    
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
import { HWCTbla, HWCWeekDays } from "week-dates";
import { Temporal } from "@js-temporal/polyfill";

const customCalendar = new HWCTbla()
const customCalendarWithStart = new HWCTbla(HWCWeekDays.Thursday)

const weekDate = Temporal.PlainDate.from({ year: 1442, month: 12, day: 28, calendar: customCalendar })
const weekDateWithCustomStart = Temporal.PlainDate.from({ year: 1442, month: 12, day: 28, calendar: customCalendarWithStart })

console.log(weekDate.weekDate.toString()) // 1442-W50-7[u-ca=islamic-tbla]
console.log(weekDateWithCustomStart.weekDate.toString()) // 1442-W51-2[u-ca=islamic-tbla][TH]
```
:::

## Overridden Properties

Because Temporal doesn't support week date properties for other then `iso8601` and `HWC{Umalqura|Civil|Tbla}` calendars supports custom week start day, They need overrides some week date properties in their base calendars.

### `yearOfWeek`

<PropertiesDefinition property="yearOfWeek: number" />

The `yearOfWeek` property is the year of the week. It is a read-only property.

The year of the week is the year that the week belongs to. It is different from the calendar year in some cases. A week is considered to belong to the year that contains the majority of its days.

Example usage

::: code-group

```ts twoslash [UmAlQura]
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
import { HWCUmalqura, HWCWeekDays } from "week-dates";
import { Temporal } from "@js-temporal/polyfill";

const customCalendar = new HWCUmalqura()
const customCalendarWithStart = new HWCUmalqura(HWCWeekDays.Thursday)

const weekDate = Temporal.PlainDate.from({ year: 1442, month: 12, day: 28, calendar: customCalendar })
const weekDateWithCustomStart = Temporal.PlainDate.from({ year: 1442, month: 12, day: 28, calendar: customCalendarWithStart })

console.log(weekDate.yearOfWeek) // 1443
console.log(weekDateWithCustomStart.yearOfWeek) // 1442
```

```ts twoslash [Civil]
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
import { HWCCivil, HWCWeekDays } from "week-dates";
import { Temporal } from "@js-temporal/polyfill";

const customCalendar = new HWCCivil()
const customCalendarWithStart = new HWCCivil(HWCWeekDays.Thursday)

const weekDate = Temporal.PlainDate.from({ year: 1442, month: 12, day: 28, calendar: customCalendar })
const weekDateWithCustomStart = Temporal.PlainDate.from({ year: 1442, month: 12, day: 28, calendar: customCalendarWithStart })

console.log(weekDate.yearOfWeek) // 1443
console.log(weekDateWithCustomStart.yearOfWeek) // 1442
```

```ts twoslash [Tabular]
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
import { HWCTbla, HWCWeekDays } from "week-dates";
import { Temporal } from "@js-temporal/polyfill";

const customCalendar = new HWCTbla()
const customCalendarWithStart = new HWCTbla(HWCWeekDays.Thursday)

const weekDate = Temporal.PlainDate.from({ year: 1442, month: 12, day: 28, calendar: customCalendar })
const weekDateWithCustomStart = Temporal.PlainDate.from({ year: 1442, month: 12, day: 28, calendar: customCalendarWithStart })

console.log(weekDate.yearOfWeek) // 1442
console.log(weekDateWithCustomStart.yearOfWeek) // 1442
```
:::


### `weekOfYear`

<PropertiesDefinition property="weekOfYear: number" />

The `weekOfYear` property is the week number of the year. It is a read-only property.

Example usage

::: code-group

```ts twoslash [UmAlQura]
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
import { HWCUmalqura, HWCWeekDays } from "week-dates";
import { Temporal } from "@js-temporal/polyfill";

const customCalendar = new HWCUmalqura()
const customCalendarWithStart = new HWCUmalqura(HWCWeekDays.Tuesday)

const weekDate = Temporal.PlainDate.from({ year: 1442, month: 12, day: 28, calendar: customCalendar })
const weekDateWithCustomStart = Temporal.PlainDate.from({ year: 1442, month: 12, day: 28, calendar: customCalendarWithStart })

console.log(weekDate.weekOfYear) // 1
console.log(weekDateWithCustomStart.weekOfYear) // 51
```

```ts twoslash [Civil]
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
import { HWCCivil, HWCWeekDays } from "week-dates";
import { Temporal } from "@js-temporal/polyfill";

const customCalendar = new HWCCivil()
const customCalendarWithStart = new HWCCivil(HWCWeekDays.Tuesday)

const weekDate = Temporal.PlainDate.from({ year: 1442, month: 12, day: 28, calendar: customCalendar })
const weekDateWithCustomStart = Temporal.PlainDate.from({ year: 1442, month: 12, day: 28, calendar: customCalendarWithStart })

console.log(weekDate.weekOfYear) // 1
console.log(weekDateWithCustomStart.weekOfYear) // 51
```

```ts twoslash [Tabular]
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
import { HWCTbla, HWCWeekDays } from "week-dates";
import { Temporal } from "@js-temporal/polyfill";

const customCalendar = new HWCTbla()
const customCalendarWithStart = new HWCTbla(HWCWeekDays.Tuesday)

const weekDate = Temporal.PlainDate.from({ year: 1442, month: 12, day: 28, calendar: customCalendar })
const weekDateWithCustomStart = Temporal.PlainDate.from({ year: 1442, month: 12, day: 28, calendar: customCalendarWithStart })

console.log(weekDate.weekOfYear) // 50
console.log(weekDateWithCustomStart.weekOfYear) // 51
```
:::

### `dayOfWeek`

<PropertiesDefinition property="dayOfWeek: number" />

The `dayOfWeek` property is the day of the week. It is a read-only property.

The day of the week is the day of the week that the date belongs to. It is not to be confused with the month day.

The day of the week is represented by a number from `1` to `7` where `1` is `Saturday` and `7` is `Friday` by default.

Using a custom week start day will change the day of the week representation.

Example usage

::: code-group

```ts twoslash [UmAlQura]
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
import { HWCUmalqura, HWCWeekDays } from "week-dates";
import { Temporal } from "@js-temporal/polyfill";

const customCalendar = new HWCUmalqura()
const customCalendarWithStart = new HWCUmalqura(HWCWeekDays.Thursday)

const weekDate = Temporal.PlainDate.from({ year: 1442, month: 12, day: 28, calendar: customCalendar })
const weekDateWithCustomStart = Temporal.PlainDate.from({ year: 1442, month: 12, day: 28, calendar: customCalendarWithStart })

// the day of the week for 1442-12-28 is a Saturday in the islamic-umalqura calendar
console.log(weekDate.dayOfWeek) // 1 in a week that starts on Saturday
console.log(weekDateWithCustomStart.dayOfWeek) // 3 in a week that starts on Thursday
```

```ts twoslash [Civil]
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
import { HWCCivil, HWCWeekDays } from "week-dates";
import { Temporal } from "@js-temporal/polyfill";

const customCalendar = new HWCCivil()
const customCalendarWithStart = new HWCCivil(HWCWeekDays.Thursday)

const weekDate = Temporal.PlainDate.from({ year: 1442, month: 12, day: 28, calendar: customCalendar })
const weekDateWithCustomStart = Temporal.PlainDate.from({ year: 1442, month: 12, day: 28, calendar: customCalendarWithStart })

// the day of the week for 1442-12-28 is a Saturday in the islamic-civil calendar
console.log(weekDate.dayOfWeek) // 1 in a week that starts on Saturday
console.log(weekDateWithCustomStart.dayOfWeek) // 3 in a week that starts on Thursday
```

```ts twoslash [Tabular]
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
import { HWCTbla, HWCWeekDays } from "week-dates";
import { Temporal } from "@js-temporal/polyfill";

const customCalendar = new HWCTbla()
const customCalendarWithStart = new HWCTbla(HWCWeekDays.Thursday)

const weekDate = Temporal.PlainDate.from({ year: 1442, month: 12, day: 28, calendar: customCalendar })
const weekDateWithCustomStart = Temporal.PlainDate.from({ year: 1442, month: 12, day: 28, calendar: customCalendarWithStart })

// the day of the week for 1442-12-28 is a Friday in the islamic-tbla calendar
console.log(weekDate.dayOfWeek) // 7 in a week that starts on Saturday
console.log(weekDateWithCustomStart.dayOfWeek) // 2 in a week that starts on Thursday
```
:::

# Caveats

Because of How the internals of Temporal work, the `HWC{Umalqura|Civil|Tbla}` calendars will not have the method `toLocaleString` working as expected. This is because the `toLocaleString` method expects only native Temporal calendars to be used with it.

A workaround this is to convert the date first before calling `toLocaleString` method.

```ts twoslash
import { HWCUmalqura, ISOWeekDays } from "week-dates";
import { Temporal } from "@js-temporal/polyfill";

const customCalendar = new HWCUmalqura()
const weekDate = Temporal.PlainDate.from({ year: 1442, month: 2, day: 3, calendar: customCalendar })

console.log(weekDate.toLocaleString()) // this will throw an error
console.log(weekDate.withCalendar('islamic-umalqura').toLocaleString()) // this will work
```

