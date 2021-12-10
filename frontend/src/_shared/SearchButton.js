import React from 'react'
import styled from 'styled-components'
import { colors } from './colors'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
  cursor: pointer;
  min-width: 20px;
`

export const SearchButton = ({ onClick }) => {
  return (
    <Wrapper onClick={onClick}>
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
            d="m42.77551,37.40253l-10.07183,-9.79704c1.35686,-2.17636 2.1526,-4.72254 2.15401,-7.45295c-0.00141,-7.96439 -6.63164,-14.41509 -14.81518,-14.41784c-8.18496,0.00275 -14.81801,6.45345 -14.81801,14.41646c0,7.95889 6.63305,14.40959 14.81801,14.40959c2.80841,0 5.42601,-0.77403 7.66341,-2.09387l10.07466,9.79841l4.99493,-4.86277zm-31.89885,-17.25136c0.00848,-4.92464 4.10308,-8.90615 9.16444,-8.91715c5.05853,0.011 9.15596,3.99251 9.16444,8.91715c-0.00989,4.92189 -4.10591,8.9034 -9.16444,8.9144c-5.06136,-0.011 -9.15596,-3.99251 -9.16444,-8.9144z"
            stroke={colors.white}
            fill={colors.white}
          />
        </g>
      </svg>
    </Wrapper>
  )
}

SearchButton.propTypes = {
  onClick: PropTypes.func,
}
