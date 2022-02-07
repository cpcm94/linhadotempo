import React, { useContext } from 'react'
import { EntryWrapper, EntryNameBackground } from './Entries.styles'
import {
  CategoriesWrapper,
  CategoryName,
  EntryAndIconWrapper,
  EntryIcon,
  EntryImage,
  EntryImageWrapper,
  IconAndDistanceWrapper,
  IconsWrapper,
  Img,
  OriginDistance,
} from '../../YearEntries.styles'
import { filterEntryTimelinesByVisibleTimelines } from '../../../../../_shared/filterEntryTimelinesByVisibleTimelines'
import { PeriodMarker } from '../../../../../_shared/PeriodMarker/PeriodMarker'
import { getPeriodColorByEntryId } from '../../../../../_shared/getPeriodColorByEntryId'
import { filterPeriodsOfSameDateByPosition } from '../../../../../_shared/filterPeriodsOfSameDateByPosition'
import { TimelinesContext } from '../../../../TimelinesContextProvider'
import { calculateDayMonthYearDistance } from '../../../../../_shared/calculateDayMonthYearDistance'
import { getEntryMainImage } from '../../../../../_shared/getEntryMainImage'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

const checkIfTimelineIsDisplayingOrigin = (
  timeline,
  timelineIdsDisplayingOrigin
) => timelineIdsDisplayingOrigin.includes(timeline.id)

export const Entry = ({
  entry,
  index,
  newEntryId,
  forwardedRef = {},
  periods = [],
  visibleTimelines,
  bucketName,
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

  const entryDate = { year: entry.year, month: entry.month, day: entry.day }
  return (
    <EntryAndIconWrapper
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
        <EntryImageWrapper
          periodColor={getPeriodColorByEntryId(entry.id, periods)}
        >
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
        <EntryWrapper key={index}>{entry.name}</EntryWrapper>
        <CategoriesWrapper>
          {entry.time_entry_categories[0] &&
            entry.time_entry_categories.map((category, index) => (
              <CategoryName key={index} bgColor={category.color}>
                {category.name}
              </CategoryName>
            ))}
        </CategoriesWrapper>
      </EntryNameBackground>
      <IconsWrapper>
        {filterEntryTimelinesByVisibleTimelines(visibleTimelines, entry).map(
          (timeline) => (
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
                  {calculateDayMonthYearDistance(entry, timeline)}
                </OriginDistance>
              )}
            </IconAndDistanceWrapper>
          )
        )}
      </IconsWrapper>
    </EntryAndIconWrapper>
  )
}

Entry.propTypes = {
  entry: PropTypes.object,
  index: PropTypes.number,
  periods: PropTypes.array,
  newEntryId: PropTypes.string,
  forwardedRef: PropTypes.any,
  visibleTimelines: PropTypes.array,
  bucketName: PropTypes.string,
}
