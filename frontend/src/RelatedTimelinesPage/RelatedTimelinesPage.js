import React from 'react'
import { Layout } from '../_shared/Layout'
import { Header } from '../_shared/Header/Header'
import { Container } from '../_shared/Container'
import { useHistory } from 'react-router'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { TimelinesList } from './TimelinesList/TimelinesList'

export const RelatedTimelinesPage = ({
  relatedTimelines,
  selectedTimelinesIds,
  bucketName,
  timelineId,
}) => {
  let history = useHistory()
  const navigateToTimelinesPage = () => history.push('/timelines')
  const filteredSelectedTimelines = relatedTimelines.filter((timeline) =>
    selectedTimelinesIds ? selectedTimelinesIds.includes(timeline.id) : null
  )
  const [selectedTimelines, setSelectedTimelines] = useState(
    filteredSelectedTimelines
  )
  const onlyRelatedTimelines = relatedTimelines.filter(
    (timeline) => timeline.id !== timelineId
  )
  const mainTimeline = relatedTimelines.filter(
    (timeline) => timeline.id === timelineId
  )[0]
  return (
    <Layout>
      <Header
        returnButton={navigateToTimelinesPage}
        title={'Linhas do Tempo'}
      />
      <Container>
        <TimelinesList
          timelines={onlyRelatedTimelines}
          selectedTimelines={selectedTimelines}
          setSelectedTimelines={setSelectedTimelines}
          bucketName={bucketName}
          mainTimeline={mainTimeline}
        />
      </Container>
    </Layout>
  )
}

RelatedTimelinesPage.propTypes = {
  relatedTimelines: PropTypes.array,
  selectedTimelinesIds: PropTypes.array,
  bucketName: PropTypes.string,
  timelineId: PropTypes.string,
}
