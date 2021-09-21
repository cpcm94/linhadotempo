import React from 'react'
import {
  EntryIcon,
  EntryNameWrapper,
  EntryAndIconWrapper,
  IconsWrapper,
  Img,
} from './YearEntries/YearEntries.styles'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { filterEntryTimelinesByVisibleTimelines } from './filterEntryTimelinesByVisibleTimelines'
import { hideEntryIconsIfSameAsDisplay } from './hideEntryIconIfSameAsDisplay'

export const EntriesWithoutYear = ({
  entriesWithoutYear,
  newEntryId,
  forwardedRef,
  visibleTimelines,
  displayEntry,
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
            {hideEntryIconsIfSameAsDisplay(
              entry,
              displayEntry,
              visibleTimelines
            ) && (
              <IconsWrapper>
                {filterEntryTimelinesByVisibleTimelines(
                  visibleTimelines,
                  entry
                ).map((timeline) => (
                  <div key={timeline.id}>
                    {timeline.timelineIconImageUrl ? (
                      <EntryIcon>
                        <Img src={timeline.timelineIconImageUrl} alt="Icone" />
                      </EntryIcon>
                    ) : (
                      <EntryIcon color={timeline.color}>
                        {timeline.initials}
                      </EntryIcon>
                    )}
                  </div>
                ))}
              </IconsWrapper>
            )}
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
  visibleTimelines: PropTypes.array,
  displayEntry: PropTypes.object,
}
