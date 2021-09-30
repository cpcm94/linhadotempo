import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { DateDisplay } from '../../DateDisplay/DateDisplay'
import { EntryTextInput } from '../../EntryTextInput/EntryTextInput'
import { Wrapper, EditButtonsWrapper } from './EditEntryForm.styles'
import { DeleteEntryButton } from './DeleteEntryButton'
import { useHistory } from 'react-router-dom'
import { convertFormDataValues } from '../../../../_shared/convertFormDataValues'
import { EntryTimelinesSelect } from '../../EntryTimelinesSelect/EntryTimelinesSelect'
import { EntrySource } from '../../EntrySource/EntrySource'
import { ImageUploader } from '../../ImageUploader/ImageUploader'

const AUTO_SAVE_DEBOUNCE_MILISECONDS = 500
let timeoutId = null

export const EditEntryForm = ({
  entry,
  setEntry,
  entryId,
  timelines,
  books,
  entryError,
  updateEntry,
  bucketName,
}) => {
  const [radioValue, setRadioValue] = useState(
    entry.year && entry.year.toString().startsWith('-') ? 'AC' : 'DC'
  )
  const isFirstRun = useRef(true)

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

  useEffect(() => {
    if (!isFirstRun.current) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      if (!entryError)
        timeoutId = setTimeout(() => {
          const payload = {
            variables: {
              id: entryId,
              input: convertFormDataValues(entry, radioValue),
            },
          }
          updateEntry(payload)
        }, AUTO_SAVE_DEBOUNCE_MILISECONDS)
    } else {
      isFirstRun.current = false
    }
  }, [entry, entryError, radioValue, entryId, updateEntry])

  return (
    <Wrapper>
      <EntryTimelinesSelect
        fieldId={'timelines'}
        entryError={entryError}
        timelines={timelines}
        resetField={resetSelectedTimelines}
        entry={entry}
        setEntry={setEntry}
        bucketName={bucketName}
      />
      <DateDisplay
        fieldId={'date'}
        entryError={entryError}
        entry={entry}
        setEntry={setEntry}
        radioValue={radioValue}
        setRadioValue={setRadioValue}
      />
      <EntryTextInput
        entry={entry}
        entryError={entryError}
        changeEntry={handleChange}
        resetField={resetFieldValue}
        title={'Acontecimento'}
        field={'name'}
      />
      <ImageUploader
        entry={entry}
        setEntry={setEntry}
        bucketName={bucketName}
      />
      <EntryTextInput
        entry={entry}
        changeEntry={handleChange}
        resetField={resetFieldValue}
        title={'Descrição'}
        field={'description'}
      />
      <EntrySource
        entry={entry}
        books={books}
        changeEntry={handleChange}
        setEntry={setEntry}
      />
      <EditButtonsWrapper>
        <DeleteEntryButton
          entryId={entryId}
          afterDelete={(deletedEntry) => goBack(deletedEntry)}
        />
      </EditButtonsWrapper>
    </Wrapper>
  )
}

EditEntryForm.propTypes = {
  entry: PropTypes.object,
  timelines: PropTypes.array,
  refetchTimelines: PropTypes.func,
  books: PropTypes.array,
  setEntry: PropTypes.func,
  entryError: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  entryId: PropTypes.string,
  updateEntry: PropTypes.func,
  bucketName: PropTypes.string,
}
