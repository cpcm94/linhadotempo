import React, { useEffect, useState } from 'react'
import { Layout } from '../_shared/Layout'
import { Header } from '../_shared/Header/Header'
import { Container } from '../_shared/Container'
import { useHistory } from 'react-router'
import PropTypes from 'prop-types'
import { TimelinesList } from './TimelinesList/TimelinesList'
import { HeaderTimeline } from './HeaderTimeline/HeaderTimeline'
import { startTouch } from '../_shared/startTouch'
import { moveTouch } from '../_shared/moveTouch'

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
  const [initialX, setInitialX] = useState(null)
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
      }`
    )
  }

  const onStartTouch = (e) => startTouch(e, setInitialX)
  const onMoveTouch = (e) => moveTouch(e, navigateTo('/timelines'), initialX)

  useEffect(() => {
    window.addEventListener('touchstart', onStartTouch)
    window.addEventListener('touchmove', onMoveTouch)
    return () => {
      window.removeEventListener('touchstart', onStartTouch)
      window.removeEventListener('touchmove', onMoveTouch)
    }
  })

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
      />
      <Container>
        <TimelinesList
          timelines={onlyRelatedTimelines}
          selectedTimelines={selectedTimelines}
          setSelectedTimelines={setSelectedTimelines}
          bucketName={bucketName}
          mainTimeline={mainTimeline}
          navigateToViewTimelines={() => navigateTo('/viewTimeline/')}
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
