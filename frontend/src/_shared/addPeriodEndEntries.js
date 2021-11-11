export const addPeriodEndEntries = (array) => {
  const newArray = [...array]
  newArray.map((entry) => {
    if (entry.is_period) {
      const newEntry = { ...entry, period_end: true }
      newEntry.name = `Fim ${entry.name}`
      newEntry.year = entry.end_year
      newEntry.month = entry.end_month
      newEntry.day = entry.end_day
      newArray.push(newEntry)
    }
  })
  return newArray
}
