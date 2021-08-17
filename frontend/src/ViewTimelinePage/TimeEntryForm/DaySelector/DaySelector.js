import React from 'react'
import PropTypes from 'prop-types'
import { Days } from '../../../_shared/DateArrays'
import { Wrapper, DayWrapper } from './DaySelector.styles'
import { SectionTitle } from '../SectionTitle/SectionTitle'

export const DaySelector = ({ selectedDay, changeDay, resetDay }) => {
  const isSelected = (day) => selectedDay === day
  return (
    <>
      <SectionTitle title={'Dia'} resetSection={resetDay('day')} />
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
