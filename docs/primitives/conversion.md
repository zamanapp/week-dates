<script setup>
import PropertiesDefinition from "../components/PropertiesDefinitions.vue"
</script>

# Conversions
<!-- TODO: replace all the references with their proper type and update the PropertyDefinition logic if needed -->
# ISO Week Date

## `temporalInstantFromISOWeek`

<PropertiesDefinition property="temporalInstantFromISOWeek(year: number, week: number, day: number = MIN_DAY, weekStartDay: ISOWeekDays = ISOWeekDays.Monday, reference?: Reference): Temporal.Instant" />

## `temporalInstantFromISOWeekString`

<PropertiesDefinition property="temporalInstantFromISOWeekString(isoWeekDate: string, reference?: Reference): Temporal.Instant" />


## `temporalToISOPlainDateWeek`

<PropertiesDefinition property="temporalToISOPlainDateWeek(date: Temporal.ZonedDateTime | Temporal.PlainDate | Temporal.PlainDateTime, weekStartDay: ISOWeekDays = ISOWeekDays.Monday): PlainWeekDate" />

## `weeksInISOYear`

<PropertiesDefinition property="weeksInISOYear(year: number, weekStartDay: ISOWeekDays = ISOWeekDays.Monday): number" />

# Hijri Week Date

## `temporalInstantFromHWCDate`

<PropertiesDefinition property="temporalInstantFromHWCDate(yearOfWeek: number, weekOfYear: number, dayOfWeek: number = MIN_DAY, calendar: SupportedHijriCalendars = 'islamic-umalqura', weekStartDay: HWCWeekDays = HWCWeekDays.Saturday, reference?: Reference): Temporal.Instant" />

## `temporalInstantFromHWCWeekString`

<PropertiesDefinition property="temporalInstantFromHWCWeekString(isoWeekDate: string, reference?: Reference): Temporal.Instant" />

## `temporalToHWCPlainDateWeek`

<PropertiesDefinition property="temporalToHWCPlainDateWeek(date: Temporal.ZonedDateTime | Temporal.PlainDate | Temporal.PlainDateTime, weekStartDay: HWCWeekDays = HWCWeekDays.Saturday): PlainWeekDate" />

## `weeksInHijriYear`

<PropertiesDefinition property="weeksInHijriYear(year: number, calendar: SupportedHijriCalendars = 'islamic-umalqura', weekStartDay: HWCWeekDays = HWCWeekDays.Saturday): number" />