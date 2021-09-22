import React, { Fragment } from 'react'
import styled from 'styled-components'
import { colors } from '../../_shared/colors'
import PropTypes from 'prop-types'

const Button = styled.div`
  margin-right: 0.5rem;
  background-color: ${({ color }) => (color ? color : colors.white)};
  border: ${({ color }) =>
    color ? `solid 1px ${color}` : `solid 1px ${colors.white}`};
  color: #655;
  border-radius: 5px;
  min-width: 1.8rem;
  min-height: 1.8rem;
  width: 1.8rem;
  height: 1.8rem;
  font-size: 0.7rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  opacity: ${({ isSelected }) => (isSelected ? '1' : '0.5')};
  :hover {
    cursor: pointer;
  }
`

const Img = styled.img`
  border-radius: 5px;
  width: 1.75rem;
  height: 1.75rem;
  object-fit: cover;
  margin: 0;
`
const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 77vw;
  margin-right: 22%;
  overflow-x: scroll;
  @media (min-width: 1440px) {
    margin-right: 50%;
  }
  @media (max-width: 1439px) {
    margin-right: 25%;
  }

  min-height: 3rem;
  max-height: 3rem;
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
          <Fragment key={timeline.id}>
            {timeline.timelineIconImageUrl ? (
              <Button
                onClick={onTimelineButtonClick}
                isSelected={arrayVisibleTimelinesId.includes(timeline.id)}
                color={timeline.color}
              >
                <Img src={timeline.timelineIconImageUrl} alt="Icone" />
              </Button>
            ) : (
              <Button
                onClick={onTimelineButtonClick}
                isSelected={arrayVisibleTimelinesId.includes(timeline.id)}
                color={timeline.color}
              >
                {timeline.initials}
              </Button>
            )}
          </Fragment>
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
