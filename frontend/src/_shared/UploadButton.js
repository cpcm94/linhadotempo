import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
  padding-left: 5px;
  cursor: pointer;
  @media (max-width: 375px) {
    display: none;
  }
`
const MobileWrapper = styled.div`
  padding-left: 5px;
  cursor: pointer;
  @media (min-width: 376px) {
    display: none;
  }
`
const UploadButtonBuilder = (size, color) => (
  <svg
    height={size}
    width={size}
    x="0px"
    y="0px"
    viewBox="0 0 676 647"
    preserveAspectRatio="xMidYMid meet"
  >
    <g
      transform="translate(0.000000,676.000000) scale(0.100000,-0.100000)"
      color={color}
      stroke="none"
      fill="currentcolor"
    >
      <path
        d="M3215 6341 c-53 -25 -146 -115 -766 -737 -792 -794 -744 -737 -744
    -889 0 -102 23 -164 87 -231 69 -73 145 -106 248 -106 144 0 141 -2 586 443
    l389 389 5 -1612 5 -1613 22 -47 c31 -69 99 -137 168 -169 51 -25 72 -29 145
    -29 73 0 94 4 145 29 69 32 137 100 168 169 l22 47 5 1613 5 1612 389 -389
    c445 -445 442 -443 586 -443 103 0 179 33 248 106 64 67 87 129 87 231 0 152
    48 95 -744 889 -802 804 -756 766 -911 766 -73 0 -93 -4 -145 -29z"
      />
      <path
        d="M575 2381 c-69 -32 -137 -100 -168 -169 -22 -47 -22 -53 -22 -657 0
    -560 2 -617 19 -690 85 -366 360 -652 718 -748 l83 -22 2155 0 2155 0 83 22
    c358 96 633 382 718 748 17 73 19 130 19 690 0 604 0 610 -22 657 -31 69 -99
    137 -168 169 -51 25 -72 29 -145 29 -73 0 -94 -4 -145 -29 -69 -32 -137 -100
    -168 -169 -22 -46 -22 -59 -27 -627 l-5 -580 -23 -46 c-53 -107 -137 -170
    -252 -188 -90 -15 -3950 -15 -4040 0 -115 18 -199 81 -252 188 l-23 46 -5 580
    c-5 568 -5 581 -27 627 -31 69 -99 137 -168 169 -51 25 -72 29 -145 29 -73 0
    -94 -4 -145 -29z"
      />
    </g>
  </svg>
)

export const UploadButton = ({ color, onClick }) => {
  return (
    <>
      <Wrapper onClick={onClick}>{UploadButtonBuilder('20', color)}</Wrapper>
      <MobileWrapper onClick={onClick}>
        {UploadButtonBuilder('17', color)}
      </MobileWrapper>
    </>
  )
}

UploadButton.propTypes = {
  onClick: PropTypes.func,
  color: PropTypes.string,
}
