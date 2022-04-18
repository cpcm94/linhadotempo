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
import { TimelineScroller } from './TimelineScroller/TimelineScroller'
import Hammer from 'hammerjs'
import { SEARCH_ENTRY_QUERY } from './SEARCH_ENTRY_QUERY'
import { useLazyQuery } from '@apollo/client'

const HASH_UPDATE_DEBOUNCE_MILISECONDS = 310
let timeoutId = null

const AUTO_SAVE_DEBOUNCE_MILISECONDS = 500
let timeoutSearchId = null

const filterEntryForNullYear = (entries, hash) => {
  if (hash)
    return entries.filter((entry) => {
      if (!entry.year && hash.split('/')[0] === 'null') {
        return entry
      }
    })[0]
}

const isTheRightYear = (entry, hash) => {
  if (hash) {
    return entry.year
      ? entry.year.toString() === hash.split('/')[0]
      : !entry.year === !hash.split('/')[0]
  }
}
const isTheRightMonth = (entry, hash) => {
  if (hash) {
    return entry.month
      ? entry.month.toString() === hash.split('/')[1]
      : !entry.month === !hash.split('/')[1]
  }
}
const isTheRightDay = (entry, hash) => {
  if (hash) {
    return entry.day
      ? entry.day.toString() === hash.split('/')[2]
      : !entry.day === !hash.split('/')[2]
  }
}

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
  dateFromHash,
  newEntryId,
  entryCategories,
}) => {
  const alreadyRan = useRef(false)
  const isFirstRun = useRef(true)
  const runScrollTo = useRef(true)
  const [displayEntry, setDisplayEntry] = useState({})
  const [visibleTimelines, setVisibleTimelines] = useState(timelines)
  const [zoomOut, setZoomOut] = useState(false)
  const [chosenCategories, setChosenCategories] = useState([])
  const [showSearchBar, setShowSearchBar] = useState(false)
  const [entrySearchString, setEntrySearchString] = useState('')
  const [displayedEntries, setDisplayedEntries] = useState(entries)

  const [querySearch, { data: searchData, loading }] = useLazyQuery(
    SEARCH_ENTRY_QUERY,
    {
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
    }
  )

  const element = useRef(null)
  const hash = useRef(dateFromHash)

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
    })
  }

  const firstEntryOfExactDate = filterFirstEntryOfExactDate(
    entries,
    hash.current
  )

  const firstEntryOfNullYear = filterEntryForNullYear(entries, hash.current)

  const closestNextEntryToHash = findClosestNextEntryToHash(
    entries,
    hash.current
  )

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

    if (element.current && runScrollTo.current) {
      runScrollTo.current = false
      window.scrollTo({ top: elementPositionWithOffset, behavior: 'instant' })
    }
  }, [entryToScrollTo, dateFromHash])

  useEffect(() => {
    hash.current = dateFromHash
    if (
      displayEntry &&
      displayEntry.entryId &&
      (!isTheRightYear(displayEntry, dateFromHash) ||
        !isTheRightMonth(displayEntry, dateFromHash) ||
        !isTheRightDay(displayEntry, dateFromHash))
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
  }, [dateFromHash, displayEntry, history, timelinesString])

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

  const hasActiveFilter = entrySearchString !== '' || chosenCategories[0]

  useEffect(() => {
    if (!isFirstRun.current) {
      if (timeoutSearchId) {
        clearTimeout(timeoutSearchId)
      }
      if (hasActiveFilter)
        timeoutSearchId = setTimeout(() => {
          const payload = {
            variables: {
              input: {
                search: entrySearchString,
                time_entry_category_ids: chosenCategories.map(
                  (category) => category.id
                ),
                timeline_ids: visibleTimelines.map((timeline) => timeline.id),
              },
            },
          }
          querySearch(payload)
        }, AUTO_SAVE_DEBOUNCE_MILISECONDS)
    } else {
      isFirstRun.current = false
    }
  }, [
    chosenCategories,
    entrySearchString,
    hasActiveFilter,
    querySearch,
    visibleTimelines,
  ])

  useEffect(() => {
    if (entrySearchString === '' && !chosenCategories[0]) {
      setDisplayedEntries(entries)
    } else if (hasActiveFilter && searchData) {
      setDisplayedEntries(searchData.search_time_entry)
    }
  }, [
    chosenCategories,
    hasActiveFilter,
    searchData,
    entrySearchString,
    entries,
  ])

  const showRegularScroller = displayedEntries[0]

  return (
    <Layout>
      <TimelinePageHeader
        displayEntry={displayEntry}
        timelines={timelines}
        chosenCategories={chosenCategories}
        setChosenCategories={setChosenCategories}
        entryCategories={entryCategories}
        showSearchBar={showSearchBar}
        setShowSearchBar={setShowSearchBar}
        entrySearchString={entrySearchString}
        setEntrySearchString={setEntrySearchString}
      />
      <TimelineScrollerContainer
        id="scrollerContainer"
        chosenCategories={chosenCategories}
        showSearchBar={showSearchBar}
      >
        {hasActiveFilter && loading ? (
          <span>Loading...</span>
        ) : showRegularScroller ? (
          <TimelineScroller
            visibleTimelines={visibleTimelines}
            entries={displayedEntries}
            newEntryId={newEntryId}
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
  dateFromHash: PropTypes.string,
  newEntryId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  entryCategories: PropTypes.array,
}
