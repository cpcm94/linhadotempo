export const sortByDate = (array) =>
  array.slice().sort((a, b) => a.entry_date.localeCompare(b.entry_date))
