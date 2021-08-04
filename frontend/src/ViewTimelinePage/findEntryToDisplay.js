const breakPoint = (entry) => {
  if (entry.firstEntry === true) {
    return 70
  } else {
    return 53
  }
}
const findMinimum = (array) => {
  return array.reduce((current, previous) => Math.min(current, previous))
}
const getLowestYear = (array) => {
  return findMinimum(array.map((entry) => entry.year))
}

const insertDatesInArray = (array, entries) =>
  array.map((ref) => {
    const entry = entries.filter((entry) => entry.id === ref.entryId)
    return {
      ...ref,
      year: entry[0] && entry[0].year ? entry[0].year : null,
      month: entry[0] && entry[0].month ? entry[0].month : null,
      day: entry[0] && entry[0].day ? entry[0].day : null,
      timeline_id:
        entry[0] && entry[0].timeline_id ? entry[0].timeline_id : null,
    }
  })

const insertFirstEntryInEntries = (coordArrayWithDates) =>
  coordArrayWithDates.map((entry) => {
    const lowestYear = getLowestYear(coordArrayWithDates)
    const coordArrayFilteredByLowestYear = coordArrayWithDates.filter(
      (entry) => entry.year === lowestYear
    )

    const noMonthEntry = coordArrayFilteredByLowestYear.filter(
      (entry) => !entry.month
    )

    const lowestMonth = findMinimum(
      coordArrayFilteredByLowestYear.map((entry) =>
        entry.month ? entry.month : 13
      )
    )
    const coordArrayFilteredByLowestMonth =
      coordArrayFilteredByLowestYear.filter(
        (entry) => entry.month === lowestMonth
      )
    const noDayEntry = coordArrayFilteredByLowestMonth.filter(
      (entry) => !entry.day
    )
    const lowestDay = findMinimum(
      coordArrayFilteredByLowestMonth.map((entry) =>
        entry.day ? entry.day : 50
      )
    )

    const entryWithLowestDate = coordArrayFilteredByLowestMonth.filter(
      (entry) => entry.day === lowestDay
    )
    const firstEntry = noMonthEntry[0]
      ? noMonthEntry[0]
      : !noMonthEntry[0] && noDayEntry[0]
      ? noDayEntry[0]
      : entryWithLowestDate[0]

    if (entry.entryId === firstEntry().entryId) {
      return { ...entry, firstEntry: true }
    } else {
      return entry
    }
  })

export const findEntryToDisplay = (array, entries) => {
  const coordArrayWithDates = insertDatesInArray(array, entries)

  const coordArrayWithAllProps = insertFirstEntryInEntries(coordArrayWithDates)

  const closest =
    coordArrayWithAllProps[0] &&
    coordArrayWithAllProps.reduce((previous, current) => {
      if (window.scrollY < 70) {
        return coordArrayWithAllProps.filter(
          (entry) => entry.firstEntry === true
        )[0]
      }
      const currentIsValid =
        current && Math.abs(current.elementCoord) < breakPoint(current)

      const previousIsValid =
        previous && Math.abs(previous.elementCoord) < breakPoint(previous)

      if (currentIsValid && previousIsValid) {
        return Math.abs(current.elementCoord - breakPoint(current)) <
          Math.abs(previous.elementCoord - breakPoint(previous))
          ? current
          : previous
      } else if (currentIsValid && !previousIsValid) {
        return current
      } else if (previousIsValid && !currentIsValid) {
        return previous
      } else {
        return null
      }
    })
  return closest
}
