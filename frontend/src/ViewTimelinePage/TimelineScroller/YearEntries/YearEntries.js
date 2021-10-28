import React from 'react'
import PropTypes from 'prop-types'
import { EntriesWithoutMonths } from './EntriesWithoutMonths'
import { MonthEntries } from './MonthEntries/MonthEntries'
import {
  Wrapper,
  EntriesWrapper,
  EntryYearWrapper,
  YearWrapper,
  EntriesWithoutMonthsWrapper,
} from './YearEntries.styles'
import { convertObjectToArray } from '../../../_shared/convertObjectToArray'
import { filterEntriesWithValue } from './filterEntriesWithValue'
import { filterEntriesWithoutValue } from './filterEntriesWithoutValue'
import { groupBy } from '../../../_shared/groupBy'

export const YearEntries = ({
  timeEntriesByYear,
  newEntryId,
  forwardedRef,
  displayEntry,
  visibleTimelines,
  bucketName,
  periods,
}) => {
  const periodsWithEndYearGreaterThan = periods.filter(
    (subArray) => subArray[1].year > timeEntriesByYear[0].year
  )
  console.log('periodsWithEndYearGreaterThan', periodsWithEndYearGreaterThan)

  const filterRelevantPeriods = (periods, year, month) => {
    return periods.filter((subArray) => {
      const periodStartYear = subArray[0].year
      const periodEndYear = subArray[1].year
      const periodStartMonth = subArray[0].month
      const periodEndMonth = subArray[1].month
      if (year > periodStartYear && year < periodEndYear) {
        return subArray
      } else if (year === periodStartYear && year === periodEndYear) {
        if (month >= periodStartMonth && month <= periodEndMonth) {
          return subArray
        }
      } else if (year === periodStartYear && year < periodEndYear) {
        if (month >= periodStartMonth) {
          return subArray
        }
      } else if (year > periodStartYear && year === periodEndYear) {
        if (month <= periodEndMonth) {
          return subArray
        }
      }
    })
  }
  const year = timeEntriesByYear[0].year.toString().startsWith('-')
    ? `${timeEntriesByYear[0].year.toString().substr(1)} a.c.`
    : timeEntriesByYear[0].year.toString()
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
    (a, b) => b[0].month - a[0].month
  )
  const isNotFirstEntry = displayEntry && !displayEntry.firstEntry
  const isDisplayEntryYear =
    isNotFirstEntry && displayEntry.year === timeEntriesByYear[0].year

  const atLeastOneEntryWithoutMonth = entriesWithoutMonth[0] ? true : false

  return (
    <Wrapper>
      <EntriesWrapper>
        {atLeastOneEntryWithoutMonth && (
          <EntriesWithoutMonthsWrapper
            periods={'placeholder: periodsWithEndYearGreaterThan'}
          >
            <EntryYearWrapper isDisplayEntryYear={isDisplayEntryYear}>
              <YearWrapper>
                <span>{year}</span>
              </YearWrapper>
            </EntryYearWrapper>
            <EntriesWithoutMonths
              entriesWithoutMonth={entriesWithoutMonth}
              newEntryId={newEntryId}
              forwardedRef={forwardedRef}
              visibleTimelines={visibleTimelines}
              bucketName={bucketName}
            />
          </EntriesWithoutMonthsWrapper>
        )}
        {entriesSortedByMonth.map((timeEntriesByMonth, index) => (
          <MonthEntries
            timeEntriesByMonth={timeEntriesByMonth}
            key={index}
            newEntryId={newEntryId}
            forwardedRef={forwardedRef}
            displayEntry={displayEntry}
            visibleTimelines={visibleTimelines}
            bucketName={bucketName}
            periods={filterRelevantPeriods(
              periods,
              timeEntriesByMonth[0].year,
              timeEntriesByMonth[0].month
            )}
          />
        ))}
      </EntriesWrapper>
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
