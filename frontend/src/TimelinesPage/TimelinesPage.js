import React, { useCallback, useEffect, useState, useRef } from 'react'
import { TimelinesList } from './TimelinesList/TimelinesList'
import { Header } from '../_shared/Header/Header'
import { Layout } from '../_shared/Layout'
import { AddTimelineButton } from './AddTimelineButton/AddTimelineButton'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router'
import { TimelinesIconRow } from './TimelinesIconRow/TimelinesIconRow'
import { TimelinesContainer } from './TimelinesContainer'
import { Footer } from '../_shared/Footer/Footer'
import { TimelinesButtonsRow } from './TimelinesList/TimelinesButtonsRow'
import { VisualizeButton } from './VisualizeButton'
import { SEARCH_TIMELINE_QUERY } from './SEARCH_TIMELINE_QUERY'
import { useLazyQuery } from '@apollo/client'

const AUTO_SAVE_DEBOUNCE_MILISECONDS = 500
let timeoutId = null

export const TimelinesPage = ({
  timelines,
  currentSelectedTimelinesIds,
  bucketName,
}) => {
  const [timelineSearchString, setTimelineSearchString] = useState('')
  const isFirstRun = useRef(true)
  const [querySearch, { data: searchData, loading }] = useLazyQuery(
    SEARCH_TIMELINE_QUERY,
    {
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
    }
  )
  const [displayedTimelines, setDisplayedTimelines] = useState(timelines)
  const filteredSelectedTimelines = timelines.filter((timeline) =>
    currentSelectedTimelinesIds
      ? currentSelectedTimelinesIds.includes(timeline.id)
      : null
  )
  const [selectedTimelines, setSelectedTimelines] = useState(
    filteredSelectedTimelines
  )

  const stringOfSelectedTimelines = selectedTimelines
    .map((timeline) => timeline.id)
    .sort((a, b) => a - b)
    .toString()

  let history = useHistory()

  const searchString = `${
    selectedTimelines[0] ? `?timelines=${stringOfSelectedTimelines}` : ''
  }`

  useEffect(() => {
    navigateTo('/timelines')
  }, [navigateTo, selectedTimelines])

  const navigateTo = useCallback(
    (path) => {
      history.push({
        pathname: path,
        search: searchString,
        hash: window.location.hash,
      })
    },
    [history, searchString]
  )

  useEffect(() => {
    if (!isFirstRun.current) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        const payload = {
          variables: {
            search: timelineSearchString,
          },
        }
        querySearch(payload)
      }, AUTO_SAVE_DEBOUNCE_MILISECONDS)
    } else {
      isFirstRun.current = false
    }
  }, [querySearch, timelineSearchString])

  useEffect(() => {
    if (timelineSearchString === '') {
      console.log('if')
      setDisplayedTimelines(timelines)
    } else if (timelineSearchString !== '' && searchData) {
      console.log('else if')
      setDisplayedTimelines(searchData.search_timeline)
    }
  }, [searchData, timelineSearchString, timelines])
  return (
    <Layout>
      <Header
        title={'Linhas do Tempo'}
        pageActions={
          <AddTimelineButton onClick={() => navigateTo('/newTimeline')} />
        }
        timelinesIconRow={
          <TimelinesIconRow
            selectedTimelines={selectedTimelines}
            timelines={timelines}
            setSelectedTimelines={setSelectedTimelines}
            timelineSearchString={timelineSearchString}
            setTimelineSearchString={setTimelineSearchString}
          />
        }
        showMenuButton={true}
      />
      <TimelinesContainer>
        {timelineSearchString !== '' && loading ? (
          <span>Loading...</span>
        ) : (
          <TimelinesList
            timelines={displayedTimelines}
            selectedTimelines={selectedTimelines}
            setSelectedTimelines={setSelectedTimelines}
            bucketName={bucketName}
          />
        )}
      </TimelinesContainer>
      {selectedTimelines[0] && (
        <Footer
          pageActions={
            <>
              <VisualizeButton onClick={() => navigateTo('/viewTimeline')}>
                Visualizar
              </VisualizeButton>
              <TimelinesButtonsRow
                timelines={timelines}
                selectedTimelines={selectedTimelines}
                setSelectedTimelines={setSelectedTimelines}
                bucketName={bucketName}
              />
            </>
          }
        />
      )}
    </Layout>
  )
}

TimelinesPage.propTypes = {
  timelines: PropTypes.array,
  currentSelectedTimelinesIds: PropTypes.array,
  bucketName: PropTypes.string,
  entryDate: PropTypes.string,
}
