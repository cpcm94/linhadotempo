export const groupBy = (array, groupByValue) => {
  array.reduce((r, a) => {
    r[a.groupByValue] = r[a.groupByValue] || []
    r[a.groupByValue].push(a)
    return r
  }, {})
}
