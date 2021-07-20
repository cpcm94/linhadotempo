import React from 'react'
import PropTypes from 'prop-types'
import {
  HeaderWrapper,
  EntryWrapper,
  YearWrapper,
  MonthWrapper,
  DayWrapper,
} from './TimelinePageHeader.styles'
import { monthNameArray } from '../../_shared/monthNameArray'

export const TimelinePageHeader = ({ displayEntry }) => {
  const monthName =
    displayEntry && displayEntry.month
      ? monthNameArray[displayEntry.month]
      : null
  const yearAC =
    displayEntry && displayEntry.year
      ? displayEntry.year.toString().startsWith('-')
        ? `${displayEntry.year.toString().substr(1)} a.c.`
        : displayEntry.year.toString()
      : null

  return (
    <HeaderWrapper>
      <EntryWrapper>
        <YearWrapper>{yearAC}</YearWrapper>
        <MonthWrapper>{monthName}</MonthWrapper>
        <DayWrapper>{displayEntry && displayEntry.day}</DayWrapper>
      </EntryWrapper>
    </HeaderWrapper>
  )
}

TimelinePageHeader.propTypes = {
  displayEntry: PropTypes.object,
}
