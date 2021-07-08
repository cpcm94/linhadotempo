import React, { useState } from 'react'
import { SelectTimelinesList } from './SelectTimelinesList/SelectTimelinesList'
import { Header } from '../../_shared/Header/Header'
import { Layout } from '../../_shared/Layout'
import PropTypes from 'prop-types'

export const SelectTimelines = ({ timelines, queriedTimelines }) => {
  const filteredSelectedTimelines = timelines.filter((timeline) =>
    queriedTimelines.includes(timeline.id)
  )
  const [selectedTimelines, setSelectedTimelines] = useState(
    filteredSelectedTimelines
  )
  return (
    <Layout>
      <Header
        subTitle={'Selecionar linhas do tempo'}
        title={'Linhas do Tempo'}
        returnButton={true}
      />
      <SelectTimelinesList
        timelines={timelines}
        selectedTimelines={selectedTimelines}
        setSelectedTimelines={setSelectedTimelines}
      />
    </Layout>
  )
}

SelectTimelines.propTypes = {
  timelines: PropTypes.array,
  queriedTimelines: PropTypes.string,
}
