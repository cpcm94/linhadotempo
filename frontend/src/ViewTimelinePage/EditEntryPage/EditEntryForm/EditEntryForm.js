import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { DateDisplay } from '../../DateDisplay/DateDisplay'
import { EntryTextInput } from '../../EntryTextInput/EntryTextInput'
import {
  InnerWrapper,
  Wrapper,
  EditButtonsWrapper,
} from './EditEntryForm.styles'
import { DeleteEntryButton } from './DeleteEntryButton'
import { yearWithoutNegativeSign } from '../../../_shared/yearWithoutNegativeSign'
import { UPDATE_TIME_ENTRY_MUTATION } from './UPDATE_TIME_ENTRY_MUTATION'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { convertFormDataValues } from '../../../_shared/convertFormDataValues'
import { SubmitFormButton } from '../../SubmitFormButton/SubmitFormButton'
import { EntryTimelinesSelect } from '../../EntryTimelinesSelect/EntryTimelinesSelect'

export const EditEntryForm = ({ entryToEdit, timelines }) => {
  const [entry, setEntry] = useState({
    timelines: { sync: entryToEdit.timelines.map((timeline) => timeline.id) },
    name: entryToEdit.name,
    description: entryToEdit.description,
    year: yearWithoutNegativeSign(entryToEdit),
    month: entryToEdit.month ? entryToEdit.month : '',
    day: entryToEdit.day ? entryToEdit.day : '',
    annual_importance: false,
    monthly_importance: false,
  })
  const [radioValue, setRadioValue] = useState(
    entryToEdit.year && entryToEdit.year.toString().startsWith('-')
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
  const resetSelectedTimelines = () => {
    const newEntry = { ...entry }
    newEntry.timelines.sync = []
    setEntry(newEntry)
  }
  const [updateEntry, { loading }] = useMutation(UPDATE_TIME_ENTRY_MUTATION, {
    variables: {
      id: entryToEdit.id,
      input: convertFormDataValues(entry, radioValue),
    },
  })

  const timelinesString = timelines.map((timeline) => timeline.id).toString()

  let history = useHistory()

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
  const submitUpdateEntry = (e) => {
    e.preventDefault()
    updateEntry().then((res) => {
      goBack(res.data.updateTimeEntry)
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
      </InnerWrapper>
      <EditButtonsWrapper>
        <DeleteEntryButton
          entryId={entryToEdit.id}
          afterDelete={(deletedEntry) =>
            refetchTimelines().then(() => {
              goBack(deletedEntry)
            })
          }
        />
        {loading ? (
          <span>Loading...</span>
        ) : (
          <SubmitFormButton
            onClick={submitUpdateEntry}
            entry={entry}
            buttonText={'Editar Acontecimento'}
          />
        )}
      </EditButtonsWrapper>
    </Wrapper>
  )
}

EditEntryForm.propTypes = {
  entryToEdit: PropTypes.object,
  timelines: PropTypes.array,
  refetchTimelines: PropTypes.func,
}
