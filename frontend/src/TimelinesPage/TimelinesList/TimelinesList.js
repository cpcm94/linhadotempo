import React from 'react'
import PropTypes from 'prop-types'
import {
  IconWrapper,
  TimelinesWrapper,
  TimelinesListWrapper,
  TimelineNameWrapper,
  EditButtonWrapper,
  IconAndNameWrapper,
} from './TimelinesList.styles'
import { useHistory } from 'react-router-dom'
import { EditButton } from '../../_shared/EditButton'
import { timelineColor } from '../../_shared/timelineColor'

export const TimelinesList = ({ timelines }) => {
  let history = useHistory()

  const navigateToEditTimelinePage = (history, timelineId) => (e) => {
    e.stopPropagation()
    history.push(`/editTimeline/${timelineId}`)
  }
  const navigateToViewTimelinePage = (history, timelineId) => (e) => {
    e.stopPropagation()
    history.push(`/viewTimeline/?timelines=${timelineId}`)
  }
  return (
    <TimelinesListWrapper>
      {timelines.map((timeline) => (
        <TimelinesWrapper key={timeline.id}>
          <IconAndNameWrapper
            onClick={navigateToViewTimelinePage(history, timeline.id)}
          >
            <IconWrapper color={timelineColor(timelines, timeline.id)}>
              {timeline.id}
            </IconWrapper>
            <TimelineNameWrapper>{timeline.name}</TimelineNameWrapper>
          </IconAndNameWrapper>
          <EditButtonWrapper
            onClick={navigateToEditTimelinePage(history, timeline.id)}
          >
            <EditButton />
          </EditButtonWrapper>
        </TimelinesWrapper>
      ))}
    </TimelinesListWrapper>
  )
}

TimelinesList.propTypes = {
  timelines: PropTypes.array,
}
