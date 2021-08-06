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
import { CREATE_TIME_ENTRY_MUTATION } from './CREATE_TIME_ENTRY_MUTATION'
import { UPDATE_TIME_ENTRY_MUTATION } from './UPDATE_TIME_ENTRY_MUTATION'
import { useHistory } from 'react-router-dom'
import { convertFormDataValues } from './convertFormDataValues'
import { monthNameArray } from '../../_shared/monthNameArray'
import { XIcon } from '../../_shared/XIcon'
import { YearOptionSelect } from './YearOptionSelect'
import { DeleteEntryButton } from './DeleteEntryButton'

export const TimeEntryForm = ({
  timelines,
  refetchTimelines,
  defaultDate,
  entryToUpdate,
}) => {
  const yearWithoutNegative = (entry) => {
    if (entry && entry.year) {
      if (entry.year.toString().startsWith('-')) {
        return entry.year.toString().substr(1)
      } else if (!entry.year.toString().startsWith('-')) {
        return entry.year.toString()
      } else {
        return ''
      }
    }
  }

  const [entry, setEntry] = useState(
    defaultDate
      ? {
          timeline_id:
            defaultDate.timeline !== 'undefined'
              ? defaultDate.timeline
              : timelines[0].id,
          name: '',
          year: yearWithoutNegative(defaultDate),
          month: defaultDate.month ? parseInt(defaultDate.month) : '',
          day: defaultDate.day ? parseInt(defaultDate.day) : '',
          annual_importance: false,
          monthly_importance: false,
        }
      : entryToUpdate
      ? {
          timeline_id: entryToUpdate.timeline_id,
          name: entryToUpdate.name,
          year: yearWithoutNegative(entryToUpdate),
          month: entryToUpdate.month ? entryToUpdate.month : '',
          day: entryToUpdate.day ? entryToUpdate.day : '',
          annual_importance: false,
          monthly_importance: false,
        }
      : {
          timeline_id: timelines[0].id,
          name: '',
          year: '',
          month: '',
          day: '',
          annual_importance: false,
          monthly_importance: false,
        }
  )
  const [radioValue, setRadioValue] = useState(
    defaultDate && defaultDate.year.startsWith('-')
      ? 'AC'
      : entryToUpdate && entryToUpdate.year.toString().startsWith('-')
      ? 'AC'
      : 'DC'
  )
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

  const [createEntry, { loading }] = useMutation(CREATE_TIME_ENTRY_MUTATION, {
    variables: {
      input: convertFormDataValues(entry, radioValue),
    },
  })

  const [updateEntry, { loading: updateLoading }] = useMutation(
    UPDATE_TIME_ENTRY_MUTATION,
    {
      variables: {
        id: entryToUpdate ? entryToUpdate.id : null,
        input: convertFormDataValues(entry, radioValue),
      },
    }
  )

  let history = useHistory()
  const timelinesString = timelines.map((timeline) => timeline.id).toString()

  const goBack = (newEntry) => {
    history.push({
      pathname: '/viewTimeline/',
      search: `?timelines=${timelinesString}`,
      hash: newEntry
        ? `#date=${newEntry.year}${newEntry.month ? `/${newEntry.month}` : ''}${
            newEntry.day ? `/${newEntry.day}` : ''
          }`
        : null,
    })
  }
  const submitCreateEntry = (e) => {
    e.preventDefault()
    createEntry().then((res) => {
      refetchTimelines().then(() => {
        goBack(res.data.createTimeEntry)
      })
    })
  }

  const submitUpdateEntry = (e) => {
    e.preventDefault()
    updateEntry().then((res) => {
      refetchTimelines().then(() => {
        goBack(res.data.updateTimeEntry)
      })
    })
  }

  const disableSubmitButton =
    (entry.month === '' && entry.day !== '') || entry.name.trim() === ''
  const singleTimeline = timelines.length === 1
  const showSingleTimeline = entry.timeline_id
    ? entry.timeline_id
    : timelines[0].id

  return (
    <>
      {loading || updateLoading ? (
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

            {entryToUpdate ? (
              <>
                <StyledButton
                  disabled={disableSubmitButton}
                  variant="contained"
                  onClick={submitUpdateEntry}
                  id="submitUpdateButton"
                >
                  Editar Acontecimento
                </StyledButton>
                <DeleteEntryButton
                  entryId={entryToUpdate.id}
                  afterDelete={() =>
                    refetchTimelines().then(() => {
                      goBack()
                    })
                  }
                />
              </>
            ) : (
              <StyledButton
                disabled={disableSubmitButton}
                variant="contained"
                onClick={submitCreateEntry}
                id="submitCreateButton"
              >
                Criar Acontecimento
              </StyledButton>
            )}
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
  entryToUpdate: PropTypes.object,
}
