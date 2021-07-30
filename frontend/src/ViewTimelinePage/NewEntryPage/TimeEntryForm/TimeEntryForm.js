import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Wrapper,
  StyledTextField,
  StyledButton,
  InnerWrapper,
  MonthWrapper,
  DayWrapper,
  StyledYearTextField,
  YearAndRadiosWrapper,
} from './TimeEntryForm.styles'
import MenuItem from '@material-ui/core/MenuItem'
import { Months, Days } from './DateArrays'
import { useMutation } from '@apollo/client'
import { TIME_ENTRY_MUTATION } from './TIME_ENTRY_MUTATION'
import { useHistory } from 'react-router-dom'
import { convertFormDataValues } from './convertFormDataValues'
import { monthNameArray } from '../../../_shared/monthNameArray'
import { XIcon } from '../../../_shared/XIcon'
import { YearOptionSelect } from './YearOptionSelect'

export const TimeEntryForm = ({ timelines, refetchTimelines, defaultDate }) => {
  const defaultDateYearWithoutNegative =
    defaultDate.year && defaultDate.year.startsWith('-')
      ? defaultDate.year.substr(1)
      : defaultDate.year && !defaultDate.year.startsWith('-')
      ? defaultDate.year
      : ''

  const [entry, setEntry] = useState({
    timeline_id:
      defaultDate.timeline !== 'undefined'
        ? defaultDate.timeline
        : timelines[0].id,
    name: '',
    year: defaultDateYearWithoutNegative,
    month: defaultDate.month ? parseInt(defaultDate.month) : '',
    day: defaultDate.day ? parseInt(defaultDate.day) : '',
    annual_importance: false,
    monthly_importance: false,
  })
  const [radioValue, setRadioValue] = useState('DC')
  const handleChange = (entryPropName) => (e) => {
    const newEntry = { ...entry }
    newEntry[entryPropName] = e.target.value
    setEntry(newEntry)
  }

  const resetFieldValue = (fieldName) => () => {
    const newEntry = { ...entry }
    newEntry[fieldName] = ''
    setEntry(newEntry)
  }

  const [createEntry, { loading }] = useMutation(TIME_ENTRY_MUTATION, {
    variables: {
      input: convertFormDataValues(entry, radioValue),
    },
  })

  let history = useHistory()
  const timelinesString = timelines.map((timeline) => timeline.id).toString()

  const goBack = (newEntry) => {
    history.push({
      pathname: '/viewTimeline/',
      search: `?timelines=${timelinesString}`,
      hash: `#date=${newEntry.year}${
        newEntry.month ? `/${newEntry.month}` : ''
      }${newEntry.day ? `/${newEntry.day}` : ''}`,
    })
  }
  const submitSignIn = (e) => {
    e.preventDefault()
    createEntry().then((res) => {
      refetchTimelines().then(() => {
        goBack(res.data.createTimeEntry)
      })
    })
  }

  const disableSubmitButton = entry.month === '' && entry.day !== ''
  const singleTimeline = timelines.length === 1
  const showSingleTimeline = entry.timeline_id
    ? timelines[0].id
    : entry.timeline_id

  return (
    <>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <Wrapper>
          <InnerWrapper>
            <StyledTextField
              select
              id="timeline_id"
              variant="outlined"
              disabled={singleTimeline}
              label="Linha do tempo"
              value={showSingleTimeline}
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
            <YearAndRadiosWrapper>
              <StyledYearTextField
                type="number"
                id="entryYear"
                variant="outlined"
                label="Ano"
                value={entry.year}
                onChange={handleChange('year')}
              />
              <YearOptionSelect
                setRadioValue={setRadioValue}
                radioValue={radioValue}
              />
            </YearAndRadiosWrapper>
            <MonthWrapper>
              <StyledTextField
                select
                id="entryMonth"
                variant="outlined"
                label="Mês"
                value={entry.month}
                onChange={handleChange('month')}
              >
                <MenuItem value={''}>{''}</MenuItem>
                {Months.map((month, index) => (
                  <MenuItem key={index} value={month}>
                    {monthNameArray[month]}
                  </MenuItem>
                ))}
              </StyledTextField>
              {entry.month !== '' && (
                <XIcon onClick={resetFieldValue('month')} />
              )}
            </MonthWrapper>
            <DayWrapper>
              <StyledTextField
                select
                id="entryDay"
                variant="outlined"
                label="Dia"
                value={entry.day}
                onChange={handleChange('day')}
              >
                <MenuItem value={''}>{''}</MenuItem>
                {Days.map((day, index) => (
                  <MenuItem key={index} value={day}>
                    {day}
                  </MenuItem>
                ))}
              </StyledTextField>
              {entry.day !== '' && <XIcon onClick={resetFieldValue('day')} />}
            </DayWrapper>

            <StyledButton
              disabled={disableSubmitButton}
              variant="contained"
              onClick={submitSignIn}
              id="submitButton"
            >
              Criar Acontecimento
            </StyledButton>
          </InnerWrapper>
        </Wrapper>
      )}
    </>
  )
}

TimeEntryForm.propTypes = {
  timelines: PropTypes.array,
  refetchTimelines: PropTypes.func,
  defaultDate: PropTypes.object,
}
