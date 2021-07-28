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
import { NoEntriesYet } from './NoEntriesYet'
import { ToastContainer, toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const TimelinePage = ({
  timelines,
  previousTimelines,
  hasInvalidTimelines,
}) => {
  const alreadyRan = useRef(false)
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
  const displayEntryDate =
    displayEntry &&
    `timeline=${displayEntry.timeline_id}&year=${displayEntry.year}${
      displayEntry.month ? `&month=${displayEntry.month}` : ''
    }${displayEntry.day ? `&day=${displayEntry.day}` : ''}`

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
      hash: `#${displayEntryDate}`,
    })
  }
  const entries = timelines
    .map((timeline) => timeline.time_entries.map((entry) => entry))
    .flat()

  useEffect(() => {
    handleScroll()
  }, [handleScroll, visibleTimelines])
  useEffect(() => {
    if (displayEntry.entryId) {
      history.push({
        pathname: '/viewTimeline/',
        search: `?timelines=${timelinesString}`,
        hash: `#${displayEntry.entryId}`,
      })
    }
  }, [displayEntry, history, timelinesString])
  useEffect(() => {
    const hash = window.location.hash
    const element = hash && document.getElementById(hash.substr(1))
    const yOffset = -40
    console.log('element', element)
    const elementPositionWithOffset =
      element &&
      element.getBoundingClientRect().top + window.pageYOffset + yOffset
    if (element) {
      window.scrollTo({ top: elementPositionWithOffset, behavior: 'smooth' })
    }
  }, [])

  const handleScroll = useCallback(() => {
    const elementsCoords = getScrollPosition(objectRefs)
    const entryToDisplay = findEntryToDisplay(elementsCoords, entries)
    if (entryToDisplay || !visibleTimelines[0]) {
      setDisplayEntry(entryToDisplay)
    }
  }, [entries, objectRefs, visibleTimelines])

  useEffect(() => {
    if (hasInvalidTimelines && !alreadyRan.current) {
      toast.error(
        'Você não tem acesso à uma ou mais linhas do tempo que tentou acessar.',
        {
          position: 'top-center',
          hideProgressBar: true,
          transition: Slide,
        }
      )
      alreadyRan.current = true
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })
  return (
    <Layout>
      <TimelinePageHeader displayEntry={displayEntry} />
      {entries[0] ? (
        <TimelineScroller
          visibleTimelines={visibleTimelines}
          newEntryId={brandNewEntry}
          forwardedRef={objectRefs}
          displayEntry={displayEntry}
        />
      ) : (
        <NoEntriesYet visibleTimelines={visibleTimelines} />
      )}
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
      <ToastContainer />
    </Layout>
  )
}

TimelinePage.propTypes = {
  timelines: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  previousTimelines: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  hasInvalidTimelines: PropTypes.bool,
}
