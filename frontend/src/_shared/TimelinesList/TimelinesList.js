import React from 'react'
import PropTypes from 'prop-types'
import {
  IconWrapper,
  TimelinesWrapper,
  TimelinesListWrapper,
  TimelinesListLabel,
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
      <TimelinesListLabel>Linhas do Tempo</TimelinesListLabel>
      {timelines.map((timeline) => (
        <TimelinesWrapper key={timeline.id}>
          <IconWrapper>{timeline.id}</IconWrapper>
          <div onClick={navigateToEditTimelinePage(history, timeline.id)}>
            {timeline.name}
          </div>
        </TimelinesWrapper>
      ))}
    </TimelinesListWrapper>
  )
}

TimelinesList.propTypes = {
  timelines: PropTypes.array,
}
