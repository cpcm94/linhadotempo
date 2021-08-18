import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Wrapper,
  StyledTextField,
  StyledUpdateButton,
  StyledCreateButton,
  InnerWrapper,
  EditButtonsWrapper,
} from './TimeEntryForm.styles'
import MenuItem from '@material-ui/core/MenuItem'
import { useMutation } from '@apollo/client'
import { UPDATE_TIME_ENTRY_MUTATION } from './UPDATE_TIME_ENTRY_MUTATION'
import { useHistory } from 'react-router-dom'
import { DeleteEntryButton } from './DeleteEntryButton'
import { CREATE_TIME_ENTRY_MUTATION } from '../../_shared/CREATE_TIME_ENTRY_MUTATION'
import { yearWithoutNegativeSign } from '../../_shared/yearWithoutNegativeSign'
import { convertFormDataValues } from '../../_shared/convertFormDataValues'
import { EntryNameInput } from './EntryNameInput/EntryNameInput'
import { DateDisplay } from './DateDisplay/DateDisplay'

const createDefaultDateEntryObject = (defaultEntryData, timelines) => {
  return {
    timeline_id:
      defaultEntryData.timeline !== 'undefined'
        ? defaultEntryData.timeline
        : timelines[0].id,
    name: '',
    year: yearWithoutNegativeSign(defaultEntryData),
    month: defaultEntryData.month ? parseInt(defaultEntryData.month) : '',
    day: defaultEntryData.day ? parseInt(defaultEntryData.day) : '',
    annual_importance: false,
    monthly_importance: false,
  }
}
const createEntryToEditEntryObject = (entryToEdit) => {
  return {
    timeline_id: entryToEdit.timeline_id,
    name: entryToEdit.name,
    year: yearWithoutNegativeSign(entryToEdit),
    month: entryToEdit.month ? entryToEdit.month : '',
    day: entryToEdit.day ? entryToEdit.day : '',
    annual_importance: false,
    monthly_importance: false,
  }
}

export const TimeEntryForm = ({
  timelines,
  refetchTimelines,
  defaultEntryData,
  entryToEdit,
}) => {
  const [entry, setEntry] = useState(
    defaultEntryData
      ? createDefaultDateEntryObject(defaultEntryData, timelines)
      : entryToEdit
      ? createEntryToEditEntryObject(entryToEdit)
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
  const hasDefaultDateAndYear = defaultEntryData && defaultEntryData.year
  const hasentryToEditAndYear = entryToEdit && entryToEdit.year
  const [radioValue, setRadioValue] = useState(
    hasDefaultDateAndYear && defaultEntryData.year.startsWith('-')
      ? 'AC'
      : hasentryToEditAndYear && entryToEdit.year.toString().startsWith('-')
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
        id: entryToEdit ? entryToEdit.id : null,
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

  const aboveMaxNameLength = entry.name.length > 255
  const emptyName = entry.name.trim() === ''
  const dayWithoutYearOrMonth =
    entry.day !== '' && (entry.month === '' || entry.year === '')
  const monthWithoutYear = entry.month !== '' && entry.year === ''

  const disableSubmitButton =
    aboveMaxNameLength || dayWithoutYearOrMonth || monthWithoutYear || emptyName

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
            {entryToEdit ? (
              <EditButtonsWrapper>
                <DeleteEntryButton
                  entryId={entryToEdit.id}
                  afterDelete={(deletedEntry) =>
                    refetchTimelines().then(() => {
                      goBack(deletedEntry)
                    })
                  }
                />
                <StyledUpdateButton
                  disabled={disableSubmitButton}
                  variant="contained"
                  onClick={submitUpdateEntry}
                  id="submitUpdateButton"
                >
                  Editar Acontecimento
                </StyledUpdateButton>
              </EditButtonsWrapper>
            ) : (
              <StyledCreateButton
                disabled={disableSubmitButton}
                variant="contained"
                onClick={submitCreateEntry}
                id="submitCreateButton"
              >
                Criar Acontecimento
              </StyledCreateButton>
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
  defaultEntryData: PropTypes.object,
  entryToEdit: PropTypes.object,
}
