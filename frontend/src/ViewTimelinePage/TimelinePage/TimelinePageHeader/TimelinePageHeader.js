import React from 'react'
import PropTypes from 'prop-types'
import {
  HeaderWrapper,
  EntryWrapper,
  YearWrapper,
  MonthWrapper,
  DayWrapper,
  UpperHeader,
  LowerHeader,
} from './TimelinePageHeader.styles'
import { abvMonthNameArray } from '../../../_shared/monthNameArray'
import { ReturnButton } from '../../../_shared/ReturnButton'
import { useHistory } from 'react-router'
import { SearchButton } from '../../../_shared/SearchButton'
import { EntrySearchBar } from './EntrySearchBar/EntrySearchBar'

export const TimelinePageHeader = ({
  displayEntry,
  timelines,
  chosenCategories,
  setChosenCategories,
  entryCategories,
  showSearchBar,
  setShowSearchBar,
  entrySearchString,
  setEntrySearchString,
}) => {
  let history = useHistory()
  const timelinesId = timelines.map((timeline) => timeline.id)
  const navigateToTimelinesList = () => {
    history.push({
      pathname: '/timelines',
      search: `?timelines=${timelinesId.join()}`,
      hash: `#date=${displayEntry.year}${
        displayEntry.month ? `/${displayEntry.month}` : ''
      }${displayEntry.day ? `/${displayEntry.day}` : ''}`,
    })
  }

  const monthName =
    displayEntry && displayEntry.month
      ? abvMonthNameArray[displayEntry.month]
      : null
  const yearAC =
    displayEntry && displayEntry.year
      ? displayEntry.year.toString().startsWith('-')
        ? `${displayEntry.year.toString().substr(1)} a.c.`
        : displayEntry.year.toString()
      : null

  return (
    <HeaderWrapper
      showSearchBar={showSearchBar}
      chosenCategories={chosenCategories}
    >
      <UpperHeader>
        <ReturnButton onClick={navigateToTimelinesList} />
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
              <YearWrapper hasPrefix={monthName}>
                {monthName ? 'de ' : ''}
                {yearAC}
              </YearWrapper>
            </>
          ) : displayEntry && displayEntry.entryId ? (
            'Sem data definida'
          ) : null}
        </EntryWrapper>
        <SearchButton onClick={() => setShowSearchBar(!showSearchBar)} />
      </UpperHeader>
      {showSearchBar && (
        <LowerHeader>
          <EntrySearchBar
            categories={entryCategories}
            chosenCategories={chosenCategories}
            setChosenCategories={setChosenCategories}
            entrySearchString={entrySearchString}
            setEntrySearchString={setEntrySearchString}
          />
        </LowerHeader>
      )}
    </HeaderWrapper>
  )
}

TimelinePageHeader.propTypes = {
  displayEntry: PropTypes.object,
  timelines: PropTypes.array,
  chosenCategories: PropTypes.array,
  setChosenCategories: PropTypes.func,
  entryCategories: PropTypes.array,
  showSearchBar: PropTypes.bool,
  setShowSearchBar: PropTypes.func,
  entrySearchString: PropTypes.string,
  setEntrySearchString: PropTypes.func,
}
