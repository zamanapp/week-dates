# week-dates

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

Utilities for working with week dates according [ISO week date](https://en.wikipedia.org/wiki/ISO_week_date) (ISO 8601) and [Hijri week calendars](https://github.com/khawarizmus/hijri-week-calendar-proposal)  (Hijri week date) using Temporal.

Features:
- Offer a new PlainWeekDate class to represent a week date
- Convert any gregorian date to and from an ISO week date
- Convert any Hijri date to and from a Hijri week date
- Convert between supported calendars (Gregorian, ISO week, Hijri, Hijri week)
- Support custom week start day for both ISO week date and Hijri week date
- Format dates in ISO week date representation and Hijri week date representation
- Parse dates in ISO week representation and Hijri week date representation
- Offer custom Temporal calendars for both ISO 8601 and Hijri week calendars enhancing Temporal objects with week date capabilities

## Installation

```bash
pnpm add week-dates
```

## Usage

For detailed usage see the [Documentation]()

## Tests

To run the tests on this repo you need to first generate some test data that the Hijri Week Calendar tests require. To do this, run the following command:

```bash
pnpm run generate
```

The script will ask you to verify the data however if you want to verify the data manually you can alwayse run the following command:

```bash
pnpm run verify
```
At this point you can run the tests using the following command:

```bash
pnpm test
```

or run the tests with test coverage in your browser by the following command:

```bash
pnpm test:ui
```
## Credit

This library is heavily inspired by the work done by [MohsenAlyafei](https://github.com/MohsenAlyafei) and [Khawarizmus](https://github.com/khawarizmus) on the [Hijri Week Calendar](https://github.com/khawarizmus/hijri-week-calendar)

## License

[MIT](./LICENSE) License © 2023-PRESENT [Zaman](https://github.com/zamanapp)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/week-dates?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/week-dates
[npm-downloads-src]: https://img.shields.io/npm/dm/week-dates?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/week-dates
[bundle-src]: https://img.shields.io/bundlephobia/minzip/week-dates?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=week-dates
[license-src]: https://img.shields.io/github/license/zamanapp/week-dates.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/zamanapp/week-dates/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/week-dates
