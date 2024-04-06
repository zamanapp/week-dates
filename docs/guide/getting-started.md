# Getting Started

## Overview

`week-dates` is a utility library for working with week dates according [ISO week date](https://en.wikipedia.org/wiki/ISO_week_date) (ISO 8601) and [Hijri week calendars](https://github.com/khawarizmus/hijri-week-calendar)  (Hijri week date) using Temporal.

For insights into the motivation and features of this project, visit the [Why week-dates](./introduction.md#why) section.

## Trying `week-dates` online

Experience `week-dates` without any installation via our [StackBlitz Playground](https://stackblitz.com/edit/prayer-ts?file=src%2FPrayerTimes.ts&terminal=dev). This browser-based environment closely mimics a local setup, allowing you to test the library's features effortlessly.

::: tip
The version of `week-dates` on StackBlitz may not be up-to-date. To try the latest features, update the dependency in the `package.json` file within the StackBlitz environment.
:::

## Adding `week-dates` to Your Project

You have multiple options for integrating week-dates into your project:

### Package Managers

Install using npm, yarn, pnpm, or bun:

#### npm

```bash
npm i week-dates
```

#### yarn

```bash
yarn add week-dates
```

#### pnpm

```bash
pnpm add week-dates
```

#### bun

```bash
bun add week-dates
```

### CDN

Include week-dates via a CDN by adding the following script tag to your HTML:

```html
<script src="https://unpkg.com/week-dates/dist/index.cjs"></script>
```

We are using [unpkg](https://unpkg.com) in this example, but other CDNs like [jsdelivr](https://www.jsdelivr.com/) or [cdnjs](https://cdnjs.com/) works as well. Alternatively, you can download and serve the file yourself.

### Deno

For Deno users, week-dates is available on [deno.land/x](https://deno.land/x). Import the latest version or a specific version as follows:

#### Latest Version:

```ts
import { StaticCalculator } from 'https://deno.land/x/week-dates'
```

#### Specific Version:

```ts
import { StaticCalculator } from 'https://deno.land/x/week-dates@v1.1.0'
```

::: tip
The rest of this documentation assumes you are using npm/yarn/pnpm/bun and importing directly from the `week-dates` package.
:::

## Basic Usage

Here's a quick example to get you started with the StaticCalculator for one-time prayer time calculations:

```ts
import { PlainWeekDate } from 'week-dates'

const weekDate = PlainWeekDate.from({ yearOfWeek: 2021, weekOfYear: 1, dayOfWeek: 1, })
console.log(weekDate.toString()) // 2021-W01-01
console.log(weekDate.toPlainDate().toString()) // 2021-01-04

const plainDate = Temporal.PlainDate.from({ year: 2021, month: 1, day: 4 })
const weekDate2 = PlainWeekDate.from(plainDate)
console.log(weekDate2.toString()) // 2021-W01-01
```
