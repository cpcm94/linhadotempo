import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { SectionTitle } from '../../../_shared/SectionTitle/SectionTitle'
import {
  ClosedDisplayWrapper,
  TimelineNameWrapper,
  ClosedIconAndNameWrapper,
  OpenIconAndNameWrapper,
  IconWrapper,
  TimelineWrapper,
  OpenDisplayWrapper,
  ButtonWrapper,
  StyledButton,
  Img,
} from './EntryTimelinesSelect.styles'
import { ErrorMessage } from '../EntryTextInput/EntryTextInput.styles'

export const EntryTimelinesSelect = ({
  entry,
  setEntry,
  resetField,
  timelines,
  fieldId,
  entryError,
}) => {
  const selectedTimelineIds = entry.timelines.sync

  const [displayTimelineSelect, setDisplayTimelineSelect] = useState(false)
  const toggleDisplaySelect = () => {
    setDisplayTimelineSelect(!displayTimelineSelect)
  }
  const selectedTimelines = timelines.filter((timeline) =>
    selectedTimelineIds.includes(timeline.id)
  )
  const toggleTimelines = (_, timeline) => {
    const newEntry = { ...entry }
    if (newEntry.timelines.sync.includes(timeline.id)) {
      newEntry.timelines.sync = newEntry.timelines.sync.filter(
        (timeline_id) => timeline_id !== timeline.id
      )
    } else {
      newEntry.timelines.sync = [...newEntry.timelines.sync, timeline.id]
    }
    setEntry(newEntry)
  }
  const showErrorMessage = entryError && entryError.field === 'timeline'
  return (
    <>
      <SectionTitle title={'Linhas do Tempo'} resetSection={resetField} />
      {showErrorMessage && (
        <ErrorMessage>
          {'Não é possível criar acontecimento sem linha do tempo'}
        </ErrorMessage>
      )}
      {!displayTimelineSelect && (
        <ClosedDisplayWrapper onClick={toggleDisplaySelect} id={fieldId}>
          {selectedTimelines[0] ? (
            selectedTimelines.map((timeline) => (
              <TimelineWrapper key={timeline.id} id={timeline.id}>
                <ClosedIconAndNameWrapper>
                  {timeline.timelineIconImageUrl ? (
                    <IconWrapper color={timeline.color}>
                      <Img src={timeline.timelineIconImageUrl} />
                    </IconWrapper>
                  ) : (
                    <IconWrapper color={timeline.color}>
                      {timeline.initials}
                    </IconWrapper>
                  )}
                  <TimelineNameWrapper>{timeline.name}</TimelineNameWrapper>
                </ClosedIconAndNameWrapper>
              </TimelineWrapper>
            ))
          ) : (
            <span>Nenhuma linha do tempo selecionada</span>
          )}
        </ClosedDisplayWrapper>
      )}
      {displayTimelineSelect && (
        <OpenDisplayWrapper id={fieldId}>
          {timelines.map((timeline) => {
            const onTimelineClick = (event) => toggleTimelines(event, timeline)
            return (
              <TimelineWrapper key={timeline.id} id={timeline.id}>
                <OpenIconAndNameWrapper
                  isSelected={selectedTimelineIds.includes(timeline.id)}
                  onClick={onTimelineClick}
                  img={timeline.timelineIconImageUrl}
                >
                  {timeline.timelineIconImageUrl ? (
                    <IconWrapper color={timeline.color}>
                      <Img src={timeline.timelineIconImageUrl} />
                    </IconWrapper>
                  ) : (
                    <IconWrapper color={timeline.color}>
                      {timeline.initials}
                    </IconWrapper>
                  )}
                  <TimelineNameWrapper>{timeline.name}</TimelineNameWrapper>
                </OpenIconAndNameWrapper>
              </TimelineWrapper>
            )
          })}
          <ButtonWrapper>
            <StyledButton onClick={toggleDisplaySelect} variant="contained">
              Ok
            </StyledButton>
          </ButtonWrapper>
        </OpenDisplayWrapper>
      )}
    </>
  )
}

EntryTimelinesSelect.propTypes = {
  entry: PropTypes.object,
  setEntry: PropTypes.func,
  resetField: PropTypes.func,
  timelines: PropTypes.array,
  fieldId: PropTypes.string,
  entryError: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
}
