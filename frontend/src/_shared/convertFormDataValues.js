export const convertFormDataValues = (entry, radioValue) => {
  const newEntry = { ...entry }
  if (newEntry.year === '') {
    newEntry.year = null
  } else {
    newEntry.year = parseInt(newEntry.year)
  }
  if (newEntry.book_page === '') {
    newEntry.book_page = null
  } else {
    newEntry.book_page = parseInt(newEntry.year)
  }
  if (newEntry.month === '') {
    newEntry.month = null
  }
  if (newEntry.day === '') {
    newEntry.day = null
  }
  if (radioValue === 'AC') {
    newEntry.year = -Math.abs(newEntry.year)
  }
  return newEntry
}
