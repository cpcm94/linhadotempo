import React from 'react'
import PropTypes from 'prop-types'
import { EntriesWithoutMonths } from './EntriesWithoutMonths'
import { MonthEntries } from './MonthEntries/MonthEntries'
import { Wrapper } from './YearEntries.styles'
import { convertObjectToArray } from '../../../_shared/convertObjectToArray'
import { filterEntriesWithValue } from './filterEntriesWithValue'
import { filterEntriesWithoutValue } from './filterEntriesWithoutValue'
import { groupBy } from '../../../_shared/groupBy'
import { filterRelevantPeriodsForTheMonth } from '../../../_shared/filterRelevantPeriodsForTheMonth'

export const YearEntries = ({
  timeEntriesByYear,
  newEntryId,
  forwardedRef,
  displayEntry,
  visibleTimelines,
  bucketName,
  periods,
}) => {
  const periodsForEntriesWithoutMonth = periods.filter((subArray) => {
    const entryYear = timeEntriesByYear[0].year
    const periodStartYear = subArray[0].year
    const periodEndYear = subArray[1].year
    if (periodEndYear === entryYear) {
      if (subArray[1].month) {
        return
      } else {
        return subArray
      }
    } else if (periodStartYear <= entryYear) {
      return subArray
    }
  })
  const entriesWithoutMonth = filterEntriesWithValue(timeEntriesByYear, 'month')

  const entriesWithMonths = filterEntriesWithoutValue(
    timeEntriesByYear,
    'month'
  )

  const entriesGroupedByMonth = groupBy(entriesWithMonths, 'month')

  const arrayOfGroupedEntriesByMonth = convertObjectToArray(
    entriesGroupedByMonth
  )
  const entriesSortedByMonth = arrayOfGroupedEntriesByMonth.sort(
    (a, b) => a[0].month - b[0].month
  )

  const atLeastOneEntryWithoutMonth = !!entriesWithoutMonth[0]

  return (
    <Wrapper>
      {entriesSortedByMonth.map((timeEntriesByMonth, index) => (
        <MonthEntries
          timeEntriesByMonth={timeEntriesByMonth}
          key={index}
          newEntryId={newEntryId}
          forwardedRef={forwardedRef}
          displayEntry={displayEntry}
          visibleTimelines={visibleTimelines}
          bucketName={bucketName}
          periods={filterRelevantPeriodsForTheMonth(
            periods,
            timeEntriesByMonth[0].year,
            timeEntriesByMonth[0].month
          )}
        />
      ))}
      {atLeastOneEntryWithoutMonth && (
        <EntriesWithoutMonths
          entriesWithoutMonth={entriesWithoutMonth}
          newEntryId={newEntryId}
          forwardedRef={forwardedRef}
          visibleTimelines={visibleTimelines}
          bucketName={bucketName}
          periods={periodsForEntriesWithoutMonth}
          displayEntry={displayEntry}
        />
      )}
    </Wrapper>
  )
}

YearEntries.propTypes = {
  timeEntriesByYear: PropTypes.array,
  visibleTimelines: PropTypes.array,
  newEntryId: PropTypes.string,
  forwardedRef: PropTypes.any,
  displayEntry: PropTypes.object,
  bucketName: PropTypes.string,
  periods: PropTypes.array,
}
