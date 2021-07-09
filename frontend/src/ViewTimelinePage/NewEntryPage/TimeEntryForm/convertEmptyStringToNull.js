export const convertEmptyStringToNull = (entry) => {
  const newEntry = { ...entry }
  if (newEntry.month === '') {
    newEntry.month = null
  }
  if (newEntry.day === '') {
    newEntry.day = null
  }
  return newEntry
}
