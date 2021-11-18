import React from 'react'
import {
  EntryIcon,
  EntryNameWrapper,
  EntryAndIconWrapper,
  IconsWrapper,
  Img,
  EntryImageWrapper,
  EntryImage,
  EntryNameBackground,
} from './YearEntries/YearEntries.styles'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { filterEntryTimelinesByVisibleTimelines } from '../../_shared/filterEntryTimelinesByVisibleTimelines'
import {
  EntryWithoutYearLabelWrapper,
  PeriodsEndsWrapper,
} from './TimelineScroller.styles'
import { PeriodMarker } from '../../_shared/PeriodMarker/PeriodMarker'
import { getPeriodColorByEntryId } from '../../_shared/getPeriodColorByEntryId'
import { filterPeriodsOfSameDateByPosition } from '../../_shared/filterPeriodsOfSameDateByPosition'

export const PeriodEndWithoutYear = ({
  periodEndsWithoutYear,
  newEntryId,
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
  const entryDate = { year: null, month: null, day: null }

  const arrayOfPeriodEndings = periods.map((subArray) => subArray[1])

  const sortedPeriodEndsWithoutYear = periodEndsWithoutYear
    .map((entry) => {
      return {
        ...entry,
        position: arrayOfPeriodEndings.filter(
          (periodEnd) => periodEnd.id === entry.id
        )[0].position,
      }
    })
    .sort((a, b) => a.position - b.position)

  return (
    <PeriodsEndsWrapper>
      <EntryWithoutYearLabelWrapper>
        <span>{'Períodos ainda ativos'}</span>
      </EntryWithoutYearLabelWrapper>
      {sortedPeriodEndsWithoutYear.map((entry, index) => {
        return (
          <EntryAndIconWrapper
            key={index}
            isNew={newEntryId === entry.id}
            id={entry.id}
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
      })}
    </PeriodsEndsWrapper>
  )
}

PeriodEndWithoutYear.propTypes = {
  periodEndsWithoutYear: PropTypes.array,
  newEntryId: PropTypes.string,
  visibleTimelines: PropTypes.array,
  bucketName: PropTypes.string,
  periods: PropTypes.array,
}
