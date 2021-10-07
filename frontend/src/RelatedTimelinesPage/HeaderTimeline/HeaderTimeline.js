import React from 'react'
import { EditButton } from '../../_shared/EditButton'
import { useHistory } from 'react-router'
import {
  IconWrapper,
  TimelinesWrapper,
  TimelineNameWrapper,
  EditButtonWrapper,
  IconAndNameWrapper,
  Img,
  MobileTimelineNameWrapper,
} from './HeaderTimeline.styles'
import PropTypes from 'prop-types'
import { truncateTextFunction } from '../../_shared/truncateTextFunction'

export const HeaderTimeline = ({
  bucketName,
  mainTimeline,
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
  const truncatedTimelineName = truncateTextFunction(mainTimeline.name, 14)
  return (
    <TimelinesWrapper key={mainTimeline.id}>
      <IconAndNameWrapper checked={true}>
        {mainTimeline.timelineIconImageUrl ? (
          <IconWrapper>
            <Img
              src={`https://${bucketName}.s3.sa-east-1.amazonaws.com/${mainTimeline.timelineIconImageUrl}`}
              alt="Icone"
            />
          </IconWrapper>
        ) : (
          <IconWrapper color={mainTimeline.color}>
            {mainTimeline.initials}
          </IconWrapper>
        )}
        <TimelineNameWrapper>{mainTimeline.name}</TimelineNameWrapper>
        <MobileTimelineNameWrapper>
          {truncatedTimelineName}
        </MobileTimelineNameWrapper>
      </IconAndNameWrapper>
      <EditButtonWrapper
        onClick={navigateToEditTimelinePage(history, mainTimeline.id)}
      >
        <EditButton />
      </EditButtonWrapper>
    </TimelinesWrapper>
  )
}
HeaderTimeline.propTypes = {
  bucketName: PropTypes.string,
  mainTimeline: PropTypes.object,
  selectedTimelines: PropTypes.array,
}
