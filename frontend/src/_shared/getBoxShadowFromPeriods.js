export const getBoxShadowFromPeriods = (periods) => {
  if (periods.length > 1) {
    const boxShadow = `${periods.map(
      (subArray, index) => `0 0 0 ${index + 1}px ${subArray[0].period_color}`
    )}`
    return boxShadow
  }
}
