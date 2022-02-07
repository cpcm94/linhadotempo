import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  DateTextWrapper,
  EntryWithoutYearLabelWrapper,
  LeftDateLine,
  RightNoDateLine,
} from './TimelineScroller.styles'
import { Entry } from './YearEntries/MonthEntries/Entries/Entry'

export const EntriesWithoutYear = ({
  entriesWithoutYear,
  newEntryId,
  forwardedRef,
  visibleTimelines,
  bucketName,
}) => {
  return (
    <>
      {entriesWithoutYear.map((entry, index) => {
        return (
          <Fragment key={index}>
            <EntryWithoutYearLabelWrapper>
              <LeftDateLine />
              <RightNoDateLine />
              <DateTextWrapper>
                <span>{'Sem data definida'}</span>
              </DateTextWrapper>
            </EntryWithoutYearLabelWrapper>
            <Entry
              entry={entry}
              index={index}
              key={entry.id}
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

EntriesWithoutYear.propTypes = {
  entriesWithoutYear: PropTypes.array,
  newEntryId: PropTypes.string,
  forwardedRef: PropTypes.any,
  visibleTimelines: PropTypes.array,
  bucketName: PropTypes.string,
}
