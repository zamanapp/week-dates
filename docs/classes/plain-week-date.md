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
