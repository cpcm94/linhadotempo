import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { colors } from './colors'
import PropTypes from 'prop-types'

const IconWrapper = styled.div`
  margin: 0 0.25rem 0.25rem 1.25rem;
  background-color: ${({ selected }) =>
    selected ? colors.brown : colors.white};
  border: solid 1px #999;
  color: ${({ selected }) => (selected ? colors.white : colors.black)};
  border-radius: 5px;
  min-width: 1.75rem;
  min-height: 1.75rem;
  width: 1.75rem;
  height: 1.75rem;
  font-size: 1rem;
  text-align: center;
  font-family: Karla;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
const Wrapper = styled.div`
  display: flex;
  margin: 0rem 0 1rem -1rem;
`

export const YearOptionSelect = ({ setRadioValue, radioValue }) => {
  const checkRadioValueIsDC = radioValue === 'DC' ? true : false
  const [isDC, setIsDC] = useState(checkRadioValueIsDC)
  const newRadioValue = isDC ? 'DC' : 'AC'

  const handleClick = (e) => {
    e.preventDefault()
    setIsDC(!isDC)
  }
  useEffect(() => {
    setRadioValue(newRadioValue)
  }, [newRadioValue, setRadioValue])

  return (
    <Wrapper>
      <IconWrapper onClick={handleClick} selected={!isDC}>
        a.c.
      </IconWrapper>
      <IconWrapper onClick={handleClick} selected={isDC}>
        d.c.
      </IconWrapper>
    </Wrapper>
  )
}

YearOptionSelect.propTypes = {
  setRadioValue: PropTypes.func,
  radioValue: PropTypes.string,
}
