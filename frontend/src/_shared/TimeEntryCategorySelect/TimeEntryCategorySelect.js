import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  ClosedDisplayWrapper,
  ClosedIconAndNameWrapper,
  OpenIconAndNameWrapper,
  OpenDisplayWrapper,
  ButtonWrapper,
  StyledButton,
  TimeEntryCategoryNameWrapper,
  TimeEntryCategoryWrapper,
} from './TimeEntryCategorySelect.styles'
import { SectionTitle } from '../SectionTitle/SectionTitle'

export const TimeEntryCategorySelect = ({
  entry,
  setEntry,
  resetField,
  entryCategories,
  fieldId,
}) => {
  const selectedTimeEntryCategoriesIds = entry.time_entry_categories.sync

  const [
    displayTimeEntryCategoriesSelect,
    setDisplayTimeEntryCategoriesSelect,
  ] = useState(false)
  const toggleDisplaySelect = () => {
    setDisplayTimeEntryCategoriesSelect(!displayTimeEntryCategoriesSelect)
  }
  const selectedCategories = entryCategories.filter((category) =>
    selectedTimeEntryCategoriesIds.includes(category.id)
  )
  const toggleCategories = (_, category) => {
    const newEntry = { ...entry }
    if (newEntry.time_entry_categories.sync.includes(category.id)) {
      newEntry.time_entry_categories.sync =
        newEntry.time_entry_categories.sync.filter(
          (category_id) => category_id !== category.id
        )
    } else {
      newEntry.time_entry_categories.sync = [
        ...newEntry.time_entry_categories.sync,
        category.id,
      ]
    }
    setEntry(newEntry)
  }
  return (
    <>
      <SectionTitle title={'Categoria'} resetSection={resetField} />
      {!displayTimeEntryCategoriesSelect && (
        <ClosedDisplayWrapper onClick={toggleDisplaySelect} id={fieldId}>
          {selectedCategories[0] ? (
            selectedCategories.map((entryCategory) => (
              <TimeEntryCategoryWrapper
                key={entryCategory.id}
                id={entryCategory.id}
              >
                <ClosedIconAndNameWrapper>
                  <TimeEntryCategoryNameWrapper>
                    {entryCategory.name}
                  </TimeEntryCategoryNameWrapper>
                </ClosedIconAndNameWrapper>
              </TimeEntryCategoryWrapper>
            ))
          ) : (
            <span>Nenhuma categoria selecionada</span>
          )}
        </ClosedDisplayWrapper>
      )}
      {displayTimeEntryCategoriesSelect && (
        <OpenDisplayWrapper id={fieldId}>
          {entryCategories.map((entryCategory) => {
            const onTimelineCategoryClick = (event) =>
              toggleCategories(event, entryCategory)
            return (
              <TimeEntryCategoryWrapper
                key={entryCategory.id}
                id={entryCategory.id}
              >
                <OpenIconAndNameWrapper
                  isSelected={selectedTimeEntryCategoriesIds.includes(
                    entryCategory.id
                  )}
                  onClick={onTimelineCategoryClick}
                >
                  <TimeEntryCategoryNameWrapper>
                    {entryCategory.name}
                  </TimeEntryCategoryNameWrapper>
                </OpenIconAndNameWrapper>
              </TimeEntryCategoryWrapper>
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

TimeEntryCategorySelect.propTypes = {
  entry: PropTypes.object,
  setEntry: PropTypes.func,
  resetField: PropTypes.func,
  entryCategories: PropTypes.array,
  fieldId: PropTypes.string,
}
