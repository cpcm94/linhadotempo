import React from 'react'
import PropTypes from 'prop-types'
import { DateDisplay } from '../../DateDisplay/DateDisplay'
import { EntryTextInput } from '../../EntryTextInput/EntryTextInput'
import {
  DeleteButtonWrapper,
  InnerWrapper,
  Wrapper,
} from './NewEntryForm.styles'
import { EntryTimelinesSelect } from '../../EntryTimelinesSelect/EntryTimelinesSelect'
import { EntrySource } from '../../EntrySource/EntrySource'
import { EntryImages } from '../../EntryImages/EntryImages'
import { DeleteButton } from '../../../../_shared/DeleteButton'
import { EntryAnnualImportance } from '../../EntryAnnualImportance/EntryAnnualImportance'

export const NewEntryForm = ({
  timelines,
  entry,
  setEntry,
  radioValue,
  setRadioValue,
  entryError,
  books,
  bucketName,
  entryId,
  deleteLoading,
  handleDelete,
  setShowTimelineSelectorScreen,
}) => {
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

  return (
    <Wrapper>
      <InnerWrapper>
        <EntryTimelinesSelect
          fieldId={'timelines'}
          timelines={timelines}
          resetField={resetSelectedTimelines}
          setShowTimelineSelectorScreen={setShowTimelineSelectorScreen}
          entryError={entryError}
          entry={entry}
          setEntry={setEntry}
          bucketName={bucketName}
        />
        <DateDisplay
          fieldId={'date'}
          entry={entry}
          setEntry={setEntry}
          entryError={entryError}
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
        <EntryTextInput
          entry={entry}
          changeEntry={handleChange}
          resetField={resetFieldValue}
          title={'Descrição'}
          field={'description'}
        />
        <EntryAnnualImportance entry={entry} setEntry={setEntry} />
        <EntrySource
          entry={entry}
          books={books}
          changeEntry={handleChange}
          setEntry={setEntry}
        />
        {entryId && (
          <EntryImages
            entryId={entryId}
            setEntry={setEntry}
            bucketName={bucketName}
            entryImages={[]}
          />
        )}
        <DeleteButtonWrapper showBorder={entryId}>
          {entryId &&
            (deleteLoading ? (
              <span>Loading...</span>
            ) : (
              <DeleteButton onClick={handleDelete} />
            ))}
        </DeleteButtonWrapper>
      </InnerWrapper>
    </Wrapper>
  )
}

NewEntryForm.propTypes = {
  timelines: PropTypes.array,
  entry: PropTypes.object,
  setEntry: PropTypes.func,
  radioValue: PropTypes.string,
  setRadioValue: PropTypes.func,
  entryError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  books: PropTypes.array,
  bucketName: PropTypes.string,
  entryId: PropTypes.any,
  deleteLoading: PropTypes.bool,
  handleDelete: PropTypes.func,
  setShowTimelineSelectorScreen: PropTypes.func,
}
