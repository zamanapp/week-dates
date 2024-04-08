# Introduction

`@zamanapp/week-dates` library is built on top of primitives that can be used independently of having to use the `PlainWeekDate` class or the many provided custom calendars. in fact all of the provided features are built on top of these primitives.

All primitives are exported from the main module and can be used individually. They all support custom week starts, Gregorian and Hijri scale when applicable.

[**Week Days Primitives:**](./week-days.md) These primitives are used to work with week days and are used to determine the correct day of the week for a given date, scale and week day start.

[**Conversion Primitives:**](./conversion.md) These primitives are used to convert from and to week dates as well as converting to different Temporal objects. They support different scales and custom week day starts.

[**Parsing Primitives:**](./parsing.md) These primitives are used to parse week dates from strings. They support different scales and custom week day starts.

[**Utils:**](./utils.md) Other utils offered by the library that don't fall under the previous categories.