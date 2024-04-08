# Getting Started

## Overview

`@zamanapp/week-dates` is a utility library for working with week dates according [ISO week date](https://en.wikipedia.org/wiki/ISO_week_date) (ISO 8601) and [Hijri week calendars](https://github.com/khawarizmus/hijri-week-calendar)  (Hijri week date) using Temporal.

For insights into the motivation and features of this project, visit the [Why week-dates](./introduction.md#why-this-library) section.

## Trying `@zamanapp/week-dates` online

Experience `@zamanapp/week-dates` without any installation via our [StackBlitz Playground](https://stackblitz.com/edit/prayer-ts?file=src%2FPrayerTimes.ts&terminal=dev). This browser-based environment closely mimics a local setup, allowing you to test the library's features effortlessly.

::: tip
The version of `@zamanapp/week-dates` on StackBlitz may not be up-to-date. To try the latest features, update the dependency in the `package.json` file within the StackBlitz environment.
:::

## Adding `@zamanapp/week-dates` to Your Project

You have multiple options for integrating week-dates into your project:

### Package Managers

Install using your favorite package manager:

::: code-group


```bash [npm]
npm i @zamanapp/week-dates
```


```bash [yarn]
yarn add @zamanapp/week-dates
```


```bash [pnpm]
pnpm add @zamanapp/week-dates
```


```bash [bun]
bun add @zamanapp/week-dates
```
:::

### CDN

Include week-dates via a CDN by adding the following script tag to your HTML:

```html
<script src="https://unpkg.com/@zamanapp/week-dates/dist/index.cjs"></script>
```

We are using [unpkg](https://unpkg.com) in this example, but other CDNs like [jsdelivr](https://www.jsdelivr.com/) or [cdnjs](https://cdnjs.com/) works as well. Alternatively, you can download and serve the file yourself.

### Deno

For Deno users, week-dates is available on [deno.land/x](https://deno.land/x). Import the latest version or a specific version as follows:

#### Latest Version:

```ts
import { PlainWeekDate } from 'https://deno.land/x/week-dates'
```

#### Specific Version:

```ts
import { PlainWeekDate } from 'https://deno.land/x/week-dates@v1.1.0'
```

::: tip
The rest of this documentation assumes you are using npm/yarn/pnpm/bun and importing directly from the `@zamanapp/week-dates` package.
:::

## Basic Usage

Here's a quick example to get you started with the StaticCalculator for one-time prayer time calculations:

```ts twoslash
import { PlainWeekDate } from '@zamanapp/week-dates'
import { Temporal } from '@js-temporal/polyfill'
//---cut---

const weekDate = PlainWeekDate.from({ yearOfWeek: 2021, weekOfYear: 1, dayOfWeek: 1, }) // [!code highlight]
console.log(weekDate.toString()) // 2021-W01-01
console.log(weekDate.toPlainDate().toString()) // 2021-01-04

const plainDate = Temporal.PlainDate.from({ year: 2021, month: 1, day: 4 }) // [!code highlight]
const weekDate2 = PlainWeekDate.from(plainDate) // [!code highlight]
console.log(weekDate2.toString()) // 2021-W01-01
```
