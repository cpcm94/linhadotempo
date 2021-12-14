import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import {
  DateText,
  DateWrapper,
  EntryNameBackground,
  EntryNameWrapper,
  LeftDateLine,
  MonthDateWrapper,
  OuterDateWrapper,
  RightDateLine,
} from './MonthEntries.styles'
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
} from '../YearEntries.styles'
import { useHistory } from 'react-router-dom'
import { filterEntryTimelinesByVisibleTimelines } from '../../../../_shared/filterEntryTimelinesByVisibleTimelines'
import { abvMonthNameArray } from '../../../../_shared/monthNameArray'
import { PeriodMarker } from '../../../../_shared/PeriodMarker/PeriodMarker'
import { getPeriodColorByEntryId } from '../../../../_shared/getPeriodColorByEntryId'
import { sortPeriodsLastAndEndOfPeriodsFirst } from '../../../../_shared/sortPeriodsLastAndEndOfPeriodsFirst'
import { removePeriodsThatStartThisDate } from '../../../../_shared/removePeriodsThatStartThisDate'
import { filterPeriodsOfSameDateByPosition } from '../../../../_shared/filterPeriodsOfSameDateByPosition'
import { TimelinesContext } from '../../../TimelinesContextProvider'
import { calculateMonthYearDistance } from '../../../../_shared/calculateMonthYearDistance'
import { getEntryMainImage } from '../../../../_shared/getEntryMainImage'
import { checkIfTimelineIsDisplayingOrigin } from '../../../../checkIfTimelineIsDisplayingOrigin'

export const EntriesWithoutDay = ({
  timeEntriesWithoutDay,
  newEntryId,
  forwardedRef,
  visibleTimelines,
  bucketName,
  periods,
  displayEntry,
}) => {
  const { timelineIdsDisplayingOrigin } = useContext(TimelinesContext)

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
  const yearLength = year.toString().startsWith('-')
    ? yearAC.length - 2
    : yearAC.length
  return (
    <>
      <OuterDateWrapper isDisplayEntryMonth={isDisplayEntryMonth}>
        {removePeriodsThatStartThisDate(periods, timeEntriesWithoutDay)[0] && (
          <PeriodMarker
            periods={removePeriodsThatStartThisDate(
              periods,
              timeEntriesWithoutDay
            )}
            entryDate={entryDate}
          />
        )}
        <LeftDateLine />
        <RightDateLine yearLength={yearLength} />
        <DateWrapper>
          <MonthDateWrapper>
            <span>{month}</span>
          </MonthDateWrapper>
          <DateText>de</DateText>
          <span>{yearAC}</span>
        </DateWrapper>
      </OuterDateWrapper>
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
                  {periods[0] && (
                    <PeriodMarker
                      periods={filterPeriodsOfSameDateByPosition(
                        periods,
                        entry
                      )}
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
                    <EntryNameWrapper>{entry.name}</EntryNameWrapper>
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
                            {calculateMonthYearDistance(entry, timeline)}
                          </OriginDistance>
                        )}
                      </IconAndDistanceWrapper>
                    ))}
                  </IconsWrapper>
                </EntryAndIconWrapper>
              )
            }
          )
        : null}
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
}
