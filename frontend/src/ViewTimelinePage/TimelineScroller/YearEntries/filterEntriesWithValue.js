export const filterEntriesWithValue = (array, value) => {
  return array.filter((entry) => entry[value] === null)
}
