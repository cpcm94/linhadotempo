export const calculateDayMonthYearDistance = (entry, timeline) => {
  if (timeline.origin_time_entry) {
    const originYear = timeline.origin_time_entry.year
    const originMonth = timeline.origin_time_entry.month
    const originDay = timeline.origin_time_entry.day

    const entryYear = entry.year
    const entryMonth = entry.month
    const entryDay = entry.day

    const yearDifference = Math.abs(entryYear - originYear)
    const monthDifference = Math.abs(entryMonth - originMonth)
    const dayDifferenceForOriginMonthHigher = entryDay - originDay
    const dayDifferenceForOriginMonthLower = originDay - entryDay

    if (!originYear) {
      return '?'
    } else if (originYear === entryYear) {
      if (!originMonth) {
        return '< 1a'
      } else if (originMonth < entryMonth) {
        if (entryDay === originDay) {
          return `${monthDifference}m`
        } else if (monthDifference === 1) {
          if (30 - dayDifferenceForOriginMonthLower < 30) {
            return `${30 - dayDifferenceForOriginMonthLower}d`
          } else {
            return '< 2m'
          }
        } else if (monthDifference > 1) {
          if (30 - dayDifferenceForOriginMonthLower < 30) {
            return `< ${monthDifference}m`
          } else {
            return `< ${monthDifference + 1}m`
          }
        }
      } else if (originMonth === entryMonth) {
        return `${Math.abs(dayDifferenceForOriginMonthHigher)}d`
      } else if (originMonth > entryMonth) {
        if (entryDay === originDay) {
          return `${monthDifference}m`
        } else if (monthDifference === 1) {
          if (30 - dayDifferenceForOriginMonthHigher < 30) {
            return `${30 - dayDifferenceForOriginMonthHigher}d`
          } else {
            return '< 2m'
          }
        } else if (monthDifference > 1) {
          if (30 - dayDifferenceForOriginMonthHigher < 30) {
            return `< ${monthDifference}m`
          } else {
            return `< ${monthDifference + 1}m`
          }
        }
      }
    } else if (originYear < entryYear) {
      if (!originMonth) {
        return `< ${yearDifference + 1}a`
      } else if (yearDifference === 1) {
        if (originMonth > entryMonth) {
          return `< ${monthDifference + 1}m`
        } else if (originMonth < entryMonth) {
          return `< 2a`
        } else if (originMonth === entryMonth) {
          if (entryDay === originDay) {
            return `${yearDifference}a`
          } else if (originDay > entryDay) {
            return `< ${yearDifference}a`
          } else if (originDay < entryDay) {
            return `< ${yearDifference + 1}a`
          }
        }
      } else if (originMonth > entryMonth) {
        return `< ${yearDifference}a`
      } else if (originMonth < entryMonth) {
        return `< ${yearDifference + 1}a`
      } else if (originMonth === entryMonth) {
        if (entryDay === originDay) {
          return `${yearDifference}a`
        } else if (originDay > entryDay) {
          return `< ${yearDifference}a`
        } else if (originDay < entryDay) {
          return `< ${yearDifference + 1}a`
        }
      }
    } else if (originYear > entryYear) {
      if (!originMonth) {
        return `< ${yearDifference + 1}a`
      } else if (yearDifference === 1) {
        if (originMonth > entryMonth) {
          return `< 2a`
        } else if (originMonth < entryMonth) {
          return `< ${12 - monthDifference + 1}m`
        } else if (originMonth === entryMonth) {
          if (entryDay === originDay) {
            return `${yearDifference}a`
          } else if (originDay > entryDay) {
            return `< ${yearDifference + 1}a`
          } else if (originMonth < entryDay) {
            return `< ${yearDifference}a`
          }
        }
      } else if (originMonth > entryMonth) {
        return `< ${yearDifference + 1}a`
      } else if (originMonth < entryMonth) {
        return `< ${yearDifference}a`
      } else if (originMonth === entryMonth) {
        if (entryDay === originDay) {
          return `${yearDifference}a`
        } else if (originDay > entryDay) {
          return `< ${yearDifference + 1}a`
        } else if (originMonth < entryDay) {
          return `< ${yearDifference}a`
        }
      }
    }
  }
}
