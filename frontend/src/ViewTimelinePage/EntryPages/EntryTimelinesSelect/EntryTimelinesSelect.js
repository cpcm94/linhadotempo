import React from 'react'
import PropTypes from 'prop-types'
import { SectionTitle } from '../../../_shared/SectionTitle/SectionTitle'
import {
  ClosedDisplayWrapper,
  TimelineNameWrapper,
  ClosedIconAndNameWrapper,
  IconWrapper,
  TimelineWrapper,
  Img,
} from './EntryTimelinesSelect.styles'
import { ErrorMessage } from '../../../_shared/ErrorMessage.styles'

export const EntryTimelinesSelect = ({
  entry,
  resetField,
  timelines,
  fieldId,
  entryError,
  bucketName,
  setShowTimelineSelectorScreen,
}) => {
  const selectedTimelineIds = entry.timelines.sync

  const selectedTimelines = timelines.filter((timeline) =>
    selectedTimelineIds.includes(timeline.id)
  )
  const sortedSelectedTimelines =
    selectedTimelines[0] &&
    selectedTimelines.sort((a, b) => a.name.localeCompare(b.name))

  const showErrorMessage = entryError && entryError.field === 'timeline'
  return (
    <>
      <SectionTitle title={'Linhas do Tempo'} resetSection={resetField} />
      {showErrorMessage && (
        <ErrorMessage>
          {'Não é possível criar acontecimento sem linha do tempo'}
        </ErrorMessage>
      )}
      <ClosedDisplayWrapper
        onClick={() => setShowTimelineSelectorScreen(true)}
        id={fieldId}
      >
        {sortedSelectedTimelines ? (
          sortedSelectedTimelines.map((timeline) => (
            <TimelineWrapper key={timeline.id} id={timeline.id}>
              <ClosedIconAndNameWrapper>
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
              </ClosedIconAndNameWrapper>
            </TimelineWrapper>
          ))
        ) : (
          <span>Nenhuma linha do tempo selecionada</span>
        )}
      </ClosedDisplayWrapper>
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
  bucketName: PropTypes.string,
  setShowTimelineSelectorScreen: PropTypes.func,
}
