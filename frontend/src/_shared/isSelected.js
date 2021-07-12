export const isSelected = (timelineId, arraySelectedTimelinesId) => {
  if (arraySelectedTimelinesId.includes(timelineId)) {
    return true
  } else {
    return false
  }
}
