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
  } else {
    return false
  }
}
