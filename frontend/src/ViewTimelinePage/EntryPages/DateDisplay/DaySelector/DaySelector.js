import React from 'react'
import PropTypes from 'prop-types'
import { Days } from '../../../../_shared/DateArrays'
import { Wrapper, DayWrapper } from './DaySelector.styles'

export const DaySelector = ({ selectedDay, changeDay }) => {
  const isSelected = (day) => selectedDay === day
  return (
    <>
      <Wrapper>
        {Days.map((day, index) => {
          return (
            <DayWrapper
              key={index}
              selected={isSelected(day)}
              onClick={changeDay(day)}
            >
              {day}
            </DayWrapper>
          )
        })}
      </Wrapper>
    </>
  )
}

DaySelector.propTypes = {
  selectedDay: PropTypes.number,
  changeDay: PropTypes.func,
}
