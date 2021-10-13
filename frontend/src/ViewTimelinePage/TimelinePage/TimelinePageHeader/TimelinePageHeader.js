import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  HeaderWrapper,
  EntryWrapper,
  YearWrapper,
  MonthWrapper,
  DayWrapper,
  TextWrapper,
} from './TimelinePageHeader.styles'
import { abvMonthNameArray } from '../../../_shared/monthNameArray'
import { ReturnButton } from '../../../_shared/ReturnButton'
import { useHistory } from 'react-router'
import { startTouch } from '../../../_shared/startTouch'
import { moveTouch } from '../../../_shared/moveTouch'

export const TimelinePageHeader = ({ displayEntry, timelines }) => {
  let history = useHistory()
  const timelinesId = timelines.map((timeline) => timeline.id)
  const navigateToTimelinesList = () => {
    history.push(`/timelines?timelines=${timelinesId.join()}`)
  }

  const [initialX, setInitialX] = useState(null)

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

  const onStartTouch = (e) => startTouch(e, setInitialX)
  const onMoveTouch = (e) => moveTouch(e, navigateToTimelinesList, initialX)

  useEffect(() => {
    window.addEventListener('touchstart', onStartTouch)
    window.addEventListener('touchmove', onMoveTouch)
    return () => {
      window.removeEventListener('touchstart', onStartTouch)
      window.removeEventListener('touchmove', onMoveTouch)
    }
  })
  return (
    <HeaderWrapper>
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
            <YearWrapper hasPrefix={!monthName}>
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
  timelines: PropTypes.array,
}
