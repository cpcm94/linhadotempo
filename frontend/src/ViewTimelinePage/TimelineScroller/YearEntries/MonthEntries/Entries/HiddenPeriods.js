import React from 'react'
import { PeriodMarker } from '../../../../../_shared/PeriodMarker/PeriodMarker'
import PropTypes from 'prop-types'
import {
  DateSpan,
  DateWrapper,
  LeftDateLine,
  RightDateLine,
} from './HiddenPeriods.styles'
import { removePeriodsThatStartThisDate } from '../../../../../_shared/removePeriodsThatStartThisDate'
import { abvMonthNameArray } from '../../../../../_shared/monthNameArray'
import { Entry } from './Entry'

export const HiddenPeriods = ({
  entries,
  periods,
  newEntryId,
  forwardedRef,
  visibleTimelines,
  bucketName,
}) => {
  const entryDate = {
    year: entries[0].year,
    month: entries[0].month,
    day: entries[0].day,
  }
  const monthName = abvMonthNameArray[entries[0].month]
  const entryDateString = (entry) =>
    `${entry.day} de ${monthName} de ${entry.year} até ${
      entry.end_day ? entry.end_day : ''
    } ${entry.end_day ? 'de' : ''} ${entry.end_month ? monthName : ''} ${
      entry.end_month ? 'de' : ''
    } ${entry.end_year ? entry.end_year : 'ainda ativo'}`

  return (
    <>
      <DateWrapper>
        {removePeriodsThatStartThisDate(periods, entries)[0] && (
          <PeriodMarker
            periods={removePeriodsThatStartThisDate(periods, entries)}
            entryDate={entryDate}
          />
        )}
        <LeftDateLine />
        <RightDateLine />
        <DateSpan>
          <span>{entryDateString(entries[0])}</span>
        </DateSpan>
      </DateWrapper>
      {entries.map((entry, index) => {
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
      })}
    </>
  )
}

HiddenPeriods.propTypes = {
  entries: PropTypes.array,
  periods: PropTypes.array,
  newEntryId: PropTypes.string,
  forwardedRef: PropTypes.any,
  visibleTimelines: PropTypes.array,
  bucketName: PropTypes.string,
}
