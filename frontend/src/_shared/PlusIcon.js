import React from 'react'
import { colors } from './colors'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
  cursor: pointer;
  padding: 0 0.25rem;
`

export const PlusIcon = ({ onClick, size }) => {
  return (
    <Wrapper onClick={onClick}>
      <svg
        width={size}
        height={size}
        viewBox="10 10 30 30"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Layer_1">
          <title>Layer 1</title>
          <ellipse
            ry="13.23671"
            rx="13.52657"
            id="svg_1"
            cy="24"
            cx="24"
            stroke={colors.brown}
            fill={colors.brown}
          />
          <path
            id="svg_2"
            d="m15.35266,20.87185l5.71572,0l0,-6.0989l5.86324,0l0,6.0989l5.71572,0l0,6.25631l-5.71572,0l0,6.0989l-5.86324,0l0,-6.0989l-5.71572,0l0,-6.25631z"
            stroke={colors.brown}
            fill={colors.white}
          />
        </g>
      </svg>
    </Wrapper>
  )
}

PlusIcon.propTypes = {
  onClick: PropTypes.func,
  size: PropTypes.string,
}
