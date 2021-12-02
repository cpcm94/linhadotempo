export const convertFormDataValues = (entry, radioValue) => {
  const newEntry = { ...entry }
  if (newEntry.year === '') {
    newEntry.year = null
  } else {
    newEntry.year = parseInt(newEntry.year)
  }
  if (newEntry.month === '') {
    newEntry.month = null
  }
  if (newEntry.day === '') {
    newEntry.day = null
  }
  if (newEntry.end_year === '') {
    newEntry.end_year = null
  } else {
    newEntry.end_year = parseInt(newEntry.end_year)
  }
  if (newEntry.end_month === '') {
    newEntry.end_month = null
  }
  if (newEntry.end_day === '') {
    newEntry.end_day = null
  }
  if (newEntry.book_page === '') {
    newEntry.book_page = null
  } else {
    newEntry.book_page = parseInt(newEntry.book_page)
  }
  if (radioValue === 'AC') {
    newEntry.year = -Math.abs(newEntry.year)
  }
  if (newEntry.book_id === '') {
    newEntry.book_id = null
  }
  return newEntry
}
