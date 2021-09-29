import React from 'react'
import PropTypes from 'prop-types'
import {
  CategoryNameWrapper,
  CategoriesListWrapper,
  CategoryWrapper,
  NameWrapper,
} from './CategoriesList.styles'
import { useHistory } from 'react-router'

export const CategoriesList = ({ categories }) => {
  let history = useHistory()
  const navigateToEditCategoryPage = (categoryId) => (e) => {
    e.preventDefault()
    history.push(`/editTimelineCategory/${categoryId}`)
  }
  return (
    <CategoriesListWrapper>
      {categories.map((category) => (
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
