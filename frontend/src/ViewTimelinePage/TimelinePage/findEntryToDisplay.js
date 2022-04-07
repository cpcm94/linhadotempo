const breakPoint = (entry) => {
  if (entry.firstEntry === true) {
    return 70
  } else {
    return 53
  }
}
const findMin = (array) => {
  if (array.some((element) => element !== null)) {
    return array.reduce((current, previous) => Math.min(current, previous))
  }
}
const getEarliestDateFrame = (array, dateFrame) => {
  return findMin(array.map((entry) => entry[dateFrame]))
}
const filterForDateFrame = (array, dateFrame, dateFrameFilter) => {
  return array.filter((entry) => entry[dateFrame] === dateFrameFilter)
}

const insertDatesInArray = (array, entries) =>
  array.map((ref) => {
    const entry = entries.filter((entry) => entry.id === ref.entryId)
    return {
      ...ref,
      year: entry[0] && entry[0].year ? entry[0].year : null,
      month: entry[0] && entry[0].month ? entry[0].month : null,
      day: entry[0] && entry[0].day ? entry[0].day : null,
      timelines: entry[0] && entry[0].timelines[0] ? entry[0].timelines : null,
    }
  })

const insertFirstEntryInEntries = (coordArrayWithDates) =>
  coordArrayWithDates.map((entry) => {
    if (entry && !entry.year) {
      return entry
    }
    const earliestYear = getEarliestDateFrame(coordArrayWithDates, 'year')
    const coordArrayFilteredByEarliestYear = filterForDateFrame(
      coordArrayWithDates,
      'year',
      earliestYear
    )

    const noMonthEntry = coordArrayFilteredByEarliestYear.filter(
      (entry) => !entry.month
    )

    const earliestMonth = getEarliestDateFrame(
      coordArrayFilteredByHighestYear,
      'month'
    )
    const coordArrayFilteredByEarliestMonth = filterForDateFrame(
      coordArrayFilteredByEarliestYear,
      'month',
      earliestMonth
    )
    const noDayEntry = coordArrayFilteredByEarliestMonth.filter(
      (entry) => !entry.day
    )
    const earliestDay = getEarliestDateFrame(
      coordArrayFilteredByEarliestMonth,
      'day'
    )

    const entryWithLowestDate = filterForDateFrame(
      coordArrayFilteredByEarliestMonth,
      'day',
      earliestDay
    )
    const firstEntry = noMonthEntry[0]
      ? noMonthEntry[0]
      : !noMonthEntry[0] && noDayEntry[0]
      ? noDayEntry[0]
      : entryWithLowestDate[0]

    if (entry && firstEntry) {
      if (entry.entryId === firstEntry.entryId) {
        return { ...entry, firstEntry: true }
      } else {
        return entry
      }
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
