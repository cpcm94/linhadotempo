import React from 'react'
import {
  MonthWrapper,
  DayWrapper,
  DateSpan,
  DateText,
  RightDateLine,
  LeftDateLine,
  DateWrapper,
} from './Entries.styles'
import PropTypes from 'prop-types'
import { abvMonthNameArray } from '../../../../../../_shared/monthNameArray'
import { PeriodMarker } from '../../../../../../_shared/PeriodMarker/PeriodMarker'
import { sortPeriodsLastAndEndOfPeriodsFirst } from '../../../../../../_shared/sortPeriodsLastAndEndOfPeriodsFirst'
import { removePeriodsThatStartThisDate } from '../../../../../../_shared/removePeriodsThatStartThisDate'
import { HiddenPeriods } from '../../HiddenPeriods/HiddenPeriods'
import { Entry } from './Entry'

export const Entries = ({
  entries,
  newEntryId,
  forwardedRef,
  displayEntry,
  visibleTimelines,
  bucketName,
  periods,
}) => {
  const hiddenPeriods = entries.filter(
    (entry) => !entry.show_period && entry.is_period
  )
  const entriesWithoutHiddenPeriods = sortPeriodsLastAndEndOfPeriodsFirst(
    entries.filter((entry) => entry.show_period)
  )

  const { day, month, year } = entries[0]
  const monthName = abvMonthNameArray[month]
  const yearAC = year.toString().startsWith('-')
    ? `${year.toString().substr(1)} a.c.`
    : year.toString()
  const isNotFirstEntry = displayEntry && !displayEntry.firstEntry
  const isDisplayEntryDay =
    isNotFirstEntry &&
    displayEntry.day === day &&
    displayEntry.month === month &&
    displayEntry.year === year

  const entryDate = {
    year: year,
    month: month,
    day: day,
  }

  const yearLength = year.toString().startsWith('-')
    ? yearAC.length - 2
    : yearAC.length

  return (
    <>
      <DateWrapper isDisplayEntryDay={isDisplayEntryDay}>
        {removePeriodsThatStartThisDate(periods, entries)[0] && (
          <PeriodMarker
            periods={removePeriodsThatStartThisDate(periods, entries)}
            entryDate={entryDate}
          />
        )}
        <LeftDateLine />
        <RightDateLine yearLength={yearLength} />
        <DateSpan>
          <DayWrapper>{day}</DayWrapper>
          <MonthWrapper>
            <DateText>de</DateText>
            {monthName}
          </MonthWrapper>
          <>
            <DateText>de</DateText>
            {yearAC}
          </>
        </DateSpan>
      </DateWrapper>
      {entriesWithoutHiddenPeriods.map((entry, index) => (
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
      ))}
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

Entries.propTypes = {
  entries: PropTypes.array,
  visibleTimelines: PropTypes.array,
  newEntryId: PropTypes.string,
  forwardedRef: PropTypes.any,
  displayEntry: PropTypes.object,
  bucketName: PropTypes.string,
  periods: PropTypes.array,
}
