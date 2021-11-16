import React from 'react'
import {
  Wrapper,
  EntriesWrapper,
  EntryDateWrapper,
  EntryWrapper,
  MonthWrapper,
  DayWrapper,
  DateSpan,
  DateText,
  EntryNameBackground,
} from './Entries.styles'
import {
  EntryAndIconWrapper,
  EntryIcon,
  EntryImage,
  EntryImageWrapper,
  IconsWrapper,
  Img,
} from '../../YearEntries.styles'
import PropTypes from 'prop-types'
import { abvMonthNameArray } from '../../../../../_shared/monthNameArray'
import { useHistory } from 'react-router-dom'
import { filterEntryTimelinesByVisibleTimelines } from '../../../../../_shared/filterEntryTimelinesByVisibleTimelines'
import { PeriodMarker } from '../../../../../_shared/PeriodMarker/PeriodMarker'
import { getPeriodColorByEntryId } from '../../../../../_shared/getPeriodColorByEntryId'
import { sortPeriodsLastAndEndOfPeriodsFirst } from '../../../../../sortPeriodsLastAndEndOfPeriodsFirst'

export const Entries = ({
  entries,
  newEntryId,
  forwardedRef,
  displayEntry,
  visibleTimelines,
  bucketName,
  periods,
}) => {
  let history = useHistory()
  const navigateToEditEntry = (entry) => {
    history.push({
      pathname: '/viewTimeline/editEntry/',
      search: window.location.search,
      hash: `#entry=${entry.id}`,
    })
  }
  const { day, month, year } = entries[0]
  const monthName = abvMonthNameArray[month]
  const yearAC = year.toString().startsWith('-')
    ? `${year.toString().substr(1)} a.c.`
    : year.toString()
  const isNotFirstEntry = displayEntry && !displayEntry.firstEntry
  const isDisplayEntryDay =
    isNotFirstEntry &&
    displayEntry.day === day &&
    displayEntry.month === month &&
    displayEntry.year === year

  const entryDate = {
    year: entries[0].year,
    month: entries[0].month,
    day: entries[0].day,
  }

  return (
    <Wrapper>
      <EntryDateWrapper isDisplayEntryDay={isDisplayEntryDay}>
        <DateSpan>
          <DayWrapper>{day}</DayWrapper>
          <MonthWrapper>
            <DateText>de</DateText>
            {monthName}
          </MonthWrapper>
          <>
            <DateText>de</DateText>
            {yearAC}
          </>
        </DateSpan>
      </EntryDateWrapper>
      {periods[0] && <PeriodMarker periods={periods} entryDate={entryDate} />}
      <EntriesWrapper>
        {sortPeriodsLastAndEndOfPeriodsFirst(entries).map((entry, index) => (
          <EntryAndIconWrapper
            key={index}
            isNew={newEntryId === entry.id}
            id={entry.id}
            ref={forwardedRef[entry.id]}
            onClick={() => navigateToEditEntry(entry)}
          >
            {entry.image_url && (
              <EntryImageWrapper>
                <EntryImage
                  src={`https://${bucketName}.s3.sa-east-1.amazonaws.com/${entry.image_url}`}
                />
              </EntryImageWrapper>
            )}
            <EntryNameBackground
              periodColor={getPeriodColorByEntryId(entry.id, periods)}
            >
              <EntryWrapper key={index}>{entry.name}</EntryWrapper>
            </EntryNameBackground>
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
}
