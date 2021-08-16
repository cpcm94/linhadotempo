import React from 'react'
import PropTypes from 'prop-types'
import {
  YearAndRadiosWrapper,
  StyledYearTextField,
  YearTitle,
  XIconWrapper,
  YearFieldAndButtons,
} from './YearField.styles'
import { YearOptionSelect } from '../YearOptionSelect'
import { XIcon } from '../../../_shared/XIcon'
import { PlusIcon } from '../../../_shared/PlusIcon'
import { MinusIcon } from '../../../_shared/MinusIcon'

export const YearField = ({
  year,
  changeYear,
  resetYear,
  radioValue,
  setRadioValue,
  setYear,
}) => {
  const incrementByOne = (year) => {
    const newYear = parseInt(year) + 1
    const stringNewYear = newYear.toString()
    setYear(stringNewYear)
  }
  const decreaseByOne = (year) => {
    if (parseInt(year) === 0) return
    const newYear = parseInt(year) - 1
    const stringNewYear = newYear.toString()
    setYear(stringNewYear)
  }

  return (
    <>
      <YearTitle>
        <span>Ano</span>
        <XIconWrapper>
          <XIcon onClick={resetYear('year')} />
        </XIconWrapper>
      </YearTitle>
      <YearAndRadiosWrapper>
        <YearFieldAndButtons>
          <MinusIcon onClick={() => decreaseByOne(year)} />
          <StyledYearTextField
            type="number"
            id="entryYear"
            variant="outlined"
            label="Ano"
            value={year}
            onChange={changeYear('year')}
          />
          <PlusIcon onClick={() => incrementByOne(year)} />
        </YearFieldAndButtons>

        <YearOptionSelect
          setRadioValue={setRadioValue}
          radioValue={radioValue}
        />
      </YearAndRadiosWrapper>
    </>
  )
}

YearField.propTypes = {
  year: PropTypes.string,
  changeYear: PropTypes.func,
  resetYear: PropTypes.func,
  radioValue: PropTypes.string,
  setRadioValue: PropTypes.func,
  setYear: PropTypes.func,
}
