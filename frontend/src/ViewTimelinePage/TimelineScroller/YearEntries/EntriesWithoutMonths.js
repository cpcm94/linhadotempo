import React from 'react'
import {
  YearWrapper,
  OuterDateWrapper,
  LeftDateLine,
  RightDateLine,
} from './YearEntries.styles'
import PropTypes from 'prop-types'
import { PeriodMarker } from '../../../_shared/PeriodMarker/PeriodMarker'
import { sortPeriodsLastAndEndOfPeriodsFirst } from '../../../_shared/sortPeriodsLastAndEndOfPeriodsFirst'
import { removePeriodsThatStartThisDate } from '../../../_shared/removePeriodsThatStartThisDate'
import { Entry } from './MonthEntries/Entries/Entry'
import { HiddenPeriods } from './HiddenPeriods/HiddenPeriods'

export const EntriesWithoutMonths = ({
  entriesWithoutMonth,
  newEntryId,
  forwardedRef,
  visibleTimelines,
  bucketName,
  periods,
  displayEntry,
}) => {
  const hiddenPeriods = entriesWithoutMonth.filter(
    (entry) => !entry.show_period && entry.is_period
  )
  const entriesWithoutHiddenPeriods = sortPeriodsLastAndEndOfPeriodsFirst(
    entriesWithoutMonth.filter((entry) => entry.show_period)
  )

  const isNotFirstEntry = displayEntry && !displayEntry.firstEntry
  const isDisplayEntryYear =
    isNotFirstEntry && displayEntry.year === entriesWithoutMonth[0].year

  const year = entriesWithoutMonth[0].year.toString().startsWith('-')
    ? `${entriesWithoutMonth[0].year.toString().substr(1)} a.c.`
    : entriesWithoutMonth[0].year.toString()

  const entryDate = {
    year: entriesWithoutMonth[0].year,
    month: null,
    day: null,
  }
  const yearLength = entriesWithoutMonth[0].year.toString().startsWith('-')
    ? year.length - 2
    : year.length
  return (
    <>
      <OuterDateWrapper isDisplayEntryYear={isDisplayEntryYear}>
        {removePeriodsThatStartThisDate(periods, entriesWithoutMonth)[0] && (
          <PeriodMarker
            periods={removePeriodsThatStartThisDate(
              periods,
              entriesWithoutMonth
            )}
            entryDate={entryDate}
          />
        )}
        <LeftDateLine />
        <RightDateLine yearLength={yearLength} />
        <YearWrapper>
          <span>{year}</span>
        </YearWrapper>
      </OuterDateWrapper>
      {sortPeriodsLastAndEndOfPeriodsFirst(entriesWithoutHiddenPeriods).map(
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
      )}
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

EntriesWithoutMonths.propTypes = {
  entriesWithoutMonth: PropTypes.array,
  visibleTimelines: PropTypes.array,
  newEntryId: PropTypes.string,
  forwardedRef: PropTypes.any,
  bucketName: PropTypes.string,
  periods: PropTypes.array,
  displayEntry: PropTypes.object,
}
