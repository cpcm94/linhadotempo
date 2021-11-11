export const yearWithoutNegativeSign = (year) => {
  if (year) {
    if (year.toString().startsWith('-')) {
      return year.toString().substr(1)
    } else if (!year.toString().startsWith('-')) {
      return year.toString()
    } else {
      return ''
    }
  } else {
    return ''
  }
}
