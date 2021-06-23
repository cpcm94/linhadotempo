export const groupBy = (
  entries
  //groupingValue
) => {
  entries.reduce((accumulator, entry) => {
    accumulator[entry.groupingValue] = accumulator[entry.groupingValue] || []
    accumulator[entry.groupingValue].push(entry)
    return accumulator
  }, {})
}
