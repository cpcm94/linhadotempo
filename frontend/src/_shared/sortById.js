export const sortById = (array) =>
  array.slice().sort((a, b) => a.id.localeCompare(b.id))
