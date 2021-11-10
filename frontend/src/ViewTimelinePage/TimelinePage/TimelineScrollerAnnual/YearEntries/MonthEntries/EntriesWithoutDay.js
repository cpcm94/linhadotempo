import React from 'react'
import PropTypes from 'prop-types'
import { EntryDateWrapper, MonthAndEntryWrapper } from './MonthEntries.styles'
import {
  EntryAndIconWrapper,
  EntryIcon,
  EntryImage,
  EntryImageWrapper,
  EntryYearWrapper,
  IconsWrapper,
  Img,
  YearWrapper,
  EntryNameWrapper,
} from '../YearEntries.styles'
import { useHistory } from 'react-router-dom'
import { abvMonthNameArray } from '../../../../../_shared/monthNameArray'
import { filterEntryTimelinesByVisibleTimelines } from '../../../../../_shared/filterEntryTimelinesByVisibleTimelines'
import { PeriodMarker } from '../../../../../_shared/PeriodMarker/PeriodMarker'

export const EntriesWithoutDay = ({
  timeEntriesWithoutDay,
  newEntryId,
  forwardedRef,
  visibleTimelines,
  bucketName,
  periods,
  displayEntry,
  showDate,
}) => {
  let history = useHistory()
  const navigateToEditEntry = (entry) => {
    history.push({
      pathname: '/viewTimeline/editEntry/',
      search: window.location.search,
      hash: `#entry=${entry.id}&zoomOut=${true}`,
    })
  }

  const monthName =
    timeEntriesWithoutDay[0] &&
    abvMonthNameArray[timeEntriesWithoutDay[0].month]

  const year = timeEntriesWithoutDay[0].year.toString().startsWith('-')
    ? `${timeEntriesWithoutDay[0].year.toString().substr(1)} a.c.`
    : timeEntriesWithoutDay[0].year.toString()

  const isNotFirstEntry = displayEntry && !displayEntry.firstEntry

  const isDisplayEntryYear =
    isNotFirstEntry && displayEntry.year === timeEntriesWithoutDay[0].year
  return (
    <MonthAndEntryWrapper>
      {showDate && (
        <EntryYearWrapper isDisplayEntryYear={isDisplayEntryYear}>
          <YearWrapper>
            <span>{year}</span>
          </YearWrapper>
        </EntryYearWrapper>
      )}
      {periods[0] && <PeriodMarker periods={periods} />}
      {timeEntriesWithoutDay.map((entry, index) => (
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
      ))}
    </MonthAndEntryWrapper>
  )
}

EntriesWithoutDay.propTypes = {
  timeEntriesWithoutDay: PropTypes.array,
  visibleTimelines: PropTypes.array,
  newEntryId: PropTypes.string,
  forwardedRef: PropTypes.any,
  bucketName: PropTypes.string,
  periods: PropTypes.array,
  displayEntry: PropTypes.object,
  showDate: PropTypes.bool,
}
