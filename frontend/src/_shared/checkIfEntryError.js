export const checkIfEntryError = (entry) => {
  if (entry.name.length > 300) {
    return { error: 'aboveMaxNameLength', field: 'name' }
  } else if (entry.name.trim() === '') {
    return { error: 'emptyName', field: 'name' }
  } else if (entry.day !== '' && (entry.month === '' || entry.year === '')) {
    return { error: 'dayWithoutYearOrMonth', field: 'date' }
  } else if (entry.month !== '' && entry.year === '') {
    return { error: 'monthWithoutYear', field: 'date' }
  } else if (!entry.timelines.sync[0]) {
    return { error: 'entryWithoutTimeline', field: 'timeline' }
  } else if (
    entry.end_day !== '' &&
    (entry.end_month === '' || entry.end_year === '')
  ) {
    return { error: 'dayWithoutYearOrMonthPeriod', field: 'endDate' }
  } else if (entry.end_month !== '' && entry.end_year === '') {
    return { error: 'monthWithoutYearPeriod', field: 'endDate' }
  } else if (entry.is_period && entry.year === '') {
    return { error: 'periodWithoutStartYear', field: 'endDate' }
  } else {
    return false
  }
}
