export const filterEntryTimelinesByVisibleTimelines = (
  visibleTimelines,
  entry
) => {
  const visibleTimelinesIds = visibleTimelines.map((timeline) => timeline.id)

  return entry.timelines
    .filter((timeline) => visibleTimelinesIds.includes(timeline.id))
    .sort((a, b) => a.id - b.id)
}
