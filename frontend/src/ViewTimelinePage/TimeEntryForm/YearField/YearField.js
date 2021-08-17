import React from 'react'
import PropTypes from 'prop-types'
import {
  YearAndRadiosWrapper,
  StyledYearTextField,
  YearFieldAndButtons,
} from './YearField.styles'
import { YearOptionSelect } from '../../../_shared/YearOptionSelect'
import { PlusIcon } from '../../../_shared/PlusIcon'
import { MinusIcon } from '../../../_shared/MinusIcon'
import { SectionTitle } from '../SectionTitle/SectionTitle'

export const YearField = ({
  year,
  changeYear,
  resetYear,
  radioValue,
  setRadioValue,
  setYear,
}) => {
  const incrementByOne = (year) => {
    if (year === '') {
      return setYear('1')
    }
    const newYear = parseInt(year) + 1
    const stringNewYear = newYear.toString()
    setYear(stringNewYear)
  }
  const decreaseByOne = (year) => {
    if (parseInt(year) === 0) return
    if (year === '') {
      return setYear('0')
    }
    const newYear = parseInt(year) - 1
    const stringNewYear = newYear.toString()
    setYear(stringNewYear)
  }

  return (
    <>
      <SectionTitle title={'Ano'} resetSection={resetYear('year')} />
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
