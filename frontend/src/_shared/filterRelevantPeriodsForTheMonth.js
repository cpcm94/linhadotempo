export const filterRelevantPeriodsForTheMonth = (periods, year, month) =>
  periods.filter((subArray) => {
    const periodStartYear = subArray[0].year
    const periodEndYear = subArray[1].year
    const periodStartMonth = subArray[0].month
    const periodEndMonth = subArray[1].month
    if (year > periodStartYear && year < periodEndYear) {
      return subArray
    } else if (year > periodStartYear && !periodEndYear) {
      return subArray
    } else if (year === periodStartYear && !periodEndYear) {
      if (!periodStartMonth) {
        return subArray
      } else if (month >= periodStartMonth) return subArray
    } else if (year === periodStartYear && year === periodEndYear) {
      if (!periodEndMonth) {
        return subArray
      } else if (month >= periodStartMonth && month <= periodEndMonth) {
        return subArray
      }
    } else if (year === periodStartYear && year < periodEndYear) {
      if (!periodStartMonth) {
        return subArray
      } else if (month >= periodStartMonth) {
        return subArray
      }
    } else if (year > periodStartYear && year === periodEndYear) {
      if (!periodEndMonth) {
        return subArray
      } else if (month <= periodEndMonth) {
        return subArray
      }
    }
  })
