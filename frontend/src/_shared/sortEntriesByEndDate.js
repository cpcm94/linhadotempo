export const sortEntriesByEndDate = (entries) =>
  entries.sort((a, b) => {
    return (
      a.end_year - b.end_year ||
      (b.end_month !== null) - (a.end_month !== null) ||
      a.end_month - b.end_month ||
      (b.end_day !== null) - (a.end_day !== null) ||
      b.end_day - a.end_day
    )
  })
