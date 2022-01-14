export const sortEntriesByEndDate = (entries) =>
  entries.sort((a, b) => {
    const ifEndYearIsNullPlaceEntryLast =
      (b.end_year !== null) - (a.end_year !== null)

    const ifEndMonthIsNullPlaceEntryLast =
      (b.end_month !== null) - (a.end_month !== null)

    const ifEndDayIsNullPlaceEntryLast =
      (b.end_day !== null) - (a.end_day !== null)

    const endYearIncreasingFromTopToBottom = a.end_year - b.end_year
    const endMonthIncreasingFromTopToBottom = a.end_month - b.end_month
    const endDayIncreasingFromTopToBottom = b.end_day - a.end_day

    return (
      ifEndYearIsNullPlaceEntryLast ||
      endYearIncreasingFromTopToBottom ||
      ifEndMonthIsNullPlaceEntryLast ||
      endMonthIncreasingFromTopToBottom ||
      ifEndDayIsNullPlaceEntryLast ||
      endDayIncreasingFromTopToBottom
    )
  })
