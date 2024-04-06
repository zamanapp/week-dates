# Introduction

## What Is It?
`week-dates` is a utility library for working with week dates according ISO 8601 ([ISO week date](https://en.wikipedia.org/wiki/ISO_week_date)) and [Hijri week calendars](https://github.com/khawarizmus/hijri-week-calendar)  (Hijri week date) using Temporal.

## why This Library?

The following are some of the reasons why you might want to use `week-dates` library:

- **First class support for week dates**: Currently there is no way for Temporal to represent week dates. which is a common use case for many applications. although this [feature was requested](https://github.com/tc39/proposal-temporal/issues/2761) before to be included in the initial Temporal Proposal, [It was reconsidered](https://github.com/tc39/proposal-temporal/issues/2405) but eventually it was decided to be out of scope for the initial Temporal proposal. and [pushed to Temporal V2](https://github.com/js-temporal/proposal-temporal-v2/issues/11) instead. `week-dates` library offer a new `PlainWeekDate` class to represent a week date. This class has a familiar API to other Temporal classes ([with minor inconsistencies](../classes/plain-week-date.md#inconsistencies)) making it easy to pick up and use.

- **Support ISO and Hijri week dates**: `week-dates` library offers a way to represent week dates in Temporal in compliance with [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) as well as [Hijri week calendar](https://github.com/khawarizmus/hijri-week-calendar) which is useful for applications that need to work with Hijri dates and need to represent them in a week date format.

- **Custom week start day**: All operations and primitives in `week-dates` support custom week start day for both ISO week date and Hijri week date. This is particularly useful for compliance with [RFC5545](https://datatracker.ietf.org/doc/html/rfc5545) and [RFC7529](https://datatracker.ietf.org/doc/html/rfc7529) or for any applications that need to work with week dates that start on different week days then the ones defined in the standards.

- **Custom Temporal calendar**: On top of offering `PlainWeekDate` class, `week-dates` offer custom Temporal calendars for both ISO 8601 and Hijri week calendars for easy integration with Temporal. All these calendars just extend already existing Temporal calendars and add support for week dates to already existing Temporal Objects that support calendars like `Temporal.PlainDate`, `Temporal.PlainDateTime` and `Temporal.ZonedDateTime`.

# Features

- Offer a new `PlainWeekDate` class to represent a week date
- Convert any gregorian date to and from an ISO week date
- Convert any Hijri date to and from a Hijri week date
- Convert between supported calendars (Gregorian, ISO week, Hijri, Hijri week)
- Support custom week start day for both ISO week date and Hijri week date
- Format dates in ISO week date representation and Hijri week date representation
- Parse dates in ISO week representation and Hijri week date representation
