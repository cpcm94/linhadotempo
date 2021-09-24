export const convertBookFormData = (book) => {
  const newBook = { ...book }
  if (newBook.publishing_year === '') {
    newBook.publishing_year = null
  } else {
    newBook.publishing_year = parseInt(newBook.publishing_year)
  }
  return newBook
}
