import React from 'react'
import { DayEntriesWrapper } from './DayEntries.styles'
import { Entries } from './Entries/Entries'
import PropTypes from 'prop-types'

export const DayEntries = ({
  timeEntriesByDay,
  newEntryId,
  forwardedRef,
  visibleTimelines,
  bucketName,
}) => {
  return (
    <DayEntriesWrapper>
      {timeEntriesByDay[0]
        ? timeEntriesByDay.map((entry, index) => (
            <Entries
              entries={entry}
              key={index}
              newEntryId={newEntryId}
              forwardedRef={forwardedRef}
              visibleTimelines={visibleTimelines}
              bucketName={bucketName}
            />
          ))
        : null}
    </DayEntriesWrapper>
  )
}

DayEntries.propTypes = {
  timeEntriesByDay: PropTypes.array,
  visibleTimelines: PropTypes.array,
  newEntryId: PropTypes.string,
  forwardedRef: PropTypes.any,
  bucketName: PropTypes.string,
}
