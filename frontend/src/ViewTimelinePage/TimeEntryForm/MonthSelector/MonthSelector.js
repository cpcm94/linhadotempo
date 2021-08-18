import React from 'react'
import PropTypes from 'prop-types'
import { abvMonthNameArray } from '../../../_shared/monthNameArray'
import { Months } from '../../../_shared/DateArrays'
import { Wrapper, MonthWrapper } from './MonthSelector.styles'
import { SectionTitle } from '../SectionTitle/SectionTitle'

export const MonthSelector = ({ selectedMonth, changeMonth, resetMonth }) => {
  const isSelected = (month) => selectedMonth === month
  return (
    <>
      <SectionTitle title={'Mês'} resetSection={resetMonth('month')} />
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
  resetMonth: PropTypes.func,
}
