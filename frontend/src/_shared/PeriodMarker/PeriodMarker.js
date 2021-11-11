import React from 'react'
import { Wrapper, PeriodBlock } from './PeriodMarker.styles'
import PropTypes from 'prop-types'

export const PeriodMarker = ({
  periods,
  // , isPeriodEnd, isPeriodStart
}) => {
  // console.log('isPeriodEnd', isPeriodEnd)
  // console.log('isPeriodStart', isPeriodStart)

  return (
    <>
      <Wrapper periods={periods}>
        {periods.map((subArray, index) => {
          return (
            <PeriodBlock
              periods={periods}
              period={subArray}
              isPeriodEnd={false}
              isPeriodStart={false}
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
  isPeriodEnd: PropTypes.array,
  isPeriodStart: PropTypes.array,
}
