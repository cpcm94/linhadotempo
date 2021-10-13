import React, { useEffect, useState } from 'react'
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
import { LeftArrowButton } from '../../_shared/LeftArrowButton'
import { RightArrowButton } from '../../_shared/RightArrowButton'
import { splitArrayIntoSubarrays } from '../../_shared/splitArrayIntoSubarrays'

export const TimelinesIconRow = ({
  timelines,
  onClick,
  selectedTimelines,
  setSelectedTimelines,
  bucketName,
}) => {
  const iconsPerView = 5
  const paginatedSelectedTimelines = splitArrayIntoSubarrays(
    selectedTimelines,
    iconsPerView
  )
  const [iconRowIndex, setIconRowIndex] = useState(0)

  const handleLeftArrowClick = () => {
    setIconRowIndex(iconRowIndex - 1)
  }
  const handleRightArrowClick = () => {
    setIconRowIndex(iconRowIndex + 1)
  }
  useEffect(() => {
    if (!paginatedSelectedTimelines[iconRowIndex] && iconRowIndex > 0) {
      setIconRowIndex(iconRowIndex - 1)
    }
  }, [iconRowIndex, paginatedSelectedTimelines])

  const numberOfIconRows = Math.ceil(selectedTimelines.length / iconsPerView)

  const hideRightButton =
    numberOfIconRows === iconRowIndex + 1 || !paginatedSelectedTimelines[0]

  return (
    <Wrapper>
      <TimelinesCheckbox
        timelines={timelines}
        selectedTimelines={selectedTimelines}
        setSelectedTimelines={setSelectedTimelines}
      />
      <IconsRow>
        <LeftArrowButton
          onClick={handleLeftArrowClick}
          hide={iconRowIndex === 0}
        />
        {paginatedSelectedTimelines[iconRowIndex] &&
          paginatedSelectedTimelines[iconRowIndex].map((timeline, index) => (
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
        <RightArrowButton
          onClick={handleRightArrowClick}
          hide={hideRightButton}
        />
      </IconsRow>
      <StyledButton
        onClick={onClick}
        disabled={!selectedTimelines[0]}
        variant="contained"
      >
        Visualizar
      </StyledButton>
    </Wrapper>
  )
}

TimelinesIconRow.propTypes = {
  timelines: PropTypes.array,
  selectedTimelines: PropTypes.array,
  onClick: PropTypes.func,
  setSelectedTimelines: PropTypes.func,
  bucketName: PropTypes.string,
}
