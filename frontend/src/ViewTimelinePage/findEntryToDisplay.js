const breakPoint = (entry) => {
  if (entry.firstEntry === true) {
    return 70
  } else {
    return 53
  }
}

const entryValue = (entry) => {
  if (entry) {
    if (
      !entry.alreadyUpdated &&
      entry.firstEntryOfYear &&
      !entry.day &&
      entry.elementCoord > 53
    ) {
      return { ...entry, month: null }
    } else if (
      !entry.firstEntryOfYear &&
      entry.firstEntryOfMonth &&
      entry.day &&
      entry.elementCoord > 53
    ) {
      return { ...entry, day: null }
    } else if (firstOfYearWithMonthAndDay(entry) && entry.elementCoord > 86) {
      return { ...entry, month: null, day: null }
    } else if (firstOfYearWithMonthAndDay(entry) && entry.elementCoord > 53) {
      return { ...entry, day: null, alreadyUpdated: true }
    } else {
      return entry
    }
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
      timeline_id:
        entry[0] && entry[0].timeline_id ? entry[0].timeline_id : null,
    }
  })

const insertFirstEntryInEntries = (coordArrayWithDates) =>
  coordArrayWithDates.map((entry) => {
    const lowestYear = coordArrayWithDates
      .map((entry) => entry.year)
      .reduce((current, previous) => Math.min(current, previous))

    if (entry.year === lowestYear) {
      return { ...entry, firstEntry: true }
    } else {
      return entry
    }
  })
const firstOfYearWithMonthAndDay = (entry) =>
  entry.firstEntryOfYear && entry.firstEntryOfMonth && entry.firstEntryOfDay

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
  return entryValue(closest)
}
