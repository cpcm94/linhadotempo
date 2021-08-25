import React from 'react'
import PropTypes from 'prop-types'
import { EntryNameWrapper } from './MonthEntries.styles'
import { EntryAndIconWrapper, EntryIcon } from '../YearEntries.styles'
import { useHistory } from 'react-router-dom'

export const EntriesWithoutDay = ({
  timeEntriesWithoutDay,
  newEntryId,
  forwardedRef,
}) => {
  let history = useHistory()
  const navigateToEditEntry = (entry) => {
    history.push({
      pathname: '/viewTimeline/editEntry/',
      search: window.location.search,
      hash: `#entry=${entry.id}`,
    })
  }
  return (
    <>
      {timeEntriesWithoutDay[0]
        ? timeEntriesWithoutDay.map((entry, index) => (
            <EntryAndIconWrapper
              key={index}
              isNew={newEntryId === entry.id}
              id={entry.id}
              ref={forwardedRef[entry.id]}
              onClick={() => navigateToEditEntry(entry)}
            >
              <EntryNameWrapper>{entry.name}</EntryNameWrapper>
              <EntryIcon color={entry.timelines[0].color}>
                {entry.timelines[0].initials}
              </EntryIcon>
            </EntryAndIconWrapper>
          ))
        : null}
    </>
  )
}

EntriesWithoutDay.propTypes = {
  timeEntriesWithoutDay: PropTypes.array,
  newEntryId: PropTypes.string,
  forwardedRef: PropTypes.any,
}
