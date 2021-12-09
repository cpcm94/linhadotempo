import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal } from '@material-ui/core'
import {
  Button,
  CategoriesWrapper,
  CategoryName,
  ResetButton,
  StyledBox,
  ResetButtonWrapper,
} from './CategoryFilterSelect.styles'

export const CategoryFilterSelect = ({
  categories,
  chosenCategories,
  setChosenCategories,
}) => {
  const [displaySelect, setDisplaySelect] = useState(false)
  const arraySelectedCategoriesId = chosenCategories.map(
    (category) => category.id
  )
  const handleClose = () => {
    setDisplaySelect(false)
  }

  const toggleCategory = (_, category) => {
    if (arraySelectedCategoriesId.includes(category.id)) {
      setChosenCategories(
        chosenCategories.filter(
          (categoryItem) => categoryItem.id !== category.id
        )
      )
      handleClose()
    } else {
      setChosenCategories([...chosenCategories, category])
      handleClose()
    }
  }

  const resetFilter = () => {
    setChosenCategories([])
    handleClose()
  }

  return (
    <>
      <Button
        onClick={() => setDisplaySelect(true)}
        chosenCategories={chosenCategories}
      >
        &#9660;
      </Button>
      {displaySelect && (
        <Modal open={displaySelect} onClose={handleClose}>
          <StyledBox>
            <CategoriesWrapper>
              {categories.map((category) => {
                const onCategoryClick = (event) =>
                  toggleCategory(event, category)
                return (
                  <CategoryName
                    key={category.id}
                    bgColor={category.color}
                    onClick={onCategoryClick}
                  >
                    {category.name}
                  </CategoryName>
                )
              })}
            </CategoriesWrapper>
            <ResetButtonWrapper>
              <ResetButton onClick={resetFilter}>Limpar filtro</ResetButton>
            </ResetButtonWrapper>
          </StyledBox>
        </Modal>
      )}
    </>
  )
}

CategoryFilterSelect.propTypes = {
  categories: PropTypes.array,
  chosenCategories: PropTypes.array,
  setChosenCategories: PropTypes.func,
}
