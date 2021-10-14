export const filterTimelineInitials = (timelines, entry) => {
  return timelines.filter((timeline) => timeline.id === entry.timeline_id)[0]
    .initials
}
