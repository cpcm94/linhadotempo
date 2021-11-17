export const filterRelevantPeriods = (periods, year) =>
  periods.filter((subArray) => {
    if (year >= subArray[0].year && year <= subArray[1].year) {
      return subArray
    } else if (year >= subArray[0].year && !subArray[1].year) {
      return subArray
    }
  })
