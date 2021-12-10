import React from 'react'
import { CategoryFilterSelect } from '../../../../_shared/CategoryFilterSelect/CategoryFilterSelect'
import {
  Category,
  FilteringCategories,
  SearchBar,
  TextAndCategoriesWrapper,
} from './EntrySearchBar.styles'
import PropTypes from 'prop-types'

export const EntrySearchBar = ({
  categories,
  chosenCategories,
  setChosenCategories,
  entrySearchString,
  setEntrySearchString,
}) => {
  const handleChange = (e) => {
    setEntrySearchString(e.target.value)
  }
  return (
    <>
      <TextAndCategoriesWrapper>
        <SearchBar
          type="text"
          value={entrySearchString}
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
    </>
  )
}

EntrySearchBar.propTypes = {
  categories: PropTypes.array,
  chosenCategories: PropTypes.array,
  setChosenCategories: PropTypes.func,
  entrySearchString: PropTypes.string,
  setEntrySearchString: PropTypes.func,
}
