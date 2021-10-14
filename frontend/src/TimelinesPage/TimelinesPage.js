import React, { useEffect, useState } from 'react'
import { TimelinesList } from './TimelinesList/TimelinesList'
import { Header } from '../_shared/Header/Header'
import { Layout } from '../_shared/Layout'
import { AddTimelineButton } from './AddTimelineButton/AddTimelineButton'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router'
import { TimelinesIconRow } from './TimelinesIconRow/TimelinesIconRow'
import { TimelinesContainer } from './TimelinesContainer'

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

  useEffect(() => {
    history.push(
      `/timelines${
        selectedTimelines[0] ? `?timelines=${stringOfSelectedTimelines}` : ''
      }`
    )
  }, [history, selectedTimelines, stringOfSelectedTimelines])

  const navigateToNewTimelinePage = () => {
    history.push(
      `/newTimeline${
        selectedTimelines[0] ? `?timelines=${stringOfSelectedTimelines}` : ''
      }`
    )
  }

  const navigateToViewTimelines = () => {
    history.push(
      `/viewTimeline${
        selectedTimelines[0] ? `?timelines=${stringOfSelectedTimelines}` : ''
      }`
    )
  }
  return (
    <Layout>
      <Header
        title={'Linhas do Tempo'}
        pageActions={<AddTimelineButton onClick={navigateToNewTimelinePage} />}
        timelinesIconRow={
          <TimelinesIconRow
            selectedTimelines={selectedTimelines}
            timelines={timelines}
            onClick={navigateToViewTimelines}
            bucketName={bucketName}
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
    </Layout>
  )
}

TimelinesPage.propTypes = {
  timelines: PropTypes.array,
  currentSelectedTimelinesIds: PropTypes.array,
  bucketName: PropTypes.string,
}
