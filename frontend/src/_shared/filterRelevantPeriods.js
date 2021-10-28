export const filterRelevantPeriods = (periods, propValue, filterPropName) =>
  periods.filter(
    (subArray) =>
      propValue >= subArray[0][filterPropName] &&
      propValue <= subArray[1][filterPropName]
  )
