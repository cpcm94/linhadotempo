import React from 'react'
import { Wrapper, PeriodBlock } from './PeriodMarker.styles'
import PropTypes from 'prop-types'

export const PeriodMarker = ({ periods, entryDate }) => {
  const isPeriodStart = (period) => {
    if (entryDate) {
      return (
        period[0].year === entryDate.year &&
        period[0].month === entryDate.month &&
        period[0].day === entryDate.day
      )
    }
  }
  const isPeriodEnd = (period) => {
    if (entryDate) {
      return (
        period[1].year === entryDate.year &&
        period[1].month === entryDate.month &&
        period[1].day === entryDate.day
      )
    }
  }
  return (
    <>
      <Wrapper periods={periods}>
        {periods.map((subArray, index) => {
          return (
            <PeriodBlock
              periods={periods}
              period={subArray}
              isPeriodStart={isPeriodStart(subArray)}
              isPeriodEnd={isPeriodEnd(subArray)}
              key={index}
            />
          )
        })}
      </Wrapper>
    </>
  )
}
PeriodMarker.propTypes = {
  periods: PropTypes.array,
  entryDate: PropTypes.object,
}
