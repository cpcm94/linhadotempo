import styled from 'styled-components'
import React from 'react'
import PropTypes from 'prop-types'
import { colors } from '../../_shared/colors'
import { Link } from 'react-scroll'

const IconWrapper = styled.div`
  margin: 0 0.25rem 0.25rem 0.25rem;
  background-color: ${colors.white};
  border: solid 1px #999;
  color: #655;
  border-radius: 2px;
  min-width: 1rem;
  min-height: 1rem;
  width: 1rem;
  height: 1rem;
  font-size: 1rem;
  text-align: center;
  font-family: Karla;
  display: flex;
  justify-content: center;
  align-items: center;
`

const IconsRow = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`

export const TimelinesIconRow = ({ timelines }) => {
  return (
    <IconsRow>
      {timelines.map((timeline, index) => (
        <Link
          key={index}
          to={timeline.id}
          smooth={true}
          duration={500}
          offset={-50}
        >
          <IconWrapper>{timeline.id}</IconWrapper>
        </Link>
      ))}
    </IconsRow>
  )
}

TimelinesIconRow.propTypes = {
  timelines: PropTypes.array,
}
