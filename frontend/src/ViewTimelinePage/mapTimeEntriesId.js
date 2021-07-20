export const mapTimeEntriesId = (timelines) =>
  timelines &&
  timelines
    .map((timeline) => timeline.time_entries.map((entry) => entry.id))
    .flat()
