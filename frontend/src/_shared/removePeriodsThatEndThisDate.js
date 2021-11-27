export const removePeriodsThatEndThisDate = (periods, entries) => {
  return periods.filter((subArray) => {
    if (
      subArray[1].year === entries[0].year &&
      subArray[1].month === entries[0].month &&
      subArray[1].day === entries[0].day
    ) {
      return
    } else if (subArray[1].year === entries[0].year) {
      if (!subArray[1].month) {
        return
      } else {
        return subArray
      }
    } else {
      return subArray
    }
  })
}
