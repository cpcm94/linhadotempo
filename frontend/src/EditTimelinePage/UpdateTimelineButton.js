import React from 'react'
import styled from 'styled-components'
import { colors } from '../_shared/colors'
import PropTypes from 'prop-types'

const UpdateTimelineButtonWrapper = styled.div`
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
  width: 100vw;
`

export const UpdateTimelineButton = ({ onClick }) => {
  return (
    <Wrapper>
      <UpdateTimelineButtonWrapper onClick={onClick}>
        Salvar alterações na linha do tempo
      </UpdateTimelineButtonWrapper>
    </Wrapper>
  )
}

UpdateTimelineButton.propTypes = {
  onClick: PropTypes.func,
}
