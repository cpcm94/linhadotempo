import React from 'react'
import PropTypes from 'prop-types'
import {
  Wrapper,
  NewTimelineNameWrapper,
  TimelineTitle,
  TimelineNameLabel,
} from './TimelineForm.styles'

export const TimelineForm = ({ timelineName, setTimelineName, loading }) => {
  const handleNameChange = (e) => {
    setTimelineName(e.target.value)
  }
  return (
    <>
      {loading ? (
        <span>Loading...</span>
      ) : (
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
      )}
    </>
  )
}

TimelineForm.propTypes = {
  timeline: PropTypes.object,
  timelineName: PropTypes.string,
  setTimelineName: PropTypes.func,
  loading: PropTypes.bool,
}
