export const calculateMonthYearDistance = (entry, timeline) => {
  if (timeline.origin_time_entry) {
    const originYear = timeline.origin_time_entry.year
    const originMonth = timeline.origin_time_entry.month

    const entryYear = entry.year
    const entryMonth = entry.month

    const yearDifference = Math.abs(entryYear - originYear)
    const monthDifference = Math.abs(entryMonth - originMonth)

    if (!originYear) {
      return '?'
    } else if (originYear === entryYear) {
      if (!originMonth) {
        return '< 1a'
      } else if (originMonth < entryMonth) {
        return `< ${monthDifference + 1}m`
      } else if (originMonth === entryMonth) {
        return '< 1m'
      } else if (originMonth > entryMonth) {
        return `< ${monthDifference + 1}m`
      }
    } else if (originYear < entryYear) {
      if (!originMonth) {
        return `< ${yearDifference + 1}a`
      } else if (yearDifference === 1) {
        if (originMonth > entryMonth) {
          return `< ${monthDifference + 1}m`
        } else {
          return `< 2a`
        }
      } else if (originMonth >= entryMonth) {
        return `< ${yearDifference}a`
      } else if (originMonth < entryMonth) {
        return `< ${yearDifference + 1}a`
      }
    } else if (originYear > entryYear) {
      if (!originMonth) {
        return `< ${yearDifference + 1}a`
      } else if (yearDifference === 1) {
        if (originMonth >= entryMonth) {
          return `< 2a`
        } else {
          return `< ${12 - monthDifference + 1}m`
        }
      } else if (originMonth <= entryMonth) {
        return `< ${yearDifference}a`
      } else if (originMonth > entryMonth) {
        return `< ${yearDifference + 1}a`
      }
    }
  }
}
