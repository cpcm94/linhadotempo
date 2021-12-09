import React from 'react'
import PropTypes from 'prop-types'
import {
  Wrapper,
  SearchBar,
  FilteringCategories,
  Category,
  TextAndCategoriesWrapper,
} from './TimelinesIconRow.styles'
import { TimelinesCheckbox } from './TimelinesCheckbox'
import { CategoryFilterSelect } from './CategoryFilterSelect'

export const TimelinesIconRow = ({
  timelines,
  selectedTimelines,
  setSelectedTimelines,
  timelineSearchString,
  setTimelineSearchString,
  categories,
  chosenCategories,
  setChosenCategories,
}) => {
  const handleChange = (e) => {
    setTimelineSearchString(e.target.value)
  }
  return (
    <Wrapper>
      <TimelinesCheckbox
        timelines={timelines}
        selectedTimelines={selectedTimelines}
        setSelectedTimelines={setSelectedTimelines}
      />
      <TextAndCategoriesWrapper>
        <SearchBar
          type="text"
          value={timelineSearchString}
          onChange={handleChange}
          chosenCategories={chosenCategories}
        />
        <FilteringCategories chosenCategories={chosenCategories}>
          {chosenCategories.map((category) => (
            <Category key={category.id} bgColor={category.color}>
              {category.name}
            </Category>
          ))}
        </FilteringCategories>
      </TextAndCategoriesWrapper>
      <CategoryFilterSelect
        categories={categories}
        chosenCategories={chosenCategories}
        setChosenCategories={setChosenCategories}
      />
    </Wrapper>
  )
}

TimelinesIconRow.propTypes = {
  timelines: PropTypes.array,
  selectedTimelines: PropTypes.array,
  setSelectedTimelines: PropTypes.func,
  timelineSearchString: PropTypes.string,
  setTimelineSearchString: PropTypes.func,
  categories: PropTypes.array,
  chosenCategories: PropTypes.array,
  setChosenCategories: PropTypes.func,
}
