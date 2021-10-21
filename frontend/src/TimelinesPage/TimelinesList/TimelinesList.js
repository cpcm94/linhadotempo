import React from 'react'
import PropTypes from 'prop-types'
import {
  IconWrapper,
  TimelinesWrapper,
  TimelinesListWrapper,
  TimelineNameWrapper,
  IconAndNameWrapper,
  CheckMarkerWrapper,
  CheckMarkerBoxWrapper,
  Img,
} from './TimelinesList.styles'
import { useHistory } from 'react-router'
import { sortArrayAlphabeticallyByProp } from '../../_shared/sortArrayAlphabeticallyByProp'

export const TimelinesList = ({
  timelines,
  setSelectedTimelines,
  selectedTimelines,
  bucketName,
}) => {
  const arraySelectedTimelinesId = selectedTimelines.map(
    (timeline) => timeline.id
  )
  let history = useHistory()
  const navigateToRelatedTimelinePage = (timelineId) => {
    history.push(
      `/relatedTimelines/${timelineId}${
        arraySelectedTimelinesId[0]
          ? `?timelines=${arraySelectedTimelinesId.toString()}`
          : ''
      }${window.location.hash}`
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

  const sortedTimelinesAlphabetically = sortArrayAlphabeticallyByProp(
    'name',
    timelines
  )

  return (
    <TimelinesListWrapper>
      {sortedTimelinesAlphabetically.map((timeline) => {
        const onTimelineClick = (event) => toggleTimelines(event, timeline)

        return (
          <TimelinesWrapper key={timeline.id}>
            <IconAndNameWrapper
              checked={arraySelectedTimelinesId.includes(timeline.id)}
            >
              {arraySelectedTimelinesId.includes(timeline.id) ? (
                <CheckMarkerBoxWrapper onClick={onTimelineClick}>
                  <CheckMarkerWrapper checked={true}>
                    &#10003;
                  </CheckMarkerWrapper>
                </CheckMarkerBoxWrapper>
              ) : (
                <CheckMarkerBoxWrapper onClick={onTimelineClick}>
                  <CheckMarkerWrapper />
                </CheckMarkerBoxWrapper>
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
              <TimelineNameWrapper
                onClick={() => navigateToRelatedTimelinePage(timeline.id)}
              >
                {timeline.name}
              </TimelineNameWrapper>
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
}
