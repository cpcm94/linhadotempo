import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Layout } from '../_shared/Layout'
import { Footer } from '../_shared/Footer/Footer'
import { Button } from './Button'
import { EllipsisButton } from '../_shared/EllipsisButton'
import PropTypes from 'prop-types'
import { TimelineScroller } from './TimelineScroller/TimelineScroller'
import { colors } from '../_shared/colors'
import { useHistory } from 'react-router-dom'
import { TimelinesButtonsRow } from './TimelinesButtonsRow'
import { AddButtonWrapper, EllipsisButtonsWrapper } from './TimelinePage.styles'
import { mapTimeEntriesId } from './mapTimeEntriesId'
import { findEntryToDisplay } from './findEntryToDisplay'
import { getScrollPosition } from './getScrollPosition'
import { TimelinePageHeader } from './TimelinePageHeader/TimelinePageHeader'

export const TimelinePage = ({ timelines, previousTimelines }) => {
  const [displayEntry, setDisplayEntry] = useState({})
  const oldEntry = mapTimeEntriesId(previousTimelines)

  const newEntry = mapTimeEntriesId(timelines)

  const brandNewEntry =
    oldEntry[0] && newEntry.filter((entry) => !oldEntry.includes(entry))[0]

  const [visibleTimelines, setVisibleTimelines] = useState(timelines)
  const objectRefs = newEntry.reduce((accumulator, curr) => {
    accumulator[curr] = useRef(null)
    return accumulator
  }, {})

  let history = useHistory()

  const timelinesString = timelines.map((timeline) => timeline.id).toString()

  const navigateToSelectTimelines = () => {
    history.push({
      pathname: '/viewTimeline/select/',
      search: `?timelines=${timelinesString}`,
    })
  }

  const navigateToNewEntryPage = () => {
    history.push({
      pathname: '/viewTimeline/newEntry/',
      search: `?timelines=${timelinesString}`,
    })
  }
  const entries = timelines
    .map((timeline) => timeline.time_entries.map((entry) => entry))
    .flat()

  useEffect(() => {
    handleScroll()
  }, [handleScroll, visibleTimelines])
  useEffect(() => {
    const hash = window.location.hash
    const element = hash && document.getElementById(hash.substr(1))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [])

  const handleScroll = useCallback(() => {
    const elementsCoords = getScrollPosition(objectRefs)
    const entryToDisplay = findEntryToDisplay(elementsCoords, entries)
    setDisplayEntry(entryToDisplay)
  }, [entries, objectRefs])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  })

  return (
    <Layout>
      <TimelinePageHeader displayEntry={displayEntry} />
      <TimelineScroller
        visibleTimelines={visibleTimelines}
        newEntryId={brandNewEntry}
        forwardedRef={objectRefs}
      />
      <Footer
        pageActions={
          <>
            <EllipsisButtonsWrapper>
              <EllipsisButton
                color={colors.white}
                onClick={navigateToSelectTimelines}
              />
            </EllipsisButtonsWrapper>
            <AddButtonWrapper>
              <Button onClick={navigateToNewEntryPage}>+</Button>
            </AddButtonWrapper>
            <TimelinesButtonsRow
              timelines={timelines}
              visibleTimelines={visibleTimelines}
              setVisibleTimelines={setVisibleTimelines}
            />
          </>
        }
      />
    </Layout>
  )
}

TimelinePage.propTypes = {
  timelines: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  previousTimelines: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}
