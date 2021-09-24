import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from '../../_shared/colors'

const CheckBoxWrapper = styled.div`
  margin: 0 0.25rem 0.25rem 1.25rem;
  border-radius: 5px;
  min-width: 1.25rem;
  min-height: 1.25rem;
  max-width: 1.25rem;
  max-height: 1.25rem;
  font-size: 0.75rem;
  background-color: ${({ selected }) =>
    selected ? colors.brown : colors.white};
  color: ${colors.white};
  font-weight: bold;
  text-align: center;
  font-family: Karla;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
const NumberBoxWrapper = styled.div`
  margin: 0 0 0.25rem 0;
  border-radius: 5px;
  min-width: 1.25rem;
  min-height: 1.25rem;
  max-width: 1.25rem;
  max-height: 1.25rem;
  font-size: 0.75rem;
  background-color: ${colors.brown};
  color: ${colors.white};
  font-weight: bold;
  text-align: center;
  font-family: Karla;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

export const TimelinesCheckbox = ({
  selectedTimelines,
  setSelectedTimelines,
}) => {
  const countOfSelectedTimelines = selectedTimelines.length
  console.log('countOfSelectedTimelines', countOfSelectedTimelines)
  return (
    <>
      {selectedTimelines.length ? (
        <>
          <CheckBoxWrapper
            selected={true}
            onClick={() => setSelectedTimelines([])}
          >
            &#10003;
          </CheckBoxWrapper>
          <NumberBoxWrapper>{countOfSelectedTimelines}</NumberBoxWrapper>
        </>
      ) : (
        <>
          <CheckBoxWrapper />
          <NumberBoxWrapper>{countOfSelectedTimelines}</NumberBoxWrapper>
        </>
      )}
    </>
  )
}

TimelinesCheckbox.propTypes = {
  selectedTimelines: PropTypes.array,
  setSelectedTimelines: PropTypes.func,
}
