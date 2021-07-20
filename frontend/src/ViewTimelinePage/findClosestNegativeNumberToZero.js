export const findClosestNegativeNumberToZero = (array) => {
  const breakPoint = 12
  const closest = array.reduce((previous, current) => {
    return Math.abs(current.elementCoord - breakPoint) <
      Math.abs(previous.elementCoord - breakPoint)
      ? current
      : previous
  })
  return closest
}
