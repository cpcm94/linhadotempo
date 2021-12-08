import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal } from '@material-ui/core'
import { Button, CategoryName, StyledBox } from './CategoryFilterSelect.styles'

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

  return (
    <>
      <Button onClick={() => setDisplaySelect(true)}>&#9660;</Button>
      {displaySelect && (
        <Modal open={displaySelect} onClose={handleClose}>
          <StyledBox>
            {categories.map((category) => {
              const onCategoryClick = (event) => toggleCategory(event, category)
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
