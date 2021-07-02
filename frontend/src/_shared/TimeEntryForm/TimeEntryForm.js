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
  timelines,
  setTimeline,
  loading,
  onClick,
}) => {
  const handleChange = (setNewValue) => (e) => {
    setNewValue(e.target.value)
  }
  return (
    <>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <>
          <Wrapper>
            <StyledTextField
              select
              id="timeline_id"
              variant="outlined"
              label="Linha do tempo"
              color={colors.brown}
              value={timelines}
              onChange={handleChange(setTimeline)}
            >
              {timelines.map((timeline) => (
                <MenuItem key={timeline.id} value={timeline.id}>
                  {timeline.name}
                </MenuItem>
              ))}
            </StyledTextField>
            <StyledTextField
              type="text"
              id="entryName"
              variant="outlined"
              label="Nome"
              color={colors.brown}
              value={timeEntryName}
              onChange={handleChange(setTimeEntryName)}
            />
            <StyledTextField
              type="text"
              id="entryYear"
              variant="outlined"
              label="Ano"
              color={colors.brown}
              value={timeEntryYear}
              onChange={handleChange(setTimeEntryYear)}
            />
            <StyledTextField
              select
              id="entryMonth"
              variant="outlined"
              label="Mês"
              color={colors.brown}
              value={timeEntryMonth}
              onChange={handleChange(setTimeEntryMonth)}
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
              onChange={handleChange(setTimeEntryDay)}
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
  timelines: PropTypes.array,
  setTimeline: PropTypes.func,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
}
