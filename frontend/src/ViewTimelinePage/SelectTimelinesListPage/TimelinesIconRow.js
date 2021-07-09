import styled from 'styled-components'
import React from 'react'
import PropTypes from 'prop-types'
import { colors } from '../../_shared/colors'

const IconWrapper = styled.div`
  margin: 0 5px 0 0;
  background-color: ${colors.white};
  border: solid 1px #999;
  color: #655;
  border-radius: 2px;
  min-width: 0.8rem;
  min-height: 0.8rem;
  width: 0.8rem;
  height: 0.8rem;
  font-size: 0.8rem;
  text-align: center;
  font-family: Karla;
  display: flex;
  justify-content: center;
  align-items: center;
`

const IconsRow = styled.div`
  display: flex;
  justify-content: flex-start;
`

export const TimelinesIconRow = ({ timelines }) => {
  return (
    <IconsRow>
      {timelines.map((timeline, index) => (
        <IconWrapper key={index}>{timeline.id}</IconWrapper>
      ))}
    </IconsRow>
  )
}

TimelinesIconRow.propTypes = {
  timelines: PropTypes.array,
}
