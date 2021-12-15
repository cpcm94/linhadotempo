export const filterRelevantPeriods = (periods, year) =>
  periods.filter((subArray) => {
    const periodStartYear = subArray[0].year
    const periodEndYear = subArray[1].year
    if (year >= periodStartYear && year <= periodEndYear) {
      return subArray
    } else if (year >= periodStartYear && !periodEndYear) {
      return subArray
    }
  })
