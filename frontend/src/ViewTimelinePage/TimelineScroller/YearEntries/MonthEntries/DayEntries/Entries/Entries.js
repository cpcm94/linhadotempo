import React from 'react'
import {
  Wrapper,
  EntriesWrapper,
  EntryDateWrapper,
  EntryWrapper,
  YearWrapper,
  MonthWrapper,
  DayWrapper,
  DateSpan,
  DateText,
} from './Entries.styles'
import {
  EntryAndIconWrapper,
  EntryIcon,
  IconsWrapper,
  Img,
} from '../../../YearEntries.styles'
import PropTypes from 'prop-types'
import { abvMonthNameArray } from '../../../../../../_shared/monthNameArray'
import { useHistory } from 'react-router-dom'
import { filterEntryTimelinesByVisibleTimelines } from '../../../../filterEntryTimelinesByVisibleTimelines'
import { hideEntryIconsIfSameAsDisplay } from '../../../../hideEntryIconIfSameAsDisplay'

export const Entries = ({
  entries,
  newEntryId,
  forwardedRef,
  displayEntry,
  visibleTimelines,
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

  return (
    <Wrapper>
      <EntryDateWrapper isDisplayEntryDay={isDisplayEntryDay}>
        <DateSpan>
          <DayWrapper>{day}</DayWrapper>
          {
            <MonthWrapper>
              <DateText>de</DateText>
              {monthName}
            </MonthWrapper>
          }
          {
            <YearWrapper>
              <DateText>de</DateText>
              {yearAC}
            </YearWrapper>
          }
        </DateSpan>
      </EntryDateWrapper>
      <EntriesWrapper>
        {entries.map((entry, index) => (
          <EntryAndIconWrapper
            key={index}
            isNew={newEntryId === entry.id}
            id={entry.id}
            ref={forwardedRef[entry.id]}
            onClick={() => navigateToEditEntry(entry)}
          >
            <EntryWrapper key={index}>{entry.name}</EntryWrapper>
            {hideEntryIconsIfSameAsDisplay(
              entry,
              displayEntry,
              visibleTimelines
            ) && (
              <IconsWrapper>
                {filterEntryTimelinesByVisibleTimelines(
                  visibleTimelines,
                  entry
                ).map((timeline) => (
                  <div key={timeline.id}>
                    {timeline.timelineIconImageUrl ? (
                      <EntryIcon timelineColor={timeline.color}>
                        <Img src={timeline.timelineIconImageUrl} alt="Icone" />
                      </EntryIcon>
                    ) : (
                      <EntryIcon color={timeline.color}>
                        {timeline.initials}
                      </EntryIcon>
                    )}
                  </div>
                ))}
              </IconsWrapper>
            )}
          </EntryAndIconWrapper>
        ))}
      </EntriesWrapper>
    </Wrapper>
  )
}

Entries.propTypes = {
  entries: PropTypes.array,
  visibleTimelines: PropTypes.array,
  newEntryId: PropTypes.string,
  forwardedRef: PropTypes.any,
  displayEntry: PropTypes.object,
}
