import process from 'node:process'
import { Temporal } from '@js-temporal/polyfill'
import ciDetect from '@npmcli/ci-detect'
import ms from 'ms'
import prettyBytes from 'pretty-bytes'
import ora from 'ora'
import prompts from 'prompts'
import kleur from 'kleur'
import { Scales, type SupportedNativeCalendars } from '../src/common/calendars'
import { temporalToHWCPlainDateWeek } from '../src/hwc/premitives'
import { getWeekDayCodeName } from '../src/common/weekDays'
import { storage } from './store'
import { dataValidator } from './validator'

// SIGINT handler
process.on('SIGINT', () => {
  console.log('Interrupt detected. Exiting the process...')
  process.exit(0)
})

const START_YEAR = await storage.getItem<number>('START_YEAR')
const END_YEAR = await storage.getItem<number>('END_YEAR')

console.log(kleur.green('Hijri Week Calendar Data Generator\n'))
console.log(kleur.yellow('------------------------------------\n'))
if (START_YEAR && END_YEAR)
  console.log(kleur.green(`Previously generated data from year ${kleur.yellow('AH ' + `${START_YEAR}`)} to ${kleur.yellow('AH ' + `${END_YEAR}`)} is available.`))

const isGithubCI = ciDetect() === 'github-actions'

let useExisting = {
  value: false,
}
let doValidate = {
  value: true,
}

if (!isGithubCI) {
  useExisting = await prompts({
    type: (START_YEAR && END_YEAR) ? 'confirm' : null,
    initial: !((START_YEAR && END_YEAR)), // if data is defined then useExisting should be true
    name: 'value',
    hint: kleur.yellow('Previously generated data will be overwritten.'),
    message: 'Do You want to use the existing data?',
  })

  doValidate = await prompts({
    type: 'confirm',
    initial: true,
    name: 'value',
    message: 'Do You want to validate the generated data?',
  })

  if (!useExisting.value) {
    await prompts(
      {
        type: 'number',
        initial: 1443,
        name: 'value',
        message: 'Enter the Hijri start year',
        validate: (value: number) => value >= -99999 && value <= 999999,
        onState: async (state) => {
          if (!state.aborted)
            await storage.setItem('START_YEAR', state.value)
        },
      },
    )
    await prompts({
      type: 'number',
      initial: 1444,
      name: 'value',
      message: 'Enter the Hijri end year',
      validate: (value: number) => value >= -99999 && value <= 999999,
      onState: async (state) => {
        if (!state.aborted)
          await storage.setItem('END_YEAR', state.value)
      },
    })
  }
}

if (isGithubCI) {
  await storage.setItem('START_YEAR', 1440)
  await storage.setItem('END_YEAR', 1450)
}
export async function dataGenerator() {
  if (useExisting.value) {
    // return existing data
    const umalqura = await storage.getItem<number[][]>('dates:islamic-umalqura')
    const civil = await storage.getItem<number[][]>('dates:islamic-civil')
    const tbla = await storage.getItem<number[][]>('dates:islamic-tbla')
    const START_YEAR = await storage.getItem<number>('START_YEAR')
    const END_YEAR = await storage.getItem<number>('END_YEAR')
    return {
      umalqura,
      civil,
      tbla,
      START_YEAR,
      END_YEAR,
    }
  }
  else {
    const START_YEAR = await storage.getItem<number>('START_YEAR')
    const END_YEAR = await storage.getItem<number>('END_YEAR')

    if (!START_YEAR || !END_YEAR)
      throw new Error('Start and End years are not defined')
    // generate data
    const spinner = ora({
      text: `Generating Hijri Week Calendar dates. estimate ${ms((END_YEAR - START_YEAR) * 1027 / 10)}\n`,
      spinner: 'moon',
    }).start()

    console.time('DataGenerator Execution Time') // Start timing
    const calendars: SupportedNativeCalendars[] = ['islamic-umalqura', 'islamic-civil', 'islamic-tbla']
    const umalqura: number[][][] = []
    const civil: number[][][] = []
    const tbla: number[][][] = []

    for (let i = 0; i < calendars.length; i++) {
      const calendar = calendars[i]
      const data: number[][][] = []
      for (let startDay = 1; startDay <= 7; startDay++) {
        const dates: number[][] = []
        for (let year = START_YEAR; year <= END_YEAR; year++) {
          spinner.clear()
          spinner.text = `Generating dates for year ${kleur.yellow(`AH ${year}`)} for ${kleur.yellow(calendar)} with day start ${getWeekDayCodeName(startDay, Scales.Hijri)}\n`
          spinner.render()
          for (let month = 1; month <= 12; month++) {
            const daysInMonth = Temporal.PlainYearMonth.from({ year, month, calendar }).daysInMonth
            for (let day = 1; day <= daysInMonth; day++) {
              const date = Temporal.PlainDate.from({
                year,
                month,
                day,
                calendar,
              })
              const hwcDate = temporalToHWCPlainDateWeek(date, startDay)
              dates.push([year, month, day, hwcDate.yearOfWeek, hwcDate.weekOfYear, hwcDate.dayOfWeek, startDay])
            }
          }
        }
        data.push(dates)
      }
      await storage.setItem(`dates:${calendar}`, data)
      switch (calendar) {
        case 'islamic-umalqura':
          umalqura.push(...data)
          break
        case 'islamic-civil':
          civil.push(...data)
          break
        case 'islamic-tbla':
          tbla.push(...data)
          break
      }
    }

    const sizeInBytes = new Blob([JSON.stringify(umalqura)]).size + new Blob([JSON.stringify(civil)]).size + new Blob([JSON.stringify(tbla)]).size
    spinner.info(`List size approx = ${kleur.yellow(prettyBytes(sizeInBytes))}\n`)
    // store data
    await storage.setItem('START_YEAR', START_YEAR)
    await storage.setItem('END_YEAR', END_YEAR)
    console.timeEnd('DataGenerator Execution Time') // End timing and log the duration
    spinner.succeed(kleur.green(`Data generated successfully`))
    return {
      umalqura,
      civil,
      tbla,
      START_YEAR,
      END_YEAR,
    }
  }
}

await dataGenerator()

if (doValidate.value)
  await dataValidator()
