export const checkIfCategoryError = (category) => {
  if (category.name.trim() === '') {
    return { error: 'emptyCategoryName', field: 'name' }
  } else {
    return false
  }
}
