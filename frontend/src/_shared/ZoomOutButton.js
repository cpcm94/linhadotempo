import React from 'react'
import styled from 'styled-components'
import { colors } from './colors'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
  cursor: pointer;
  min-width: 20px;
  margin-right: 0.5rem;
  pointer-events: ${({ hide }) => hide && 'none'};
`

export const ZoomOutButton = ({ onClick, hide }) => {
  return (
    <Wrapper onClick={onClick} hide={hide}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Layer_1">
          <title>Layer 1</title>
          <path
            stroke={!hide ? colors.white : colors.lightGrey}
            id="svg_7"
            d="m32.42379,27.39864c1.31333,-2.05149 2.08355,-4.4516 2.08491,-7.02536c-0.00137,-7.50746 -6.41891,-13.58807 -14.33994,-13.59066c-7.9224,0.00259 -14.34268,6.08321 -14.34268,13.58937c0,7.50227 6.42028,13.58289 14.34268,13.58289c2.71832,0 5.25196,-0.72962 7.41759,-1.97374l9.75149,9.23626l4.83607,-4.58379l-9.75012,-9.23496zm-12.25503,1.3763c-4.90037,-0.01037 -8.86225,-3.76345 -8.87046,-8.40296c0.00821,-4.64211 3.97146,-8.39519 8.87046,-8.40555c4.89626,0.01037 8.86225,3.76345 8.87046,8.40555c-0.00958,4.63951 -3.9742,8.39259 -8.87046,8.40296zm-6.61317,-10.99616l0,5.18511l13.22224,-0.0013l0,-5.18252l-13.22224,-0.0013z"
            fill={!hide ? colors.white : colors.lightGrey}
          />
        </g>
      </svg>
    </Wrapper>
  )
}

ZoomOutButton.propTypes = {
  onClick: PropTypes.func,
  hide: PropTypes.bool,
}
