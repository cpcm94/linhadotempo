import React from 'react'
import { Header } from '../../_shared/Header/Header'
import { Layout } from '../../_shared/Layout'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Container } from '../../_shared/Container'
import { EditEntryForm } from './EditEntryForm/EditEntryForm'

export const EditEntryPage = ({ timelines, entryToEdit, books }) => {
  let history = useHistory()
  const goBack = () => {
    history.push(`/viewTimeline/${location.search}`)
  }
  return (
    <Layout>
      <Header title={'Acontecimento'} returnButton={goBack} />
      <Container>
        <EditEntryForm
          timelines={timelines}
          entryToEdit={entryToEdit}
          books={books}
        />
      </Container>
    </Layout>
  )
}

EditEntryPage.propTypes = {
  timelines: PropTypes.array,
  entryToEdit: PropTypes.object,
  books: PropTypes.array,
}
