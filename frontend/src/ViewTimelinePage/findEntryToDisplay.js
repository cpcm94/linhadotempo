const filterForYear = (array, entry) =>
  array.filter((innerEntry) => innerEntry.year === entry.year)

const filterForMonth = (array, entry) =>
  array.filter((innerEntry) => innerEntry.month === entry.month)

const findEntryWithTheLowerCoord = (array) =>
  array.reduce((previous, current) => {
    return previous.elementCoord < current.elementCoord ? previous : current
  })

export const findEntryToDisplay = (array, entries) => {
  const arrayWithDate = array.map((ref) => {
    const entry = entries.filter((entry) => entry.id === ref.entryId)
    return {
      ...ref,
      year: entry[0].year,
      month: entry[0].month,
      day: entry[0].day,
    }
  })
  const firstEntryYearArray = arrayWithDate.map((entry) => {
    const filteredForYear = filterForYear(arrayWithDate, entry)

    const minimumCoordForYear = findEntryWithTheLowerCoord(filteredForYear)

    if (entry.elementCoord > minimumCoordForYear.elementCoord) {
      return { ...entry, firstEntryOfYear: false }
    } else {
      return { ...entry, firstEntryOfYear: true }
    }
  })
  const firstEntryMonthArray = firstEntryYearArray.map((entry) => {
    const filteredForYear = filterForYear(arrayWithDate, entry)

    const filteredForMonth = filterForMonth(filteredForYear, entry)

    const minimumCoordForMonth = findEntryWithTheLowerCoord(filteredForMonth)

    if (entry.elementCoord > minimumCoordForMonth.elementCoord) {
      return { ...entry, firstEntryOfMonth: false }
    } else {
      return { ...entry, firstEntryOfMonth: true }
    }
  })

  const firstEntryDayArray = firstEntryMonthArray.map((entry) => {
    const filteredForYear = filterForYear(arrayWithDate, entry)

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

  const breakPoint = (entry) => {
    if (entry.firstEntryOfYear && !entry.month) {
      return 10
    } else if (entry.firstEntryOfYear && !entry.day) {
      return 30
    } else if (
      entry.firstEntryOfYear &&
      entry.firstEntryOfMonth &&
      entry.firstEntryOfDay
    ) {
      return 70
    } else if (entry.firstEntryOfMonth && !entry.day) {
      return 5
    } else if (entry.firstEntryOfMonth) {
      return 40
    } else if (entry.firstEntryOfDay) {
      return -5
    } else {
      return 0
    }
  }
  const closest = firstEntryDayArray.reduce((previous, current) => {
    return Math.abs(current.elementCoord - breakPoint(current)) <
      Math.abs(previous.elementCoord - breakPoint(previous))
      ? current
      : previous
  })
  return closest
}
