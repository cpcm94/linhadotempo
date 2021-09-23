import React, { useEffect, useState } from 'react'
import { TimelinesList } from './TimelinesList/TimelinesList'
import { Header } from '../_shared/Header/Header'
import { Layout } from '../_shared/Layout'
import { AddTimelineButton } from './AddTimelineButton/AddTimelineButton'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router'
import { TimelinesIconRow } from './TimelinesIconRow/TimelinesIconRow'
import { TimelinesContainer } from './TimelinesContainer'

export const TimelinesPage = ({ timelines, currentSelectedTimelinesIds }) => {
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
    history.push({
      pathname: '/viewTimeline/',
      search: `?timelines=${stringOfSelectedTimelines}`,
    })
  }
  return (
    <Layout>
      <Header
        title={'Linhas do Tempo'}
        pageActions={<AddTimelineButton onClick={navigateToNewTimelinePage} />}
        timelinesIconRow={
          <TimelinesIconRow
            timelines={selectedTimelines}
            onClick={navigateToViewTimelines}
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
        />
      </TimelinesContainer>
    </Layout>
  )
}

TimelinesPage.propTypes = {
  timelines: PropTypes.array,
  currentSelectedTimelinesIds: PropTypes.array,
}
