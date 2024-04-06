
<script setup>
import PropertiesDefinition from "../components/PropertiesDefinitions.vue"
</script>

# Introduction

A `PlainWeekDate` object can be used to represents a week date for both ISO week dates and Hijri Week Calendars (HWC) dates. `PlainWeekDate` doesn"t hold time information or other felids like month or ordinal day. However conversion methods to and from other Temporal objects are provided by this class.

## Constructor

<PropertiesDefinition property="new PlainWeekDate( yearOfWeek: number, weekOfYear: number, dayOfWeek: number, calendar: SupportedCalendars = iso8601, weekDayStart?: HWCWeekDays | ISOWeekDays, options?: ToStringOptions ): PlainWeekDate" />

Example usage:

::: tip Note
Unlike other Temporal classes, the `PlainWeekDate` constructor accepts calendar-specific arguments. see [Inconsistencies](#inconsistencies) for more details.
:::

```ts
import { PlainWeekDate } from "week-dates";

const weekDate = new PlainWeekDate(2021, 1, 1);
const hijriWeekDate = new PlainWeekDate(1442, 1, 1, "islamic-umalqura");
```



## Inconsistencies

the `PlainWeekDate` class was designed to be familiar with other Temporal classes to make it easy to pick up and use. However there are some inconsistent behaviors that will you see and you should be aware of:

### `PlainWeekDate` constructor accepts calendar-specific arguments

Unlike other Plain Temporal classes like `PlainDate` or `PlainDateTime` which accept Gregorian arguments, the `PlainWeekDate` constructor accepts calendar-specific arguments. This behavior is not consistent with Temporal.

```ts
hello
```

### `PlainWeekDate` `toString` method returns calendar-specific representation

The `PlainWeekDate` `toString` method returns a calendar-specific representation of the week date. This behavior is not consistent with other Temporal classes, which always return the year, month and day in Gregorian calendar.

```ts
hello
```
