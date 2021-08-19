import React from 'react'
import { XIcon } from '../../_shared/XIcon'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ButtonWrapper = styled.div`
  margin-top: -2px;
  margin-left: 0.75rem;
`

export const ResetFieldButton = ({ resetField }) => {
  return (
    <ButtonWrapper onClick={resetField}>
      <XIcon />
    </ButtonWrapper>
  )
}

ResetFieldButton.propTypes = {
  resetField: PropTypes.func,
}
