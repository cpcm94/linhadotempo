import React from 'react'
import styled from 'styled-components'
import { colors } from '../_shared/colors'
import PropTypes from 'prop-types'

const CreateTimelineButtonWrapper = styled.div`
  border: solid 1px ${colors.white};
  color: ${colors.white};
  border-radius: 7px;
  margin-left: 0.5rem;
  cursor: pointer;
  padding: 0 0.4rem;
`
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const CreateTimelineButton = ({ onClick }) => {
  return (
    <Wrapper>
      <CreateTimelineButtonWrapper onClick={onClick}>
        Salvar
      </CreateTimelineButtonWrapper>
    </Wrapper>
  )
}

CreateTimelineButton.propTypes = {
  onClick: PropTypes.func,
}
