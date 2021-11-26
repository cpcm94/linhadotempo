export const calculateYearDistance = (entry, timeline) => {
  if (timeline.origin_time_entry) {
    const originYear = timeline.origin_time_entry.year
    const entryYear = entry.year
    const yearDifference = Math.abs(entryYear - originYear)

    if (originYear === entryYear) {
      return '< 1a'
    } else if (!originYear) {
      return '?'
    } else if (entryYear > originYear) {
      return `< ${yearDifference + 1}a`
    } else if (entryYear < originYear) {
      return `< ${yearDifference + 1}a`
    }
  }
}
