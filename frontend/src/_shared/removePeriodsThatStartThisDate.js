export const removePeriodsThatStartThisDate = (periods, entries) => {
  return periods.filter((subArray) => {
    const periodStartYear = subArray[0].year
    const periodEndYear = subArray[1].year

    const periodStartMonth = subArray[0].month
    const periodEndMonth = subArray[1].month

    const periodStartDay = subArray[0].day

    const entryYear = entries[0].year
    const entryMonth = entries[0].month
    const entryDay = entries[0].day
    if (
      periodStartYear === entryYear &&
      periodStartMonth === entryMonth &&
      periodStartDay === entryDay
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
