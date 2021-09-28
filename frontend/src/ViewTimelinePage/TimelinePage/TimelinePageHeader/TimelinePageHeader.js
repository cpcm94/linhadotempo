import React from 'react'
import PropTypes from 'prop-types'
import {
  HeaderWrapper,
  EntryWrapper,
  YearWrapper,
  MonthWrapper,
  DayWrapper,
  TextWrapper,
} from './TimelinePageHeader.styles'
import {
  EntryIcon,
  Img,
  IconsWrapper,
} from '../../TimelineScroller/YearEntries/YearEntries.styles'
import { abvMonthNameArray } from '../../../_shared/monthNameArray'
import { ReturnButton } from '../../../_shared/ReturnButton'
import { useHistory } from 'react-router'
import { filterEntryTimelinesByVisibleTimelines } from '../../TimelineScroller/filterEntryTimelinesByVisibleTimelines'

export const TimelinePageHeader = ({
  displayEntry,
  timelines,
  visibleTimelines,
  bucketName,
}) => {
  let history = useHistory()
  const timelinesId = timelines.map((timeline) => timeline.id)
  const navigateToTimelinesList = () => {
    history.push(`/timelines?timelines=${timelinesId.join()}`)
  }
  const monthName =
    displayEntry && displayEntry.month
      ? abvMonthNameArray[displayEntry.month]
      : null
  const yearAC =
    displayEntry && displayEntry.year
      ? displayEntry.year.toString().startsWith('-')
        ? `${displayEntry.year.toString().substr(1)} a.c.`
        : displayEntry.year.toString()
      : null

  return (
    <HeaderWrapper>
      <ReturnButton onClick={navigateToTimelinesList} />
      <EntryWrapper>
        {yearAC ? (
          <>
            <DayWrapper
              isDisplayEntryDay={
                displayEntry && displayEntry.day ? true : false
              }
            >
              {displayEntry && displayEntry.day ? displayEntry.day : null}
            </DayWrapper>
            <MonthWrapper isDisplayEntryMonth={monthName ? true : false}>
              {displayEntry && displayEntry.day ? ` de ` : null}
              {monthName}
            </MonthWrapper>
            <YearWrapper hasPrefix={!monthName}>
              {monthName && 'de '}
              {yearAC}
            </YearWrapper>
          </>
        ) : displayEntry && displayEntry.entryId ? (
          <TextWrapper>Sem data definida</TextWrapper>
        ) : null}
      </EntryWrapper>
      <IconsWrapper>
        {displayEntry && displayEntry.timelines
          ? filterEntryTimelinesByVisibleTimelines(
              visibleTimelines,
              displayEntry
            ).map((timeline) => (
              <div key={timeline.id}>
                {timeline.timelineIconImageUrl ? (
                  <EntryIcon color={timeline.color}>
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
            ))
          : null}
      </IconsWrapper>
    </HeaderWrapper>
  )
}

TimelinePageHeader.propTypes = {
  displayEntry: PropTypes.object,
  timelines: PropTypes.array,
  visibleTimelines: PropTypes.array,
  bucketName: PropTypes.string,
}
