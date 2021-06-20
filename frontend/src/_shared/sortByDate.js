export const sortByDate = (array) =>
  array.slice().sort((a, b) => a.entry_year.localeCompare(b.entry_year))
