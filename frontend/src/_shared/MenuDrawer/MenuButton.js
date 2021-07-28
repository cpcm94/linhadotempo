import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
  cursor: pointer;
`

export const MenuButton = ({ color, onClick }) => {
  return (
    <Wrapper onClick={onClick}>
      <svg
        height="22"
        width="22"
        x="0px"
        y="0px"
        viewBox="0 0 192 200"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
          color={color}
          stroke="none"
          fill="currentcolor"
        >
          <path
            d="M264 1663 c-12 -2 -32 -15 -45 -29 -22 -23 -24 -34 -24 -126 l0 -100
            33 -29 32 -29 693 0 c641 0 694 2 713 18 36 28 44 57 44 146 0 81 -2 88 -29
            118 l-29 33 -684 1 c-376 1 -693 0 -704 -3z"
          />
          <path
            d="M227 1094 c-32 -32 -41 -74 -35 -165 6 -79 22 -103 77 -120 24 -7
            263 -9 708 -7 l673 3 27 28 c27 27 28 31 28 133 0 106 0 106 -30 130 l-30 24
            -696 0 -696 0 -26 -26z"
          />
          <path
            d="M239 557 c-40 -27 -53 -72 -46 -171 4 -63 8 -73 36 -98 l31 -28 695
            0 694 0 28 24 c26 23 28 30 31 113 4 104 -6 136 -50 163 -32 19 -51 20 -709
            20 l-676 0 -34 -23z"
          />
        </g>
      </svg>
    </Wrapper>
  )
}

MenuButton.propTypes = {
  onClick: PropTypes.func,
  color: PropTypes.string,
}
