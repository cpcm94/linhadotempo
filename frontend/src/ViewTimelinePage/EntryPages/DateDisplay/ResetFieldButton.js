import React from 'react'
import { XIcon } from '../../../_shared/XIcon'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from '../../../_shared/colors'

const ButtonWrapper = styled.div`
  margin-top: -2px;
  margin-left: 0.75rem;
`

export const ResetFieldButton = ({ resetField }) => {
  return (
    <ButtonWrapper onClick={resetField}>
      <XIcon color={colors.grey} />
    </ButtonWrapper>
  )
}

ResetFieldButton.propTypes = {
  resetField: PropTypes.func,
}
