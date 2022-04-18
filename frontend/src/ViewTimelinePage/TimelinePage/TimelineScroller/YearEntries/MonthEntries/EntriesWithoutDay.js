import React from 'react'
import PropTypes from 'prop-types'
import {
  DateText,
  DateWrapper,
  LeftDateLine,
  MonthDateWrapper,
  OuterDateWrapper,
  RightDateLine,
} from './MonthEntries.styles'
import { abvMonthNameArray } from '../../../../../_shared/monthNameArray'
import { PeriodMarker } from '../../../../../_shared/PeriodMarker/PeriodMarker'
import { sortPeriodsLastAndEndOfPeriodsFirst } from '../../../../../_shared/sortPeriodsLastAndEndOfPeriodsFirst'
import { removePeriodsThatStartThisDate } from '../../../../../_shared/removePeriodsThatStartThisDate'
import { HiddenPeriods } from '../HiddenPeriods/HiddenPeriods'
import { Entry } from './Entries/Entry'

export const EntriesWithoutDay = ({
  timeEntriesWithoutDay,
  newEntryId,
  forwardedRef,
  visibleTimelines,
  bucketName,
  periods,
  displayEntry,
}) => {
  const hiddenPeriods = timeEntriesWithoutDay.filter(
    (entry) => !entry.show_period && entry.is_period
  )
  const entriesWithoutHiddenPeriods = sortPeriodsLastAndEndOfPeriodsFirst(
    timeEntriesWithoutDay.filter((entry) => entry.show_period)
  )

  const month = abvMonthNameArray[timeEntriesWithoutDay[0].month]

  const year = timeEntriesWithoutDay[0].year

  const yearAC = year.toString().startsWith('-')
    ? `${year.toString().substr(1)} a.c.`
    : year.toString()

  const isNotFirstEntry = displayEntry && !displayEntry.firstEntry

  const isDisplayEntryMonth =
    isNotFirstEntry &&
    displayEntry.month === timeEntriesWithoutDay[0].month &&
    displayEntry.year === timeEntriesWithoutDay[0].year

  const entryDate = {
    year: timeEntriesWithoutDay[0].year,
    month: timeEntriesWithoutDay[0].month,
    day: null,
  }
  const yearLength = year.toString().startsWith('-')
    ? yearAC.length - 2
    : yearAC.length
  return (
    <>
      <OuterDateWrapper isDisplayEntryMonth={isDisplayEntryMonth}>
        {removePeriodsThatStartThisDate(periods, timeEntriesWithoutDay)[0] && (
          <PeriodMarker
            periods={removePeriodsThatStartThisDate(
              periods,
              timeEntriesWithoutDay
            )}
            entryDate={entryDate}
          />
        )}
        <LeftDateLine />
        <RightDateLine yearLength={yearLength} />
        <DateWrapper>
          <MonthDateWrapper>
            <span>{month}</span>
          </MonthDateWrapper>
          <DateText>de</DateText>
          <span>{yearAC}</span>
        </DateWrapper>
      </OuterDateWrapper>
      {entriesWithoutHiddenPeriods[0]
        ? sortPeriodsLastAndEndOfPeriodsFirst(entriesWithoutHiddenPeriods).map(
            (entry, index) => {
              return (
                <Entry
                  entry={entry}
                  index={index}
                  key={entry.id}
                  periods={periods}
                  newEntryId={newEntryId}
                  forwardedRef={forwardedRef}
                  visibleTimelines={visibleTimelines}
                  bucketName={bucketName}
                />
              )
            }
          )
        : null}
      {hiddenPeriods[0] && (
        <HiddenPeriods
          entries={hiddenPeriods}
          periods={periods}
          newEntryId={newEntryId}
          forwardedRef={forwardedRef}
          visibleTimelines={visibleTimelines}
          bucketName={bucketName}
        />
      )}
    </>
  )
}

EntriesWithoutDay.propTypes = {
  timeEntriesWithoutDay: PropTypes.array,
  visibleTimelines: PropTypes.array,
  newEntryId: PropTypes.string,
  forwardedRef: PropTypes.any,
  bucketName: PropTypes.string,
  periods: PropTypes.array,
  displayEntry: PropTypes.object,
}
