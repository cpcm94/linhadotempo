import React from 'react'
import PropTypes from 'prop-types'
import {
  CategoryNameWrapper,
  CategoriesListWrapper,
  CategoryWrapper,
  NameWrapper,
} from './CategoriesList.styles'
import { useHistory } from 'react-router'
import { sortArrayAlphabeticallyByProp } from '../../_shared/sortArrayAlphabeticallyByProp'

export const CategoriesList = ({ categories }) => {
  let history = useHistory()
  const navigateToEditCategoryPage = (categoryId) => (e) => {
    e.preventDefault()
    history.push(`/editTimeEntryCategory/${categoryId}`)
  }
  const sortedBooksAlphabetically = sortArrayAlphabeticallyByProp(
    'name',
    categories
  )

  return (
    <CategoriesListWrapper>
      {sortedBooksAlphabetically.map((category) => (
        <CategoryWrapper
          key={category.id}
          onClick={navigateToEditCategoryPage(category.id)}
        >
          <NameWrapper>
            <CategoryNameWrapper>{category.name}</CategoryNameWrapper>
          </NameWrapper>
        </CategoryWrapper>
      ))}
    </CategoriesListWrapper>
  )
}

CategoriesList.propTypes = {
  categories: PropTypes.array,
}
