export const convertObjectToArray = (array) =>
  Object.entries(array)
    .map((subArray) => subArray.splice(1))
    .flat()
