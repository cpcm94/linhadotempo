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
    newEntry.book_page = parseInt(newEntry.book_page)
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
  if (newEntry.book_id === '') {
    newEntry.book_id = null
  }
  if (newEntry.image_url === '') {
    newEntry.image_url = null
  }
  return newEntry
}
