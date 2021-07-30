import React from 'react'
import {
  Wrapper,
  EntriesWrapper,
  EntryDateWrapper,
  EntryWrapper,
  YearWrapper,
  MonthWrapper,
  DayWrapper,
  YearSpan,
  MonthSpan,
  DaySpan,
  DateText,
  DateInnerWrapper,
  DayInnerWrapper,
} from './Entries.styles'
import { EntryAndIconWrapper, EntryIcon } from '../../../YearEntries.styles'
import PropTypes from 'prop-types'
import { monthNameArray } from '../../../../../../_shared/monthNameArray'
import { useHistory } from 'react-router-dom'

export const Entries = ({
  entries,
  newEntryId,
  forwardedRef,
  displayEntry,
  hasMonth,
  hasYear,
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
        <DayWrapper>
          <DayInnerWrapper hasMonth={hasMonth}>
            <DaySpan>{day}</DaySpan>
            {!hasMonth ? <DateText> de</DateText> : ''}
          </DayInnerWrapper>
        </DayWrapper>
        <MonthWrapper>
          {!hasMonth && (
            <DateInnerWrapper hasYear={hasYear}>
              <MonthSpan>{monthName}</MonthSpan>
              {!hasYear ? <DateText> de</DateText> : ''}
            </DateInnerWrapper>
          )}
        </MonthWrapper>
        <YearWrapper>
          {!hasYear && !hasMonth && <YearSpan>{yearAC}</YearSpan>}
        </YearWrapper>
      </EntryDateWrapper>
      <EntriesWrapper>
        {entries.map((entry, index) => (
          <EntryAndIconWrapper
            key={index}
            isNew={newEntryId === entry.id}
            id={entry.id}
            ref={forwardedRef[entry.id]}
          >
            <EntryWrapper
              key={index}
              onClick={() => navigateToEditEntry(entry)}
            >
              {entry.name}
            </EntryWrapper>
            <EntryIcon>{entry.timeline_id}</EntryIcon>
          </EntryAndIconWrapper>
        ))}
      </EntriesWrapper>
    </Wrapper>
  )
}

Entries.propTypes = {
  entries: PropTypes.array,
  newEntryId: PropTypes.string,
  forwardedRef: PropTypes.any,
  displayEntry: PropTypes.object,
  hasMonth: PropTypes.bool,
  hasYear: PropTypes.bool,
}
