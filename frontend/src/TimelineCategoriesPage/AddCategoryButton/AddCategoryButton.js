import React from 'react'
import { ButtonWrapper } from './AddCategoryButton.styles'
import PropTypes from 'prop-types'

export const AddCategoryButton = ({ onClick }) => {
  return <ButtonWrapper onClick={onClick}>+</ButtonWrapper>
}

AddCategoryButton.propTypes = {
  onClick: PropTypes.func,
}
