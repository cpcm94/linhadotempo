export const groupBy = (array, groupingValue) => {
  return array.reduce((accumulator, entry) => {
    ;(accumulator[entry[groupingValue]] =
      accumulator[entry[groupingValue]] || []).push(entry)
    return accumulator
  }, {})
}
