export const filterRelevantPeriods = (periods, propValue, filterPropName) =>
  periods.filter((subArray) => {
    if (
      propValue >= subArray[0][filterPropName] &&
      propValue <= subArray[1][filterPropName]
    ) {
      return subArray
    } else if (
      propValue >= subArray[0][filterPropName] &&
      !subArray[1][filterPropName]
    ) {
      return subArray
    }
  })
