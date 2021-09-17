import React from 'react'
import { ButtonWrapper } from './AddBookButton.styles'
import PropTypes from 'prop-types'

export const AddBookButton = ({ onClick }) => {
  return <ButtonWrapper onClick={onClick}>+</ButtonWrapper>
}

AddBookButton.propTypes = {
  onClick: PropTypes.func,
}
