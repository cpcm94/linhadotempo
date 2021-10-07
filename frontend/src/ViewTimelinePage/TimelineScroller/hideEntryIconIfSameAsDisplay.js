import { filterEntryTimelinesByVisibleTimelines } from './filterEntryTimelinesByVisibleTimelines'

export const hideEntryIconsIfSameAsDisplay = (
  entry,
  displayEntry,
  visibleTimelines
) => {
  const checkDisplayEntryAndTimelines = displayEntry && displayEntry.timelines

  const displayEntryTimelinesId =
    checkDisplayEntryAndTimelines &&
    filterEntryTimelinesByVisibleTimelines(visibleTimelines, displayEntry).map(
      (timeline) => timeline.id
    )

  const entryTimelinesId = filterEntryTimelinesByVisibleTimelines(
    visibleTimelines,
    entry
  ).map((timeline) => timeline.id)

  const displayEntryTimelinesIdString =
    checkDisplayEntryAndTimelines && displayEntryTimelinesId.sort().join(',')

  if (displayEntryTimelinesIdString === entryTimelinesId.sort().join(',')) {
    return false
  } else {
    return true
  }
}
