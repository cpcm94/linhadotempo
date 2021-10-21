import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Layout } from '../../_shared/Layout'
import { Footer } from '../../_shared/Footer/Footer'
import { Button } from './Button'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { TimelinesButtonsRow } from './TimelinesButtonsRow'
import { AddButtonWrapper } from './TimelinePage.styles'
import { findEntryToDisplay } from './findEntryToDisplay'
import { findClosestNextEntryToHash } from './findClosestNextEntryToHash'
import { getScrollPosition } from './getScrollPosition'
import { TimelinePageHeader } from './TimelinePageHeader/TimelinePageHeader'
import { NoEntriesYet } from './NoEntriesYet'
import { ToastContainer, toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { TimelineScrollerContainer } from './TimelineScrollerContainer'
import { TimelineScrollerAnnual } from './TimelineScrollerAnnual/TimelineScrollerAnnual'
import { TimelineScroller } from '../TimelineScroller/TimelineScroller'
import Hammer from 'hammerjs'

const HASH_UPDATE_DEBOUNCE_MILISECONDS = 500
let timeoutId = null

const filterEntryForNullYear = (entries, hash) => {
  return entries.filter((entry) => {
    if (!entry.year && hash.split('/')[0] === 'null') {
      return entry
    }
  })[0]
}

const isTheRightYear = (entry, hash) =>
  entry.year
    ? entry.year.toString() === hash.split('/')[0]
    : !entry.year === !hash.split('/')[0]
const isTheRightMonth = (entry, hash) =>
  entry.month
    ? entry.month.toString() === hash.split('/')[1]
    : !entry.month === !hash.split('/')[1]
const isTheRightDay = (entry, hash) =>
  entry.day
    ? entry.day.toString() === hash.split('/')[2]
    : !entry.day === !hash.split('/')[2]

const filterFirstEntryOfExactDate = (entries, hash) => {
  return entries.filter((entry) => {
    if (
      isTheRightYear(entry, hash) &&
      isTheRightMonth(entry, hash) &&
      isTheRightDay(entry, hash)
    ) {
      return entry
    }
  })[0]
}

export const TimelinePage = ({
  timelines,
  entries,
  hasInvalidTimelines,
  bucketName,
  hasZoomOut,
  dateFromHash,
}) => {
  const alreadyRan = useRef(false)
  const [displayEntry, setDisplayEntry] = useState({})
  const [visibleTimelines, setVisibleTimelines] = useState(timelines)
  const [zoomOut, setZoomOut] = useState(hasZoomOut)

  const element = useRef(null)
  const hash = useRef(dateFromHash)

  const entriesWithAnnualImportance = entries.filter(
    (entry) => entry.annual_importance
  )

  useEffect(() => {
    const container = document.getElementById('scrollerContainer')
    const mc = new Hammer.Manager(container, { touchAction: 'pan-x pan-y' })
    var pinch = new Hammer.Pinch()
    mc.add(pinch)
    mc.on('pinchout', () => {
      if (zoomOut) {
        setZoomOut(false)
      }
    })
    mc.on('pinchin', () => {
      if (!zoomOut) {
        setZoomOut(true)
      }
    })
  })

  const entryIds = entries.map((entry) => entry.id)

  const objectRefs = entryIds.reduce((accumulator, curr) => {
    accumulator[curr] = useRef(null)
    return accumulator
  }, {})

  let history = useHistory()
  const timelinesString = timelines.map((timeline) => timeline.id).toString()

  const navigateToNewEntryPage = () => {
    history.push({
      pathname: '/viewTimeline/newEntry/',
      search: `?timelines=${timelinesString}`,
      hash: `#zoomOut=${zoomOut}`,
    })
  }

  const firstEntryOfExactDate = zoomOut
    ? filterFirstEntryOfExactDate(entriesWithAnnualImportance, hash.current)
    : filterFirstEntryOfExactDate(entries, hash.current)

  const firstEntryOfNullYear = zoomOut
    ? filterEntryForNullYear(entriesWithAnnualImportance, hash.current)
    : filterEntryForNullYear(entries, hash.current)

  const closestNextEntryToHash = zoomOut
    ? findClosestNextEntryToHash(entriesWithAnnualImportance, hash.current)
    : findClosestNextEntryToHash(entries, hash.current)

  const highlightedEntryId =
    hash.current.indexOf('&') !== -1
      ? hash.current.substr(hash.current.indexOf('&') + 9)
      : null

  const entryToScrollTo = firstEntryOfExactDate
    ? firstEntryOfExactDate.id
    : firstEntryOfNullYear
    ? firstEntryOfNullYear.id
    : closestNextEntryToHash
    ? closestNextEntryToHash.id
    : null

  useEffect(() => {
    handleScroll()
  }, [handleScroll, visibleTimelines])

  useEffect(() => {
    const yOffset = -40
    element.current = hash.current && document.getElementById(entryToScrollTo)
    const elementPositionWithOffset =
      element.current &&
      element.current.getBoundingClientRect().top + window.pageYOffset + yOffset

    if (element.current) {
      window.scrollTo({ top: elementPositionWithOffset, behavior: 'smooth' })
    }
  }, [entryToScrollTo])

  useEffect(() => {
    if (
      displayEntry &&
      displayEntry.entryId &&
      (!isTheRightYear(displayEntry, window.location.hash) ||
        !isTheRightMonth(displayEntry, window.location.hash) ||
        !isTheRightDay(displayEntry, window.location.hash))
    ) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        history.push({
          pathname: '/viewTimeline/',
          search: `?timelines=${timelinesString}`,
          hash: `#date=${displayEntry.year}${
            displayEntry.month ? `/${displayEntry.month}` : ''
          }${displayEntry.day ? `/${displayEntry.day}` : ''}`,
        })
      }, HASH_UPDATE_DEBOUNCE_MILISECONDS)
    }
  }, [displayEntry, history, timelinesString])

  const handleScroll = useCallback(() => {
    const elementsCoords = getScrollPosition(objectRefs)
    const entryToDisplay = findEntryToDisplay(elementsCoords, entries)
    const hasEntryToDisplayOrNoVisibleTimelines =
      entryToDisplay || !visibleTimelines[0]

    const checkIfEntryIdDiffers =
      entryToDisplay && entryToDisplay.entryId !== displayEntry.entryId

    if (!entryToDisplay) {
      setDisplayEntry({ entryId: null })
    }

    if (hasEntryToDisplayOrNoVisibleTimelines && checkIfEntryIdDiffers) {
      setDisplayEntry(entryToDisplay)
    }
  }, [displayEntry.entryId, entries, objectRefs, visibleTimelines])

  useEffect(() => {
    document.body.addEventListener('touchmove', function (e) {
      e.preventDefault()
    })
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
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.body.removeEventListener('touchmove', function (e) {
        e.preventDefault()
      })
    }
  })

  const showAnnualImportanceScroller = entriesWithAnnualImportance[0] && zoomOut
  const showRegularScroller = entries[0] && !zoomOut
  return (
    <Layout>
      <TimelinePageHeader
        displayEntry={displayEntry}
        timelines={timelines}
        zoomOut={zoomOut}
        setZoomOut={setZoomOut}
      />
      <TimelineScrollerContainer id="scrollerContainer">
        {showAnnualImportanceScroller ? (
          <TimelineScrollerAnnual
            visibleTimelines={visibleTimelines}
            entries={entriesWithAnnualImportance}
            newEntryId={highlightedEntryId}
            forwardedRef={objectRefs}
            displayEntry={displayEntry}
            bucketName={bucketName}
          />
        ) : showRegularScroller ? (
          <TimelineScroller
            visibleTimelines={visibleTimelines}
            entries={entries}
            newEntryId={highlightedEntryId}
            forwardedRef={objectRefs}
            displayEntry={displayEntry}
            bucketName={bucketName}
          />
        ) : (
          <NoEntriesYet visibleTimelines={visibleTimelines} />
        )}
      </TimelineScrollerContainer>
      <Footer
        pageActions={
          <>
            <AddButtonWrapper>
              <Button onClick={navigateToNewEntryPage}>+</Button>
            </AddButtonWrapper>
            <TimelinesButtonsRow
              timelines={timelines}
              visibleTimelines={visibleTimelines}
              setVisibleTimelines={setVisibleTimelines}
              bucketName={bucketName}
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
  entries: PropTypes.array,
  previousEntries: PropTypes.array,
  hasInvalidTimelines: PropTypes.bool,
  bucketName: PropTypes.string,
  hasZoomOut: PropTypes.bool,
  dateFromHash: PropTypes.string,
}
