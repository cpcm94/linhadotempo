import React from 'react'
import { ButtonWrapper } from './AddUserButton.styles'
import PropTypes from 'prop-types'

export const AddUserButton = ({ onClick }) => {
  return <ButtonWrapper onClick={onClick}>+</ButtonWrapper>
}

AddUserButton.propTypes = {
  onClick: PropTypes.func,
}
