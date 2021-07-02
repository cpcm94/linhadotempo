import React from 'react'
import PropTypes from 'prop-types'
import {
  IconWrapper,
  TimelinesWrapper,
  TimelinesListWrapper,
  TimelineNameWrapper,
} from './TimelinesList.styles'
import { useHistory } from 'react-router-dom'

export const TimelinesList = ({ timelines }) => {
  let history = useHistory()

  const navigateToEditTimelinePage = (history, timelineId) => (e) => {
    e.stopPropagation()
    history.push(`/editTimeline/${timelineId}`)
  }
  return (
    <TimelinesListWrapper>
      {timelines.map((timeline) => (
        <TimelinesWrapper key={timeline.id}>
          <IconWrapper>{timeline.id}</IconWrapper>
          <TimelineNameWrapper
            onClick={navigateToEditTimelinePage(history, timeline.id)}
          >
            {timeline.name}
          </TimelineNameWrapper>
        </TimelinesWrapper>
      ))}
    </TimelinesListWrapper>
  )
}

TimelinesList.propTypes = {
  timelines: PropTypes.array,
}
