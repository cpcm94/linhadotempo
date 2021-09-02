import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-scroll'
import { timelineColor } from '../../_shared/timelineColor'
import {
  StyledButton,
  Wrapper,
  IconWrapper,
  IconsRow,
} from './TimelinesIconRow.styles'

export const TimelinesIconRow = ({ timelines, onClick }) => {
  return (
    <Wrapper>
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
              {timeline.initials}
            </IconWrapper>
          </Link>
        ))}
      </IconsRow>
      <StyledButton
        onClick={onClick}
        disabled={!timelines[0]}
        variant="contained"
      >
        Visualizar
      </StyledButton>
    </Wrapper>
  )
}

TimelinesIconRow.propTypes = {
  timelines: PropTypes.array,
  onClick: PropTypes.func,
}
