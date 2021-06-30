import React from 'react'
import PropTypes from 'prop-types'
import {
  IconWrapper,
  TimelinesWrapper,
  UserTimelinesWrapper,
  TimelinesListLabel,
} from './TimelineForm.styles'

export const UserTimelines = ({ timelines }) => {
  return (
    <UserTimelinesWrapper>
      <TimelinesListLabel>Linhas do Tempo</TimelinesListLabel>
      {timelines.map((timeline) => (
        <TimelinesWrapper key={timeline.id}>
          <IconWrapper>{timeline.id}</IconWrapper>
          <div>{timeline.name}</div>
        </TimelinesWrapper>
      ))}
    </UserTimelinesWrapper>
  )
}

UserTimelines.propTypes = {
  timelines: PropTypes.array,
}
