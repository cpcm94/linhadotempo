import React from 'react'
import PropTypes from 'prop-types'
import {
  IconWrapper,
  TimelinesWrapper,
  TimelinesListWrapper,
  TimelineNameWrapper,
  IconAndNameWrapper,
  CheckMarkerWrapper,
  Img,
} from './TimelinesList.styles'
import { sortArrayAlphabeticallyByProp } from '../../_shared/sortArrayAlphabeticallyByProp'
import { TimelinesIconRow } from '../TimelinesIconRow/TimelinesIconRow'

export const TimelinesList = ({
  timelines,
  setSelectedTimelines,
  selectedTimelines,
  bucketName,
  mainTimeline,
  navigateToViewTimelines,
}) => {
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
    } else {
      setSelectedTimelines([...selectedTimelines, timeline])
    }
  }
  const sortedTimelinesAlphabetically = sortArrayAlphabeticallyByProp(
    'name',
    timelines
  )

  return (
    <TimelinesListWrapper>
      <TimelinesIconRow
        timelines={timelines}
        selectedTimelines={selectedTimelines}
        bucketName={bucketName}
        setSelectedTimelines={setSelectedTimelines}
        mainTimeline={mainTimeline}
        navigateToViewTimelines={navigateToViewTimelines}
      />

      {sortedTimelinesAlphabetically.map((timeline) => {
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
              {timeline.timelineIconImageUrl ? (
                <IconWrapper>
                  <Img
                    src={`https://${bucketName}.s3.sa-east-1.amazonaws.com/${timeline.timelineIconImageUrl}`}
                    alt="Icone"
                  />
                </IconWrapper>
              ) : (
                <IconWrapper color={timeline.color}>
                  {timeline.initials}
                </IconWrapper>
              )}
              <TimelineNameWrapper>{timeline.name}</TimelineNameWrapper>
            </IconAndNameWrapper>
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
  bucketName: PropTypes.string,
  mainTimeline: PropTypes.object,
  navigateToViewTimelines: PropTypes.func,
}
