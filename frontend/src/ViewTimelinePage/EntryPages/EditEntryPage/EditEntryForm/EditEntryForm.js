import React from 'react'
import PropTypes from 'prop-types'
import { DateDisplay } from '../../DateDisplay/DateDisplay'
import { EntryTextInput } from '../../EntryTextInput/EntryTextInput'
import { Wrapper } from './EditEntryForm.styles'
import { EntryTimelinesSelect } from '../../EntryTimelinesSelect/EntryTimelinesSelect'
import { EntrySource } from '../../EntrySource/EntrySource'
import { ImageUploader } from '../../ImageUploader/ImageUploader'
import { DeleteButtonAndConfirmation } from '../../../../_shared/DeleteButtonAndConfirmation/DeleteButtonAndConfirmation'
import { EntryAnnualImportance } from '../../EntryAnnualImportance/EntryAnnualImportance'
import { TimelineOriginSelector } from '../../TimelineOriginSelector/TimelineOriginSelector'

export const EditEntryForm = ({
  entry,
  setEntry,
  radioValue,
  setRadioValue,
  timelines,
  books,
  entryError,
  bucketName,
  deleteLoading,
  handleDelete,
  setShowTimelineSelectorScreen,
  entryId,
  entryImages,
}) => {
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
  const numberOfRelatedTimelines = entry.timelines.sync.length
  const skipDeleteMessage = !numberOfRelatedTimelines
  const deleteMessage = `Ao deletar esse acontecimento ${
    numberOfRelatedTimelines > 1
      ? `${numberOfRelatedTimelines} linhas do tempo perderão esse acontecimento`
      : `1 linha do tempo irá perder esse acontecimento`
  }. Tem certeza que deseja deletar esse acontecimento? Essa ação será irreversível.`
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
        setShowTimelineSelectorScreen={setShowTimelineSelectorScreen}
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
      <EntryTextInput
        entry={entry}
        changeEntry={handleChange}
        resetField={resetFieldValue}
        title={'Descrição'}
        field={'description'}
      />
      <EntryAnnualImportance entry={entry} setEntry={setEntry} />
      <TimelineOriginSelector
        entry={entry}
        bucketName={bucketName}
        timelines={timelines}
        entryId={entryId}
      />
      <EntrySource
        entry={entry}
        books={books}
        changeEntry={handleChange}
        setEntry={setEntry}
      />
      <ImageUploader
        entry={entry}
        bucketName={bucketName}
        entryId={entryId}
        entryImages={entryImages}
      />
      <DeleteButtonAndConfirmation
        deleteFunction={handleDelete}
        deleteMessage={deleteMessage}
        skipDeleteMessage={skipDeleteMessage}
        loading={deleteLoading}
      />
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
  radioValue: PropTypes.string,
  setRadioValue: PropTypes.func,
  deleteLoading: PropTypes.bool,
  handleDelete: PropTypes.func,
  setShowTimelineSelectorScreen: PropTypes.func,
  entryId: PropTypes.string,
  entryImages: PropTypes.array,
}
