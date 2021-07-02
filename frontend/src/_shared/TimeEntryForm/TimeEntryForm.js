import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper, StyledTextField, StyledButton } from './TimeEntryForm.styles'
import { colors } from '../colors'
import MenuItem from '@material-ui/core/MenuItem'
import { Months, Days } from './DateArrays'

export const TimeEntryForm = ({
  timeEntryName,
  setTimeEntryName,
  timeEntryYear,
  setTimeEntryYear,
  timeEntryMonth,
  setTimeEntryMonth,
  timeEntryDay,
  setTimeEntryDay,
  loading,
  onClick,
}) => {
  const handleNameChange = (e) => {
    setTimeEntryName(e.target.value)
  }
  const handleYearChange = (e) => {
    setTimeEntryYear(e.target.value)
  }
  const handleMonthChange = (e) => {
    setTimeEntryMonth(e.target.value)
  }
  const handleDayChange = (e) => {
    setTimeEntryDay(e.target.value)
  }
  return (
    <>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <>
          <Wrapper>
            <StyledTextField
              type="text"
              id="entryName"
              variant="outlined"
              label="Nome"
              color={colors.brown}
              value={timeEntryName}
              onChange={handleNameChange}
            />
            <StyledTextField
              type="text"
              id="entryYear"
              variant="outlined"
              label="Ano"
              color={colors.brown}
              value={timeEntryYear}
              onChange={handleYearChange}
            />
            <StyledTextField
              select
              id="entryMonth"
              variant="outlined"
              label="Mês"
              color={colors.brown}
              value={timeEntryMonth}
              onChange={handleMonthChange}
            >
              {Months.map((month, index) => (
                <MenuItem key={index} value={month}>
                  {month}
                </MenuItem>
              ))}
            </StyledTextField>
            <StyledTextField
              select
              id="entryDay"
              variant="outlined"
              label="Dia"
              color={colors.brown}
              value={timeEntryDay}
              onChange={handleDayChange}
            >
              {Days.map((day, index) => (
                <MenuItem key={index} value={day}>
                  {day}
                </MenuItem>
              ))}
            </StyledTextField>
            <StyledButton variant="contained" onClick={onClick}>
              Criar Acontecimento
            </StyledButton>
          </Wrapper>
        </>
      )}
    </>
  )
}

TimeEntryForm.propTypes = {
  timeEntryName: PropTypes.string,
  setTimeEntryName: PropTypes.func,
  timeEntryYear: PropTypes.number,
  setTimeEntryYear: PropTypes.func,
  timeEntryMonth: PropTypes.number,
  setTimeEntryMonth: PropTypes.func,
  timeEntryDay: PropTypes.number,
  setTimeEntryDay: PropTypes.func,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
}
