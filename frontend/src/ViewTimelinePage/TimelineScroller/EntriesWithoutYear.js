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

export const EntriesWithoutYear = ({
  entriesWithoutYear,
  newEntryId,
  forwardedRef,
  visibleTimelines,
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
            <IconsWrapper>
              {filterEntryTimelinesByVisibleTimelines(
                visibleTimelines,
                entry
              ).map((timeline) => (
                <>
                  {timeline.timelineIconImageUrl ? (
                    <EntryIcon key={timeline.id}>
                      <Img
                        src={`https://${process.env.REACT_APP_S3_BUCKET_NAME}.s3-sa-east-1.amazonaws.com/${timeline.timelineIconImageUrl}`}
                        alt="Icone"
                      />
                    </EntryIcon>
                  ) : (
                    <EntryIcon key={timeline.id} color={timeline.color}>
                      {timeline.initials}
                    </EntryIcon>
                  )}
                </>
              ))}
            </IconsWrapper>
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
}
