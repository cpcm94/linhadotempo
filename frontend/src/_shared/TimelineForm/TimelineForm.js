import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Wrapper,
  NewTimelineNameWrapper,
  TimelineTitle,
  TimelineNameLabel,
} from './TimelineForm.styles'

export const TimelineForm = ({ timeline }) => {
  const initialTimelineName = timeline && timeline.name ? timeline.name : ''
  const [timelineName, setTimelineName] = useState(initialTimelineName)
  const handleNameChange = (e) => {
    setTimelineName(e.target.value)
  }
  return (
    <>
      <TimelineTitle>Linha do tempo</TimelineTitle>
      <Wrapper>
        <TimelineNameLabel>Nome:</TimelineNameLabel>
        <NewTimelineNameWrapper
          type="text"
          id="timeline"
          value={timelineName}
          onChange={handleNameChange}
        />
      </Wrapper>
    </>
  )
}

TimelineForm.propTypes = {
  timeline: PropTypes.object,
}
