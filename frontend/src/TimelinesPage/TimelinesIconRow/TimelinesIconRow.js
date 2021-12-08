import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper, SeachBar } from './TimelinesIconRow.styles'
import { TimelinesCheckbox } from './TimelinesCheckbox'

export const TimelinesIconRow = ({
  timelines,
  selectedTimelines,
  setSelectedTimelines,
  timelineSearchString,
  setTimelineSearchString,
}) => {
  const handleChange = (e) => {
    setTimelineSearchString(e.target.value)
  }
  return (
    <Wrapper>
      <TimelinesCheckbox
        timelines={timelines}
        selectedTimelines={selectedTimelines}
        setSelectedTimelines={setSelectedTimelines}
      />
      <SeachBar
        type="text"
        value={timelineSearchString}
        onChange={handleChange}
      />
    </Wrapper>
  )
}

TimelinesIconRow.propTypes = {
  timelines: PropTypes.array,
  selectedTimelines: PropTypes.array,
  setSelectedTimelines: PropTypes.func,
  timelineSearchString: PropTypes.string,
  setTimelineSearchString: PropTypes.func,
}
