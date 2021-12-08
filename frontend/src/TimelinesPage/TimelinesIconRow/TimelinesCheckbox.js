import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from '../../_shared/colors'

const CheckBoxWrapper = styled.div`
  margin: 0 0.25rem 0 1.25rem;
  border-radius: 5px;
  min-width: 1rem;
  min-height: 1rem;
  max-width: 1rem;
  max-height: 1rem;
  font-size: 0.75rem;
  background-color: ${({ selected }) =>
    selected ? colors.brown : colors.white};
  color: ${colors.white};
  font-weight: bold;
  text-align: center;
  font-family: Karla;
  display: flex;
  justify-content: center;
  align-self: center;
  cursor: pointer;
`
const NumberBoxWrapper = styled.div`
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
  timelines,
  selectedTimelines,
  setSelectedTimelines,
}) => {
  const countOfSelectedTimelines = selectedTimelines.length
  const handleCheckboxClick = () => {
    if (countOfSelectedTimelines) {
      setSelectedTimelines([])
    } else {
      setSelectedTimelines(timelines)
    }
  }
  return (
    <>
      {selectedTimelines.length ? (
        <>
          <CheckBoxWrapper selected={true} onClick={handleCheckboxClick}>
            &#10003;
          </CheckBoxWrapper>
          <NumberBoxWrapper>{countOfSelectedTimelines}</NumberBoxWrapper>
        </>
      ) : (
        <>
          <CheckBoxWrapper onClick={handleCheckboxClick} />
          <NumberBoxWrapper>{countOfSelectedTimelines}</NumberBoxWrapper>
        </>
      )}
    </>
  )
}

TimelinesCheckbox.propTypes = {
  selectedTimelines: PropTypes.array,
  timelines: PropTypes.array,
  setSelectedTimelines: PropTypes.func,
}
