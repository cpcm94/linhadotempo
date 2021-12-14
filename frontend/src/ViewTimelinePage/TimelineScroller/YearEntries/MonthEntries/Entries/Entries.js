import React, { useContext } from 'react'
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
import PropTypes from 'prop-types'
import { abvMonthNameArray } from '../../../../../_shared/monthNameArray'
import { useHistory } from 'react-router-dom'
import { filterEntryTimelinesByVisibleTimelines } from '../../../../../_shared/filterEntryTimelinesByVisibleTimelines'
import { PeriodMarker } from '../../../../../_shared/PeriodMarker/PeriodMarker'
import { getPeriodColorByEntryId } from '../../../../../_shared/getPeriodColorByEntryId'
import { sortPeriodsLastAndEndOfPeriodsFirst } from '../../../../../_shared/sortPeriodsLastAndEndOfPeriodsFirst'
import { removePeriodsThatStartThisDate } from '../../../../../_shared/removePeriodsThatStartThisDate'
import { filterPeriodsOfSameDateByPosition } from '../../../../../_shared/filterPeriodsOfSameDateByPosition'
import { TimelinesContext } from '../../../../TimelinesContextProvider'
import { calculateDayMonthYearDistance } from '../../../../../_shared/calculateDayMonthYearDistance'
import { getEntryMainImage } from '../../../../../_shared/getEntryMainImage'
import { checkIfTimelineIsDisplayingOrigin } from '../../../../../checkIfTimelineIsDisplayingOrigin'

export const Entries = ({
  entries,
  newEntryId,
  forwardedRef,
  displayEntry,
  visibleTimelines,
  bucketName,
  periods,
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

  const yearLength = year.toString().startsWith('-')
    ? yearAC.length - 2
    : yearAC.length
  return (
    <>
      <DateWrapper isDisplayEntryDay={isDisplayEntryDay}>
        {removePeriodsThatStartThisDate(periods, entries)[0] && (
          <PeriodMarker
            periods={removePeriodsThatStartThisDate(periods, entries)}
            entryDate={entryDate}
          />
        )}
        <LeftDateLine />
        <RightDateLine yearLength={yearLength} />
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
            {filterEntryTimelinesByVisibleTimelines(
              visibleTimelines,
              entry
            ).map((timeline) => (
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
