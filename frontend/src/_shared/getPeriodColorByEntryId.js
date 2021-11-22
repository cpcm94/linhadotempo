export const getPeriodColorByEntryId = (entryId, periods) => {
  if (periods.filter((subArray) => subArray[0].id === entryId)[0]) {
    return periods.filter((subArray) => subArray[0].id === entryId)[0][0]
      .period_color
  }
}
