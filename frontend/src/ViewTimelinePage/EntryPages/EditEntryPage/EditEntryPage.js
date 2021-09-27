import React, { useState } from 'react'
import { Header } from '../../../_shared/Header/Header'
import { Layout } from '../../../_shared/Layout'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Container } from '../../../_shared/Container'
import { EditEntryForm } from './EditEntryForm/EditEntryForm'
import { yearWithoutNegativeSign } from '../../../_shared/yearWithoutNegativeSign'
import { UPDATE_TIME_ENTRY_MUTATION } from './UPDATE_TIME_ENTRY_MUTATION'
import { toast, Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useMutation } from '@apollo/client'

const toastConfig = {
  position: 'top-center',
  hideProgressBar: true,
  transition: Slide,
}

const checkIfEntryError = (entry) => {
  if (entry.name.length > 300) {
    return { error: 'aboveMaxNameLength', field: 'name' }
  } else if (entry.name.trim() === '') {
    return { error: 'emptyName', field: 'name' }
  } else if (entry.day !== '' && (entry.month === '' || entry.year === '')) {
    return { error: 'dayWithoutYearOrMonth', field: 'date' }
  } else if (entry.month !== '' && entry.year === '') {
    return { error: 'monthWithoutYear', field: 'date' }
  } else if (!entry.timelines.sync[0]) {
    return { error: 'entryWithoutTimeline', field: 'timeline' }
  } else {
    return false
  }
}

export const EditEntryPage = ({ timelines, entryToEdit, books }) => {
  const [updateEntry, { loading }] = useMutation(UPDATE_TIME_ENTRY_MUTATION)

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
  const goBack = () => {
    if (!entryError) history.push(`/viewTimeline/${location.search}`)
    if (entryError) {
      toast.error(
        'Algumas alterações contêm erros e não foram salvas',
        toastConfig
      )
      scrollFieldErrorIntoView()
    }
  }
  const [entry, setEntry] = useState({
    timelines: { sync: entryToEdit.timelines.map((timeline) => timeline.id) },
    name: entryToEdit.name,
    description: entryToEdit.description,
    year: yearWithoutNegativeSign(entryToEdit),
    month: entryToEdit.month ? entryToEdit.month : '',
    day: entryToEdit.day ? entryToEdit.day : '',
    annual_importance: false,
    monthly_importance: false,
    source_url: entryToEdit.source_url ? entryToEdit.source_url : '',
    book_page: entryToEdit.book_page ? entryToEdit.book_page : '',
    book_id: entryToEdit.book_id ? entryToEdit.book_id : '',
  })

  const entryError = checkIfEntryError(entry)

  return (
    <Layout>
      <Header title={'Acontecimento'} returnButton={goBack} loading={loading} />
      <Container>
        <EditEntryForm
          timelines={timelines}
          entry={entry}
          entryId={entryToEdit.id}
          setEntry={setEntry}
          books={books}
          entryError={entryError}
          updateEntry={updateEntry}
        />
        <ToastContainer />
      </Container>
    </Layout>
  )
}

EditEntryPage.propTypes = {
  timelines: PropTypes.array,
  entryToEdit: PropTypes.object,
  books: PropTypes.array,
}
