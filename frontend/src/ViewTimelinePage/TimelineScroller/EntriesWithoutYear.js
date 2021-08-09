import React from 'react'
import {
  EntryIcon,
  EntryNameWrapper,
  EntryAndIconWrapper,
} from './YearEntries/YearEntries.styles'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { timelineColor } from '../../_shared/timelineColor'
import { filterTimelineInitials } from './YearEntries/filterTimelineInitials'

export const EntriesWithoutYear = ({
  entriesWithoutYear,
  timelines,
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
            <EntryIcon color={timelineColor(timelines, entry.timeline_id)}>
              {filterTimelineInitials(timelines, entry)}
            </EntryIcon>
          </EntryAndIconWrapper>
        )
      })}
    </>
  )
}

EntriesWithoutYear.propTypes = {
  entriesWithoutYear: PropTypes.array,
  timelines: PropTypes.array,
  newEntryId: PropTypes.string,
  forwardedRef: PropTypes.any,
}
