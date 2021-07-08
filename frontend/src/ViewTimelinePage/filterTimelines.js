export const filterTimelines = (timelines, queriedTimelines) =>
  timelines && queriedTimelines
    ? timelines.filter((timeline) => queriedTimelines.includes(timeline.id))
    : timelines
