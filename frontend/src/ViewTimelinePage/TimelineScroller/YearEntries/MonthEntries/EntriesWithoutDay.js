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
import { sortPeriodsLastAndEndOfPeriodsFirst } from '../../../../_shared/sortPeriodsLastAndEndOfPeriodsFirst'
import { removePeriodsThatEndThisDate } from '../../../../_shared/removePeriodsThatEndThisDate'

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

  const removePeriodsThatStartOnSameDayOnHigherPosition = (periods, entry) => {
    const filterPeriods = (periods) => {
      const onlyPeriodsWithStartDateOfEntry = periods.filter(
        (subArray) =>
          subArray[0].year === entry.year &&
          subArray[0].month === entry.month &&
          subArray[0].day === entry.day
      )
      const filteredPeriodsThatStartOnSameDate =
        onlyPeriodsWithStartDateOfEntry.filter((subArray) => {
          if (periods.filter((period) => period[0].id === entry.id)[0]) {
            return (
              subArray[0].position <=
              periods.filter((period) => period[0].id === entry.id)[0][0]
                .position
            )
          } else if (!entry.is_period) {
            return onlyPeriodsWithStartDateOfEntry
          }
        })

      const periodsThatDontStartOnSameDate = periods.filter((subArray) => {
        if (
          subArray[0].year === entry.year &&
          subArray[0].month === entry.month &&
          subArray[0].day === entry.day
        ) {
          return
        } else {
          return subArray
        }
      })
      return [
        ...periodsThatDontStartOnSameDate,
        ...filteredPeriodsThatStartOnSameDate,
      ]
    }
    const filteredPeriods = filterPeriods(periods)
    return filteredPeriods
  }
  return (
    <MonthAndEntryWrapper>
      <MonthWrapper isDisplayEntryMonth={isDisplayEntryMonth}>
        {removePeriodsThatEndThisDate(periods, timeEntriesWithoutDay)[0] && (
          <PeriodMarker
            periods={removePeriodsThatEndThisDate(
              periods,
              timeEntriesWithoutDay
            )}
            entryDate={entryDate}
          />
        )}
        <DateWrapper>
          <MonthDateWrapper>
            <span>{month}</span>
          </MonthDateWrapper>
          <DateText>de</DateText>
          <span>{yearAC}</span>
        </DateWrapper>
      </MonthWrapper>
      {timeEntriesWithoutDay[0]
        ? sortPeriodsLastAndEndOfPeriodsFirst(timeEntriesWithoutDay).map(
            (entry, index) => {
              console.log('entry', entry)
              console.log(
                'removePeriodsThatStartOnSameDayOnHigherPosition(periods, entry',
                removePeriodsThatStartOnSameDayOnHigherPosition(periods, entry)
              )
              return (
                <EntryAndIconWrapper
                  key={index}
                  isNew={newEntryId === entry.id}
                  id={entry.id}
                  ref={forwardedRef[entry.id]}
                  onClick={() => navigateToEditEntry(entry)}
                >
                  {periods[0] && (
                    <PeriodMarker
                      periods={removePeriodsThatStartOnSameDayOnHigherPosition(
                        periods,
                        entry
                      )}
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
