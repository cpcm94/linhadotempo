import React from 'react'
import styled from 'styled-components'
import { colors } from './colors'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
  cursor: pointer;
  min-width: 20px;
  pointer-events: ${({ hide }) => hide && 'none'};
`

export const ZoomInButton = ({ onClick, hide }) => {
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
            id="svg_6"
            d="m31.81921,27.43297c1.21907,-2.07222 1.93401,-4.49657 1.93528,-7.09633c-0.00127,-7.58329 -5.95822,-13.72532 -13.31076,-13.72794c-7.35381,0.00262 -13.3133,6.14465 -13.3133,13.72663c0,7.57805 5.95949,13.72009 13.3133,13.72009c2.52323,0 4.87502,-0.73699 6.88523,-1.99367l9.05162,9.32956l4.48898,-4.63009l-9.05035,-9.32825zm-11.37548,1.3902c-4.54867,-0.01047 -8.22621,-3.80146 -8.23383,-8.48784c0.00762,-4.68899 3.68643,-8.47999 8.23383,-8.49046c4.54486,0.01047 8.22621,3.80146 8.23383,8.49046c-0.00889,4.68638 -3.68897,8.47737 -8.23383,8.48784zm2.53847,-14.81576l-5.07947,0l0,3.70852l-3.59754,0l0,5.23748l3.59754,0l0,3.70852l5.07947,0l0,-3.70983l3.59627,0l0,-5.23487l-3.59754,0l0,-3.70983l0.00127,0z"
            stroke={!hide ? colors.white : colors.lightGrey}
            fill={!hide ? colors.white : colors.lightGrey}
          />
        </g>
      </svg>
    </Wrapper>
  )
}

ZoomInButton.propTypes = {
  onClick: PropTypes.func,
  hide: PropTypes.bool,
}
