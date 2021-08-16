import React from 'react'
import {
  Wrapper,
  EntriesWrapper,
  EntryDateWrapper,
  EntryWrapper,
  YearWrapper,
  MonthWrapper,
  DayWrapper,
  // YearSpan,
  // MonthSpan,
  // DaySpan,
  DateSpan,
  DateText,
  // DateInnerWrapper,
  // DayInnerWrapper,
} from './Entries.styles'
import { EntryAndIconWrapper, EntryIcon } from '../../../YearEntries.styles'
import PropTypes from 'prop-types'
import { monthNameArray } from '../../../../../../_shared/monthNameArray'
import { useHistory } from 'react-router-dom'
import { timelineColor } from '../../../../../../_shared/timelineColor'
import { filterTimelineInitials } from '../../../filterTimelineInitials'

export const Entries = ({
  entries,
  timelines,
  newEntryId,
  forwardedRef,
  displayEntry,
  // hasMonth,
  // hasYear,
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
  const monthName = monthNameArray[month]
  const yearAC = year.toString().startsWith('-')
    ? `${year.toString().substr(1)} a.c.`
    : year.toString()

  const isDisplayEntryDay =
    displayEntry &&
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
              <DateText> de</DateText>
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
            <EntryIcon color={timelineColor(timelines, entry.timeline_id)}>
              {filterTimelineInitials(timelines, entry)}
            </EntryIcon>
          </EntryAndIconWrapper>
        ))}
      </EntriesWrapper>
    </Wrapper>
  )
}

Entries.propTypes = {
  entries: PropTypes.array,
  timelines: PropTypes.array,
  newEntryId: PropTypes.string,
  forwardedRef: PropTypes.any,
  displayEntry: PropTypes.object,
  hasMonth: PropTypes.bool,
  hasYear: PropTypes.bool,
}
