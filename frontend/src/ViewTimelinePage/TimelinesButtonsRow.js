import React from 'react'
import styled from 'styled-components'
import { colors } from '../_shared/colors'
import PropTypes from 'prop-types'
import { isSelected } from '../_shared/isSelected'

const Button = styled.div`
  background-color: ${colors.white};
  margin: 0 0.5rem 0 0.5rem;
  border: solid 1px #999;
  color: #655;
  border-radius: 5px;
  min-width: 2rem;
  min-height: 2rem;
  width: 2rem;
  height: 2rem;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ isSelected }) => (isSelected ? '1' : '0.5')};
  :hover {
    cursor: pointer;
  }
`

export const TimelinesButtonsRow = ({
  timelines,
  visibleTimelines,
  setVisibleTimelines,
}) => {
  const arrayVisibleTimelinesId = visibleTimelines.map(
    (timeline) => timeline.id
  )

  const handleClick = (_, timeline) => {
    if (arrayVisibleTimelinesId.includes(timeline.id)) {
      setVisibleTimelines(
        visibleTimelines.filter(
          (timelineItem) => timelineItem.id !== timeline.id
        )
      )
    } else {
      setVisibleTimelines([...visibleTimelines, timeline])
    }
  }
  return (
    <>
      {timelines.map((timeline) => {
        const onTimelineButtonClick = (event) => handleClick(event, timeline)
        return (
          <Button
            key={timeline.id}
            onClick={onTimelineButtonClick}
            isSelected={isSelected(timeline.id, arrayVisibleTimelinesId)}
          >
            {timeline.id}
          </Button>
        )
      })}
    </>
  )
}

TimelinesButtonsRow.propTypes = {
  timelines: PropTypes.array,
  visibleTimelines: PropTypes.array,
  setVisibleTimelines: PropTypes.func,
}
