import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  ClosedDisplayWrapper,
  TimelineCategoryNameWrapper,
  ClosedIconAndNameWrapper,
  OpenIconAndNameWrapper,
  TimelineCategoryWrapper,
  OpenDisplayWrapper,
  ButtonWrapper,
  StyledButton,
} from './TimelineCategorySelect.styles'
import { SectionTitle } from '../SectionTitle/SectionTitle'

export const TimelineCategorySelect = ({
  timeline,
  setTimeline,
  resetField,
  timelineCategories,
  fieldId,
}) => {
  const selectedTimelineCategoriesIds = timeline.timeline_categories.sync

  const [displayTimelineCategoriesSelect, setDisplayTimelineCategoriesSelect] =
    useState(false)
  const toggleDisplaySelect = () => {
    setDisplayTimelineCategoriesSelect(!displayTimelineCategoriesSelect)
  }
  const selectedCategories = timelineCategories.filter((timelineCategory) =>
    selectedTimelineCategoriesIds.includes(timelineCategory.id)
  )
  const toggleCategories = (_, timelineCategory) => {
    const newTimeline = { ...timeline }
    if (newTimeline.timeline_categories.sync.includes(timelineCategory.id)) {
      newTimeline.timeline_categories.sync =
        newTimeline.timeline_categories.sync.filter(
          (timelineCategory_id) => timelineCategory_id !== timelineCategory.id
        )
    } else {
      newTimeline.timeline_categories.sync = [
        ...newTimeline.timeline_categories.sync,
        timelineCategory.id,
      ]
    }
    setTimeline(newTimeline)
  }
  return (
    <>
      <SectionTitle title={'Categoria'} resetSection={resetField} />
      {!displayTimelineCategoriesSelect && (
        <ClosedDisplayWrapper onClick={toggleDisplaySelect} id={fieldId}>
          {selectedCategories[0] ? (
            selectedCategories.map((timelineCategory) => (
              <TimelineCategoryWrapper
                key={timelineCategory.id}
                id={timelineCategory.id}
              >
                <ClosedIconAndNameWrapper>
                  <TimelineCategoryNameWrapper>
                    {timelineCategory.name}
                  </TimelineCategoryNameWrapper>
                </ClosedIconAndNameWrapper>
              </TimelineCategoryWrapper>
            ))
          ) : (
            <span>Nenhuma categoria selecionada</span>
          )}
        </ClosedDisplayWrapper>
      )}
      {displayTimelineCategoriesSelect && (
        <OpenDisplayWrapper id={fieldId}>
          {timelineCategories.map((timelineCategory) => {
            const onTimelineCategoryClick = (event) =>
              toggleCategories(event, timelineCategory)
            return (
              <TimelineCategoryWrapper
                key={timelineCategory.id}
                id={timelineCategory.id}
              >
                <OpenIconAndNameWrapper
                  isSelected={selectedTimelineCategoriesIds.includes(
                    timelineCategory.id
                  )}
                  onClick={onTimelineCategoryClick}
                >
                  <TimelineCategoryNameWrapper>
                    {timelineCategory.name}
                  </TimelineCategoryNameWrapper>
                </OpenIconAndNameWrapper>
              </TimelineCategoryWrapper>
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

TimelineCategorySelect.propTypes = {
  timeline: PropTypes.object,
  setTimeline: PropTypes.func,
  resetField: PropTypes.func,
  timelineCategories: PropTypes.array,
  fieldId: PropTypes.string,
}
