import React from 'react'
import PropTypes from 'prop-types'
import {
  YearAndRadiosWrapper,
  StyledYearTextField,
  YearFieldAndButtons,
  StyledButton,
} from './YearField.styles'
import { YearOptionSelect } from '../../../../_shared/YearOptionSelect'
import { PlusIcon } from '../../../../_shared/PlusIcon'
import { MinusIcon } from '../../../../_shared/MinusIcon'

export const YearField = ({
  year,
  changeYear,
  radioValue,
  setRadioValue,
  setYear,
  displayDatePicker,
}) => {
  const incrementByNumber = (year, number) => {
    if (year === '') {
      return setYear(number.toString())
    }
    const newYear = parseInt(year) + number
    const stringNewYear = newYear.toString()
    setYear(stringNewYear)
  }
  const decreaseByNumber = (year, number) => {
    if (parseInt(year) === 0) return
    if (year === '') {
      return setYear('0')
    }
    const newYear = parseInt(year) - number
    const nonNegativeNewYear = newYear < 0 ? 0 : newYear
    const stringNewYear = nonNegativeNewYear.toString()
    setYear(stringNewYear)
  }

  return (
    <>
      <YearAndRadiosWrapper>
        <YearFieldAndButtons>
          <MinusIcon size={'30'} onClick={() => decreaseByNumber(year, 100)} />
          <MinusIcon size={'25'} onClick={() => decreaseByNumber(year, 10)} />
          <MinusIcon size={'20'} onClick={() => decreaseByNumber(year, 1)} />
          <StyledYearTextField
            type="number"
            id="entryYear"
            variant="outlined"
            label="Ano"
            value={year}
            onChange={changeYear('year')}
          />
          <PlusIcon size={'20'} onClick={() => incrementByNumber(year, 1)} />
          <PlusIcon size={'25'} onClick={() => incrementByNumber(year, 10)} />
          <PlusIcon size={'30'} onClick={() => incrementByNumber(year, 100)} />
        </YearFieldAndButtons>

        <YearOptionSelect
          setRadioValue={setRadioValue}
          radioValue={radioValue}
        />
        <StyledButton onClick={displayDatePicker} variant="contained">
          Ok
        </StyledButton>
      </YearAndRadiosWrapper>
    </>
  )
}

YearField.propTypes = {
  year: PropTypes.string,
  changeYear: PropTypes.func,
  radioValue: PropTypes.string,
  setRadioValue: PropTypes.func,
  displayDatePicker: PropTypes.func,
  setYear: PropTypes.func,
}
