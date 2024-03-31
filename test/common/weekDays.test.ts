import { describe, expect, it } from 'vitest'
import { HWCWeekDays, HWCtoISODay, ISODayToHWCDay, ISOWeekDays, getWeekDayCodeName, getWeekDayCodeNumber, getWeekDayName, getWeekDayNumber } from '../../src/common/weekDays'
import { Scales } from '../../src/common/calendars'

describe('weekdays tests should pass', () => {
  it('should return correct names for ISO weekdays', () => {
    expect(getWeekDayName(1, Scales.Gregorian)).toBe('Monday')
    expect(getWeekDayName(2, Scales.Gregorian)).toBe('Tuesday')
    expect(getWeekDayName(3, Scales.Gregorian)).toBe('Wednesday')
    expect(getWeekDayName(4, Scales.Gregorian)).toBe('Thursday')
    expect(getWeekDayName(5, Scales.Gregorian)).toBe('Friday')
    expect(getWeekDayName(6, Scales.Gregorian)).toBe('Saturday')
    expect(getWeekDayName(7, Scales.Gregorian)).toBe('Sunday')
    // changing the start day
    expect(getWeekDayName(1, Scales.Gregorian, ISOWeekDays.Tuesday)).toBe('Tuesday')
    expect(getWeekDayName(1, Scales.Gregorian, ISOWeekDays.Wednesday)).toBe('Wednesday')
    expect(getWeekDayName(1, Scales.Gregorian, ISOWeekDays.Thursday)).toBe('Thursday')
    expect(getWeekDayName(1, Scales.Gregorian, ISOWeekDays.Friday)).toBe('Friday')
    expect(getWeekDayName(1, Scales.Gregorian, ISOWeekDays.Saturday)).toBe('Saturday')
    expect(getWeekDayName(1, Scales.Gregorian, ISOWeekDays.Sunday)).toBe('Sunday')

    expect(getWeekDayName(7, Scales.Gregorian, ISOWeekDays.Sunday)).toBe('Saturday')
  })
  it('should return correct names for HWC weekdays', () => {
    expect(getWeekDayName(1, Scales.Hijri)).toBe('Saturday')
    expect(getWeekDayName(2, Scales.Hijri)).toBe('Sunday')
    expect(getWeekDayName(3, Scales.Hijri)).toBe('Monday')
    expect(getWeekDayName(4, Scales.Hijri)).toBe('Tuesday')
    expect(getWeekDayName(5, Scales.Hijri)).toBe('Wednesday')
    expect(getWeekDayName(6, Scales.Hijri)).toBe('Thursday')
    expect(getWeekDayName(7, Scales.Hijri)).toBe('Friday')
    // changing the start day
    expect(getWeekDayName(1, Scales.Hijri, HWCWeekDays.Sunday)).toBe('Sunday')
    expect(getWeekDayName(1, Scales.Hijri, HWCWeekDays.Monday)).toBe('Monday')
    expect(getWeekDayName(1, Scales.Hijri, HWCWeekDays.Tuesday)).toBe('Tuesday')
    expect(getWeekDayName(1, Scales.Hijri, HWCWeekDays.Wednesday)).toBe('Wednesday')
    expect(getWeekDayName(1, Scales.Hijri, HWCWeekDays.Thursday)).toBe('Thursday')
    expect(getWeekDayName(1, Scales.Hijri, HWCWeekDays.Friday)).toBe('Friday')

    expect(getWeekDayName(7, Scales.Hijri, HWCWeekDays.Sunday)).toBe('Saturday')
  })

  it('should return correct code names for ISO weekdays', () => {
    expect(getWeekDayCodeName(1, Scales.Gregorian)).toBe('MO')
    expect(getWeekDayCodeName(2, Scales.Gregorian)).toBe('TU')
    expect(getWeekDayCodeName(3, Scales.Gregorian)).toBe('WE')
    expect(getWeekDayCodeName(4, Scales.Gregorian)).toBe('TH')
    expect(getWeekDayCodeName(5, Scales.Gregorian)).toBe('FR')
    expect(getWeekDayCodeName(6, Scales.Gregorian)).toBe('SA')
    expect(getWeekDayCodeName(7, Scales.Gregorian)).toBe('SU')
    // changing the start day
    expect(getWeekDayCodeName(1, Scales.Gregorian, ISOWeekDays.Tuesday)).toBe('TU')
    expect(getWeekDayCodeName(1, Scales.Gregorian, ISOWeekDays.Wednesday)).toBe('WE')
    expect(getWeekDayCodeName(1, Scales.Gregorian, ISOWeekDays.Thursday)).toBe('TH')
    expect(getWeekDayCodeName(1, Scales.Gregorian, ISOWeekDays.Friday)).toBe('FR')
    expect(getWeekDayCodeName(1, Scales.Gregorian, ISOWeekDays.Saturday)).toBe('SA')
    expect(getWeekDayCodeName(1, Scales.Gregorian, ISOWeekDays.Sunday)).toBe('SU')

    expect(getWeekDayCodeName(7, Scales.Gregorian, ISOWeekDays.Sunday)).toBe('SA')
  })

  it('should return correct code names for HWC weekdays', () => {
    expect(getWeekDayCodeName(1, Scales.Hijri)).toBe('SA')
    expect(getWeekDayCodeName(2, Scales.Hijri)).toBe('SU')
    expect(getWeekDayCodeName(3, Scales.Hijri)).toBe('MO')
    expect(getWeekDayCodeName(4, Scales.Hijri)).toBe('TU')
    expect(getWeekDayCodeName(5, Scales.Hijri)).toBe('WE')
    expect(getWeekDayCodeName(6, Scales.Hijri)).toBe('TH')
    expect(getWeekDayCodeName(7, Scales.Hijri)).toBe('FR')
    // changing the start day
    expect(getWeekDayCodeName(1, Scales.Hijri, HWCWeekDays.Sunday)).toBe('SU')
    expect(getWeekDayCodeName(1, Scales.Hijri, HWCWeekDays.Monday)).toBe('MO')
    expect(getWeekDayCodeName(1, Scales.Hijri, HWCWeekDays.Tuesday)).toBe('TU')
    expect(getWeekDayCodeName(1, Scales.Hijri, HWCWeekDays.Wednesday)).toBe('WE')
    expect(getWeekDayCodeName(1, Scales.Hijri, HWCWeekDays.Thursday)).toBe('TH')
    expect(getWeekDayCodeName(1, Scales.Hijri, HWCWeekDays.Friday)).toBe('FR')

    expect(getWeekDayCodeName(7, Scales.Hijri, HWCWeekDays.Sunday)).toBe('SA')
  })

  it('should return correct number for ISO weekdays', () => {
    expect(getWeekDayNumber('Monday', Scales.Gregorian)).toBe(1)
    expect(getWeekDayNumber('Tuesday', Scales.Gregorian)).toBe(2)
    expect(getWeekDayNumber('Wednesday', Scales.Gregorian)).toBe(3)
    expect(getWeekDayNumber('Thursday', Scales.Gregorian)).toBe(4)
    expect(getWeekDayNumber('Friday', Scales.Gregorian)).toBe(5)
    expect(getWeekDayNumber('Saturday', Scales.Gregorian)).toBe(6)
    expect(getWeekDayNumber('Sunday', Scales.Gregorian)).toBe(7)
    // changing the start day
    expect(getWeekDayNumber('Tuesday', Scales.Gregorian, ISOWeekDays.Tuesday)).toBe(1)
    expect(getWeekDayNumber('Wednesday', Scales.Gregorian, ISOWeekDays.Wednesday)).toBe(1)
    expect(getWeekDayNumber('Thursday', Scales.Gregorian, ISOWeekDays.Thursday)).toBe(1)
    expect(getWeekDayNumber('Friday', Scales.Gregorian, ISOWeekDays.Friday)).toBe(1)
    expect(getWeekDayNumber('Saturday', Scales.Gregorian, ISOWeekDays.Saturday)).toBe(1)
    expect(getWeekDayNumber('Sunday', Scales.Gregorian, ISOWeekDays.Sunday)).toBe(1)

    expect(getWeekDayNumber('Monday', Scales.Gregorian, ISOWeekDays.Sunday)).toBe(2)
    expect(getWeekDayNumber('Saturday', Scales.Gregorian, ISOWeekDays.Sunday)).toBe(7)
  })

  it('should return correct number for HWC weekdays', () => {
    expect(getWeekDayNumber('Saturday', Scales.Hijri)).toBe(1)
    expect(getWeekDayNumber('Sunday', Scales.Hijri)).toBe(2)
    expect(getWeekDayNumber('Monday', Scales.Hijri)).toBe(3)
    expect(getWeekDayNumber('Tuesday', Scales.Hijri)).toBe(4)
    expect(getWeekDayNumber('Wednesday', Scales.Hijri)).toBe(5)
    expect(getWeekDayNumber('Thursday', Scales.Hijri)).toBe(6)
    expect(getWeekDayNumber('Friday', Scales.Hijri)).toBe(7)
    // changing the start day
    expect(getWeekDayNumber('Sunday', Scales.Hijri, HWCWeekDays.Sunday)).toBe(1)
    expect(getWeekDayNumber('Monday', Scales.Hijri, HWCWeekDays.Monday)).toBe(1)
    expect(getWeekDayNumber('Tuesday', Scales.Hijri, HWCWeekDays.Tuesday)).toBe(1)
    expect(getWeekDayNumber('Wednesday', Scales.Hijri, HWCWeekDays.Wednesday)).toBe(1)
    expect(getWeekDayNumber('Thursday', Scales.Hijri, HWCWeekDays.Thursday)).toBe(1)
    expect(getWeekDayNumber('Friday', Scales.Hijri, HWCWeekDays.Friday)).toBe(1)

    expect(getWeekDayNumber('Saturday', Scales.Hijri, HWCWeekDays.Sunday)).toBe(7)
  })

  it('should return correct number for ISO weekdays Code', () => {
    expect(getWeekDayCodeNumber('MO', Scales.Gregorian)).toBe(1)
    expect(getWeekDayCodeNumber('TU', Scales.Gregorian)).toBe(2)
    expect(getWeekDayCodeNumber('WE', Scales.Gregorian)).toBe(3)
    expect(getWeekDayCodeNumber('TH', Scales.Gregorian)).toBe(4)
    expect(getWeekDayCodeNumber('FR', Scales.Gregorian)).toBe(5)
    expect(getWeekDayCodeNumber('SA', Scales.Gregorian)).toBe(6)
    expect(getWeekDayCodeNumber('SU', Scales.Gregorian)).toBe(7)
    // changing the start day
    expect(getWeekDayCodeNumber('TU', Scales.Gregorian, ISOWeekDays.Tuesday)).toBe(1)
    expect(getWeekDayCodeNumber('WE', Scales.Gregorian, ISOWeekDays.Wednesday)).toBe(1)
    expect(getWeekDayCodeNumber('TH', Scales.Gregorian, ISOWeekDays.Thursday)).toBe(1)
    expect(getWeekDayCodeNumber('FR', Scales.Gregorian, ISOWeekDays.Friday)).toBe(1)
    expect(getWeekDayCodeNumber('SA', Scales.Gregorian, ISOWeekDays.Saturday)).toBe(1)
    expect(getWeekDayCodeNumber('SU', Scales.Gregorian, ISOWeekDays.Sunday)).toBe(1)

    expect(getWeekDayCodeNumber('MO', Scales.Gregorian, ISOWeekDays.Sunday)).toBe(2)
    expect(getWeekDayCodeNumber('SA', Scales.Gregorian, ISOWeekDays.Sunday)).toBe(7)
  })

  it('should return correct number for HWC weekdays Code', () => {
    expect(getWeekDayCodeNumber('SA', Scales.Hijri)).toBe(1)
    expect(getWeekDayCodeNumber('SU', Scales.Hijri)).toBe(2)
    expect(getWeekDayCodeNumber('MO', Scales.Hijri)).toBe(3)
    expect(getWeekDayCodeNumber('TU', Scales.Hijri)).toBe(4)
    expect(getWeekDayCodeNumber('WE', Scales.Hijri)).toBe(5)
    expect(getWeekDayCodeNumber('TH', Scales.Hijri)).toBe(6)
    expect(getWeekDayCodeNumber('FR', Scales.Hijri)).toBe(7)
    // changing the start day
    expect(getWeekDayCodeNumber('SU', Scales.Hijri, HWCWeekDays.Sunday)).toBe(1)
    expect(getWeekDayCodeNumber('MO', Scales.Hijri, HWCWeekDays.Monday)).toBe(1)
    expect(getWeekDayCodeNumber('TU', Scales.Hijri, HWCWeekDays.Tuesday)).toBe(1)
    expect(getWeekDayCodeNumber('WE', Scales.Hijri, HWCWeekDays.Wednesday)).toBe(1)
    expect(getWeekDayCodeNumber('TH', Scales.Hijri, HWCWeekDays.Thursday)).toBe(1)
    expect(getWeekDayCodeNumber('FR', Scales.Hijri, HWCWeekDays.Friday)).toBe(1)

    expect(getWeekDayCodeNumber('SA', Scales.Hijri, HWCWeekDays.Sunday)).toBe(7)
  })

  it('should convert properly between ISO and HWC weekdays', () => {
    // ISO: MO=1,TU=2,WE=3,TH=4,FR=5,SA=6,SU=7
    // HWC: SA=1,SU=2,MO=3,TU=4,WE=5,TH=6,FR=7
    expect(ISODayToHWCDay(1)).toBe(3)
    expect(ISODayToHWCDay(2)).toBe(4)
    expect(ISODayToHWCDay(3)).toBe(5)
    expect(ISODayToHWCDay(4)).toBe(6)
    expect(ISODayToHWCDay(5)).toBe(7)
    expect(ISODayToHWCDay(6)).toBe(1)
    expect(ISODayToHWCDay(7)).toBe(2)
    // ISO: TU=1,WE=2,TH=3,FR=4,SA=5,SU=6,MO=7
    // HWC: SA=1,SU=2,MO=3,TU=4,WE=5,TH=6,FR=7
    expect(ISODayToHWCDay(1, HWCWeekDays.Saturday, ISOWeekDays.Tuesday)).toBe(4)
    expect(ISODayToHWCDay(2, HWCWeekDays.Saturday, ISOWeekDays.Tuesday)).toBe(5)
    expect(ISODayToHWCDay(3, HWCWeekDays.Saturday, ISOWeekDays.Tuesday)).toBe(6)
    expect(ISODayToHWCDay(4, HWCWeekDays.Saturday, ISOWeekDays.Tuesday)).toBe(7)
    expect(ISODayToHWCDay(5, HWCWeekDays.Saturday, ISOWeekDays.Tuesday)).toBe(1)
    expect(ISODayToHWCDay(6, HWCWeekDays.Saturday, ISOWeekDays.Tuesday)).toBe(2)
    expect(ISODayToHWCDay(7, HWCWeekDays.Saturday, ISOWeekDays.Tuesday)).toBe(3)
    // ISO: WE=1,TH=2,FR=3,SA=4,SU=5,MO=6,TU=7
    // HWC: SA=1,SU=2,MO=3,TU=4,WE=5,TH=6,FR=7
    expect(ISODayToHWCDay(1, HWCWeekDays.Saturday, ISOWeekDays.Wednesday)).toBe(5)
    expect(ISODayToHWCDay(2, HWCWeekDays.Saturday, ISOWeekDays.Wednesday)).toBe(6)
    expect(ISODayToHWCDay(3, HWCWeekDays.Saturday, ISOWeekDays.Wednesday)).toBe(7)
    expect(ISODayToHWCDay(4, HWCWeekDays.Saturday, ISOWeekDays.Wednesday)).toBe(1)
    expect(ISODayToHWCDay(5, HWCWeekDays.Saturday, ISOWeekDays.Wednesday)).toBe(2)
    expect(ISODayToHWCDay(6, HWCWeekDays.Saturday, ISOWeekDays.Wednesday)).toBe(3)
    expect(ISODayToHWCDay(7, HWCWeekDays.Saturday, ISOWeekDays.Wednesday)).toBe(4)
    // ISO: TH=1,FR=2,SA=3,SU=4,MO=5,TU=6,WE=7
    // HWC: SA=1,SU=2,MO=3,TU=4,WE=5,TH=6,FR=7
    expect(ISODayToHWCDay(1, HWCWeekDays.Saturday, ISOWeekDays.Thursday)).toBe(6)
    expect(ISODayToHWCDay(2, HWCWeekDays.Saturday, ISOWeekDays.Thursday)).toBe(7)
    expect(ISODayToHWCDay(3, HWCWeekDays.Saturday, ISOWeekDays.Thursday)).toBe(1)
    expect(ISODayToHWCDay(4, HWCWeekDays.Saturday, ISOWeekDays.Thursday)).toBe(2)
    expect(ISODayToHWCDay(5, HWCWeekDays.Saturday, ISOWeekDays.Thursday)).toBe(3)
    expect(ISODayToHWCDay(6, HWCWeekDays.Saturday, ISOWeekDays.Thursday)).toBe(4)
    expect(ISODayToHWCDay(7, HWCWeekDays.Saturday, ISOWeekDays.Thursday)).toBe(5)
    // ISO: FR=1,SA=2,SU=3,MO=4,TU=5,WE=6,TH=7
    // HWC: SA=1,SU=2,MO=3,TU=4,WE=5,TH=6,FR=7
    expect(ISODayToHWCDay(1, HWCWeekDays.Saturday, ISOWeekDays.Friday)).toBe(7)
    expect(ISODayToHWCDay(2, HWCWeekDays.Saturday, ISOWeekDays.Friday)).toBe(1)
    expect(ISODayToHWCDay(3, HWCWeekDays.Saturday, ISOWeekDays.Friday)).toBe(2)
    expect(ISODayToHWCDay(4, HWCWeekDays.Saturday, ISOWeekDays.Friday)).toBe(3)
    expect(ISODayToHWCDay(5, HWCWeekDays.Saturday, ISOWeekDays.Friday)).toBe(4)
    expect(ISODayToHWCDay(6, HWCWeekDays.Saturday, ISOWeekDays.Friday)).toBe(5)
    expect(ISODayToHWCDay(7, HWCWeekDays.Saturday, ISOWeekDays.Friday)).toBe(6)
    // ISO: SA=1,SU=2,MO=3,TU=4,WE=5,TH=6,FR=7
    // HWC: SA=1,SU=2,MO=3,TU=4,WE=5,TH=6,FR=7
    expect(ISODayToHWCDay(1, HWCWeekDays.Saturday, ISOWeekDays.Saturday)).toBe(1)
    expect(ISODayToHWCDay(2, HWCWeekDays.Saturday, ISOWeekDays.Saturday)).toBe(2)
    expect(ISODayToHWCDay(3, HWCWeekDays.Saturday, ISOWeekDays.Saturday)).toBe(3)
    expect(ISODayToHWCDay(4, HWCWeekDays.Saturday, ISOWeekDays.Saturday)).toBe(4)
    expect(ISODayToHWCDay(5, HWCWeekDays.Saturday, ISOWeekDays.Saturday)).toBe(5)
    expect(ISODayToHWCDay(6, HWCWeekDays.Saturday, ISOWeekDays.Saturday)).toBe(6)
    expect(ISODayToHWCDay(7, HWCWeekDays.Saturday, ISOWeekDays.Saturday)).toBe(7)
    // ISO: SU=1,MO=2,TU=3,WE=4,TH=5,FR=6,SA=7
    // HWC: SA=1,SU=2,MO=3,TU=4,WE=5,TH=6,FR=7
    expect(ISODayToHWCDay(1, HWCWeekDays.Saturday, ISOWeekDays.Sunday)).toBe(2)
    expect(ISODayToHWCDay(2, HWCWeekDays.Saturday, ISOWeekDays.Sunday)).toBe(3)
    expect(ISODayToHWCDay(3, HWCWeekDays.Saturday, ISOWeekDays.Sunday)).toBe(4)
    expect(ISODayToHWCDay(4, HWCWeekDays.Saturday, ISOWeekDays.Sunday)).toBe(5)
    expect(ISODayToHWCDay(5, HWCWeekDays.Saturday, ISOWeekDays.Sunday)).toBe(6)
    expect(ISODayToHWCDay(6, HWCWeekDays.Saturday, ISOWeekDays.Sunday)).toBe(7)
    expect(ISODayToHWCDay(7, HWCWeekDays.Saturday, ISOWeekDays.Sunday)).toBe(1)

    // ISO: MO=1,TU=2,WE=3,TH=4,FR=5,SA=6,SU=7
    // HWC: SU=1,MO=2,TU=3,WE=4,TH=5,FR=6,SA=7
    expect(ISODayToHWCDay(1, HWCWeekDays.Sunday)).toBe(2)
    expect(ISODayToHWCDay(2, HWCWeekDays.Sunday)).toBe(3)
    expect(ISODayToHWCDay(3, HWCWeekDays.Sunday)).toBe(4)
    expect(ISODayToHWCDay(4, HWCWeekDays.Sunday)).toBe(5)
    expect(ISODayToHWCDay(5, HWCWeekDays.Sunday)).toBe(6)
    expect(ISODayToHWCDay(6, HWCWeekDays.Sunday)).toBe(7)
    expect(ISODayToHWCDay(7, HWCWeekDays.Sunday)).toBe(1)
    // ISO: TU=1,WE=2,TH=3,FR=4,SA=5,SU=6,MO=7
    // HWC: SU=1,MO=2,TU=3,WE=4,TH=5,FR=6,SA=7
    expect(ISODayToHWCDay(1, HWCWeekDays.Sunday, ISOWeekDays.Tuesday)).toBe(3)
    expect(ISODayToHWCDay(2, HWCWeekDays.Sunday, ISOWeekDays.Tuesday)).toBe(4)
    expect(ISODayToHWCDay(3, HWCWeekDays.Sunday, ISOWeekDays.Tuesday)).toBe(5)
    expect(ISODayToHWCDay(4, HWCWeekDays.Sunday, ISOWeekDays.Tuesday)).toBe(6)
    expect(ISODayToHWCDay(5, HWCWeekDays.Sunday, ISOWeekDays.Tuesday)).toBe(7)
    expect(ISODayToHWCDay(6, HWCWeekDays.Sunday, ISOWeekDays.Tuesday)).toBe(1)
    expect(ISODayToHWCDay(7, HWCWeekDays.Sunday, ISOWeekDays.Tuesday)).toBe(2)
    // ISO: WE=1,TH=2,FR=3,SA=4,SU=5,MO=6,TU=7
    // HWC: SU=1,MO=2,TU=3,WE=4,TH=5,FR=6,SA=7
    expect(ISODayToHWCDay(1, HWCWeekDays.Sunday, ISOWeekDays.Wednesday)).toBe(4)
    expect(ISODayToHWCDay(2, HWCWeekDays.Sunday, ISOWeekDays.Wednesday)).toBe(5)
    expect(ISODayToHWCDay(3, HWCWeekDays.Sunday, ISOWeekDays.Wednesday)).toBe(6)
    expect(ISODayToHWCDay(4, HWCWeekDays.Sunday, ISOWeekDays.Wednesday)).toBe(7)
    expect(ISODayToHWCDay(5, HWCWeekDays.Sunday, ISOWeekDays.Wednesday)).toBe(1)
    expect(ISODayToHWCDay(6, HWCWeekDays.Sunday, ISOWeekDays.Wednesday)).toBe(2)
    expect(ISODayToHWCDay(7, HWCWeekDays.Sunday, ISOWeekDays.Wednesday)).toBe(3)
    // ISO: TH=1,FR=2,SA=3,SU=4,MO=5,TU=6,WE=7
    // HWC: SU=1,MO=2,TU=3,WE=4,TH=5,FR=6,SA=7
    expect(ISODayToHWCDay(1, HWCWeekDays.Sunday, ISOWeekDays.Thursday)).toBe(5)
    expect(ISODayToHWCDay(2, HWCWeekDays.Sunday, ISOWeekDays.Thursday)).toBe(6)
    expect(ISODayToHWCDay(3, HWCWeekDays.Sunday, ISOWeekDays.Thursday)).toBe(7)
    expect(ISODayToHWCDay(4, HWCWeekDays.Sunday, ISOWeekDays.Thursday)).toBe(1)
    expect(ISODayToHWCDay(5, HWCWeekDays.Sunday, ISOWeekDays.Thursday)).toBe(2)
    expect(ISODayToHWCDay(6, HWCWeekDays.Sunday, ISOWeekDays.Thursday)).toBe(3)
    expect(ISODayToHWCDay(7, HWCWeekDays.Sunday, ISOWeekDays.Thursday)).toBe(4)
    // ISO: FR=1,SA=2,SU=3,MO=4,TU=5,WE=6,TH=7
    // HWC: SU=1,MO=2,TU=3,WE=4,TH=5,FR=6,SA=7
    expect(ISODayToHWCDay(1, HWCWeekDays.Sunday, ISOWeekDays.Friday)).toBe(6)
    expect(ISODayToHWCDay(2, HWCWeekDays.Sunday, ISOWeekDays.Friday)).toBe(7)
    expect(ISODayToHWCDay(3, HWCWeekDays.Sunday, ISOWeekDays.Friday)).toBe(1)
    expect(ISODayToHWCDay(4, HWCWeekDays.Sunday, ISOWeekDays.Friday)).toBe(2)
    expect(ISODayToHWCDay(5, HWCWeekDays.Sunday, ISOWeekDays.Friday)).toBe(3)
    expect(ISODayToHWCDay(6, HWCWeekDays.Sunday, ISOWeekDays.Friday)).toBe(4)
    expect(ISODayToHWCDay(7, HWCWeekDays.Sunday, ISOWeekDays.Friday)).toBe(5)
    // ISO: SA=1,SU=2,MO=3,TU=4,WE=5,TH=6,FR=7
    // HWC: SU=1,MO=2,TU=3,WE=4,TH=5,FR=6,SA=7
    expect(ISODayToHWCDay(1, HWCWeekDays.Sunday, ISOWeekDays.Saturday)).toBe(7)
    expect(ISODayToHWCDay(2, HWCWeekDays.Sunday, ISOWeekDays.Saturday)).toBe(1)
    expect(ISODayToHWCDay(3, HWCWeekDays.Sunday, ISOWeekDays.Saturday)).toBe(2)
    expect(ISODayToHWCDay(4, HWCWeekDays.Sunday, ISOWeekDays.Saturday)).toBe(3)
    expect(ISODayToHWCDay(5, HWCWeekDays.Sunday, ISOWeekDays.Saturday)).toBe(4)
    expect(ISODayToHWCDay(6, HWCWeekDays.Sunday, ISOWeekDays.Saturday)).toBe(5)
    expect(ISODayToHWCDay(7, HWCWeekDays.Sunday, ISOWeekDays.Saturday)).toBe(6)
    // ISO: SU=1,MO=2,TU=3,WE=4,TH=5,FR=6,SA=7
    // HWC: SU=1,MO=2,TU=3,WE=4,TH=5,FR=6,SA=7
    expect(ISODayToHWCDay(1, HWCWeekDays.Sunday, ISOWeekDays.Sunday)).toBe(1)
    expect(ISODayToHWCDay(2, HWCWeekDays.Sunday, ISOWeekDays.Sunday)).toBe(2)
    expect(ISODayToHWCDay(3, HWCWeekDays.Sunday, ISOWeekDays.Sunday)).toBe(3)
    expect(ISODayToHWCDay(4, HWCWeekDays.Sunday, ISOWeekDays.Sunday)).toBe(4)
    expect(ISODayToHWCDay(5, HWCWeekDays.Sunday, ISOWeekDays.Sunday)).toBe(5)
    expect(ISODayToHWCDay(6, HWCWeekDays.Sunday, ISOWeekDays.Sunday)).toBe(6)
    expect(ISODayToHWCDay(7, HWCWeekDays.Sunday, ISOWeekDays.Sunday)).toBe(7)

    // ISO: MO=1,TU=2,WE=3,TH=4,FR=5,SA=6,SU=7
    // HWC: MO=1,TU=2,WE=3,TH=4,FR=5,SA=6,SU=7
    expect(ISODayToHWCDay(1, HWCWeekDays.Monday)).toBe(1)
    expect(ISODayToHWCDay(2, HWCWeekDays.Monday)).toBe(2)
    expect(ISODayToHWCDay(3, HWCWeekDays.Monday)).toBe(3)
    expect(ISODayToHWCDay(4, HWCWeekDays.Monday)).toBe(4)
    expect(ISODayToHWCDay(5, HWCWeekDays.Monday)).toBe(5)
    expect(ISODayToHWCDay(6, HWCWeekDays.Monday)).toBe(6)
    expect(ISODayToHWCDay(7, HWCWeekDays.Monday)).toBe(7)
    // ISO: MO=1,TU=2,WE=3,TH=4,FR=5,SA=6,SU=7
    // HWC: TU=1,WE=2,TH=3,FR=4,SA=5,SU=6,MO=7
    expect(ISODayToHWCDay(1, HWCWeekDays.Tuesday)).toBe(7)
    expect(ISODayToHWCDay(2, HWCWeekDays.Tuesday)).toBe(1)
    expect(ISODayToHWCDay(3, HWCWeekDays.Tuesday)).toBe(2)
    expect(ISODayToHWCDay(4, HWCWeekDays.Tuesday)).toBe(3)
    expect(ISODayToHWCDay(5, HWCWeekDays.Tuesday)).toBe(4)
    expect(ISODayToHWCDay(6, HWCWeekDays.Tuesday)).toBe(5)
    expect(ISODayToHWCDay(7, HWCWeekDays.Tuesday)).toBe(6)
    // ISO: MO=1,TU=2,WE=3,TH=4,FR=5,SA=6,SU=7
    // HWC: WE=1,TH=2,FR=3,SA=4,SU=5,MO=6,TU=7
    expect(ISODayToHWCDay(1, HWCWeekDays.Wednesday)).toBe(6)
    expect(ISODayToHWCDay(2, HWCWeekDays.Wednesday)).toBe(7)
    expect(ISODayToHWCDay(3, HWCWeekDays.Wednesday)).toBe(1)
    expect(ISODayToHWCDay(4, HWCWeekDays.Wednesday)).toBe(2)
    expect(ISODayToHWCDay(5, HWCWeekDays.Wednesday)).toBe(3)
    expect(ISODayToHWCDay(6, HWCWeekDays.Wednesday)).toBe(4)
    expect(ISODayToHWCDay(7, HWCWeekDays.Wednesday)).toBe(5)
    // ISO: MO=1,TU=2,WE=3,TH=4,FR=5,SA=6,SU=7
    // HWC: TH=1,FR=2,SA=3,SU=4,MO=5,TU=6,WE=7
    expect(ISODayToHWCDay(1, HWCWeekDays.Thursday)).toBe(5)
    expect(ISODayToHWCDay(2, HWCWeekDays.Thursday)).toBe(6)
    expect(ISODayToHWCDay(3, HWCWeekDays.Thursday)).toBe(7)
    expect(ISODayToHWCDay(4, HWCWeekDays.Thursday)).toBe(1)
    expect(ISODayToHWCDay(5, HWCWeekDays.Thursday)).toBe(2)
    expect(ISODayToHWCDay(6, HWCWeekDays.Thursday)).toBe(3)
    expect(ISODayToHWCDay(7, HWCWeekDays.Thursday)).toBe(4)
    // ISO: MO=1,TU=2,WE=3,TH=4,FR=5,SA=6,SU=7
    // HWC: FR=1,SA=2,SU=3,MO=4,TU=5,WE=6,TH=7
    expect(ISODayToHWCDay(1, HWCWeekDays.Friday)).toBe(4)
    expect(ISODayToHWCDay(2, HWCWeekDays.Friday)).toBe(5)
    expect(ISODayToHWCDay(3, HWCWeekDays.Friday)).toBe(6)
    expect(ISODayToHWCDay(4, HWCWeekDays.Friday)).toBe(7)
    expect(ISODayToHWCDay(5, HWCWeekDays.Friday)).toBe(1)
    expect(ISODayToHWCDay(6, HWCWeekDays.Friday)).toBe(2)
    expect(ISODayToHWCDay(7, HWCWeekDays.Friday)).toBe(3)
  })
  it('should convert properly between HWC and ISO weekdays', () => {
    // ISO: MO=1,TU=2,WE=3,TH=4,FR=5,SA=6,SU=7
    // HWC: SA=1,SU=2,MO=3,TU=4,WE=5,TH=6,FR=7
    expect(HWCtoISODay(1)).toBe(6)
    expect(HWCtoISODay(2)).toBe(7)
    expect(HWCtoISODay(3)).toBe(1)
    expect(HWCtoISODay(4)).toBe(2)
    expect(HWCtoISODay(5)).toBe(3)
    expect(HWCtoISODay(6)).toBe(4)
    expect(HWCtoISODay(7)).toBe(5)
    // ISO: MO=1,TU=2,WE=3,TH=4,FR=5,SA=6,SU=7
    // HWC: SU=1,MO=2,TU=3,WE=4,TH=5,FR=6,SA=7
    expect(HWCtoISODay(1, ISOWeekDays.Monday, HWCWeekDays.Sunday)).toBe(7)
    expect(HWCtoISODay(2, ISOWeekDays.Monday, HWCWeekDays.Sunday)).toBe(1)
    expect(HWCtoISODay(3, ISOWeekDays.Monday, HWCWeekDays.Sunday)).toBe(2)
    expect(HWCtoISODay(4, ISOWeekDays.Monday, HWCWeekDays.Sunday)).toBe(3)
    expect(HWCtoISODay(5, ISOWeekDays.Monday, HWCWeekDays.Sunday)).toBe(4)
    expect(HWCtoISODay(6, ISOWeekDays.Monday, HWCWeekDays.Sunday)).toBe(5)
    expect(HWCtoISODay(7, ISOWeekDays.Monday, HWCWeekDays.Sunday)).toBe(6)
    // ISO: MO=1,TU=2,WE=3,TH=4,FR=5,SA=6,SU=7
    // HWC: MO=1,TU=2,WE=3,TH=4,FR=5,SA=6,SU=7
    expect(HWCtoISODay(1, ISOWeekDays.Monday, HWCWeekDays.Monday)).toBe(1)
    expect(HWCtoISODay(2, ISOWeekDays.Monday, HWCWeekDays.Monday)).toBe(2)
    expect(HWCtoISODay(3, ISOWeekDays.Monday, HWCWeekDays.Monday)).toBe(3)
    expect(HWCtoISODay(4, ISOWeekDays.Monday, HWCWeekDays.Monday)).toBe(4)
    expect(HWCtoISODay(5, ISOWeekDays.Monday, HWCWeekDays.Monday)).toBe(5)
    expect(HWCtoISODay(6, ISOWeekDays.Monday, HWCWeekDays.Monday)).toBe(6)
    expect(HWCtoISODay(7, ISOWeekDays.Monday, HWCWeekDays.Monday)).toBe(7)
    // ISO: MO=1,TU=2,WE=3,TH=4,FR=5,SA=6,SU=7
    // HWC: TU=1,WE=2,TH=3,FR=4,SA=5,SU=6,MO=7
    expect(HWCtoISODay(1, ISOWeekDays.Monday, HWCWeekDays.Tuesday)).toBe(2)
    expect(HWCtoISODay(2, ISOWeekDays.Monday, HWCWeekDays.Tuesday)).toBe(3)
    expect(HWCtoISODay(3, ISOWeekDays.Monday, HWCWeekDays.Tuesday)).toBe(4)
    expect(HWCtoISODay(4, ISOWeekDays.Monday, HWCWeekDays.Tuesday)).toBe(5)
    expect(HWCtoISODay(5, ISOWeekDays.Monday, HWCWeekDays.Tuesday)).toBe(6)
    expect(HWCtoISODay(6, ISOWeekDays.Monday, HWCWeekDays.Tuesday)).toBe(7)
    expect(HWCtoISODay(7, ISOWeekDays.Monday, HWCWeekDays.Tuesday)).toBe(1)
    // ISO: MO=1,TU=2,WE=3,TH=4,FR=5,SA=6,SU=7
    // HWC: WE=1,TH=2,FR=3,SA=4,SU=5,MO=6,TU=7
    expect(HWCtoISODay(1, ISOWeekDays.Monday, HWCWeekDays.Wednesday)).toBe(3)
    expect(HWCtoISODay(2, ISOWeekDays.Monday, HWCWeekDays.Wednesday)).toBe(4)
    expect(HWCtoISODay(3, ISOWeekDays.Monday, HWCWeekDays.Wednesday)).toBe(5)
    expect(HWCtoISODay(4, ISOWeekDays.Monday, HWCWeekDays.Wednesday)).toBe(6)
    expect(HWCtoISODay(5, ISOWeekDays.Monday, HWCWeekDays.Wednesday)).toBe(7)
    expect(HWCtoISODay(6, ISOWeekDays.Monday, HWCWeekDays.Wednesday)).toBe(1)
    expect(HWCtoISODay(7, ISOWeekDays.Monday, HWCWeekDays.Wednesday)).toBe(2)
    // ISO: MO=1,TU=2,WE=3,TH=4,FR=5,SA=6,SU=7
    // HWC: TH=1,FR=2,SA=3,SU=4,MO=5,TU=6,WE=7
    expect(HWCtoISODay(1, ISOWeekDays.Monday, HWCWeekDays.Thursday)).toBe(4)
    expect(HWCtoISODay(2, ISOWeekDays.Monday, HWCWeekDays.Thursday)).toBe(5)
    expect(HWCtoISODay(3, ISOWeekDays.Monday, HWCWeekDays.Thursday)).toBe(6)
    expect(HWCtoISODay(4, ISOWeekDays.Monday, HWCWeekDays.Thursday)).toBe(7)
    expect(HWCtoISODay(5, ISOWeekDays.Monday, HWCWeekDays.Thursday)).toBe(1)
    expect(HWCtoISODay(6, ISOWeekDays.Monday, HWCWeekDays.Thursday)).toBe(2)
    expect(HWCtoISODay(7, ISOWeekDays.Monday, HWCWeekDays.Thursday)).toBe(3)
    // ISO: MO=1,TU=2,WE=3,TH=4,FR=5,SA=6,SU=7
    // HWC: FR=1,SA=2,SU=3,MO=4,TU=5,WE=6,TH=7
    expect(HWCtoISODay(1, ISOWeekDays.Monday, HWCWeekDays.Friday)).toBe(5)
    expect(HWCtoISODay(2, ISOWeekDays.Monday, HWCWeekDays.Friday)).toBe(6)
    expect(HWCtoISODay(3, ISOWeekDays.Monday, HWCWeekDays.Friday)).toBe(7)
    expect(HWCtoISODay(4, ISOWeekDays.Monday, HWCWeekDays.Friday)).toBe(1)
    expect(HWCtoISODay(5, ISOWeekDays.Monday, HWCWeekDays.Friday)).toBe(2)
    expect(HWCtoISODay(6, ISOWeekDays.Monday, HWCWeekDays.Friday)).toBe(3)
    expect(HWCtoISODay(7, ISOWeekDays.Monday, HWCWeekDays.Friday)).toBe(4)
    // ISO: TU=1,WE=2,TH=3,FR=4,SA=5,SU=6,MO=7
    // HWC: SA=1,SU=2,MO=3,TU=4,WE=5,TH=6,FR=7
    expect(HWCtoISODay(1, ISOWeekDays.Tuesday)).toBe(5)
    expect(HWCtoISODay(2, ISOWeekDays.Tuesday)).toBe(6)
    expect(HWCtoISODay(3, ISOWeekDays.Tuesday)).toBe(7)
    expect(HWCtoISODay(4, ISOWeekDays.Tuesday)).toBe(1)
    expect(HWCtoISODay(5, ISOWeekDays.Tuesday)).toBe(2)
    expect(HWCtoISODay(6, ISOWeekDays.Tuesday)).toBe(3)
    expect(HWCtoISODay(7, ISOWeekDays.Tuesday)).toBe(4)
    // ISO: WE=1,TH=2,FR=3,SA=4,SU=5,MO=6,TU=7
    // HWC: SA=1,SU=2,MO=3,TU=4,WE=5,TH=6,FR=7
    expect(HWCtoISODay(1, ISOWeekDays.Wednesday)).toBe(4)
    expect(HWCtoISODay(2, ISOWeekDays.Wednesday)).toBe(5)
    expect(HWCtoISODay(3, ISOWeekDays.Wednesday)).toBe(6)
    expect(HWCtoISODay(4, ISOWeekDays.Wednesday)).toBe(7)
    expect(HWCtoISODay(5, ISOWeekDays.Wednesday)).toBe(1)
    expect(HWCtoISODay(6, ISOWeekDays.Wednesday)).toBe(2)
    expect(HWCtoISODay(7, ISOWeekDays.Wednesday)).toBe(3)
  })
})
