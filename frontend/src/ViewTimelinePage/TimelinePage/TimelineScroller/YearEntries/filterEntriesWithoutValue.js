export const filterEntriesWithoutValue = (array, value) => {
  return array.filter((entry) => entry[value] !== null)
}
