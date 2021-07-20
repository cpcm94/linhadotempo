export const findClosestNegativeNumberToZero = (array) => {
  let closest = 0
  const hasNegative = array
    .map((element) => element.elementCoord)
    .some((value) => value < 0)

  for (let i = 0; i < array.length; i++) {
    if (closest === 0) {
      closest = array[i]
    } else if (
      array[i].elementCoord < 0 &&
      -array[i].elementCoord < Math.abs(closest.elementCoord)
    ) {
      closest = array[i]
    } else if (
      !hasNegative &&
      array[i].elementCoord < Math.abs(closest.elementCoord)
    ) {
      closest = array[i]
    }
  }

  return closest
}
