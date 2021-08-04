import React from 'react'
import { DayEntriesWrapper } from './DayEntries.styles'
import { Entries } from './Entries/Entries'
import PropTypes from 'prop-types'

export const DayEntries = ({
  timeEntriesByDay,
  timelines,
  newEntryId,
  forwardedRef,
  displayEntry,
  hasMonth,
  hasYear,
}) => {
  return (
    <DayEntriesWrapper>
      {timeEntriesByDay[0]
        ? timeEntriesByDay.map((entry, index) => (
            <Entries
              entries={entry}
              timelines={timelines}
              key={index}
              newEntryId={newEntryId}
              forwardedRef={forwardedRef}
              displayEntry={displayEntry}
              hasMonth={hasMonth}
              hasYear={hasYear}
            />
          ))
        : null}
    </DayEntriesWrapper>
  )
}

DayEntries.propTypes = {
  timeEntriesByDay: PropTypes.array,
  timelines: PropTypes.array,
  newEntryId: PropTypes.string,
  forwardedRef: PropTypes.any,
  displayEntry: PropTypes.object,
  hasMonth: PropTypes.bool,
  hasYear: PropTypes.bool,
}
