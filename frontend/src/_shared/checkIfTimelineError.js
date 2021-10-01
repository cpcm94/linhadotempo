export const checkIfTimelineError = (timeline) => {
  if (timeline.name.trim() === '') {
    return { error: 'emptyName', field: 'name' }
  } else {
    return false
  }
}
