import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
  cursor: pointer;
`

export const EllipsisButton = ({ color, onClick }) => {
  return (
    <Wrapper onClick={onClick}>
      <svg
        height="32"
        width="32"
        x="0px"
        y="0px"
        viewBox="0 0 200 200"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
          color={color}
          stroke="none"
          fill="currentcolor"
        >
          <path
            d="M890 1592 c-103 -51 -108 -201 -8 -262 72 -44 173 -15 210 60 65 130
-72 267 -202 202z"
          />
          <path
            d="M890 1092 c-75 -37 -104 -138 -60 -210 61 -100 211 -95 262 8 65 130
-72 267 -202 202z"
          />
          <path
            d="M890 592 c-19 -9 -45 -33 -58 -52 -20 -29 -23 -44 -20 -93 4 -51 9
-63 41 -94 31 -32 43 -37 94 -41 49 -3 64 0 93 20 48 32 72 82 67 139 -9 109
-119 171 -217 121z"
          />
        </g>
      </svg>
    </Wrapper>
  )
}

EllipsisButton.propTypes = {
  onClick: PropTypes.func,
  color: PropTypes.string,
}
