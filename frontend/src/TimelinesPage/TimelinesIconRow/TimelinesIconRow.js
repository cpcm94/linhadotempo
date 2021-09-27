import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-scroll'
import {
  StyledButton,
  Wrapper,
  IconWrapper,
  IconsRow,
  Img,
} from './TimelinesIconRow.styles'
import { TimelinesCheckbox } from './TimelinesCheckbox'

export const TimelinesIconRow = ({
  timelines,
  onClick,
  setSelectedTimelines,
  bucketName,
}) => {
  return (
    <Wrapper>
      <TimelinesCheckbox
        selectedTimelines={timelines}
        setSelectedTimelines={setSelectedTimelines}
      />
      <IconsRow>
        {timelines.map((timeline, index) => (
          <Link
            key={index}
            to={timeline.id}
            smooth={true}
            duration={500}
            offset={-50}
          >
            {timeline.timelineIconImageUrl ? (
              <IconWrapper color={timeline.color}>
                <Img
                  src={`https://${bucketName}.s3.sa-east-1.amazonaws.com/${timeline.timelineIconImageUrl}`}
                />
              </IconWrapper>
            ) : (
              <IconWrapper color={timeline.color}>
                {timeline.initials}
              </IconWrapper>
            )}
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
  setSelectedTimelines: PropTypes.func,
  bucketName: PropTypes.string,
}
