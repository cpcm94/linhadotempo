import React from 'react'
import {
  EntryWrapper,
  MonthWrapper,
  DayWrapper,
  DateSpan,
  DateText,
  EntryNameBackground,
  RightDateLine,
  LeftDateLine,
  DateWrapper,
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
import { sortPeriodsLastAndEndOfPeriodsFirst } from '../../../../../_shared/sortPeriodsLastAndEndOfPeriodsFirst'
import { removePeriodsThatEndThisDate } from '../../../../../_shared/removePeriodsThatEndThisDate'
import { filterPeriodsOfSameDateByPosition } from '../../../../../_shared/filterPeriodsOfSameDateByPosition'

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
    <>
      <DateWrapper isDisplayEntryDay={isDisplayEntryDay}>
        {removePeriodsThatEndThisDate(periods, entries)[0] && (
          <PeriodMarker
            periods={removePeriodsThatEndThisDate(periods, entries)}
            entryDate={entryDate}
          />
        )}
        <LeftDateLine />
        <RightDateLine />
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
      </DateWrapper>
      {sortPeriodsLastAndEndOfPeriodsFirst(entries).map((entry, index) => (
        <EntryAndIconWrapper
          key={index}
          isNew={newEntryId === entry.id}
          id={entry.id}
          ref={forwardedRef[entry.id]}
          onClick={() => navigateToEditEntry(entry)}
        >
          {periods[0] && (
            <PeriodMarker
              periods={filterPeriodsOfSameDateByPosition(periods, entry)}
              entryDate={entryDate}
            />
          )}
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
    </>
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
