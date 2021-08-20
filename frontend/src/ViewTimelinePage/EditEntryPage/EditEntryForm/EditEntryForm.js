import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { DateDisplay } from '../../DateDisplay/DateDisplay'
import { EntryNameInput } from '../../EntryNameInput/EntryNameInput'
import {
  StyledTextField,
  InnerWrapper,
  Wrapper,
  EditButtonsWrapper,
} from './EditEntryForm.styles'
import { MenuItem } from '@material-ui/core'
import { DeleteEntryButton } from './DeleteEntryButton'
import { yearWithoutNegativeSign } from '../../../_shared/yearWithoutNegativeSign'
import { UPDATE_TIME_ENTRY_MUTATION } from './UPDATE_TIME_ENTRY_MUTATION'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { convertFormDataValues } from '../../../_shared/convertFormDataValues'
import { SubmitFormButton } from '../../SubmitFormButton/SubmitFormButton'
import { SectionTitle } from '../../SectionTitle/SectionTitle'

export const EditEntryForm = ({ entryToEdit, timelines, refetchTimelines }) => {
  const [entry, setEntry] = useState({
    timeline_id: entryToEdit.timeline_id,
    name: entryToEdit.name,
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
      refetchTimelines().then(() => {
        goBack(res.data.updateTimeEntry)
      })
    })
  }

  const singleTimeline = timelines.length === 1
  const showSingleTimeline = entry.timeline_id
    ? entry.timeline_id
    : timelines[0].id

  return (
    <Wrapper>
      <InnerWrapper>
        <SectionTitle title={'Linhas do tempo'} />
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
        <DateDisplay
          entry={entry}
          setEntry={setEntry}
          radioValue={radioValue}
          setRadioValue={setRadioValue}
        />
        <EntryNameInput
          entryName={entry.name}
          changeEntryName={handleChange}
          resetName={resetFieldValue}
        />
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
      </InnerWrapper>
    </Wrapper>
  )
}

EditEntryForm.propTypes = {
  entryToEdit: PropTypes.object,
  timelines: PropTypes.array,
  refetchTimelines: PropTypes.func,
}
