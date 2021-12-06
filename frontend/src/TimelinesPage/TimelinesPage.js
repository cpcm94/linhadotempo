import React, { useCallback, useEffect, useState } from 'react'
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

export const TimelinesPage = ({
  timelines,
  currentSelectedTimelinesIds,
  bucketName,
}) => {
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
          />
        }
        showMenuButton={true}
      />
      <TimelinesContainer>
        <TimelinesList
          timelines={timelines}
          selectedTimelines={selectedTimelines}
          setSelectedTimelines={setSelectedTimelines}
          bucketName={bucketName}
        />
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
