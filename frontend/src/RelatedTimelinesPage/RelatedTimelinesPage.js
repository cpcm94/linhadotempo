import React, { useState } from 'react'
import { Layout } from '../_shared/Layout'
import { Header } from '../_shared/Header/Header'
import { useHistory } from 'react-router'
import PropTypes from 'prop-types'
import { TimelinesList } from './TimelinesList/TimelinesList'
import { HeaderTimeline } from './HeaderTimeline/HeaderTimeline'
import { TimelinesIconRow } from './TimelinesIconRow/TimelinesIconRow'
import { RelatedTimelinesContainer } from './RelatedTimelinesContainer'

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
    .sort((a, b) => a - b)
  const allSelectedTimelinesString = allSelectedTimelines.includes(
    mainTimeline.id
  )
    ? allSelectedTimelines.toString()
    : [...allSelectedTimelines, mainTimeline.id]

  let history = useHistory()

  const navigateTo = (page) => {
    history.push(
      `${page}${
        allSelectedTimelines[0]
          ? `?timelines=${allSelectedTimelinesString}`
          : `?timelines=${mainTimeline.id}`
      }${window.location.hash}`
    )
  }

  return (
    <Layout>
      <Header
        returnButton={() => navigateTo('/timelines')}
        timelineTitle={
          <HeaderTimeline
            selectedTimelines={selectedTimelines}
            bucketName={bucketName}
            mainTimeline={mainTimeline}
          />
        }
        timelinesIconRow={
          <TimelinesIconRow
            timelines={onlyRelatedTimelines}
            selectedTimelines={selectedTimelines}
            bucketName={bucketName}
            setSelectedTimelines={setSelectedTimelines}
            mainTimeline={mainTimeline}
            navigateToViewTimelines={() => navigateTo('/viewTimeline/')}
          />
        }
      />
      <RelatedTimelinesContainer>
        <TimelinesList
          timelines={onlyRelatedTimelines}
          selectedTimelines={selectedTimelines}
          setSelectedTimelines={setSelectedTimelines}
          bucketName={bucketName}
          mainTimeline={mainTimeline}
          navigateToViewTimelines={() => navigateTo('/viewTimeline/')}
        />
      </RelatedTimelinesContainer>
    </Layout>
  )
}

RelatedTimelinesPage.propTypes = {
  relatedTimelines: PropTypes.array,
  selectedTimelinesIds: PropTypes.array,
  bucketName: PropTypes.string,
  timelineId: PropTypes.string,
}
