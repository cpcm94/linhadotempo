import React from 'react'
import PropTypes from 'prop-types'
import { EntryNameWrapper } from './MonthEntries.styles'
import { EntryAndIconWrapper, EntryIcon } from '../YearEntries.styles'

export const EntriesWithoutDay = ({ timeEntriesWithoutDay, newEntryId }) => {
  return (
    <>
      {timeEntriesWithoutDay[0]
        ? timeEntriesWithoutDay.map((entry, index) => (
            <EntryAndIconWrapper
              key={index}
              isNew={newEntryId === entry.id}
              id={entry.id}
            >
              <EntryNameWrapper>{entry.name}</EntryNameWrapper>
              <EntryIcon>{entry.timeline_id}</EntryIcon>
            </EntryAndIconWrapper>
          ))
        : null}
    </>
  )
}

EntriesWithoutDay.propTypes = {
  timeEntriesWithoutDay: PropTypes.array,
  newEntryId: PropTypes.string,
}
