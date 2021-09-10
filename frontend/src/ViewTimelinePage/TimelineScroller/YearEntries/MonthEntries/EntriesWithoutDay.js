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

export const EntriesWithoutDay = ({
  timeEntriesWithoutDay,
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
}
