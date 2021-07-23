import React from 'react'
import styled from 'styled-components'
import { colors } from '../_shared/colors'
import PropTypes from 'prop-types'
import { isSelected } from '../_shared/isSelected'

const Button = styled.div`
  background-color: ${colors.white};
  margin: 0 0.35rem 0 0.35rem;
  border: solid 1px #999;
  color: #655;
  border-radius: 5px;
  min-width: 1.8rem;
  min-height: 1.8rem;
  width: 1.8rem;
  height: 1.8rem;
  font-size: 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  opacity: ${({ isSelected }) => (isSelected ? '1' : '0.5')};
  :hover {
    cursor: pointer;
  }
`
const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 77vw;
  margin-right: 5rem;
  overflow-x: scroll;

  @media (min-width: 1600px) {
    overflow-x: hidden;
  }
  @media (min-width: 1440px) {
    margin-right: 0;
    overflow-x: hidden;
  }
  @media (min-width: 1024px) {
    overflow-x: hidden;
    margin-right: 0;
  }
  min-height: 4rem;
  max-height: 4rem;
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
    <Wrapper>
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
    </Wrapper>
  )
}

TimelinesButtonsRow.propTypes = {
  timelines: PropTypes.array,
  visibleTimelines: PropTypes.array,
  setVisibleTimelines: PropTypes.func,
}
