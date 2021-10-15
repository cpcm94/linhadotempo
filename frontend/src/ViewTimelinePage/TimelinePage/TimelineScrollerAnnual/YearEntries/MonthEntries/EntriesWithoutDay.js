import React from 'react'
import PropTypes from 'prop-types'
import { EntryDateWrapper, EntryNameWrapper } from './MonthEntries.styles'
import {
  EntryAndIconWrapper,
  EntryIcon,
  EntryImage,
  EntryImageWrapper,
  IconsWrapper,
  Img,
} from '../YearEntries.styles'
import { useHistory } from 'react-router-dom'
import { abvMonthNameArray } from '../../../../../_shared/monthNameArray'
import { filterEntryTimelinesByVisibleTimelines } from '../../../../../_shared/filterEntryTimelinesByVisibleTimelines'

export const EntriesWithoutDay = ({
  timeEntriesWithoutDay,
  newEntryId,
  forwardedRef,
  visibleTimelines,
  bucketName,
}) => {
  let history = useHistory()
  const navigateToEditEntry = (entry) => {
    history.push({
      pathname: '/viewTimeline/editEntry/',
      search: window.location.search,
      hash: `#entry=${entry.id}`,
    })
  }

  const monthName =
    timeEntriesWithoutDay[0] &&
    abvMonthNameArray[timeEntriesWithoutDay[0].month]

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
              <EntryDateWrapper>{monthName}</EntryDateWrapper>
              {entry.image_url && (
                <EntryImageWrapper>
                  <EntryImage
                    src={`https://${bucketName}.s3.sa-east-1.amazonaws.com/${entry.image_url}`}
                  />
                </EntryImageWrapper>
              )}
              <EntryNameWrapper>{entry.name}</EntryNameWrapper>
              <IconsWrapper>
                {filterEntryTimelinesByVisibleTimelines(
                  visibleTimelines,
                  entry
                ).map((timeline) => (
                  <div key={timeline.id}>
                    {timeline.timelineIconImageUrl ? (
                      <EntryIcon borderColor={timeline.color}>
                        <Img
                          src={`https://${bucketName}.s3.sa-east-1.amazonaws.com/${timeline.timelineIconImageUrl}`}
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
  bucketName: PropTypes.string,
}
