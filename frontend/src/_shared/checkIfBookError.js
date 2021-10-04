export const checkIfBookError = (book) => {
  if (book.book_name.trim() === '') {
    return { error: 'emptyBookName', field: 'name' }
  } else {
    return false
  }
}
