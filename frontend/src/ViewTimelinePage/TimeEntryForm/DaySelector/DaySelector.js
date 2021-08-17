import React from 'react'
import PropTypes from 'prop-types'
import { Days } from '../../../_shared/DateArrays'
import {
  DayTitle,
  Wrapper,
  DayWrapper,
  XIconWrapper,
} from './DaySelector.styles'
import { XIcon } from '../../../_shared/XIcon'

export const DaySelector = ({ selectedDay, changeDay, resetDay }) => {
  const isSelected = (day) => selectedDay === day
  return (
    <>
      <DayTitle>
        <span>Dia</span>
        <XIconWrapper>
          <XIcon onClick={resetDay('day')} />
        </XIconWrapper>
      </DayTitle>
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
  resetDay: PropTypes.func,
}
