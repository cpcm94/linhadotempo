import React from 'react'
import {
  EntryIcon,
  EntryNameWrapper,
  EntryAndIconWrapper,
} from './YearEntries.styles'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

export const EntriesWithoutMonths = ({
  entriesWithoutMonth,
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
      {entriesWithoutMonth[0]
        ? entriesWithoutMonth.map((entry, index) => {
            return (
              <EntryAndIconWrapper
                key={index}
                isNew={newEntryId === entry.id}
                id={entry.id}
                ref={forwardedRef[entry.id]}
              >
                <EntryNameWrapper onClick={() => navigateToEditEntry(entry)}>
                  {entry.name}
                </EntryNameWrapper>
                <EntryIcon>{entry.timeline_id}</EntryIcon>
              </EntryAndIconWrapper>
            )
          })
        : null}
    </>
  )
}

EntriesWithoutMonths.propTypes = {
  entriesWithoutMonth: PropTypes.array,
  newEntryId: PropTypes.string,
  forwardedRef: PropTypes.any,
}
