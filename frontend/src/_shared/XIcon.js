import React from 'react'
import { colors } from './colors'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
  cursor: pointer;
`

export const XIcon = ({ onClick, color }) => {
  return (
    <Wrapper onClick={onClick}>
      <svg
        width="30"
        height="30"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            id="svg_1"
            d="m9.57692,17.06594l6.99372,-6.52747l7.42932,6.93398l7.42932,-6.93398l6.99379,6.52747l-7.42932,6.93403l7.42932,6.93403l-6.99379,6.52754l-7.42932,-6.93404l-7.42932,6.93404l-6.99372,-6.52754l7.42926,-6.93403l-7.42926,-6.93403z"
            stroke={color ? color : colors.lightGrey}
            fill={color ? color : colors.lightGrey}
          />
        </g>
      </svg>
    </Wrapper>
  )
}

XIcon.propTypes = {
  onClick: PropTypes.func,
  color: PropTypes.string,
}
