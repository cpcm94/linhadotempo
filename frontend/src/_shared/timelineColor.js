export const timelineColor = (timelines, timelineId) => {
  return timelines.filter((timeline) => timeline.id === timelineId)[0].color
}
