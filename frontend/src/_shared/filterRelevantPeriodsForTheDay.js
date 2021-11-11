export const filterRelevantPeriodsForTheDay = (periods, year, month, day) => {
  return periods.filter((subArray) => {
    const periodStartYear = subArray[0].year
    const periodEndYear = subArray[1].year
    const periodStartMonth = subArray[0].month
    const periodEndMonth = subArray[1].month
    const periodStartDay = subArray[0].day
    const periodEndDay = subArray[1].day

    if (year > periodStartYear && year < periodEndYear) {
      return subArray
    } else if (
      year === periodStartYear &&
      month === periodStartMonth &&
      day === periodStartDay
    ) {
      return subArray
    } else if (year > periodStartYear && !periodEndYear) {
      return subArray
    } else if (year === periodStartYear && !periodEndYear) {
      if (month > periodStartMonth) {
        return subArray
      } else if (month === periodStartMonth) {
        if (!periodStartDay) {
          return
        } else if (day >= periodStartDay) {
          return subArray
        }
      }
    } else if (year > periodStartYear && year === periodEndYear) {
      if (!periodEndMonth) {
        return subArray
      } else if (month < periodEndMonth) {
        return subArray
      } else if (month === periodEndMonth) {
        if (day <= periodEndDay || !periodEndDay) {
          return subArray
        }
      }
    } else if (year === periodStartYear && year < periodEndYear) {
      if (month > periodStartMonth) {
        return subArray
      } else if (month === periodStartMonth) {
        if (!periodStartDay) {
          return
        } else if (day >= periodStartDay) {
          return subArray
        }
      }
    } else if (year === periodStartYear && year === periodEndYear) {
      if (month > periodStartMonth && month < periodEndMonth) {
        return subArray
      } else if (month > periodStartMonth && month === periodEndMonth) {
        if (day <= periodEndDay || !periodEndDay) {
          return subArray
        }
      } else if (month === periodStartMonth && month < periodEndMonth) {
        if (!periodStartDay) {
          return
        } else if (day >= periodStartDay) {
          return subArray
        }
      } else if (month === periodStartMonth && month === periodStartMonth) {
        if (!periodStartDay) {
          return
        } else if (day >= periodStartDay && day <= periodEndDay) {
          return subArray
        } else if (day >= periodStartDay && !periodEndMonth) {
          return subArray
        } else if (day >= periodStartDay && !periodEndDay) {
          return subArray
        }
      }
    }
  })
}
