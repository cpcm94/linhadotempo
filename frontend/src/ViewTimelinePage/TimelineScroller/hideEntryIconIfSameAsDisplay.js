import { filterEntryTimelinesByVisibleTimelines } from './filterEntryTimelinesByVisibleTimelines'

export const hideEntryIconsIfSameAsDisplay = (
  entry,
  displayEntry,
  visibleTimelines
) => {
  const checkDisplayEntryAndTimelines = displayEntry && displayEntry.timelines
  const displayEntryTimelinesId =
    checkDisplayEntryAndTimelines &&
    filterEntryTimelinesByVisibleTimelines(visibleTimelines, displayEntry)
  const entryTimelinesId = filterEntryTimelinesByVisibleTimelines(
    visibleTimelines,
    entry
  )
  const displayEntryTimelinesIdString =
    checkDisplayEntryAndTimelines && displayEntryTimelinesId.sort().join(',')
  if (displayEntryTimelinesIdString === entryTimelinesId.sort().join(',')) {
    return false
  } else {
    return true
  }
}
