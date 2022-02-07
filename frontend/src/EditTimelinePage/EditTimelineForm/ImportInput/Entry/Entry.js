import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Wrapper,
  InnerWrapper,
  StyledButton,
  StyledCheckMark,
} from './Entry.styles'
import { useMutation } from '@apollo/client'
import { CREATE_TIME_ENTRY_MUTATION } from '../../../../_shared/CREATE_TIME_ENTRY_MUTATION'
import { EntryInfoForm } from './EntryInfoForm'
import { convertFormDataValues } from '../../../../_shared/convertFormDataValues'
import { yearWithoutNegativeSign } from '../../../../_shared/yearWithoutNegativeSign'

export const Entry = ({ entry, timeline }) => {
  const [entryInfo, setEntryInfo] = useState({
    name: entry.name,
    year: yearWithoutNegativeSign(entry.year),
    month: entry.month ? parseInt(entry.month) : '',
    day: entry.day ? parseInt(entry.day) : '',
    annual_importance: false,
    monthly_importance: false,
    timelines: { sync: [timeline.id] },
    time_entry_categories: {
      sync: [],
    },
    end_year: yearWithoutNegativeSign(entry.end_year),
    end_month: entry.end_month ? parseInt(entry.end_month) : '',
    end_day: entry.end_day ? parseInt(entry.end_day) : '',
    is_period: entry.is_period === 'true',
    show_period: entry.show_period === 'true',
    period_color: entry.period_color,
    description: '',
    source_url: '',
    book_page: '',
    book_id: '',
  })

  const [radioValue, setRadioValue] = useState(
    entry.year && entry.year.toString().startsWith('-') ? 'AC' : 'DC'
  )

  const [entryCreated, setEntryCreated] = useState(false)
  const [createEntry, { loading }] = useMutation(CREATE_TIME_ENTRY_MUTATION, {
    variables: {
      input: convertFormDataValues(entryInfo, radioValue),
    },
  })

  const handleClick = (e) => {
    e.preventDefault()
    createEntry().then((res) => {
      if (res.data.createTimeEntry) {
        setEntryCreated(true)
      } else {
        console.log('failed')
      }
    })
  }

  const aboveMaxNameLength = entryInfo.name.length > 255
  const emptyName = entryInfo.name.trim() === ''
  const dayWithoutYearOrMonth =
    entryInfo.day !== '' &&
    (entryInfo.month === '' || entryInfo.year.trim() === '')
  const monthWithoutYear =
    entryInfo.month !== '' && entryInfo.year.trim() === ''

  const disableButton =
    aboveMaxNameLength || dayWithoutYearOrMonth || monthWithoutYear || emptyName

  return (
    <Wrapper disableButton={disableButton}>
      <InnerWrapper>
        <EntryInfoForm
          entry={entryInfo}
          setEntry={setEntryInfo}
          radioValue={radioValue}
          setRadioValue={setRadioValue}
        />
      </InnerWrapper>
      {loading ? (
        <span>Loading...</span>
      ) : !entryCreated ? (
        <StyledButton
          variant="contained"
          onClick={handleClick}
          disabled={disableButton}
        >
          {'Salvar'}
        </StyledButton>
      ) : (
        <StyledCheckMark variant="contained">&#10003;</StyledCheckMark>
      )}
    </Wrapper>
  )
}

Entry.propTypes = {
  entry: PropTypes.object,
  timeline: PropTypes.object,
}
