import React from 'react'
import PropTypes from 'prop-types'
import {
  IconWrapper,
  TimelinesWrapper,
  TimelinesListWrapper,
  TimelineNameWrapper,
  EditButtonWrapper,
  IconAndNameWrapper,
  CheckMarkerWrapper,
} from './TimelinesList.styles'
import { EditButton } from '../../_shared/EditButton'
import { timelineColor } from '../../_shared/timelineColor'
import { useHistory } from 'react-router'

export const TimelinesList = ({
  timelines,
  setSelectedTimelines,
  selectedTimelines,
}) => {
  const arraySelectedTimelinesId = selectedTimelines.map(
    (timeline) => timeline.id
  )
  let history = useHistory()
  const navigateToEditTimelinePage = (history, timelineId) => (e) => {
    e.stopPropagation()
    history.push(
      `/editTimeline/${timelineId}${
        arraySelectedTimelinesId[0]
          ? `?timelines=${arraySelectedTimelinesId.toString()}`
          : ''
      }`
    )
  }

  const toggleTimelines = (_, timeline) => {
    if (arraySelectedTimelinesId.includes(timeline.id)) {
      setSelectedTimelines(
        selectedTimelines.filter(
          (timelineItem) => timelineItem.id !== timeline.id
        )
      )
    } else {
      setSelectedTimelines([...selectedTimelines, timeline])
    }
  }

  return (
    <TimelinesListWrapper>
      {timelines.map((timeline) => {
        const onTimelineClick = (event) => toggleTimelines(event, timeline)

        return (
          <TimelinesWrapper key={timeline.id}>
            <IconAndNameWrapper
              onClick={onTimelineClick}
              checked={arraySelectedTimelinesId.includes(timeline.id)}
            >
              {arraySelectedTimelinesId.includes(timeline.id) ? (
                <CheckMarkerWrapper checked={true}>&#10003;</CheckMarkerWrapper>
              ) : (
                <CheckMarkerWrapper />
              )}
              <IconWrapper color={timelineColor(timelines, timeline.id)}>
                {timeline.initials}
              </IconWrapper>
              <TimelineNameWrapper>{timeline.name}</TimelineNameWrapper>
            </IconAndNameWrapper>
            <EditButtonWrapper
              onClick={navigateToEditTimelinePage(history, timeline.id)}
            >
              <EditButton />
            </EditButtonWrapper>
          </TimelinesWrapper>
        )
      })}
    </TimelinesListWrapper>
  )
}

TimelinesList.propTypes = {
  timelines: PropTypes.array,
  selectedTimelines: PropTypes.array,
  setSelectedTimelines: PropTypes.func,
}
