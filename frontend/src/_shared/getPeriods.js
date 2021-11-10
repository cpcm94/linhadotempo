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
    .sort((a, b) => a[0].year - b[0].year)
    .map((subArray, index) =>
      subArray.map((entry) => {
        return {
          is_period: entry.is_period,
          period_end: !!entry.period_end,
          year: entry.year,
          month: entry.month,
          day: entry.day,
          period_color: periodColors[index],
          position: index + 1,
        }
      })
    )
