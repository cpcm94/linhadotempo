import React from 'react'
import { Wrapper, EntriesWrapper } from './Entries.styles'
import {
  EntryAndIconWrapper,
  EntryIcon,
  EntryImage,
  EntryImageWrapper,
  EntryNameWrapper,
  EntryYearWrapper,
  IconsWrapper,
  Img,
  YearWrapper,
} from '../../YearEntries.styles'
import PropTypes from 'prop-types'
import { abvMonthNameArray } from '../../../../../../_shared/monthNameArray'
import { useHistory } from 'react-router-dom'
import { filterEntryTimelinesByVisibleTimelines } from '../../../../../../_shared/filterEntryTimelinesByVisibleTimelines'
import { PeriodMarker } from '../../../../../../_shared/PeriodMarker/PeriodMarker'
import { EntryDateWrapper } from '../MonthEntries.styles'

export const Entries = ({
  entries,
  newEntryId,
  forwardedRef,
  visibleTimelines,
  bucketName,
  periods,
  showDate,
  displayEntry,
}) => {
  let history = useHistory()
  const navigateToEditEntry = (entry) => {
    history.push({
      pathname: '/viewTimeline/editEntry/',
      search: window.location.search,
      hash: `#entry=${entry.id}&zoomOut=${true}`,
    })
  }
  const { day, month } = entries[0]
  const monthName = abvMonthNameArray[month]
  const year = entries[0].year.toString().startsWith('-')
    ? `${entries[0].year.toString().substr(1)} a.c.`
    : entries[0].year.toString()

  const isNotFirstEntry = displayEntry && !displayEntry.firstEntry

  const isDisplayEntryYear =
    isNotFirstEntry && displayEntry.year === entries[0].year
  return (
    <Wrapper>
      {showDate && (
        <EntryYearWrapper isDisplayEntryYear={isDisplayEntryYear}>
          <YearWrapper>
            <span>{year}</span>
          </YearWrapper>
        </EntryYearWrapper>
      )}
      {periods[0] && <PeriodMarker periods={periods} />}
      <EntriesWrapper>
        {entries.map((entry, index) => (
          <EntryAndIconWrapper
            key={index}
            isNew={newEntryId === entry.id}
            id={entry.id}
            ref={forwardedRef[entry.id]}
            onClick={() => navigateToEditEntry(entry)}
          >
            <EntryDateWrapper>{`${day}/${monthName}`}</EntryDateWrapper>
            {entry.image_url && (
              <EntryImageWrapper>
                <EntryImage
                  src={`https://${bucketName}.s3.sa-east-1.amazonaws.com/${entry.image_url}`}
                />
              </EntryImageWrapper>
            )}
            <EntryNameWrapper key={index}>{entry.name}</EntryNameWrapper>
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
      </EntriesWrapper>
    </Wrapper>
  )
}

Entries.propTypes = {
  entries: PropTypes.array,
  visibleTimelines: PropTypes.array,
  newEntryId: PropTypes.string,
  forwardedRef: PropTypes.any,
  displayEntry: PropTypes.object,
  bucketName: PropTypes.string,
  periods: PropTypes.array,
  showDate: PropTypes.bool,
}
