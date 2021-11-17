export const sortPeriodsLastAndEndOfPeriodsFirst = (entries) =>
  entries.sort((a, b) => {
    if (a.period_end) {
      return -1
    } else if (a.is_period === b.is_period) {
      if (a.id > b.id) {
        return -1
      } else {
        return 1
      }
    } else if (!a.is_period) {
      return -1
    } else {
      return 1
    }
  })
