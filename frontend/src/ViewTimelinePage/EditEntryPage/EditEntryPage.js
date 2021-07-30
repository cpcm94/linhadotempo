import React from 'react'
import { TimeEntryForm } from '../TimeEntryForm/TimeEntryForm'
import { Header } from '../../_shared/Header/Header'
import { Layout } from '../../_shared/Layout'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

export const EditEntryPage = ({
  timelines,
  refetchTimelines,
  entryToUpdate,
}) => {
  let history = useHistory()
  const goBack = () => {
    history.goBack()
  }
  return (
    <Layout>
      <Header
        title={'Acontecimento'}
        subTitle={'Editar Acontecimento'}
        returnButton={goBack}
      />
      <TimeEntryForm
        timelines={timelines}
        refetchTimelines={refetchTimelines}
        entryToUpdate={entryToUpdate}
      />
    </Layout>
  )
}

EditEntryPage.propTypes = {
  timelines: PropTypes.array,
  refetchTimelines: PropTypes.func,
  entryToUpdate: PropTypes.object,
}
