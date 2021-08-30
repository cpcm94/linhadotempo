import React, { useState } from 'react'
import { SelectTimelinesList } from './SelectTimelinesList/SelectTimelinesList'
import { Header } from '../../_shared/Header/Header'
import { Layout } from '../../_shared/Layout'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { TimelinesIconRow } from './TimelinesIconRow'
import { SelectTimelinesContainer } from './SelectTimelinesContainer'

export const SelectTimelines = ({ timelines, currentSelectedTimelines }) => {
  const filteredSelectedTimelines = timelines.filter((timeline) =>
    currentSelectedTimelines.includes(timeline.id)
  )
  const [selectedTimelines, setSelectedTimelines] = useState(
    filteredSelectedTimelines
  )

  const stringOfSelectedTimelines = selectedTimelines
    .map((timeline) => timeline.id)
    .toString()

  let history = useHistory()

  const navigateToViewTimelines = () => {
    history.push({
      pathname: '/viewTimeline/',
      search: `?timelines=${stringOfSelectedTimelines}`,
    })
  }
  return (
    <Layout>
      <Header
        title={'Selecionar linhas do tempo'}
        returnButton={navigateToViewTimelines}
        timelinesIconRow={<TimelinesIconRow timelines={selectedTimelines} />}
      />
      <SelectTimelinesContainer>
        <SelectTimelinesList
          timelines={timelines}
          selectedTimelines={selectedTimelines}
          setSelectedTimelines={setSelectedTimelines}
        />
      </SelectTimelinesContainer>
    </Layout>
  )
}

SelectTimelines.propTypes = {
  timelines: PropTypes.array,
  currentSelectedTimelines: PropTypes.array,
}
