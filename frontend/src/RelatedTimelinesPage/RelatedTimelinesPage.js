import React from 'react'
import { Layout } from '../_shared/Layout'
import { Header } from '../_shared/Header/Header'
import { Container } from '../_shared/Container'
import { useHistory } from 'react-router'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { TimelinesList } from './TimelinesList/TimelinesList'
import { HeaderTimeline } from './HeaderTimeline/HeaderTimeline'

export const RelatedTimelinesPage = ({
  relatedTimelines,
  selectedTimelinesIds,
  bucketName,
  timelineId,
}) => {
  const filteredSelectedTimelines = relatedTimelines.filter((timeline) =>
    selectedTimelinesIds.includes(timeline.id)
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
  const selectedRelatedTimelineIds = selectedTimelines.map(
    (timeline) => timeline.id
  )
  const allSelectedTimelines = selectedTimelinesIds
    .filter(
      (id) => !relatedTimelines.map((timeline) => timeline.id).includes(id)
    )
    .concat(selectedRelatedTimelineIds)
  const allSelectedTimelinesString = allSelectedTimelines.includes(
    mainTimeline.id
  )
    ? allSelectedTimelines.toString()
    : [...allSelectedTimelines, mainTimeline.id]

  let history = useHistory()
  const navigateToTimelinesPage = () =>
    history.push(
      `/timelines${
        allSelectedTimelines[0]
          ? `?timelines=${allSelectedTimelinesString}`
          : `?timelines=${mainTimeline.id}`
      }`
    )

  return (
    <Layout>
      <Header
        returnButton={navigateToTimelinesPage}
        timelineTitle={
          <HeaderTimeline
            selectedTimelines={selectedTimelines}
            bucketName={bucketName}
            mainTimeline={mainTimeline}
          />
        }
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
