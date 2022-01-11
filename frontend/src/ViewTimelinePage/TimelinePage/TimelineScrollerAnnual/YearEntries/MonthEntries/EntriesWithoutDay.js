import React from 'react'
import PropTypes from 'prop-types'
import { EntryDateWrapper, EntryNameBackground } from './MonthEntries.styles'
import {
  EntryAndIconWrapper,
  EntryIcon,
  EntryImage,
  EntryImageWrapper,
  IconsWrapper,
  Img,
  YearWrapper,
  EntryNameWrapper,
  OuterDateWrapper,
  LeftDateLine,
  RightDateLine,
} from '../YearEntries.styles'
import { useHistory } from 'react-router-dom'
import { abvMonthNameArray } from '../../../../../_shared/monthNameArray'
import { filterEntryTimelinesByVisibleTimelines } from '../../../../../_shared/filterEntryTimelinesByVisibleTimelines'
import { PeriodMarker } from '../../../../../_shared/PeriodMarker/PeriodMarker'
import { getPeriodColorByEntryId } from '../../../../../_shared/getPeriodColorByEntryId'
import { sortPeriodsLastAndEndOfPeriodsFirst } from '../../../../../_shared/sortPeriodsLastAndEndOfPeriodsFirst'
import { filterPeriodsOfSameDateByPosition } from '../../../../../_shared/filterPeriodsOfSameDateByPosition'
import { removePeriodsThatEndThisYear } from '../../../../../_shared/removePeriodsThatEndThisYear'

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
      hash: `#entry=${entry.id}`,
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

  const entryDate = {
    year: timeEntriesWithoutDay[0].year,
    month: timeEntriesWithoutDay[0].month,
    day: null,
  }

  return (
    <>
      {showDate && (
        <OuterDateWrapper isDisplayEntryYear={isDisplayEntryYear}>
          <LeftDateLine />
          <RightDateLine />
          <YearWrapper>
            <span>{year}</span>
          </YearWrapper>
          {removePeriodsThatEndThisYear(periods, timeEntriesWithoutDay)[0] && (
            <PeriodMarker
              periods={removePeriodsThatEndThisYear(
                periods,
                timeEntriesWithoutDay
              )}
              entryDate={entryDate}
              filterByAnnualImportance={true}
            />
          )}
        </OuterDateWrapper>
      )}
      {sortPeriodsLastAndEndOfPeriodsFirst(timeEntriesWithoutDay).map(
        (entry, index) => (
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
              <EntryDateWrapper>{monthName}</EntryDateWrapper>

              <EntryNameWrapper>{entry.name}</EntryNameWrapper>
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
        )
      )}
    </>
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
