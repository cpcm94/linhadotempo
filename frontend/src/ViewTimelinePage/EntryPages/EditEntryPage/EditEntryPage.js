import React, { useState, useEffect, useRef } from 'react'
import { Header } from '../../../_shared/Header/Header'
import { Layout } from '../../../_shared/Layout'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { EditEntryForm } from './EditEntryForm/EditEntryForm'
import { yearWithoutNegativeSign } from '../../../_shared/yearWithoutNegativeSign'
import { UPDATE_TIME_ENTRY_MUTATION } from '../../../_shared/UPDATE_TIME_ENTRY_MUTATION'
import { toast, Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useMutation } from '@apollo/client'
import { checkIfEntryError } from '../../../_shared/checkIfEntryError'
import { convertFormDataValues } from '../../../_shared/convertFormDataValues'
import { DELETE_TIME_ENTRY_MUTATION } from '../../../_shared/DELETE_TIME_ENTRY_MUTATION'
import { SelectTimelines } from '../SelectTimelines/SelectTimelines'
import { EntryPageContainer } from '../EntryPageContainer'
import { TimelinesIconRow } from '../TimelinesIconRow/TimelinesIconRow'

const toastConfig = {
  position: 'top-center',
  hideProgressBar: true,
  transition: Slide,
}

const AUTO_SAVE_DEBOUNCE_MILISECONDS = 500
let timeoutId = null

export const EditEntryPage = ({
  timelines,
  entryToEdit,
  books,
  bucketName,
  hasZoomOut,
}) => {
  const isFirstRun = useRef(true)
  const [showTimelineSelectorScreen, setShowTimelineSelectorScreen] =
    useState(false)
  const [entry, setEntry] = useState({
    timelines: { sync: entryToEdit.timelines.map((timeline) => timeline.id) },
    name: entryToEdit.name,
    description: entryToEdit.description,
    year: yearWithoutNegativeSign(entryToEdit.year),
    month: entryToEdit.month ? entryToEdit.month : '',
    day: entryToEdit.day ? entryToEdit.day : '',
    end_year: yearWithoutNegativeSign(entryToEdit.end_year),
    end_month: entryToEdit.end_month ? entryToEdit.end_month : '',
    end_day: entryToEdit.end_day ? entryToEdit.end_day : '',
    is_period: entryToEdit.is_period ? entryToEdit.is_period : false,
    annual_importance: entryToEdit.annual_importance,
    monthly_importance: entryToEdit.monthly_importance,
    image_url: entryToEdit.image_url ? entryToEdit.image_url : '',
    source_url: entryToEdit.source_url ? entryToEdit.source_url : '',
    book_page: entryToEdit.book_page ? entryToEdit.book_page : '',
    book_id: entryToEdit.book_id ? entryToEdit.book_id : '',
  })
  const [radioValue, setRadioValue] = useState(
    entry.year && entry.year.toString().startsWith('-') ? 'AC' : 'DC'
  )
  const [updateEntry, { loading }] = useMutation(UPDATE_TIME_ENTRY_MUTATION)
  const [deleteEntry, { loading: deleteLoading }] = useMutation(
    DELETE_TIME_ENTRY_MUTATION,
    {
      variables: { id: entryToEdit.id },
    }
  )
  const timelinesString = timelines
    .map((timeline) => timeline.id)
    .sort((a, b) => a - b)
    .toString()

  const goBack = () => {
    history.push({
      pathname: '/viewTimeline/',
      search: `?timelines=${timelinesString}`,
      hash: `#date=${entry.year ? entry.year : 'null'}${
        entry.month ? `/${entry.month}` : ''
      }${entry.day ? `/${entry.day}` : ''}&entryId=${
        entryToEdit.id
      }&zoomOut=${hasZoomOut}`,
    })
  }

  const handleDelete = () => {
    deleteEntry().then((res) => {
      if (res.data) goBack()
    })
  }

  const scrollFieldErrorIntoView = () => {
    const yOffset = -40
    const element = entryError && document.getElementById(entryError.field)
    const elementPositionWithOffset =
      element &&
      element.getBoundingClientRect().top + window.pageYOffset + yOffset
    if (element) {
      window.scrollTo({ top: elementPositionWithOffset, behavior: 'smooth' })
    }
  }
  let history = useHistory()

  const checkErrorBeforeGoBack = () => {
    if (showTimelineSelectorScreen) {
      setShowTimelineSelectorScreen(false)
    } else {
      if (!entryError) goBack()
      if (entryError) {
        toast.error(
          'Algumas alterações contêm erros e não foram salvas',
          toastConfig
        )
        toast.clearWaitingQueue()
        scrollFieldErrorIntoView()
      }
    }
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
              id: entryToEdit.id,
              input: convertFormDataValues(entry, radioValue),
            },
          }
          updateEntry(payload)
        }, AUTO_SAVE_DEBOUNCE_MILISECONDS)
    } else {
      isFirstRun.current = false
    }
  }, [entry, entryError, radioValue, updateEntry, entryToEdit.id])
  const setEntryTimelines = (array) => {
    const newEntry = { ...entry }
    newEntry.timelines.sync = array
    setEntry(newEntry)
  }
  const headerTitle = showTimelineSelectorScreen
    ? 'Selecionar as linhas do tempo'
    : 'Acontecimento'
  return (
    <Layout>
      <Header
        title={headerTitle}
        returnButton={checkErrorBeforeGoBack}
        loading={loading}
        entryTitle={showTimelineSelectorScreen && entry.name}
        timelinesIconRow={
          showTimelineSelectorScreen && (
            <TimelinesIconRow
              selectedTimelinesIds={entry.timelines.sync}
              setSelectedTimelines={setEntryTimelines}
              timelines={timelines}
              bucketName={bucketName}
            />
          )
        }
      />
      <EntryPageContainer expandSize={showTimelineSelectorScreen}>
        {!showTimelineSelectorScreen ? (
          <EditEntryForm
            timelines={timelines}
            entry={entry}
            setEntry={setEntry}
            books={books}
            entryError={entryError}
            setRadioValue={setRadioValue}
            radioValue={radioValue}
            bucketName={bucketName}
            deleteLoading={deleteLoading}
            handleDelete={handleDelete}
            setShowTimelineSelectorScreen={setShowTimelineSelectorScreen}
            entryId={entryToEdit.id}
          />
        ) : (
          <SelectTimelines
            timelines={timelines}
            entry={entry}
            setEntry={setEntry}
            bucketName={bucketName}
          />
        )}
        <ToastContainer limit={1} />
      </EntryPageContainer>
    </Layout>
  )
}

EditEntryPage.propTypes = {
  timelines: PropTypes.array,
  entryToEdit: PropTypes.object,
  books: PropTypes.array,
  bucketName: PropTypes.string,
  hasZoomOut: PropTypes.bool,
}
