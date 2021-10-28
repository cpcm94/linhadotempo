import React from 'react'
import {
  MonthEntriesWrapper,
  MonthAndEntryWrapper,
  MonthWrapper,
  MonthDateWrapper,
  DateText,
  DateWrapper,
} from './MonthEntries.styles'
import { DayEntries } from './DayEntries/DayEntries'
import { EntriesWithoutDay } from './EntriesWithoutDay'
import { convertObjectToArray } from '../../../../_shared/convertObjectToArray'
import { filterEntriesWithValue } from '../filterEntriesWithValue'
import { filterEntriesWithoutValue } from '../filterEntriesWithoutValue'
import { abvMonthNameArray } from '../../../../_shared/monthNameArray'
import PropTypes from 'prop-types'
import { groupBy } from '../../../../_shared/groupBy'

export const MonthEntries = ({
  timeEntriesByMonth,
  newEntryId,
  forwardedRef,
  displayEntry,
  visibleTimelines,
  bucketName,
  periods,
}) => {
  const periodsWithEndMonthGreaterThan = periods.filter(
    (subArray) => subArray[1].month > timeEntriesByMonth[0].month
  )
  console.log('periodsWithEndMonthGreaterThan', periodsWithEndMonthGreaterThan)

  const filterRelevantPeriods = (periods, month, day) => {
    return periods.filter((subArray) => {
      const periodStartMonth = subArray[0].month
      const periodEndMonth = subArray[1].month
      const periodStartDay = subArray[0].day
      const periodEndDay = subArray[1].day
      if (month > periodStartMonth && month < periodEndMonth) {
        return subArray
      } else if (month === periodStartMonth && month === periodEndMonth) {
        if (day >= periodStartDay && day <= periodEndDay) {
          return subArray
        }
      } else if (month === periodStartMonth && month < periodEndMonth) {
        if (day >= periodStartDay) {
          return subArray
        }
      } else if (month > periodStartMonth && month === periodEndMonth) {
        if (day <= periodEndDay) {
          return subArray
        }
      }
    })
  }
  const month = abvMonthNameArray[timeEntriesByMonth[0].month]
  const year = timeEntriesByMonth[0].year
  const yearAC = year.toString().startsWith('-')
    ? `${year.toString().substr(1)} a.c.`
    : year.toString()

  const entriesWithoutDay = filterEntriesWithValue(timeEntriesByMonth, 'day')

  const entriesWithDay = filterEntriesWithoutValue(timeEntriesByMonth, 'day')

  const entriesGroupedByDay = groupBy(entriesWithDay, 'day')

  const arrayOfGroupedEntriesByDay = convertObjectToArray(entriesGroupedByDay)

  const entriesSortedByDay = arrayOfGroupedEntriesByDay.sort(
    (a, b) => b[0].day - a[0].day
  )
  const isNotFirstEntry = displayEntry && !displayEntry.firstEntry
  const isDisplayEntryMonth =
    isNotFirstEntry &&
    displayEntry.month === timeEntriesByMonth[0].month &&
    displayEntry.year === timeEntriesByMonth[0].year

  const atLeastOneEntryWithoutDay = entriesWithoutDay[0] ? true : false

  return (
    <MonthEntriesWrapper>
      <MonthAndEntryWrapper
        periods={'placeholder: periodsWithEndMonthGreaterThan'}
      >
        {atLeastOneEntryWithoutDay && (
          <MonthWrapper isDisplayEntryMonth={isDisplayEntryMonth}>
            <DateWrapper>
              <MonthDateWrapper>
                <span>{month}</span>
              </MonthDateWrapper>
              <DateText>de</DateText>
              <span>{yearAC}</span>
            </DateWrapper>
          </MonthWrapper>
        )}
        <EntriesWithoutDay
          timeEntriesWithoutDay={entriesWithoutDay}
          newEntryId={newEntryId}
          forwardedRef={forwardedRef}
          visibleTimelines={visibleTimelines}
          bucketName={bucketName}
        />
      </MonthAndEntryWrapper>
      <DayEntries
        timeEntriesByDay={entriesSortedByDay}
        newEntryId={newEntryId}
        forwardedRef={forwardedRef}
        displayEntry={displayEntry}
        visibleTimelines={visibleTimelines}
        bucketName={bucketName}
        periods={filterRelevantPeriods(
          periods,
          timeEntriesByMonth[0].month,
          timeEntriesByMonth[0].day
        )}
      />
    </MonthEntriesWrapper>
  )
}

MonthEntries.propTypes = {
  timeEntriesByMonth: PropTypes.array,
  visibleTimelines: PropTypes.array,
  newEntryId: PropTypes.string,
  forwardedRef: PropTypes.any,
  displayEntry: PropTypes.object,
  bucketName: PropTypes.string,
  periods: PropTypes.array,
}
