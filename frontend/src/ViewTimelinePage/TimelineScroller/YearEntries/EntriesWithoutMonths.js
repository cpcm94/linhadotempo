import React from 'react'
import {
  EntryIcon,
  EntryNameWrapper,
  EntryAndIconWrapper,
  IconsWrapper,
  Img,
  EntryImage,
  EntryImageWrapper,
  EntriesWithoutMonthsWrapper,
  EntryYearWrapper,
  YearWrapper,
  EntryNameBackground,
} from './YearEntries.styles'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { filterEntryTimelinesByVisibleTimelines } from '../../../_shared/filterEntryTimelinesByVisibleTimelines'
import { PeriodMarker } from '../../../_shared/PeriodMarker/PeriodMarker'
import { getPeriodColorByEntryId } from '../../../_shared/getPeriodColorByEntryId'
import { sortPeriodsLastAndEndOfPeriodsFirst } from '../../../sortPeriodsLastAndEndOfPeriodsFirst'

export const EntriesWithoutMonths = ({
  entriesWithoutMonth,
  newEntryId,
  forwardedRef,
  visibleTimelines,
  bucketName,
  periods,
  displayEntry,
}) => {
  let history = useHistory()
  const navigateToEditEntry = (entry) => {
    history.push({
      pathname: '/viewTimeline/editEntry/',
      search: window.location.search,
      hash: `#entry=${entry.id}`,
    })
  }
  const isNotFirstEntry = displayEntry && !displayEntry.firstEntry
  const isDisplayEntryYear =
    isNotFirstEntry && displayEntry.year === entriesWithoutMonth[0].year

  const year = entriesWithoutMonth[0].year.toString().startsWith('-')
    ? `${entriesWithoutMonth[0].year.toString().substr(1)} a.c.`
    : entriesWithoutMonth[0].year.toString()

  const entryDate = {
    year: entriesWithoutMonth[0].year,
    month: null,
    day: null,
  }
  return (
    <EntriesWithoutMonthsWrapper>
      <EntryYearWrapper isDisplayEntryYear={isDisplayEntryYear}>
        <YearWrapper>
          <span>{year}</span>
        </YearWrapper>
      </EntryYearWrapper>
      {periods[0] && <PeriodMarker periods={periods} entryDate={entryDate} />}
      {sortPeriodsLastAndEndOfPeriodsFirst(entriesWithoutMonth).map(
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
      )}
    </EntriesWithoutMonthsWrapper>
  )
}

EntriesWithoutMonths.propTypes = {
  entriesWithoutMonth: PropTypes.array,
  visibleTimelines: PropTypes.array,
  newEntryId: PropTypes.string,
  forwardedRef: PropTypes.any,
  bucketName: PropTypes.string,
  periods: PropTypes.array,
  displayEntry: PropTypes.object,
}
