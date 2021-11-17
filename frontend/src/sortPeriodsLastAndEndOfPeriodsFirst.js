export const sortPeriodsLastAndEndOfPeriodsFirst = (entries) =>
  entries.sort((a, b) => {
    if (a.period_end) {
      return -1
    } else if (a.is_period === b.is_period) {
      return 0
    } else if (!a.is_period) {
      return -1
    } else {
      1
    }
  })
