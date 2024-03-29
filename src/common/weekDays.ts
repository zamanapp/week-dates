import type { Scale } from './calendars'
import { Scales } from './calendars'

export enum ISOWeekDays {
  Monday = 1,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

export enum ISOWeekDaysCodes {
  MO = 1,
  TU,
  WE,
  TH,
  FR,
  SA,
  SU,
}

export const ISOWeekDaysNames = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

export const ISOWeekDaysCodeNames = [
  'MO',
  'TU',
  'WE',
  'TH',
  'FR',
  'SA',
  'SU',
]

export enum HWCWeekDays {
  Saturday = 1,
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
}

export enum HWCWeekDaysCodes {
  SA = 1,
  SU,
  MO,
  TU,
  WE,
  TH,
  FR,
}

export const HWCWeekDaysNames = [
  'Saturday',
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
]

export const HWCWeekDaysCodeNames = [
  'SA',
  'SU',
  'MO',
  'TU',
  'WE',
  'TH',
  'FR',
]

const namesOffset = [
  [0, 1, 2, 3, 4, 5, 6],
  [1, 2, 3, 4, 5, 6, 0],
  [2, 3, 4, 5, 6, 0, 1],
  [3, 4, 5, 6, 0, 1, 2],
  [4, 5, 6, 0, 1, 2, 3],
  [5, 6, 0, 1, 2, 3, 4],
  [6, 0, 1, 2, 3, 4, 5],
]

const numbersOffset = [
  [0, 1, 2, 3, 4, 5, 6],
  [6, 0, 1, 2, 3, 4, 5],
  [5, 6, 0, 1, 2, 3, 4],
  [4, 5, 6, 0, 1, 2, 3],
  [3, 4, 5, 6, 0, 1, 2],
  [2, 3, 4, 5, 6, 0, 1],
  [1, 2, 3, 4, 5, 6, 0],
]

export function getWeekDayName(weekDay: number, scale: Scale, WeekDayStart: HWCWeekDays | ISOWeekDays = 1): string {
  const index = namesOffset[WeekDayStart - 1][weekDay - 1]
  if (scale === Scales.Gregorian)
    return ISOWeekDaysNames[index]

  return HWCWeekDaysNames[index]
}

export function getWeekDayCodeName(weekDay: number, scale: Scale, WeekDayStart: HWCWeekDays | ISOWeekDays = 1): string {
  const index = namesOffset[WeekDayStart - 1][weekDay - 1]
  if (scale === Scales.Gregorian)
    return ISOWeekDaysCodeNames[index]

  return HWCWeekDaysCodeNames[index]
}

export function getWeekDayNumber(weekDay: string | number, scale: Scale, WeekDayStart: HWCWeekDays | ISOWeekDays = 1): number {
  if (scale === Scales.Gregorian) {
    if (typeof weekDay === 'string') {
      const index = ISOWeekDaysNames.findIndex(name => name === weekDay)
      const offset = numbersOffset[WeekDayStart - 1][index]
      return offset + 1
    }
    else {
      const offset = numbersOffset[WeekDayStart - 1][weekDay - 1]
      return offset + 1
    }
  }

  if (typeof weekDay === 'string') {
    const index = HWCWeekDaysNames.findIndex(name => name === weekDay)
    const offset = numbersOffset[WeekDayStart - 1][index]
    return offset + 1
  }
  else {
    const offset = numbersOffset[WeekDayStart - 1][weekDay - 1]
    return offset + 1
  }
}

export function getWeekDayCodeNumber(weekDay: string, scale: Scale, WeekDayStart: HWCWeekDays | ISOWeekDays = 1): number {
  if (!ISOWeekDaysCodeNames.includes(weekDay))
    throw new Error('Invalid week day code')

  if (scale === Scales.Gregorian) {
    const index = ISOWeekDaysCodeNames.findIndex(name => name === weekDay)
    const offset = numbersOffset[WeekDayStart - 1][index]
    return offset + 1
  }

  const index = HWCWeekDaysCodeNames.findIndex(name => name === weekDay)
  const offset = numbersOffset[WeekDayStart - 1][index]
  return offset + 1
}

const customHijriToISOOffsets = [
// MO TU WE TH FR SA SU
  [2, 3, 4, 5, 6, 7, 1], // HWC Saturday
  [1, 2, 3, 4, 5, 6, 7], // HWC Sunday
  [7, 1, 2, 3, 4, 5, 6], // HWC Monday
  [6, 7, 1, 2, 3, 4, 5], // HWC Tuesday
  [5, 6, 7, 1, 2, 3, 4], // HWC Wednesday
  [4, 5, 6, 7, 1, 2, 3], // HWC Thursday
  [3, 4, 5, 6, 7, 1, 2], // HWC Friday

] // Custom offsets for each day of the week

export function ISODayToHWCDay(isoWeekday: number, HWCWeekDayStart: HWCWeekDays = 1, ISOWeekDayStart: ISOWeekDays = 1): number {
  const offset = customHijriToISOOffsets[HWCWeekDayStart - 1][ISOWeekDayStart - 1]
  return (isoWeekday + offset) % 7 || 7
}

const customISOToHijriOffsets = [
// SA SU MO TU WE TH FR
  [5, 6, 7, 1, 2, 3, 4], // ISO Monday
  [4, 5, 6, 7, 1, 2, 3], // ISO Tuesday
  [3, 4, 5, 6, 7, 1, 2], // ISO Wednesday
  [2, 3, 4, 5, 6, 7, 1], // ISO Thursday
  [1, 2, 3, 4, 5, 6, 7], // ISO Friday
  [7, 1, 2, 3, 4, 5, 6], // ISO Saturday
  [6, 7, 1, 2, 3, 4, 5], // ISO Sunday
]

export function HWCtoISODay(HWCWeekday: number, ISOWeekDayStart: ISOWeekDays = 1, HWCWeekDayStart: HWCWeekDays = 1): number {
  const offset = customISOToHijriOffsets[ISOWeekDayStart - 1][HWCWeekDayStart - 1]
  return (HWCWeekday + offset) % 7 || 7
}
