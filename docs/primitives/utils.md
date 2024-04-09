<script setup>
import PropertiesDefinition from "../components/PropertiesDefinitions.vue"
</script>

# Utilities

The following are utilities that are used and exposed by the library:

## `getCalendarFormId`

<PropertiesDefinition property="getCalendarFormId(id: SupportedCalendars, weekStartDay: HWCWeekDays | ISOWeekDays = 1): Temporal.CalendarLike" />

## `getCalendarSuperId`

<PropertiesDefinition property="getCalendarSuperId(id: SupportedCalendars): SupportedNativeCalendars" />

## `getScaleFromCalendarId`

<PropertiesDefinition property="getScaleFromCalendarId(id: SupportedCalendars): Scale" />

## `isSupportedCalendar`

<PropertiesDefinition property="isSupportedCalendar(id: string): boolean" />

## `instantToOtherTemporal`

<PropertiesDefinition property="instantToOtherTemporal<T>(instant: Temporal.Instant, target: T): T" />

## `pymod`

<PropertiesDefinition property="pymod(a: number, b: number): number" />