
<script setup>
import PropertiesDefinition from "../components/PropertiesDefinitions.vue"
</script>

# Introduction

A `PlainWeekDate` object can be used to represents a week date for both ISO week dates and Hijri Week Calendars (HWC) dates. `PlainWeekDate` doesn"t hold time information or other felids like month or ordinal day. However conversion methods to and from other Temporal objects are provided by this class.

## Constructor

<PropertiesDefinition property="new PlainWeekDate( yearOfWeek: number, weekOfYear: number, dayOfWeek: number, calendar: SupportedCalendars = iso8601, weekStartDay?: HWCWeekDays | ISOWeekDays, options?: ToStringOptions ): PlainWeekDate" />

Use the `PlainWeekDate` constructor to create a new instance of `PlainWeekDate`. The constructor is useful when you already have the exact values of the week date. Otherwise, you can use the [`PlainWeekDate.from()`](./plain-week-date.md#plainweekdatefrom) method to create a `PlainWeekDate` instance from many kind of inputs.

Ranges for the arguments are as follows:

| Argument | <div class="w-[230px]">Range</div> | Note |
|----------|-------|-------------|
| `yearOfWeek` | `[-999999999, 999999999]` | These ranges are not the max ranges supported by Temporal |
| `weekOfYear` | `[1, 52-53]` or `[1, 50-51]`  | Gregorian and Hijri years respectively |
| `dayOfWeek` | `[1, 7]` | 1 is the first day of the week and 7 is the last day of the week |

When values are out of range, the constructor will throw a `RangeError`.

Values passed are for the specified calendar. If the calendar is not specified, the default calendar is `iso8601`. The calendars supported are `iso8601`, `gregorian` and a subset of islamic calendars as well as the custom calendars offered by this library see [supported calendars]() as [custom calendars]().

The `weekStartDay` argument informs the class about the first day of the week. The default value is `1` which would be Monday for the Gregorian calendar and Saturday for the Hijri calendar see [week days](../primitives/utils#weekdays).

The `options` argument is used to customize the output of the [`PlainWeekDate.toString`](./plain-week-date.md#plainweekdatetostring) method. the default value is:

```json
{
    shortForm: false,
    calendarName: 'auto',
    weekStartDay: 'auto',
}
```


Example usage:

::: tip Note
Unlike other Temporal classes, the `PlainWeekDate` constructor accepts calendar-specific arguments. see [Inconsistencies](#inconsistencies) for more details.
:::

```ts twoslash
import { PlainWeekDate } from "@zamanapp/week-dates";
// ---cut---
const weekDate = new PlainWeekDate(2021, 1, 1);
const hijriWeekDate = new PlainWeekDate(1442, 1, 1, "islamic-umalqura");

```

## Static Methods

### `from`

<PropertiesDefinition property="from(from: string | Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime | PlainWeekDate | PlainWeekDateLike, reference?: PlainWeekDateReference): PlainWeekDate" />

This creates a new `PlainWeekDate` object from another value. If the value is another `PlainWeekDate` object, a new `PlainWeekDate` object with the same values is returned.

The `PlainWeekDate.from` method accepts the following types of inputs:

- A string following the ISO 8601 week date format or the Hijri Week Calendar (HWC) week date format.
- Temporal objects like `Temporal.PlainDate`, `Temporal.PlainDateTime`, `Temporal.ZonedDateTime`.
- A `PlainWeekDate` object.
- An object with the same properties as `PlainWeekDateLike`.

If the input value is a string the `yearOfWeek`, `weekOfYear` and `dayOfWeek` are expected to be matching the calendar specified in the string. Just like in Temporal calendars can be appended to the string to specify the calendar.

::: tip Note
The week date strings accepted by the `PlainWeekDate.from` method are of the same convention as the `PlainWeekDate.toSting` method. which behaves differently from other Temporal classes. see [Inconsistencies](#inconsistencies) for more details.
:::

The `reference` argument allows you to pass a `weekStartDay` value or a `calendar` value to be used when creating the `PlainWeekDate` object. This way you can create a `PlainWeekDate` object with a different calendar or week start day than the input value. When both `weekStartDay` and `calendar` are passed, the `calendar` value will be applied first.

Example usage:

```ts twoslash
import { PlainWeekDate } from "@zamanapp/week-dates";
import { Temporal } from "@js-temporal/polyfill";
// ---cut---

const date = Temporal.PlainDate.from("2021-01-04");

// from strings
const weekDate = PlainWeekDate.from("2021-W01-1");
const HijriWeekDate = PlainWeekDate.from("1442-W01-1[u-ca=islamic-umalqura]");

console.log(weekDate.yearOfWeek); // 2021
console.log(HijriWeekDate.yearOfWeek); // 1442

PlainWeekDate.from('2021W011').toString(); // 2021-W01-1
PlainWeekDate.from('1442W011[u-ca=islamic-umalqura]').toString(); // 1442-W01-1[u-ca=islamic-umalqura]

// with compact shortForm option and custom week start day
PlainWeekDate.from('2021W34[SA]').toString(); // 2021-W34-1[SA]

// from Temporal objects
PlainWeekDate.from(date).toString(); // 2021-W01-1

// from PlainWeekDateLike
const weekDateLike = { yearOfWeek: 2021, weekOfYear: 1, dayOfWeek: 1 };
PlainWeekDate.from(weekDateLike).toString(); // 2021-W01-1

// from PlainWeekDate 
PlainWeekDate.from(new PlainWeekDate(1442, 1, 1, "islamic-civil")).toString(); // 1442-W01-1[u-ca=islamic-civil]

// with reference
PlainWeekDate.from("2021-W01-1", { weekStartDay: 6 }).toString(); // 2021-W01-3[SA]
PlainWeekDate.from("2021-W01-1", { calendar: "islamic-umalqura" }).toString(); // 1442-W20-3[u-ca=islamic-umalqura]
PlainWeekDate.from("1442-W01-1[u-ca=islamic-civil]", { weekStartDay: 6, calendar: "iso8601" }).toString(); // 2020-W34-1[SA]
```

### `sameScale`

<PropertiesDefinition property="sameScale(one: PlainWeekDate, two: PlainWeekDate): boolean" />

This method returns `true` if the two `PlainWeekDate` objects are in the same scale or a `PlainWeekDate` object and a `Scale` value are in the same scale. Otherwise, it returns `false`.

Example usage:

```ts twoslash
import { PlainWeekDate, Scales } from "@zamanapp/week-dates";
// ---cut---
const one = new PlainWeekDate(2021, 1, 1)
const two = new PlainWeekDate(2021, 2, 2, 'iso-extended')
const three = new PlainWeekDate(1442, 1, 1, 'islamic-umalqura')
const four = new PlainWeekDate(1442, 1, 1, 'hwc-islamic-tbla')

PlainWeekDate.sameScale(one, two) // true
PlainWeekDate.sameScale(three, four) // true
PlainWeekDate.sameScale(one, Scales.Gregorian) // true
PlainWeekDate.sameScale(three, Scales.Hijri) // true

PlainWeekDate.sameScale(one, three) // false
PlainWeekDate.sameScale(one, Scales.Hijri) // false
```

### `compare`

<PropertiesDefinition property="compare(one: string | PlainWeekDate | PlainWeekDateLike, two: string | PlainWeekDate | PlainWeekDateLike): Temporal.ComparisonResult" />

This method compares two `PlainWeekDate` objects and returns an integer indicating wether `one` comes before, after or is equal to `two`

The comparison is done by converting both `one` and `two` to `Temporal.Instant` objects and comparing their values by using their built-in `compare` method.

Example usage:

```ts twoslash
import { PlainWeekDate } from "@zamanapp/week-dates";
// ---cut---
const one = new PlainWeekDate(2021, 1, 1)
const two = new PlainWeekDate(2021, 2, 2)

PlainWeekDate.compare(one, two) // -1
PlainWeekDate.compare(two, one) // 1
PlainWeekDate.compare(one, one) // 0
```

## Properties

### `yearOfWeek`

<PropertiesDefinition property="yearOfWeek: number" />

This is the year part of the week date. The range of the year is `[-999999999, 999999999]` which is not the max range supported by Temporal.

The `yearOfWeek` property is always mapped to the year of the calendar specified in the constructor. If the calendar is not specified, the default calendar is `iso8601`.

::: tip Note
In week dates the `yearOfWeek` is not always the same as the year of the corresponding date. For example, the week date `2022-W52-7` corresponds to the date `2023-01-01` in the Gregorian calendar. The same behavior is also true for the Hijri calendar.
:::

```ts twoslash
import { PlainWeekDate } from "@zamanapp/week-dates";
// ---cut---
const weekDate = new PlainWeekDate(2021, 1, 1);
const hijriWeekDate = new PlainWeekDate(1442, 1, 1, "islamic-umalqura");

console.log(weekDate.yearOfWeek); // 2021
console.log(hijriWeekDate.yearOfWeek); // 1442
```

### `weekOfYear`

<PropertiesDefinition property="weekOfYear: number" />

This is the week part of the week date. The range of the week is `[1, 52-53]` or `[1, 50-51]` for Gregorian and Hijri years respectively.

Long years can have `53` weeks in the Gregorian calendar and `51` weeks in the Hijri calendar. The number of weeks in a year is determined by the calendar and the week start day used.

Short years can have `52` weeks in the Gregorian calendar and `50` weeks in the Hijri calendar. The number of weeks in a year is determined by the calendar and the week start day used.

```ts twoslash
import { PlainWeekDate } from "@zamanapp/week-dates";
// ---cut---
const weekDate = new PlainWeekDate(2022, 52, 7);
const hijriWeekDate = new PlainWeekDate(1442, 1, 1, "islamic-umalqura");

console.log(weekDate.weekOfYear); // 52
console.log(hijriWeekDate.weekOfYear); // 1
```

### `dayOfWeek`

<PropertiesDefinition property="dayOfWeek: number" />

This is the day part of the week date. The range of the day is `[1, 7]` where `1` is the first day of the week and `7` is the last day of the week.

Gregorian weeks start on Monday and end on Sunday. While, Hijri weeks start on Saturday and end on Friday.
`@zamanapp/week-dates` offer helpers to work with week days see [week days](../primitives/utils#weekdays).

| Day | Gregorian | Hijri |
|-----|-----------|-------|
| 1   | Monday    | Saturday |
| 2   | Tuesday   | Sunday |
| 3   | Wednesday | Monday |
| 4   | Thursday  | Tuesday |
| 5   | Friday    | Wednesday |
| 6   | Saturday  | Thursday |
| 7   | Sunday    | Friday |

The `dayOfWeek` property is always mapped to the day of the week date calendar scale. If the calendar is not specified, the default calendar is `iso8601`.

The `dayOfWeek` property is determined by the week start day used. The default week start day is `1` which would be Monday for the Gregorian calendar and Saturday for the Hijri calendar.

```ts twoslash
import { PlainWeekDate, Scales, getWeekDayName, ISOWeekDays } from "@zamanapp/week-dates";

const weekDate = new PlainWeekDate(2021, 1, 1);
const hijriWeekDate = new PlainWeekDate(1442, 1, 1, "islamic-umalqura");

const customWeekDate = PlainWeekDate.from({
    yearOfWeek: 2021,
    weekOfYear: 1,
    dayOfWeek: 1,
    weekStartDay: ISOWeekDays.Wednesday,
});

console.log(weekDate.dayOfWeek); // 1
console.log(hijriWeekDate.dayOfWeek); // 7

getWeekDayName(weekDate.dayOfWeek, Scales.Gregorian); // Monday
getWeekDayName(hijriWeekDate.dayOfWeek, Scales.Hijri); // Saturday
getWeekDayName(customWeekDate.dayOfWeek, Scales.Gregorian, customWeekDate.weekStartDay); // Wednesday
```

### `calendarId`

<PropertiesDefinition property="calendarId: SupportedCalendars" />

This is the calendar id of the week date. The calendar id is a string that represents the calendar used in the week date. The default calendar is `iso8601`. For a full list of supported calendars see [supported calendars]().

```ts twoslash
import { PlainWeekDate } from "@zamanapp/week-dates";
// ---cut---
const weekDate = new PlainWeekDate(2021, 1, 1);
const hijriWeekDate = new PlainWeekDate(1442, 1, 1, "islamic-umalqura");

console.log(weekDate.calendarId); // iso8601
console.log(hijriWeekDate.calendarId); // islamic-umalqura
```

### `weekStartDay`

<PropertiesDefinition property="weekStartDay: HWCWeekDays | ISOWeekDays" />

This is the week start day of the week date. The week start day is a number that represents the first day of the week. The default week start day is `1` which would be Monday for the Gregorian calendar and Saturday for the Hijri calendar.

| Day | Gregorian | Hijri |
|-----|-----------|-------|
| 1   | Monday    | Saturday |
| 2   | Tuesday   | Sunday |
| 3   | Wednesday | Monday |
| 4   | Thursday  | Tuesday |
| 5   | Friday    | Wednesday |
| 6   | Saturday  | Thursday |
| 7   | Sunday    | Friday |

The `weekStartDay` property is always mapped to the week start day of the week date calendar scale. If the calendar is not specified, the default calendar is `iso8601`.

```ts twoslash
import { PlainWeekDate, ISOWeekDays, HWCWeekDays, Scales, getWeekDayName } from "@zamanapp/week-dates";

const weekDate = new PlainWeekDate(2021, 1, 1);
const hijriWeekDate = new PlainWeekDate(1442, 1, 1, "islamic-umalqura");

const customWeekDate = new PlainWeekDate(2021, 1, 1, "iso8601", ISOWeekDays.Wednesday);
const customHijriWeekDate = new PlainWeekDate(1442, 1, 1, "islamic-umalqura", HWCWeekDays.Friday);

console.log(weekDate.weekStartDay); // 1
console.log(hijriWeekDate.weekStartDay); // 1

console.log(customWeekDate.weekStartDay); // 3
console.log(customHijriWeekDate.weekStartDay); // 7

console.log(getWeekDayName(weekDate.dayOfWeek, Scales.Gregorian, weekDate.weekStartDay)); // Monday
console.log(getWeekDayName(hijriWeekDate.dayOfWeek, Scales.Hijri, hijriWeekDate.weekStartDay)); // Saturday  

console.log(getWeekDayName(customWeekDate.dayOfWeek, Scales.Gregorian, customWeekDate.weekStartDay)); // Wednesday
console.log(getWeekDayName(customHijriWeekDate.dayOfWeek, Scales.Hijri, customHijriWeekDate.weekStartDay)); // Friday


// we use Sweden locale as it's format is very close to ISO 8601
console.log(weekDate.toPlainDate().toLocaleString('sv-SE')) // 2021-01-04
console.log(hijriWeekDate.toPlainDate().toLocaleString('sv-SE', { calendar: 'islamic-umalqura' })) // 1442-01-03 AH

console.log(customWeekDate.toPlainDate().toLocaleString('sv-SE')) // 2020-12-30
console.log(customHijriWeekDate.toPlainDate().toLocaleString('sv-SE', { calendar: 'islamic-umalqura' })) // 1442-01-02 AH
```

### `scale`

<PropertiesDefinition property="scale: Scales" />

This is the scale of the week date. Currently only `Gregorian` and `Hijri` scales are supported. The default scale is `Gregorian`.

Here is a list of supported calendars with their corresponding scales:

| Calendar Id | Scale |
|-------------|-------|
| iso8601     | Gregorian |
| gregorian   | Gregorian |
| iso-extended | Gregorian |
| islamic-umalqura | Hijri |
| islamic-tbla | Hijri |
| islamic-civil | Hijri |
| hwc-islamic-umalqura | Hijri |
| hwc-islamic-tbla | Hijri |
| hwc-islamic-civil | Hijri |

```ts twoslash
import { PlainWeekDate } from "@zamanapp/week-dates";
// ---cut---

const weekDate = new PlainWeekDate(2021, 1, 1);
const hijriWeekDate = new PlainWeekDate(1442, 1, 1, "islamic-umalqura");

console.log(weekDate.scale); // Gregorian
console.log(hijriWeekDate.scale); // Hijri
```

### `options`

<PropertiesDefinition property="options: ToStringOptions" />

This is an object that holds the options used to customize the output of the [`PlainWeekDate.toString`](./plain-week-date.md#plainweekdatetostring) method. The default value is:

```json
{
    shortForm: false,
    calendarName: 'auto',
    weekStartDay: 'auto',
}
```

For more details see the [`PlainWeekDate.toString`](./plain-week-date.md#plainweekdatetostring) method.

## Methods

### `weekDateFields`

<PropertiesDefinition property="weekDateFields(): PlainWeekDateFields" />

This method returns an object that contains the fields of the week date. The object has the following properties:

```ts
{
  yearOfWeek: number
  weekOfYear: number
  dayOfWeek: number
  calendarId: SupportedCalendars
  weekStartDay: HWCWeekDays | ISOWeekDays
}
```

### `toInstant`

<PropertiesDefinition property="toInstant(weekStartDay: HWCWeekDays | ISOWeekDays = this.weekStartDay, reference?: Reference): Temporal.Instant" />

This method converts the `PlainWeekDate` object to a `Temporal.Instant` object. 

The `weekStartDay` argument allows you to pass a `weekStartDay` value to be used when creating the `Temporal.Instant` object. This way you can create a `Temporal.Instant` object with a different week start day than the `PlainWeekDate` object.

The `reference` argument has the following properties:

```ts
{
  referenceTime?: Temporal.PlainDateTime | Temporal.ZonedDateTime | Temporal.PlainTime
  referenceTimezone?: Temporal.TimeZoneLike
}
```

The `referenceTime` property is used to specify the time part of the `Temporal.Instant` object. The `referenceTimezone` property is used to specify the timezone of the `Temporal.Instant` object.

Example usage:
```ts twoslash
import { PlainWeekDate } from "@zamanapp/week-dates";
import { Temporal } from "@js-temporal/polyfill";
// ---cut---

const weekDate = new PlainWeekDate(2021, 1, 1);
const hijriWeekDate = new PlainWeekDate(1442, 1, 1, "islamic-umalqura");

const instant = weekDate.toInstant();
const hijriInstant = hijriWeekDate.toInstant();
```

### `toPlainDate`

<PropertiesDefinition property="toPlainDate(): Temporal.PlainDate" />

This method converts the `PlainWeekDate` object to a `Temporal.PlainDate` object.

Example usage:
```ts twoslash
import { PlainWeekDate } from "@zamanapp/week-dates";
// ---cut---

const weekDate = new PlainWeekDate(2021, 1, 1);
const hijriWeekDate = new PlainWeekDate(1442, 1, 1, "islamic-umalqura");

const date = weekDate.toPlainDate();
const hijriDate = hijriWeekDate.toPlainDate();
```

### `toPlainDateTime`

<PropertiesDefinition property="toPlainDateTime(): Temporal.PlainDateTime" />

This method converts the `PlainWeekDate` object to a `Temporal.PlainDateTime` object.

Example usage:
```ts twoslash
import { PlainWeekDate } from "@zamanapp/week-dates";
// ---cut---

const weekDate = new PlainWeekDate(2021, 1, 1);
const hijriWeekDate = new PlainWeekDate(1442, 1, 1, "islamic-umalqura");

const dateTime = weekDate.toPlainDateTime();
const hijriDateTime = hijriWeekDate.toPlainDateTime();
```

### `toZonedDateTime`

<PropertiesDefinition property="toZonedDateTime(timeZone: Temporal.TimeZoneLike = 'UTC'): Temporal.ZonedDateTime" />

This method converts the `PlainWeekDate` object to a `Temporal.ZonedDateTime` object.

The `timeZone` argument allows you to pass a timezone to be used when creating the `Temporal.ZonedDateTime` object. The default value is `'UTC'`.

Example usage:
```ts twoslash
import { PlainWeekDate } from "@zamanapp/week-dates";
// ---cut---

const weekDate = new PlainWeekDate(2021, 1, 1);
const hijriWeekDate = new PlainWeekDate(1442, 1, 1, "islamic-umalqura");

const zonedDateTime = weekDate.toZonedDateTime();
const hijriZonedDateTime = hijriWeekDate.toZonedDateTime();
```

### `withCalendar`

<PropertiesDefinition property="withCalendar(calendarId: SupportedCalendars, weekStartDay?: HWCWeekDays | ISOWeekDays): PlainWeekDate" />

This method returns a new `PlainWeekDate` object with the specified calendar. The `weekStartDay` argument allows you to pass a `weekStartDay` value to be used when creating the new `PlainWeekDate` object. This way you can create a `PlainWeekDate` object with a different week start day than the original `PlainWeekDate` object.

When both `weekStartDay` and `calendarId` are passed, the `calendarId` value will be applied first.

Example usage:
```ts twoslash
import { PlainWeekDate, ISOWeekDays } from "@zamanapp/week-dates";

const weekDate = new PlainWeekDate(2021, 1, 1);
const hijriWeekDate = new PlainWeekDate(1442, 1, 1, "islamic-umalqura");

const newWeekDate = weekDate.withCalendar("iso8601", ISOWeekDays.Saturday);
const newHijriWeekDate = hijriWeekDate.withCalendar("islamic-civil");
```


### `withWeekStartDay`

<PropertiesDefinition property="withWeekStartDay(weekStartDay: HWCWeekDays | ISOWeekDays): PlainWeekDate" />

This method returns a new `PlainWeekDate` object with the specified week start day. The `weekStartDay` argument allows you to pass a `weekStartDay` value to be used when creating the new `PlainWeekDate` object. This way you can create a `PlainWeekDate` object with a different week start day than the original `PlainWeekDate` object.

Example usage:
```ts twoslash
import { PlainWeekDate, ISOWeekDays } from "@zamanapp/week-dates";

const weekDate = new PlainWeekDate(2021, 1, 1);
const hijriWeekDate = new PlainWeekDate(1442, 1, 1, "islamic-umalqura");

const newWeekDate = weekDate.withWeekStartDay(ISOWeekDays.Saturday);
const newHijriWeekDate = hijriWeekDate.withWeekStartDay(ISOWeekDays.Monday);
```

### `compare`

<PropertiesDefinition property="compare(other: string | PlainWeekDate | PlainWeekDateLike): Temporal.ComparisonResult" />

This method compares the `PlainWeekDate` object with another `PlainWeekDate` object or a week date string and returns an integer indicating wether the `PlainWeekDate` object comes before, after or is equal to the other `PlainWeekDate` object.

The comparison is done by converting both `PlainWeekDate` objects to `Temporal.Instant` objects and comparing their values by using their built-in `compare` method.

Example usage:
```ts twoslash
import { PlainWeekDate } from "@zamanapp/week-dates";
// ---cut---

const one = new PlainWeekDate(2021, 1, 1)
const two = new PlainWeekDate(2021, 2, 2)

one.compare(two) // -1
two.compare(one) // 1
one.compare(one) // 0
```

### `toString`

<PropertiesDefinition property="toString(options?: ToStringOptions): string" />

This method returns a string representation of the week date. The string representation is in the ISO 8601 week date format or the Hijri Week Calendar (HWC) week date format.

The `options` argument is used to customize the output of the string representation. The default value is:

```json
{
    shortForm: false,
    calendarName: 'auto',
    weekStartDay: 'auto',
}
```

The `shortForm` option when set to true will return the short form of the week date string by omitting the `dayOfWeek` part. 

The `calendarName` option can be set to `auto`, `always` or `never` to include the calendar name in the string representation. When set to `auto` the calendar name will be included only when it is not `iso8601`.

The `weekStartDay` option can be set to `auto`, `always` or `never` to include the week start day in the string representation. When set to `auto` the week start day will be included only when it is not the default value for that specific scale.

::: tip Note
The week date strings returned by the `PlainWeekDate.toString` is mapped to the `PlainWeekDate` calendar. which is different from other Temporal classes. see [Inconsistencies](#inconsistencies) for more details.
:::

Example usage:
```ts twoslash
import { PlainWeekDate } from "@zamanapp/week-dates";
// ---cut---

const weekDate = new PlainWeekDate(2021, 1, 1);
const hijriWeekDate = new PlainWeekDate(1442, 1, 1, "islamic-umalqura");

weekDate.toString(); // 2021-W01-1
hijriWeekDate.toString(); // 1442-W01-1[u-ca=islamic-umalqura]

weekDate.toString({ shortForm: true }); // 2021-W01
hijriWeekDate.toString({ shortForm: true }); // 1442-W01[u-ca=islamic-umalqura]

weekDate.toString({ calendarName: 'always' }); // 2021-W01-1[iso8601]
weekDate.toString({ weekStartDay: 'always' }); // 2021-W01-1[MO]
hijriWeekDate.toString({ calendarName: 'never' }); // 1442-W01-1
```


### `toStringCompact`

<PropertiesDefinition property="toStringCompact(options?: ToStringOptions): string" />

This method returns a compact string representation of the week date. The string representation is in the ISO 8601 week date format or the Hijri Week Calendar (HWC) week date format.

The `options` argument is used to customize the output of the string representation. The default value is:

```json
{
    shortForm: false,
    calendarName: 'auto',
    weekStartDay: 'auto',
}
```

The `shortForm` option when set to true will return the short form of the week date string by omitting the `dayOfWeek` part.

The `calendarName` option can be set to `auto`, `always` or `never` to include the calendar name in the string representation. When set to `auto` the calendar name will be included only when it is not `iso8601`.

The `weekStartDay` option can be set to `auto`, `always` or `never` to include the week start day in the string representation. When set to `auto` the week start day will be included only when it is not the default value for that specific scale.

::: tip Note
The week date strings returned by the `PlainWeekDate.toStringCompact` is mapped to the `PlainWeekDate` calendar. which is different from other Temporal classes. see [Inconsistencies](#inconsistencies) for more details.
:::

Example usage:
```ts twoslash
import { PlainWeekDate } from "@zamanapp/week-dates";
// ---cut---

const weekDate = new PlainWeekDate(2021, 1, 1);
const hijriWeekDate = new PlainWeekDate(1442, 1, 1, "islamic-umalqura");

weekDate.toStringCompact(); // 2021W01
hijriWeekDate.toStringCompact(); // 1442W01[u-ca=islamic-umalqura]

weekDate.toStringCompact({ shortForm: true }); // 2021W01
hijriWeekDate.toStringCompact({ shortForm: true }); // 1442W01[u-ca=islamic-umalqura]

weekDate.toStringCompact({ calendarName: 'always' }); // 2021W01[iso8601]
weekDate.toStringCompact({ weekStartDay: 'always' }); // 2021W01[MO]
hijriWeekDate.toStringCompact({ calendarName: 'never' }); // 1442W01
```


## Inconsistencies

the `PlainWeekDate` class was designed to be familiar with other Temporal classes to make it easy to pick up and use. However there are some inconsistent behaviors that will you see and you should be aware of:

### `PlainWeekDate` constructor accepts calendar-specific arguments

Unlike other Plain Temporal classes like `PlainDate` or `PlainDateTime` which accept Gregorian arguments, the `PlainWeekDate` constructor accepts calendar-specific arguments. This behavior is not consistent with Temporal.

```ts
hello
```

### `PlainWeekDate.toString` method returns calendar-specific representation

The `PlainWeekDate.toString` method returns a calendar-specific representation of the week date. This behavior is not consistent with other Temporal classes, which always return the year, month and day in Gregorian calendar.

```ts
hello
```
