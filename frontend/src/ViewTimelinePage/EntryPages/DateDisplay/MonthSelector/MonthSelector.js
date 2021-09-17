import React from 'react'
import PropTypes from 'prop-types'
import { abvMonthNameArray } from '../../../../_shared/monthNameArray'
import { Months } from '../../../../_shared/DateArrays'
import { Wrapper, MonthWrapper } from './MonthSelector.styles'

export const MonthSelector = ({ selectedMonth, changeMonth }) => {
  const isSelected = (month) => selectedMonth === month
  return (
    <>
      <Wrapper>
        {Months.map((month, index) => {
          return (
            <MonthWrapper
              key={index}
              selected={isSelected(month)}
              onClick={changeMonth(month)}
            >
              {abvMonthNameArray[month]}
            </MonthWrapper>
          )
        })}
      </Wrapper>
    </>
  )
}

MonthSelector.propTypes = {
  selectedMonth: PropTypes.number,
  changeMonth: PropTypes.func,
}
