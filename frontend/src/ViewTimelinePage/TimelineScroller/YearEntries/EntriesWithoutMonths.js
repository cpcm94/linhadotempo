import React, { useContext } from 'react'
import {
  EntryIcon,
  EntryNameWrapper,
  EntryAndIconWrapper,
  IconsWrapper,
  Img,
  EntryImage,
  EntryImageWrapper,
  YearWrapper,
  EntryNameBackground,
  OuterDateWrapper,
  LeftDateLine,
  RightDateLine,
  OriginDistance,
  IconAndDistanceWrapper,
} from './YearEntries.styles'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { filterEntryTimelinesByVisibleTimelines } from '../../../_shared/filterEntryTimelinesByVisibleTimelines'
import { PeriodMarker } from '../../../_shared/PeriodMarker/PeriodMarker'
import { getPeriodColorByEntryId } from '../../../_shared/getPeriodColorByEntryId'
import { sortPeriodsLastAndEndOfPeriodsFirst } from '../../../_shared/sortPeriodsLastAndEndOfPeriodsFirst'
import { removePeriodsThatEndThisDate } from '../../../_shared/removePeriodsThatEndThisDate'
import { filterPeriodsOfSameDateByPosition } from '../../../_shared/filterPeriodsOfSameDateByPosition'
import { TimelinesContext } from '../../TimelinesContextProvider'
import { calculateYearDistance } from '../../../_shared/calculateYearDistance'
import { getEntryMainImage } from '../../../_shared/getEntryMainImage'
import { checkIfTimelineIsDisplayingOrigin } from '../../../checkIfTimelineIsDisplayingOrigin'

export const EntriesWithoutMonths = ({
  entriesWithoutMonth,
  newEntryId,
  forwardedRef,
  visibleTimelines,
  bucketName,
  periods,
  displayEntry,
}) => {
  const { timelineIdsDisplayingOrigin } = useContext(TimelinesContext)

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
    <>
      <OuterDateWrapper isDisplayEntryYear={isDisplayEntryYear}>
        {removePeriodsThatEndThisDate(periods, entriesWithoutMonth)[0] && (
          <PeriodMarker
            periods={removePeriodsThatEndThisDate(periods, entriesWithoutMonth)}
            entryDate={entryDate}
          />
        )}
        <LeftDateLine />
        <RightDateLine />
        <YearWrapper>
          <span>{year}</span>
        </YearWrapper>
      </OuterDateWrapper>
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
              {periods[0] && (
                <PeriodMarker
                  periods={filterPeriodsOfSameDateByPosition(periods, entry)}
                  entryDate={entryDate}
                />
              )}
              {getEntryMainImage(entry) && (
                <EntryImageWrapper>
                  <EntryImage
                    src={`${process.env.REACT_APP_IMAGES_ENDPOINT}?name=${
                      getEntryMainImage(entry).image_url
                    }&width=39&height=39`}
                    alt="Imagem"
                  />
                </EntryImageWrapper>
              )}
              <EntryNameBackground
                periodColor={getPeriodColorByEntryId(entry.id, periods)}
                hasMainImage={getEntryMainImage(entry)}
              >
                <EntryNameWrapper>{entry.name}</EntryNameWrapper>
              </EntryNameBackground>
              <IconsWrapper>
                {filterEntryTimelinesByVisibleTimelines(
                  visibleTimelines,
                  entry
                ).map((timeline) => {
                  return (
                    <IconAndDistanceWrapper key={timeline.id}>
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
                      {checkIfTimelineIsDisplayingOrigin(
                        timeline,
                        timelineIdsDisplayingOrigin
                      ) && (
                        <OriginDistance>
                          {calculateYearDistance(entry, timeline)}
                        </OriginDistance>
                      )}
                    </IconAndDistanceWrapper>
                  )
                })}
              </IconsWrapper>
            </EntryAndIconWrapper>
          )
        }
      )}
    </>
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
