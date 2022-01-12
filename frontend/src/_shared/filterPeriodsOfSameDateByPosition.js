export const filterPeriodsOfSameDateByPosition = (periods, entry) => {
  const onlyPeriodsWithStartDateOfEntry = periods.filter(
    (subArray) =>
      subArray[0].year === entry.year &&
      subArray[0].month === entry.month &&
      subArray[0].day === entry.day
  )
  const onlyPeriodsWithEndDateOfEntry = periods.filter(
    (subArray) =>
      subArray[1].year === entry.year &&
      subArray[1].month === entry.month &&
      subArray[1].day === entry.day
  )
  const filterPeriods = (periods) => {
    if (!entry.period_end) {
      const filteredPeriodsThatStartOnSameDate =
        onlyPeriodsWithStartDateOfEntry.filter((subArray) => {
          if (periods.filter((period) => period[0].id === entry.id)[0]) {
            return (
              subArray[0].position <=
              periods.filter((period) => period[0].id === entry.id)[0][0]
                .position
            )
          } else if (!entry.is_period) {
            return onlyPeriodsWithStartDateOfEntry
          } else if (entry.is_period && !entry.show_period) {
            return onlyPeriodsWithStartDateOfEntry
          }
        })

      const periodsThatDontStartOnSameDate = periods.filter((subArray) => {
        if (
          subArray[0].year === entry.year &&
          subArray[0].month === entry.month &&
          subArray[0].day === entry.day
        ) {
          return
        } else {
          return subArray
        }
      })

      return [
        ...periodsThatDontStartOnSameDate,
        ...filteredPeriodsThatStartOnSameDate,
      ]
    } else {
      const filteredPeriodsThatEndOnSameDate =
        onlyPeriodsWithEndDateOfEntry.filter((subArray) => {
          if (periods.filter((period) => period[0].id === entry.id)[0]) {
            return (
              subArray[0].position <=
              periods.filter((period) => period[0].id === entry.id)[0][0]
                .position
            )
          } else if (!entry.is_period) {
            return onlyPeriodsWithEndDateOfEntry
          }
        })
      const periodsThatDontEndOnSameDate = periods.filter((subArray) => {
        if (
          subArray[1].year === entry.year &&
          subArray[1].month === entry.month &&
          subArray[1].day === entry.day
        ) {
          return
        } else {
          return subArray
        }
      })
      return [
        ...filteredPeriodsThatEndOnSameDate,
        ...periodsThatDontEndOnSameDate,
      ]
    }
  }
  const filteredPeriods = filterPeriods(periods)
  return filteredPeriods
}
