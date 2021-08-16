import React from 'react'
import PropTypes from 'prop-types'
import { monthNameArray } from '../../../_shared/monthNameArray'
import { Months } from '../DateArrays'
import {
  MonthTitle,
  Wrapper,
  MonthWrapper,
  XIconWrapper,
} from './MonthSelector.styles'
import { XIcon } from '../../../_shared/XIcon'

export const MonthSelector = ({ selectedMonth, changeMonth, resetMonth }) => {
  const isSelected = (month) => selectedMonth === month
  return (
    <>
      <MonthTitle>
        <span>Mês</span>
        <XIconWrapper>
          <XIcon onClick={resetMonth('month')} />
        </XIconWrapper>
      </MonthTitle>
      <Wrapper>
        {Months.map((month, index) => {
          return (
            <MonthWrapper
              key={index}
              selected={isSelected(month)}
              onClick={changeMonth(month)}
            >
              {monthNameArray[month]}
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
  resetMonth: PropTypes.func,
}
