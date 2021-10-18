import React from 'react'
import { Header } from '../../../_shared/Header/Header'
import { Layout } from '../../../_shared/Layout'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Container } from '../../../_shared/Container'
import { NewEntryForm } from './NewEntryForm/NewEntryForm'
import { CREATE_TIME_ENTRY_MUTATION } from '../../../_shared/CREATE_TIME_ENTRY_MUTATION'
import { UPDATE_TIME_ENTRY_MUTATION } from '../../../_shared/UPDATE_TIME_ENTRY_MUTATION'
import { useMutation } from '@apollo/client'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { DELETE_TIME_ENTRY_MUTATION } from '../../../_shared/DELETE_TIME_ENTRY_MUTATION'
import { yearWithoutNegativeSign } from '../../../_shared/yearWithoutNegativeSign'
import { checkIfEntryError } from '../../../_shared/checkIfEntryError'
import { convertFormDataValues } from '../../../_shared/convertFormDataValues'

const AUTO_SAVE_DEBOUNCE_MILISECONDS = 500
let timeoutId = null
const syncTimelinesFromDefault = (defaultEntryData, timelines) =>
  defaultEntryData.timeline &&
  defaultEntryData.timeline
    .split(',')
    .filter((timelineId) =>
      timelines.map((timeline) => timeline.id).includes(timelineId)
    )

export const NewEntryPage = ({
  timelines,
  defaultEntryData,
  books,
  bucketName,
}) => {
  const isFirstRun = useRef(true)

  const [entryId, setEntryId] = useState(null)
  const hasDefaultEntryDataAndYear = defaultEntryData && defaultEntryData.year
  const [radioValue, setRadioValue] = useState(
    hasDefaultEntryDataAndYear && defaultEntryData.year.startsWith('-')
      ? 'AC'
      : 'DC'
  )
  const [entry, setEntry] = useState(
    defaultEntryData
      ? {
          timelines: defaultEntryData.timeline
            ? {
                sync: syncTimelinesFromDefault(defaultEntryData, timelines),
              }
            : { sync: [timelines[0].id] },
          name: '',
          description: '',
          year: yearWithoutNegativeSign(defaultEntryData),
          month: defaultEntryData.month ? parseInt(defaultEntryData.month) : '',
          day: defaultEntryData.day ? parseInt(defaultEntryData.day) : '',
          annual_importance: false,
          monthly_importance: false,
          image_url: '',
          source_url: '',
          book_page: '',
          book_id: '',
        }
      : {
          timelines: { sync: [timelines[0].id] },
          name: '',
          description: '',
          year: '',
          month: '',
          day: '',
          annual_importance: false,
          monthly_importance: false,
          image_url: '',
          source_url: '',
          book_page: '',
          book_id: '',
        }
  )

  const [createEntry, { loading: createLoading }] = useMutation(
    CREATE_TIME_ENTRY_MUTATION
  )
  const [updateEntry, { loading }] = useMutation(UPDATE_TIME_ENTRY_MUTATION)
  const [deleteEntry, { loading: deleteLoading }] = useMutation(
    DELETE_TIME_ENTRY_MUTATION,
    {
      variables: { id: entryId },
    }
  )

  const handleDelete = () => {
    deleteEntry().then((res) => {
      if (res.data) history.push(`/viewTimeline/${location.search}`)
    })
  }

  const entryError = checkIfEntryError(entry)

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
          if (entryId) {
            updateEntry(payload)
          } else if (!entryId && !createLoading) {
            createEntry(payload).then((res) => {
              if (res.data.createTimeEntry && !entryId) {
                setEntryId(res.data.createTimeEntry.id)
              }
            })
          }
        }, AUTO_SAVE_DEBOUNCE_MILISECONDS)
    } else {
      isFirstRun.current = false
    }
  }, [
    entry,
    entryError,
    radioValue,
    entryId,
    updateEntry,
    createEntry,
    createLoading,
  ])

  const timelinesString = timelines.map((timeline) => timeline.id).toString()
  let history = useHistory()

  const goBack = () => {
    if (!entryId) {
      history.push(`/viewTimeline/${location.search}`)
    } else {
      history.push({
        pathname: '/viewTimeline/',
        search: `?timelines=${timelinesString}`,
        hash: `#date=${entry.year}${entry.month ? `/${entry.month}` : ''}${
          entry.day ? `/${entry.day}` : ''
        }`,
      })
    }
  }

  const isLoading = loading || createLoading
  return (
    <Layout>
      <Header
        title={'Acontecimento'}
        returnButton={goBack}
        loading={isLoading}
      />
      <Container>
        <NewEntryForm
          timelines={timelines}
          entry={entry}
          setEntry={setEntry}
          radioValue={radioValue}
          setRadioValue={setRadioValue}
          entryId={entryId}
          entryError={entryError}
          books={books}
          bucketName={bucketName}
          deleteLoading={deleteLoading}
          handleDelete={handleDelete}
        />
      </Container>
    </Layout>
  )
}

NewEntryPage.propTypes = {
  timelines: PropTypes.array,
  defaultEntryData: PropTypes.object,
  books: PropTypes.array,
  bucketName: PropTypes.string,
}
