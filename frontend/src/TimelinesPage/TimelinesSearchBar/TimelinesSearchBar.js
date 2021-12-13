import React from 'react'
import PropTypes from 'prop-types'
import {
  Wrapper,
  SearchBar,
  FilteringCategories,
  Category,
  TextAndCategoriesWrapper,
} from './TimelinesSearchBar.styles'
import { TimelinesCheckbox } from './TimelinesCheckbox'
import { CategoryFilterSelect } from '../../_shared/CategoryFilterSelect/CategoryFilterSelect'

export const TimelinesSearchBar = ({
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

TimelinesSearchBar.propTypes = {
  timelines: PropTypes.array,
  selectedTimelines: PropTypes.array,
  setSelectedTimelines: PropTypes.func,
  timelineSearchString: PropTypes.string,
  setTimelineSearchString: PropTypes.func,
  categories: PropTypes.array,
  chosenCategories: PropTypes.array,
  setChosenCategories: PropTypes.func,
}
