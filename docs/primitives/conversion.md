<script setup>
import PropertiesDefinition from "../components/PropertiesDefinitions.vue"
</script>

# Conversions

# ISO Week Date

## `temporalInstantFromISOWeek`

<PropertiesDefinition property="temporalInstantFromISOWeek(
  year: number,
  week: number,
  day: number = MIN_DAY,
  weekStartDay = ISOWeekDays.Monday,
  reference?: {
    referenceTime?: Temporal.PlainDateTime | Temporal.ZonedDateTime | Temporal.PlainTime
    referenceTimezone?: Temporal.TimeZoneLike
  },
): Temporal.Instant" />

## `temporalInstantFromISOWeekString`

<PropertiesDefinition property="temporalInstantFromISOWeekString(isoWeekDate: string, reference?: {
  referenceTime?: Temporal.PlainDateTime | Temporal.ZonedDateTime | Temporal.PlainTime
  referenceTimezone?: Temporal.TimeZoneLike
}): Temporal.Instant" />


## `temporalToISOPlainDateWeek`

<PropertiesDefinition property="temporalToISOPlainDateWeek(
  date: Temporal.ZonedDateTime | Temporal.PlainDate | Temporal.PlainDateTime,
  weekStartDay = ISOWeekDays.Monday,
): PlainWeekDate" />

## `weeksInISOYear`

<PropertiesDefinition property="weeksInISOYear(year: number, weekStartDay = ISOWeekDays.Monday): number" />

# Hijri Week Date

## `temporalInstantFromHWCDate`

<PropertiesDefinition property="temporalInstantFromHWCDate(
  yearOfWeek: number,
  weekOfYear: number,
  dayOfWeek: number = MIN_DAY,
  calendar: SupportedHijriCalendars = 'islamic-umalqura',
  weekStartDay = HWCWeekDays.Saturday,
  reference?: {
    referenceTime?: Temporal.PlainDateTime | Temporal.ZonedDateTime | Temporal.PlainTime
    referenceTimezone?: Temporal.TimeZoneLike
  },
): Temporal.Instant" />

## `temporalInstantFromHWCWeekString`

<PropertiesDefinition property="temporalInstantFromHWCWeekString(isoWeekDate: string, reference?: {
  referenceTime?: Temporal.PlainDateTime | Temporal.ZonedDateTime | Temporal.PlainTime
  referenceTimezone?: Temporal.TimeZoneLike
  referenceCalendar?: SupportedHijriCalendars
}): Temporal.Instant" />

## `temporalToHWCPlainDateWeek`

<PropertiesDefinition property="temporalToHWCPlainDateWeek(
  date: Temporal.ZonedDateTime | Temporal.PlainDate | Temporal.PlainDateTime,
  weekStartDay = HWCWeekDays.Saturday,
): PlainWeekDate" />

## `weeksInHijriYear`

<PropertiesDefinition property="weeksInHijriYear(year: number, calendar: SupportedHijriCalendars = 'islamic-umalqura', weekStartDay = HWCWeekDays.Saturday): number" />