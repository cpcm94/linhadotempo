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
} from './HeaderTimeline.styles'
import PropTypes from 'prop-types'
import qs from 'query-string'

export const HeaderTimeline = ({ bucketName, mainTimeline }) => {
  const selectedTimelinesFromUrl = qs.parse(location.search).timelines

  let history = useHistory()
  const navigateToEditTimelinePage = (history, timelineId) => (e) => {
    e.stopPropagation()
    history.push(
      `/editTimeline/${timelineId}${
        selectedTimelinesFromUrl ? `?timelines=${selectedTimelinesFromUrl}` : ''
      }`
    )
  }
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
}
