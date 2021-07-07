import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  IconWrapper,
  TimelinesWrapper,
  TimelinesListWrapper,
  TimelineNameWrapper,
  IconAndNameWrapper,
  SelectedIconAndNameWrapper,
} from './SelectTimelinesList.styles'

export const SelectTimelinesList = ({
  timelines,
  selectedTimelines,
  setSelectedTimelines,
}) => {
  const nonSelectedTimelines = timelines.filter(
    (timeline) =>
      !selectedTimelines.map((timeline) => timeline.id).includes(timeline.id)
  )

  const [remainingTimelines, setRemainingTimelines] =
    useState(nonSelectedTimelines)

  const arraySelectedTimelinesId = selectedTimelines.map(
    (timeline) => timeline.id
  )

  const toggleTimelines = (_, timeline) => {
    if (arraySelectedTimelinesId.includes(timeline.id)) {
      setSelectedTimelines(
        selectedTimelines.filter(
          (timelineItem) => timelineItem.id !== timeline.id
        )
      )
      setRemainingTimelines([...remainingTimelines, timeline])
    } else {
      setRemainingTimelines(
        remainingTimelines.filter(
          (timelineItem) => timelineItem.id !== timeline.id
        )
      )
      setSelectedTimelines([...selectedTimelines, timeline])
    }
  }
  return (
    <TimelinesListWrapper>
      {selectedTimelines.map((timeline) => {
        const onTimelineClick = (event) => toggleTimelines(event, timeline)
        return (
          <TimelinesWrapper key={timeline.id}>
            <SelectedIconAndNameWrapper onClick={onTimelineClick}>
              <IconWrapper>{timeline.id}</IconWrapper>
              <TimelineNameWrapper>{timeline.name}</TimelineNameWrapper>
            </SelectedIconAndNameWrapper>
          </TimelinesWrapper>
        )
      })}
      {remainingTimelines.map((timeline) => {
        const onTimelineClick = (event) => toggleTimelines(event, timeline)
        return (
          <TimelinesWrapper key={timeline.id}>
            <IconAndNameWrapper onClick={onTimelineClick}>
              <IconWrapper>{timeline.id}</IconWrapper>
              <TimelineNameWrapper>{timeline.name}</TimelineNameWrapper>
            </IconAndNameWrapper>
          </TimelinesWrapper>
        )
      })}
    </TimelinesListWrapper>
  )
}

SelectTimelinesList.propTypes = {
  timelines: PropTypes.array,
  selectedTimelines: PropTypes.array,
  setSelectedTimelines: PropTypes.func,
}
