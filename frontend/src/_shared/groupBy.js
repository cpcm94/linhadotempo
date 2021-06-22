export const groupBy = (entries, groupingValue) => {
  entries.reduce((r, a) => {
    r[a.groupingValue] = r[a.groupingValue] || []
    r[a.groupingValue].push(a)
    return r
  }, {})
}
