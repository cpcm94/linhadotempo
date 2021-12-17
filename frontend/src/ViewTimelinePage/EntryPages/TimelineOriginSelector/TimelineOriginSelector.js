import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  CheckBoxWrapper,
  ClosedDisplayWrapper,
  IconAndNameWrapper,
  IconWrapper,
  Img,
  OpenDisplayWrapper,
  OpenTimelineWrapper,
  SpanMessage,
  StyledButton,
  TimelineNameWrapper,
  TimelineWrapper,
} from './TimelineOriginSelector.styles'
import { SectionTitle } from '../../../_shared/SectionTitle/SectionTitle'
import { useMutation } from '@apollo/client'
import { UPDATE_TIMELINE_MUTATION } from '../../../_shared/UPDATE_TIMELINE_MUTATION'

const updateTimelinesObjects = (
  timeline,
  idValue,
  timelinesObjects,
  setTimelinesObjects
) => {
  const indexOfTimeline = timelinesObjects.indexOf(timeline)
  const newTimelinesObjects = [...timelinesObjects]
  newTimelinesObjects[indexOfTimeline] = {
    ...newTimelinesObjects[indexOfTimeline],
    time_entry_id: idValue,
  }
  setTimelinesObjects(newTimelinesObjects)
}

export const TimelineOriginSelector = ({
  entry,
  bucketName,
  timelines,
  entryId,
}) => {
  const [showOriginTimelineSelector, setShowOriginTimelineSelector] =
    useState(false)

  const [timelinesObjects, setTimelinesObjects] = useState(timelines)

  const selectedTimelineIds = entry.timelines.sync

  const selectedTimelines = timelinesObjects.filter((timeline) =>
    selectedTimelineIds.includes(timeline.id)
  )
  const sortedSelectedTimelines = selectedTimelines[0]
    ? selectedTimelines.sort((a, b) => a.name.localeCompare(b.name))
    : []

  const filteredTimelinesByOriginId = sortedSelectedTimelines.filter(
    (timeline) => {
      if (timeline.time_entry_id) return timeline.time_entry_id === entryId
    }
  )
  const [mutate] = useMutation(UPDATE_TIMELINE_MUTATION)
  const checkIfOrigin = (timelinesObjects) =>
    timelinesObjects.time_entry_id && timelinesObjects.time_entry_id === entryId

  const handleClick = (timeline) => {
    if (!timeline.time_entry_id || timeline.time_entry_id !== entryId) {
      const payload = {
        variables: {
          id: timeline.id,
          input: { time_entry_id: entryId },
        },
      }
      mutate(payload).then((res) => {
        if (res.data) {
          updateTimelinesObjects(
            timeline,
            entryId,
            timelinesObjects,
            setTimelinesObjects
          )
        }
      })
    } else if (timeline.time_entry_id && timeline.time_entry_id === entryId) {
      const payload = {
        variables: {
          id: timeline.id,
          input: { time_entry_id: null },
        },
      }
      mutate(payload).then((res) => {
        if (res.data) {
          updateTimelinesObjects(
            timeline,
            null,
            timelinesObjects,
            setTimelinesObjects
          )
        }
      })
    }
  }

  return (
    <>
      <SectionTitle title={'Origem das Linhas do tempo'} />
      {!showOriginTimelineSelector && (
        <ClosedDisplayWrapper
          onClick={() => setShowOriginTimelineSelector(true)}
        >
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
            <SpanMessage onClick={() => setShowOriginTimelineSelector(true)}>
              Esse acontecimento não é origem para nenhuma linha do tempo
            </SpanMessage>
          )}
        </ClosedDisplayWrapper>
      )}
      {showOriginTimelineSelector && (
        <OpenDisplayWrapper>
          {sortedSelectedTimelines &&
            sortedSelectedTimelines.map((timeline) => {
              return (
                <OpenTimelineWrapper
                  onClick={() => handleClick(timeline)}
                  key={timeline.id}
                  id={timeline.id}
                >
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
                  <CheckBoxWrapper selected={checkIfOrigin(timeline)}>
                    &#10003;
                  </CheckBoxWrapper>
                </OpenTimelineWrapper>
              )
            })}
          <StyledButton
            onClick={() => setShowOriginTimelineSelector(false)}
            variant="contained"
          >
            Ok
          </StyledButton>
        </OpenDisplayWrapper>
      )}
    </>
  )
}

TimelineOriginSelector.propTypes = {
  entry: PropTypes.object,
  bucketName: PropTypes.string,
  timelines: PropTypes.array,
  entryId: PropTypes.string,
}
