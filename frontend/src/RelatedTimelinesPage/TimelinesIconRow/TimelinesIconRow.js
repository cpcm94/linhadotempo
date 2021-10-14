import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-scroll'
import {
  Wrapper,
  IconWrapper,
  IconsRow,
  Img,
  StyledButton,
} from './TimelinesIconRow.styles'
import { TimelinesCheckbox } from './TimelinesCheckbox'
import { splitArrayIntoSubarrays } from '../../_shared/splitArrayIntoSubarrays'
import { LeftArrowButton } from '../../_shared/LeftArrowButton'
import { RightArrowButton } from '../../_shared/RightArrowButton'

export const TimelinesIconRow = ({
  selectedTimelines,
  setSelectedTimelines,
  timelines,
  bucketName,
  mainTimeline,
  navigateToViewTimelines,
}) => {
  const filteredSelectedTimelinesFromMain = selectedTimelines.filter(
    (timeline) => timeline.id !== mainTimeline.id
  )
  const iconsPerView = 5
  const paginatedSelectedTimelines = splitArrayIntoSubarrays(
    filteredSelectedTimelinesFromMain,
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
        mainTimeline={mainTimeline}
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
      <StyledButton onClick={navigateToViewTimelines} variant="contained">
        Visualizar
      </StyledButton>
    </Wrapper>
  )
}

TimelinesIconRow.propTypes = {
  timelines: PropTypes.array,
  selectedTimelines: PropTypes.array,
  setSelectedTimelines: PropTypes.func,
  bucketName: PropTypes.string,
  mainTimeline: PropTypes.object,
  navigateToViewTimelines: PropTypes.func,
}
