import { convertObjectToArray } from './convertObjectToArray'
import { groupBy } from './groupBy'
import { periodColors } from './periodColors'

export const getPeriods = (entries) =>
  convertObjectToArray(
    groupBy(
      entries.filter((entry) => entry.is_period),
      'id'
    )
  )
    .sort((a, b) => {
      return (
        a[0].year - b[0].year ||
        (a[0].month !== null) - (b[0].month !== null) ||
        a[0].month - b[0].month ||
        (a[0].day !== null) - (b[0].day !== null) ||
        a[0].day - b[0].day
      )
    })
    .map((subArray, index) =>
      subArray.map((entry) => {
        return {
          id: entry.id,
          is_period: entry.is_period,
          period_end: !!entry.period_end,
          year: entry.year,
          month: entry.month,
          day: entry.day,
          period_color: periodColors[index],
        }
      })
    )
