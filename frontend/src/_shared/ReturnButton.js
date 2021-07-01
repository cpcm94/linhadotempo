import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { colors } from './colors'

const Wrapper = styled.div`
  margin-right: 10px;
  cursor: pointer;
`

export const ReturnButton = () => {
  const history = useHistory()

  return (
    <Wrapper
      onClick={() => {
        history.goBack()
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 25 25"
        x="0px"
        y="0px"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          color={colors.white}
          fill="currentcolor"
          transform="translate(-22.000000,45.000000) scale(0.100000,-0.100000)"
        >
          <title>Layer 1</title>
          <line
            stroke={colors.white}
            strokeWidth="20"
            strokeLinecap="undefined"
            strokeLinejoin="undefined"
            id="svg_2"
            y2="297.99975"
            x2="576.16685"
            y1="297.99975"
            x1="223.83319"
            fill="none"
          />
          <line
            strokeLinecap="undefined"
            strokeLinejoin="undefined"
            id="svg_3"
            y2="213.06158"
            x2="353.99447"
            y1="298.07179"
            x1="228.97946"
            strokeWidth="20"
            stroke={colors.white}
            fill="none"
          />
          <line
            strokeLinecap="undefined"
            strokeLinejoin="undefined"
            id="svg_5"
            y2="211.06134"
            x2="354.99459"
            y1="296.07155"
            x1="229.97958"
            strokeWidth="20"
            stroke={colors.white}
            fill="none"
          />
          <line
            transform="rotate(70 291.487 343.577)"
            strokeLinecap="undefined"
            strokeLinejoin="undefined"
            id="svg_6"
            y2="301.07215"
            x2="353.99447"
            y1="386.08235"
            x1="228.97946"
            strokeWidth="20"
            stroke={colors.white}
            fill="none"
          />
          <ellipse
            ry="3.00036"
            rx="10.50126"
            id="svg_9"
            cy="298.07179"
            cx="239.48072"
            strokeWidth="20"
            stroke={colors.white}
            fill="none"
          />
        </g>
      </svg>
    </Wrapper>
  )
}
