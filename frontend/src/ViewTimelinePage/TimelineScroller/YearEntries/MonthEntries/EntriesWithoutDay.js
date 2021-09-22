import React from 'react'
import PropTypes from 'prop-types'
import { EntryNameWrapper } from './MonthEntries.styles'
import {
  EntryAndIconWrapper,
  EntryIcon,
  IconsWrapper,
  Img,
} from '../YearEntries.styles'
import { useHistory } from 'react-router-dom'
import { filterEntryTimelinesByVisibleTimelines } from '../../filterEntryTimelinesByVisibleTimelines'
import { hideEntryIconsIfSameAsDisplay } from '../../hideEntryIconIfSameAsDisplay'

export const EntriesWithoutDay = ({
  timeEntriesWithoutDay,
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
                        <EntryIcon timelineColor={timeline.color}>
                          <Img
                            src={timeline.timelineIconImageUrl}
                            alt="Icone"
                          />
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
          ))
        : null}
    </>
  )
}

EntriesWithoutDay.propTypes = {
  timeEntriesWithoutDay: PropTypes.array,
  visibleTimelines: PropTypes.array,
  newEntryId: PropTypes.string,
  forwardedRef: PropTypes.any,
  displayEntry: PropTypes.object,
}
