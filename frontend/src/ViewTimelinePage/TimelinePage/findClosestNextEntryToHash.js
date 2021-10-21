export const findClosestNextEntryToHash = (entries, hash) => {
  const entriesWithHigherOrEqualYear = entries.filter(
    (entry) => entry.year >= parseInt(hash.split('/')[0])
  )
  return (
    entriesWithHigherOrEqualYear[0] &&
    entriesWithHigherOrEqualYear.reduce((previous, current) => {
      const hashMonth = hash.split('/')[1] ? parseInt(hash.split('/')[1]) : null
      const hashDay = hash.split('/')[2] ? parseInt(hash.split('/')[2]) : null
      const hashYear = parseInt(hash.split('/')[0])

      if (
        previous.year === hashYear &&
        previous.month === hashMonth &&
        previous.day > hashDay
      ) {
        return previous
      } else if (
        current.year === hashYear &&
        current.month === hashMonth &&
        current.day > hashDay
      ) {
        return current
      } else if (previous.year === hashYear && previous.month > hashMonth) {
        return previous
      } else if (current.year === hashYear && current.month > hashMonth) {
        return current
      } else {
        return Math.abs(current.year - hashYear) <
          Math.abs(previous.year - hashYear)
          ? current
          : previous
      }
    })
  )
}
