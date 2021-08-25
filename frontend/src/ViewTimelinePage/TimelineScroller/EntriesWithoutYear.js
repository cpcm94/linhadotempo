import React from 'react'
import {
  EntryIcon,
  EntryNameWrapper,
  EntryAndIconWrapper,
} from './YearEntries/YearEntries.styles'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

export const EntriesWithoutYear = ({
  entriesWithoutYear,
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
      {entriesWithoutYear.map((entry, index) => {
        return (
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
        )
      })}
    </>
  )
}

EntriesWithoutYear.propTypes = {
  entriesWithoutYear: PropTypes.array,
  newEntryId: PropTypes.string,
  forwardedRef: PropTypes.any,
}
