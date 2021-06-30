import React from 'react'
import PropTypes from 'prop-types'
import {
  IconWrapper,
  TimelinesWrapper,
  TimelinesListWrapper,
  TimelinesListLabel,
} from './TimelinesList.styles'

export const TimelinesList = ({ timelines }) => {
  return (
    <TimelinesListWrapper>
      <TimelinesListLabel>Linhas do Tempo</TimelinesListLabel>
      {timelines.map((timeline) => (
        <TimelinesWrapper key={timeline.id}>
          <IconWrapper>{timeline.id}</IconWrapper>
          <div>{timeline.name}</div>
        </TimelinesWrapper>
      ))}
    </TimelinesListWrapper>
  )
}

TimelinesList.propTypes = {
  timelines: PropTypes.array,
}
