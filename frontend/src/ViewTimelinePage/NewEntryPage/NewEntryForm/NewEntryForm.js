import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { DateDisplay } from '../../DateDisplay/DateDisplay'
import { EntryTextInput } from '../../EntryTextInput/EntryTextInput'
import {
  InnerWrapper,
  SubmitButtonWrapper,
  Wrapper,
} from './NewEntryForm.styles'
import { yearWithoutNegativeSign } from '../../../_shared/yearWithoutNegativeSign'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { convertFormDataValues } from '../../../_shared/convertFormDataValues'
import { CREATE_TIME_ENTRY_MUTATION } from '../../../_shared/CREATE_TIME_ENTRY_MUTATION'
import { SubmitFormButton } from '../../SubmitFormButton/SubmitFormButton'
import { EntryTimelinesSelect } from '../../EntryTimelinesSelect/EntryTimelinesSelect'

export const NewEntryForm = ({
  timelines,
  defaultEntryData,
  refetchTimelines,
}) => {
  const [entry, setEntry] = useState(
    defaultEntryData
      ? {
          timelines: defaultEntryData.timeline
            ? { sync: defaultEntryData.timeline.split(',') }
            : { sync: [timelines[0].id] },
          name: '',
          description: '',
          year: yearWithoutNegativeSign(defaultEntryData),
          month: defaultEntryData.month ? parseInt(defaultEntryData.month) : '',
          day: defaultEntryData.day ? parseInt(defaultEntryData.day) : '',
          annual_importance: false,
          monthly_importance: false,
        }
      : {
          timelines: { connect: [timelines[0].id] },
          name: '',
          description: '',
          year: '',
          month: '',
          day: '',
          annual_importance: false,
          monthly_importance: false,
        }
  )
  const hasDefaultEntryDataAndYear = defaultEntryData && defaultEntryData.year

  const [radioValue, setRadioValue] = useState(
    hasDefaultEntryDataAndYear && defaultEntryData.year.startsWith('-')
      ? 'AC'
      : 'DC'
  )

  const [createEntry] = useMutation(CREATE_TIME_ENTRY_MUTATION, {
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
      hash: newEntry
        ? `#date=${newEntry.year}${newEntry.month ? `/${newEntry.month}` : ''}${
            newEntry.day ? `/${newEntry.day}` : ''
          }`
        : null,
    })
  }
  const handleChange = (entryPropName) => (e) => {
    const newEntry = { ...entry }
    newEntry[entryPropName] = e.target.value
    setEntry(newEntry)
  }

  const resetSelectedTimelines = () => {
    const newEntry = { ...entry }
    newEntry.timelines.sync = []
    setEntry(newEntry)
  }

  const resetFieldValue = (fieldName) => () => {
    const newEntry = { ...entry }
    newEntry[fieldName] = ''
    setEntry(newEntry)
  }
  const submitCreateEntry = (e) => {
    e.preventDefault()
    createEntry().then((res) => {
      refetchTimelines().then(() => {
        goBack(res.data.createTimeEntry)
      })
    })
  }

  return (
    <Wrapper>
      <InnerWrapper>
        <EntryTimelinesSelect
          timelines={timelines}
          resetField={resetSelectedTimelines}
          entry={entry}
          setEntry={setEntry}
        />
        <DateDisplay
          entry={entry}
          setEntry={setEntry}
          radioValue={radioValue}
          setRadioValue={setRadioValue}
        />
        <EntryTextInput
          entry={entry}
          changeEntry={handleChange}
          resetField={resetFieldValue}
          title={'Acontecimento'}
          field={'name'}
        />
        <EntryTextInput
          entry={entry}
          changeEntry={handleChange}
          resetField={resetFieldValue}
          title={'Descrição'}
          field={'description'}
        />
        <SubmitButtonWrapper>
          <SubmitFormButton
            onClick={submitCreateEntry}
            entry={entry}
            buttonText={'Criar Acontecimento'}
          />
        </SubmitButtonWrapper>
      </InnerWrapper>
    </Wrapper>
  )
}

NewEntryForm.propTypes = {
  timelines: PropTypes.array,
  defaultEntryData: PropTypes.object,
  refetchTimelines: PropTypes.func,
}
