import React from 'react'
import styled from 'styled-components'
import { colors } from './colors'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
  cursor: pointer;
  min-width: 20px;
  pointer-events: ${({ hide }) => hide && 'none'};
`

export const RightArrowButton = ({ onClick, hide }) => {
  return (
    <Wrapper onClick={onClick} hide={hide}>
      {!hide && (
        <svg
          width="20"
          height="20"
          viewBox="8 12 30 30"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Layer_1">
            <title>Layer 1</title>
            <path
              transform="rotate(90 24 24)"
              id="svg_6"
              d="m15.08911,30.83168l8.91089,-13.66337l8.91089,13.66337l-17.82178,0z"
              stroke={colors.brown}
              fill={colors.brown}
            />
          </g>
        </svg>
      )}
    </Wrapper>
  )
}

RightArrowButton.propTypes = {
  onClick: PropTypes.func,
  hide: PropTypes.bool,
}
