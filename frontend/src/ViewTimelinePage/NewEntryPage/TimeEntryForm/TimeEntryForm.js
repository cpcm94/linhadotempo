import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Wrapper,
  StyledTextField,
  StyledButton,
  MonthDayWrapper,
} from './TimeEntryForm.styles'
import MenuItem from '@material-ui/core/MenuItem'
import { Months, Days } from './DateArrays'
import { useMutation } from '@apollo/client'
import { TIME_ENTRY_MUTATION } from './TIME_ENTRY_MUTATION'
import { useHistory } from 'react-router-dom'

export const TimeEntryForm = ({ timelines, refetchTimelines }) => {
  const [entry, setEntry] = useState({
    timeline_id: '',
    name: '',
    year: '',
    month: '',
    day: '',
    annual_importance: false,
    monthly_importance: false,
  })
  const handleChange = (entryPropName) => (e) => {
    const newEntry = { ...entry }
    if (entryPropName === 'year') {
      newEntry[entryPropName] = parseInt(e.target.value)
      setEntry(newEntry)
    } else {
      newEntry[entryPropName] = e.target.value
      setEntry(newEntry)
    }
  }

  const [createEntry, { loading }] = useMutation(TIME_ENTRY_MUTATION, {
    variables: {
      input: entry,
    },
  })

  let history = useHistory()

  const goBack = () => {
    history.goBack()
  }
  const aheadOfCurrentYear = entry.year > new Date().getFullYear()
  const submitSignIn = (e) => {
    e.preventDefault()
    createEntry().then(() => {
      refetchTimelines()
      goBack()
    })
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
              value={entry.timeline_id}
              onChange={handleChange('timeline_id')}
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
              value={entry.name}
              onChange={handleChange('name')}
            />
            <StyledTextField
              type="number"
              id="entryYear"
              error={aheadOfCurrentYear}
              variant="outlined"
              label="Ano"
              value={entry.year}
              helperText={
                aheadOfCurrentYear
                  ? 'Ano maior que o ano atual.'
                  : 'De 0 até o ano atual.'
              }
              onChange={handleChange('year')}
            />
            <MonthDayWrapper>
              <StyledTextField
                select
                id="entryMonth"
                variant="outlined"
                label="Mês"
                value={entry.month}
                onChange={handleChange('month')}
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
                value={entry.day}
                onChange={handleChange('day')}
              >
                {Days.map((day, index) => (
                  <MenuItem key={index} value={day}>
                    {day}
                  </MenuItem>
                ))}
              </StyledTextField>
            </MonthDayWrapper>

            <StyledButton variant="contained" onClick={submitSignIn}>
              Criar Acontecimento
            </StyledButton>
          </Wrapper>
        </>
      )}
    </>
  )
}

TimeEntryForm.propTypes = {
  timelines: PropTypes.array,
  refetchTimelines: PropTypes.func,
}
