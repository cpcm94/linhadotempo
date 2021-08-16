import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import {
  HeaderWrapper,
  EntryWrapper,
  YearWrapper,
  MonthWrapper,
  DayWrapper,
  TextWrapper,
} from './TimelinePageHeader.styles'
import { monthNameArray } from '../../_shared/monthNameArray'
import { CurrentUserContext } from '../../_shared/CurrentUserContextProvider'
import { MenuDrawer } from '../../_shared/MenuDrawer/MenuDrawer'

export const TimelinePageHeader = ({ displayEntry }) => {
  const { user } = useContext(CurrentUserContext)

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
      <MenuDrawer user={user} />
      <EntryWrapper>
        {yearAC ? (
          <>
            <DayWrapper
              isDisplayEntryDay={
                displayEntry && displayEntry.day ? true : false
              }
            >
              {displayEntry && displayEntry.day ? displayEntry.day : null}
            </DayWrapper>
            <MonthWrapper isDisplayEntryMonth={monthName ? true : false}>
              {displayEntry && displayEntry.day ? ` de ` : null}
              {monthName}
            </MonthWrapper>
            <YearWrapper>
              {monthName && 'de '}
              {yearAC}
            </YearWrapper>
          </>
        ) : displayEntry && displayEntry.entryId ? (
          <TextWrapper>Sem data definida</TextWrapper>
        ) : null}
      </EntryWrapper>
    </HeaderWrapper>
  )
}

TimelinePageHeader.propTypes = {
  displayEntry: PropTypes.object,
}
