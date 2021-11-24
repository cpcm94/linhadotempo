import React from 'react'
import PropTypes from 'prop-types'
import {
  ClosedDisplayWrapper,
  IconAndNameWrapper,
  IconWrapper,
  Img,
  TimelineNameWrapper,
  TimelineWrapper,
} from './TimelineOriginSelector.styles'
import { SectionTitle } from '../../../_shared/SectionTitle/SectionTitle'

export const TimelineOriginSelector = ({
  entry,
  bucketName,
  timelines,
  entryId,
}) => {
  const selectedTimelineIds = entry.timelines.sync

  const selectedTimelines = timelines.filter((timeline) =>
    selectedTimelineIds.includes(timeline.id)
  )
  const sortedSelectedTimelines =
    selectedTimelines[0] &&
    selectedTimelines.sort((a, b) => a.name.localeCompare(b.name))

  const filteredTimelinesByOriginId = sortedSelectedTimelines.filter(
    (timeline) => timeline.origin_time_entry.id === entryId
  )

  return (
    <>
      <SectionTitle title={'Origem das Linhas do tempo'} />
      <ClosedDisplayWrapper>
        {filteredTimelinesByOriginId[0] ? (
          filteredTimelinesByOriginId.map((timeline) => (
            <TimelineWrapper key={timeline.id} id={timeline.id}>
              <IconAndNameWrapper>
                {timeline.timelineIconImageUrl ? (
                  <IconWrapper borderColor={timeline.color}>
                    <Img
                      src={`https://${bucketName}.s3.sa-east-1.amazonaws.com/${timeline.timelineIconImageUrl}`}
                    />
                  </IconWrapper>
                ) : (
                  <IconWrapper color={timeline.color}>
                    {timeline.initials}
                  </IconWrapper>
                )}
                <TimelineNameWrapper>{timeline.name}</TimelineNameWrapper>
              </IconAndNameWrapper>
            </TimelineWrapper>
          ))
        ) : (
          <span>
            Esse acontecimento não é origem para nenhuma linha do tempo
          </span>
        )}
      </ClosedDisplayWrapper>
    </>
  )
}

TimelineOriginSelector.propTypes = {
  entry: PropTypes.object,
  bucketName: PropTypes.string,
  timelines: PropTypes.array,
  entryId: PropTypes.string,
}
