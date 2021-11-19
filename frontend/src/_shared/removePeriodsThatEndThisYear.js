export const removePeriodsThatEndThisYear = (periods, entries) => {
  return periods.filter((subArray) => {
    if (subArray[1].year === entries[0].year) return
    else {
      return subArray
    }
  })
}
