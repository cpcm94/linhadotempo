import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-scroll'
import { Wrapper, IconWrapper, IconsRow, Img } from './TimelinesIconRow.styles'
import { TimelinesCheckbox } from './TimelinesCheckbox'

export const TimelinesIconRow = ({
  selectedTimelines,
  setSelectedTimelines,
  timelines,
  bucketName,
  mainTimeline,
}) => {
  const filteredSelectedTimelinesFromMain = selectedTimelines.filter(
    (timeline) => timeline.id !== mainTimeline.id
  )
  return (
    <Wrapper>
      <TimelinesCheckbox
        timelines={timelines}
        selectedTimelines={selectedTimelines}
        setSelectedTimelines={setSelectedTimelines}
        mainTimeline={mainTimeline}
      />
      <IconsRow>
        {filteredSelectedTimelinesFromMain.map((timeline, index) => (
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
    </Wrapper>
  )
}

TimelinesIconRow.propTypes = {
  timelines: PropTypes.array,
  selectedTimelines: PropTypes.array,
  setSelectedTimelines: PropTypes.func,
  bucketName: PropTypes.string,
  mainTimeline: PropTypes.object,
}
