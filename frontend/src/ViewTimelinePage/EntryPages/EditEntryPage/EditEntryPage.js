import React, { useState } from 'react'
import { Header } from '../../../_shared/Header/Header'
import { Layout } from '../../../_shared/Layout'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Container } from '../../../_shared/Container'
import { EditEntryForm } from './EditEntryForm/EditEntryForm'
import { yearWithoutNegativeSign } from '../../../_shared/yearWithoutNegativeSign'
import { UPDATE_TIME_ENTRY_MUTATION } from '../../../_shared/UPDATE_TIME_ENTRY_MUTATION'
import { toast, Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useMutation } from '@apollo/client'
import { checkIfEntryError } from '../../../_shared/checkIfEntryError'
import { useEffect } from 'react'
import { useRef } from 'react'
import { convertFormDataValues } from '../../../_shared/convertFormDataValues'
import { DELETE_TIME_ENTRY_MUTATION } from '../../../_shared/DELETE_TIME_ENTRY_MUTATION'
import { moveTouch } from '../../../_shared/moveTouch'
import { startTouch } from '../../../_shared/startTouch'

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
}) => {
  const isFirstRun = useRef(true)

  const [initialX, setInitialX] = useState(null)
  const [entry, setEntry] = useState({
    timelines: { sync: entryToEdit.timelines.map((timeline) => timeline.id) },
    name: entryToEdit.name,
    description: entryToEdit.description,
    year: yearWithoutNegativeSign(entryToEdit),
    month: entryToEdit.month ? entryToEdit.month : '',
    day: entryToEdit.day ? entryToEdit.day : '',
    annual_importance: false,
    monthly_importance: false,
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
  const timelinesString = timelines.map((timeline) => timeline.id).toString()

  const goBack = () => {
    history.push({
      pathname: '/viewTimeline/',
      search: `?timelines=${timelinesString}`,
      hash: `#date=${entry.year}${entry.month ? `/${entry.month}` : ''}${
        entry.day ? `/${entry.day}` : ''
      }`,
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

  const onStartTouch = (e) => startTouch(e, setInitialX)
  const onMoveTouch = (e) => moveTouch(e, checkErrorBeforeGoBack, initialX)

  useEffect(() => {
    window.addEventListener('touchstart', onStartTouch)
    window.addEventListener('touchmove', onMoveTouch)
    return () => {
      window.removeEventListener('touchstart', onStartTouch)
      window.removeEventListener('touchmove', onMoveTouch)
    }
  })
  return (
    <Layout>
      <Header
        title={'Acontecimento'}
        returnButton={checkErrorBeforeGoBack}
        loading={loading}
      />
      <Container>
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
        />
        <ToastContainer limit={1} />
      </Container>
    </Layout>
  )
}

EditEntryPage.propTypes = {
  timelines: PropTypes.array,
  entryToEdit: PropTypes.object,
  books: PropTypes.array,
  bucketName: PropTypes.string,
}
