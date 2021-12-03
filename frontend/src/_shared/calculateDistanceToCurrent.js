export const calculateDistanceToCurrent = (timeline) => {
  if (timeline.origin_time_entry) {
    const originYear = timeline.origin_time_entry.year
    const currentYear = new Date().getFullYear()
    const yearDifference = Math.abs(currentYear - originYear)
    if (!originYear) {
      return '?'
    } else if (originYear >= 0) {
      return `< ${yearDifference + 1}a`
    } else if (originYear < 0) {
      return `<${currentYear - originYear + 1}a`
    }
  }
}
