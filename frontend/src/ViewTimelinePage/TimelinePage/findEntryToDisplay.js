const breakPoint = (entry) => {
  if (entry.firstEntry === true) {
    return 70
  } else {
    return 53
  }
}

const findMin = (array) => {
  if (array.some((element) => element !== null)) {
    const arrayHasNonNullEntry = !!array.filter(
      (element) => element !== null
    )[0]

    if (arrayHasNonNullEntry) {
      return array
        .filter((element) => element !== null)
        .reduce((current, previous) => Math.min(current, previous))
    } else {
      return null
    }
  }
}

const getLowestDateFrame = (array, dateFrame) => {
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
    const earliestYear = getLowestDateFrame(coordArrayWithDates, 'year')

    const coordArrayFilteredByEarliestYear = filterForDateFrame(
      coordArrayWithDates,
      'year',
      earliestYear
    )

    const earliestMonth = getLowestDateFrame(
      coordArrayFilteredByEarliestYear,
      'month'
    )
    const coordArrayFilteredByEarliestMonth = filterForDateFrame(
      coordArrayFilteredByEarliestYear,
      'month',
      earliestMonth
    )

    const earliestDay = getLowestDateFrame(
      coordArrayFilteredByEarliestMonth,
      'day'
    )

    const entryWithLowestDate = filterForDateFrame(
      coordArrayFilteredByEarliestMonth,
      'day',
      earliestDay
    )[0]

    const firstEntry = earliestDay
      ? entryWithLowestDate
      : !earliestDay && earliestMonth
      ? coordArrayFilteredByEarliestMonth[0]
      : coordArrayFilteredByEarliestYear[0]

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
