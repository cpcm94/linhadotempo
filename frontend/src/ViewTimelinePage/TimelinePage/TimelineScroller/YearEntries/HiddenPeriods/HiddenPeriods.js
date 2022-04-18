import React, { Fragment } from 'react'
import { PeriodMarker } from '../../../../../_shared/PeriodMarker/PeriodMarker'
import PropTypes from 'prop-types'
import {
  DateSpan,
  DateWrapper,
  LeftDateLine,
  RightDateLine,
} from './HiddenPeriods.styles'
import { abvMonthNameArray } from '../../../../../_shared/monthNameArray'
import { Entry } from '../MonthEntries/Entries/Entry'
import { removePeriodsThatEndThisDate } from '../../../../../_shared/removePeriodsThatEndThisDate'
import { sortEntriesByEndDate } from '../../../../../_shared/sortEntriesByEndDate'

const entryDateString = (entry) =>
  `${entry.day ? entry.day : ''} ${entry.day ? 'de' : ''} ${
    entry.month ? abvMonthNameArray[entry.month] : ''
  } ${entry.month ? 'de' : ''} ${entry.year} até ${
    entry.end_day ? entry.end_day : ''
  } ${entry.end_day ? 'de' : ''} ${
    entry.end_month ? abvMonthNameArray[entry.end_month] : ''
  } ${entry.end_month ? 'de' : ''} ${
    entry.end_year ? entry.end_year : 'ainda ativo'
  }`

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
    month: entries[0].month ? entries[0].month : null,
    day: entries[0].day ? entries[0].day : null,
  }

  const sortedEntriesByEndDate = sortEntriesByEndDate(entries)

  return (
    <>
      {sortedEntriesByEndDate.map((entry, index) => {
        return (
          <Fragment key={entry.id}>
            <DateWrapper>
              <PeriodMarker
                periods={removePeriodsThatEndThisDate(periods, entries)}
                entryDate={entryDate}
              />
              <LeftDateLine />
              <RightDateLine dateLength={entryDateString(entry).length} />
              <DateSpan>
                <span>{entryDateString(entry)}</span>
              </DateSpan>
            </DateWrapper>
            <Entry
              entry={entry}
              index={index}
              periods={removePeriodsThatEndThisDate(periods, entries)}
              newEntryId={newEntryId}
              forwardedRef={forwardedRef}
              visibleTimelines={visibleTimelines}
              bucketName={bucketName}
            />
          </Fragment>
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
