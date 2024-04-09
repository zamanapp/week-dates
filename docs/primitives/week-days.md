<script setup>
import PropertiesDefinition from "../components/PropertiesDefinitions.vue"
</script>

# Week Days


## Introduction

## `getWeekDayName`

<PropertiesDefinition property="getWeekDayName(weekDay: number, scale: Scale, weekStartDay: HWCWeekDays | ISOWeekDays = 1): string" />

## `getWeekDayCodeName`

<PropertiesDefinition property="getWeekDayCodeName(weekDay: number, scale: Scale, weekStartDay: HWCWeekDays | ISOWeekDays = 1): string" />

## `getWeekDayNumber`

<PropertiesDefinition property="getWeekDayNumber(weekDay: string | number, scale: Scale, weekStartDay: HWCWeekDays | ISOWeekDays = 1): number" />

## `getWeekDayCodeNumber`

<PropertiesDefinition property="getWeekDayCodeNumber(weekDay: string, scale: Scale, weekStartDay: HWCWeekDays | ISOWeekDays = 1): number" />

## `ISODayToHWCDay`

<PropertiesDefinition property="ISODayToHWCDay(isoWeekday: number, HWCweekStartDay: HWCWeekDays = 1, ISOweekStartDay: ISOWeekDays = 1): HWCWeekDays" />

## `HWCDayToISODay`

<PropertiesDefinition property="HWCtoISODay(HWCWeekday: number, ISOweekStartDay: ISOWeekDays = 1, HWCweekStartDay: HWCWeekDays = 1): ISOWeekDays" />