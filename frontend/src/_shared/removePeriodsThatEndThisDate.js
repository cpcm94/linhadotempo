export const removePeriodsThatEndThisDate = (periods, entries) => {
  return periods.filter((subArray) => {
    const periodEndYear = subArray[1].year

    const periodEndMonth = subArray[1].month

    const periodEndDay = subArray[1].day

    const entryYear = entries[0].year
    const entryMonth = entries[0].month
    const entryDay = entries[0].day
    if (
      periodEndYear === entryYear &&
      periodEndMonth === entryMonth &&
      periodEndDay === entryDay
    ) {
      return
    } else if (periodEndYear === entryYear) {
      if (!periodEndMonth) {
        return subArray
      } else if (periodEndMonth >= entryMonth) {
        return subArray
      }
    } else {
      return subArray
    }
  })
}
