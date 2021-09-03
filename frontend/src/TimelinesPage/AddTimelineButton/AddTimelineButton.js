import React from 'react'
import { ButtonWrapper } from './AddTimelineButton.styles'
import PropTypes from 'prop-types'

export const AddTimelineButton = ({ onClick }) => {
  return <ButtonWrapper onClick={onClick}>+</ButtonWrapper>
}

AddTimelineButton.propTypes = {
  onClick: PropTypes.func,
}
