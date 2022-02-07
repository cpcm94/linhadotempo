import React from 'react'
import PropTypes from 'prop-types'
import {
  DateTextWrapper,
  EntryWithoutYearLabelWrapper,
  LeftDateLine,
  PeriodsEndsWrapper,
  RightDateLine,
} from './TimelineScroller.styles'
import { PeriodMarker } from '../../_shared/PeriodMarker/PeriodMarker'
import { Entry } from './YearEntries/MonthEntries/Entries/Entry'

export const PeriodEndWithoutYear = ({
  periodEndsWithoutYear,
  newEntryId,
  visibleTimelines,
  bucketName,
  periods,
}) => {
  const entryDate = { year: null, month: null, day: null }

  const arrayOfPeriodEndings = periods.map((subArray) => subArray[1])

  const sortedPeriodEndsWithoutYear = periodEndsWithoutYear
    .map((entry) => {
      return {
        ...entry,
        position: arrayOfPeriodEndings.filter(
          (periodEnd) => periodEnd.id === entry.id
        )[0].position,
      }
    })
    .sort((a, b) => b.position - a.position)
  return (
    <PeriodsEndsWrapper>
      <EntryWithoutYearLabelWrapper>
        <LeftDateLine />
        <RightDateLine />
        <DateTextWrapper>
          <span>{'Períodos ainda ativos'}</span>
        </DateTextWrapper>
      </EntryWithoutYearLabelWrapper>
      <PeriodMarker periods={periods} entryDate={entryDate} />
      {sortedPeriodEndsWithoutYear.map((entry, index) => {
        return (
          <Entry
            entry={entry}
            index={index}
            periods={periods}
            key={entry.id}
            newEntryId={newEntryId}
            visibleTimelines={visibleTimelines}
            bucketName={bucketName}
          />
        )
      })}
    </PeriodsEndsWrapper>
  )
}

PeriodEndWithoutYear.propTypes = {
  periodEndsWithoutYear: PropTypes.array,
  newEntryId: PropTypes.string,
  visibleTimelines: PropTypes.array,
  bucketName: PropTypes.string,
  periods: PropTypes.array,
}
