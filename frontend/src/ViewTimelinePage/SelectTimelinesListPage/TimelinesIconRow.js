import styled from 'styled-components'
import React from 'react'
import PropTypes from 'prop-types'
import { colors } from '../../_shared/colors'
import { Link } from 'react-scroll'
import { timelineColor } from '../../_shared/timelineColor'

const IconWrapper = styled.div`
  margin: 0 0.25rem 0.25rem 0.25rem;
  background-color: ${({ color }) => (color ? color : colors.white)};
  color: #655;
  border-radius: 3px;
  min-width: 1rem;
  min-height: 1rem;
  width: 1rem;
  height: 1rem;
  font-size: 1rem;
  text-align: center;
  font-family: Karla;
  display: flex;
  justify-content: center;
  align-items: center;
`

const IconsRow = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`

export const TimelinesIconRow = ({ timelines }) => {
  return (
    <IconsRow>
      {timelines.map((timeline, index) => (
        <Link
          key={index}
          to={timeline.id}
          smooth={true}
          duration={500}
          offset={-50}
        >
          <IconWrapper color={timelineColor(timelines, timeline.id)}>
            {timeline.id}
          </IconWrapper>
        </Link>
      ))}
    </IconsRow>
  )
}

TimelinesIconRow.propTypes = {
  timelines: PropTypes.array,
}
