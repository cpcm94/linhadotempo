import React from 'react'
import PropTypes from 'prop-types'
import {
  DateText,
  DateWrapper,
  EntryNameBackground,
  EntryNameWrapper,
  MonthAndEntryWrapper,
  MonthDateWrapper,
  MonthWrapper,
} from './MonthEntries.styles'
import {
  EntryAndIconWrapper,
  EntryIcon,
  EntryImage,
  EntryImageWrapper,
  IconsWrapper,
  Img,
} from '../YearEntries.styles'
import { useHistory } from 'react-router-dom'
import { filterEntryTimelinesByVisibleTimelines } from '../../../../_shared/filterEntryTimelinesByVisibleTimelines'
import { abvMonthNameArray } from '../../../../_shared/monthNameArray'
import { PeriodMarker } from '../../../../_shared/PeriodMarker/PeriodMarker'
import { getPeriodColorByEntryId } from '../../../../_shared/getPeriodColorByEntryId'
import { sortPeriodsLastAndEndOfPeriodsFirst } from '../../../../sortPeriodsLastAndEndOfPeriodsFirst'

export const EntriesWithoutDay = ({
  timeEntriesWithoutDay,
  newEntryId,
  forwardedRef,
  visibleTimelines,
  bucketName,
  periods,
  displayEntry,
}) => {
  const month = abvMonthNameArray[timeEntriesWithoutDay[0].month]

  const year = timeEntriesWithoutDay[0].year

  const yearAC = year.toString().startsWith('-')
    ? `${year.toString().substr(1)} a.c.`
    : year.toString()

  const isNotFirstEntry = displayEntry && !displayEntry.firstEntry

  const isDisplayEntryMonth =
    isNotFirstEntry &&
    displayEntry.month === timeEntriesWithoutDay[0].month &&
    displayEntry.year === timeEntriesWithoutDay[0].year

  let history = useHistory()
  const navigateToEditEntry = (entry) => {
    history.push({
      pathname: '/viewTimeline/editEntry/',
      search: window.location.search,
      hash: `#entry=${entry.id}`,
    })
  }

  const entryDate = {
    year: timeEntriesWithoutDay[0].year,
    month: timeEntriesWithoutDay[0].month,
    day: null,
  }
  return (
    <MonthAndEntryWrapper>
      <MonthWrapper isDisplayEntryMonth={isDisplayEntryMonth}>
        <DateWrapper>
          <MonthDateWrapper>
            <span>{month}</span>
          </MonthDateWrapper>
          <DateText>de</DateText>
          <span>{yearAC}</span>
        </DateWrapper>
      </MonthWrapper>
      {periods[0] && <PeriodMarker periods={periods} entryDate={entryDate} />}
      {timeEntriesWithoutDay[0]
        ? sortPeriodsLastAndEndOfPeriodsFirst(timeEntriesWithoutDay).map(
            (entry, index) => {
              return (
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
            }
          )
        : null}
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
}
