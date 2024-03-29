# Introduction

# why?

## Support of Week dates in Temporal
<!-- Add mentions of github issues from Temporal v2 -->

Currently Temporal doesn't yet support week dates natively. `week-dates` library offer a new `PlainWeekDate` class to represent a week date. This class has a familiar API to other Temporal classes making it easy to pick up and use.

## Hijri counterpart of ISO week date

`week-dates` also offer support for Hijri week date which are based on Hijri week calendar which is a counterpart of the ISO calendar but for Hijri calendars. This is useful for applications that need to work with Hijri dates and need to represent them in a week date format.

## Custom week start day

All operations and primitives in `week-dates` support custom week start day for both ISO week date and Hijri week date. This is useful for applications that need to work with week dates that start on different week days.

## Custom Temporal calendar

`week-dates` offer custom Temporal calendars for both ISO 8601 and Hijri week calendars for easy integration with Temporal. All these calendars just extend already existing Temporal calendars and add support for week dates.
