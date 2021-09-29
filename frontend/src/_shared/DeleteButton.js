import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Icon } from '@iconify/react'
import trashIcon from '@iconify-icons/ion/trash'
import { colors } from './colors'

const Wrapper = styled.div`
  cursor: pointer;
`

export const DeleteButton = ({ onClick, color }) => {
  return (
    <Wrapper id="deleteButton" onClick={onClick}>
      <Icon icon={trashIcon} color={color ? color : colors.grey} height="30" />
    </Wrapper>
  )
}

DeleteButton.propTypes = {
  onClick: PropTypes.func,
  color: PropTypes.string,
}
