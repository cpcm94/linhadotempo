export const yearWithoutNegativeSign = (entry) => {
  if (entry && entry.year) {
    if (entry.year.toString().startsWith('-')) {
      return entry.year.toString().substr(1)
    } else if (!entry.year.toString().startsWith('-')) {
      return entry.year.toString()
    } else {
      return ''
    }
  } else {
    return ''
  }
}
