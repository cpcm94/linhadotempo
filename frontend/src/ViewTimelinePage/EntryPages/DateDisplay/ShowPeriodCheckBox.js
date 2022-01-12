import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from '../../../_shared/colors'

const CheckBoxWrapper = styled.div`
  margin: 0 0.25rem 0.25rem 0.5rem;
  border-radius: 5px;
  min-width: 1rem;
  min-height: 1rem;
  max-width: 1rem;
  max-height: 1rem;
  font-size: 0.75rem;
  background-color: ${({ selected }) =>
    selected ? colors.brown : colors.white};
  border: ${({ selected }) =>
    selected ? `1px solid ${colors.brown}` : `1px solid ${colors.lightGrey}`};
  color: ${colors.white};
  font-weight: bold;
  text-align: center;
  font-family: Karla;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
const LabelCheckBoxWrapper = styled.div`
  display: flex;
`

export const ShowPeriodCheckBox = ({ entry, setEntry }) => {
  const onClick = () => {
    const newEntry = { ...entry }
    newEntry.show_period = !entry.show_period
    setEntry(newEntry)
  }
  return (
    <>
      <LabelCheckBoxWrapper>
        {entry.show_period ? (
          <CheckBoxWrapper onClick={onClick} selected={true}>
            &#10003;
          </CheckBoxWrapper>
        ) : (
          <CheckBoxWrapper onClick={onClick} />
        )}
        <label>Mostrar barra temporal do período</label>
      </LabelCheckBoxWrapper>
    </>
  )
}

ShowPeriodCheckBox.propTypes = {
  entry: PropTypes.object,
  setEntry: PropTypes.func,
}
