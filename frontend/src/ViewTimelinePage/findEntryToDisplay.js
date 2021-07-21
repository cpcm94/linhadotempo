const filterForYear = (array, entry) =>
  array.filter((innerEntry) => innerEntry.year === entry.year)

const filterForMonth = (array, entry) =>
  array.filter((innerEntry) => innerEntry.month === entry.month)

const findEntryWithTheLowerCoord = (array) =>
  array.reduce((previous, current) => {
    return previous.elementCoord < current.elementCoord ? previous : current
  })

const breakPoint = (entry) => {
  if (entry.firstEntry === true) {
    return 70
  } else if (entry.firstEntryOfYear && !entry.month) {
    return 47
  } else if (entry.firstEntryOfYear && !entry.day) {
    return 80
  } else if (firstOfYearWithMonthAndDay(entry)) {
    return 107
  } else if (entry.firstEntryOfMonth && !entry.day) {
    return 47
  } else if (entry.firstEntryOfMonth) {
    return 80
  } else if (entry.firstEntryOfDay) {
    return 47
  } else {
    return 40
  }
}

const entryValue = (entry) => {
  if (
    !entry.alreadyUpdated &&
    entry.firstEntryOfYear &&
    !entry.day &&
    entry.elementCoord > 47
  ) {
    return { ...entry, month: null }
  } else if (
    !entry.firstEntryOfYear &&
    entry.firstEntryOfMonth &&
    entry.day &&
    entry.elementCoord > 47
  ) {
    return { ...entry, day: null }
  } else if (firstOfYearWithMonthAndDay(entry) && entry.elementCoord > 80) {
    return { ...entry, month: null, day: null }
  } else if (firstOfYearWithMonthAndDay(entry) && entry.elementCoord > 47) {
    return { ...entry, day: null, alreadyUpdated: true }
  } else {
    return entry
  }
}
const insertDatesInArray = (array, entries) =>
  array.map((ref) => {
    const entry = entries.filter((entry) => entry.id === ref.entryId)
    return {
      ...ref,
      year: entry[0] && entry[0].year ? entry[0].year : null,
      month: entry[0] && entry[0].month ? entry[0].month : null,
      day: entry[0] && entry[0].day ? entry[0].day : null,
    }
  })

const insertFirstEntryOfYearInEntries = (arrayWithDate) =>
  arrayWithDate.map((entry) => {
    const filteredForYear = filterForYear(arrayWithDate, entry)

    const minimumCoordForYear = findEntryWithTheLowerCoord(filteredForYear)

    if (entry.elementCoord > minimumCoordForYear.elementCoord) {
      return { ...entry, firstEntryOfYear: false }
    } else {
      return { ...entry, firstEntryOfYear: true }
    }
  })

const insertFirstEntryOfMonthInEntries = (
  coordArrayWithFirstEntryOfYear,
  arrayWithDate
) =>
  coordArrayWithFirstEntryOfYear.map((entry) => {
    const filteredForYear = filterForYear(arrayWithDate, entry)

    const filteredForMonth = filterForMonth(filteredForYear, entry)

    const minimumCoordForMonth = findEntryWithTheLowerCoord(filteredForMonth)

    if (entry.elementCoord > minimumCoordForMonth.elementCoord) {
      return { ...entry, firstEntryOfMonth: false }
    } else {
      return { ...entry, firstEntryOfMonth: true }
    }
  })

const insertFirstEntryOfDayInEntries = (
  coordArrayWithFirstEntryOfMonth,
  coordArrayWithDates
) =>
  coordArrayWithFirstEntryOfMonth.map((entry) => {
    const filteredForYear = filterForYear(coordArrayWithDates, entry)

    const filteredForMonth = filterForMonth(filteredForYear, entry)

    const filteredForDay = filteredForMonth.filter(
      (innerEntry) => innerEntry.day === entry.day
    )
    const minimumCoordForMonth = findEntryWithTheLowerCoord(filteredForDay)

    if (entry.elementCoord > minimumCoordForMonth.elementCoord) {
      return { ...entry, firstEntryOfDay: false }
    } else {
      return { ...entry, firstEntryOfDay: true }
    }
  })

const insertFirstEntryInEntries = (coordArrayWithFirstEntryOfDay) =>
  coordArrayWithFirstEntryOfDay.map((entry) => {
    const lowestYear = coordArrayWithFirstEntryOfDay
      .map((entry) => entry.year)
      .reduce((current, previous) => Math.min(current, previous))

    if (entry.year === lowestYear && entry.firstEntryOfYear === true) {
      return { ...entry, firstEntry: true }
    } else {
      return entry
    }
  })
const firstOfYearWithMonthAndDay = (entry) =>
  entry.firstEntryOfYear && entry.firstEntryOfMonth && entry.firstEntryOfDay

export const findEntryToDisplay = (array, entries) => {
  const coordArrayWithDates = insertDatesInArray(array, entries)

  const coordArrayWithFirstEntryOfYear =
    insertFirstEntryOfYearInEntries(coordArrayWithDates)

  const coordArrayWithFirstEntryOfMonth = insertFirstEntryOfMonthInEntries(
    coordArrayWithFirstEntryOfYear,
    coordArrayWithDates
  )

  const coordArrayWithFirstEntryOfDay = insertFirstEntryOfDayInEntries(
    coordArrayWithFirstEntryOfMonth,
    coordArrayWithDates
  )

  const coordArrayWithAllProps = insertFirstEntryInEntries(
    coordArrayWithFirstEntryOfDay
  )

  const closest = coordArrayWithAllProps.reduce((previous, current) => {
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
      return current
    }
  })

  return entryValue(closest)
}
