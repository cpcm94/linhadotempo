import React, { useState } from 'react'
import { Container } from '../_shared/Container'
import { Header } from '../_shared/Header/Header'
import { Layout } from '../_shared/Layout'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { EditableTimelineCategoryForm } from './EditableCategoryForm/EditableCategoryForm'

export const EditableTimelineCategory = ({ categoryData }) => {
  const [loading, setLoading] = useState(false)
  let history = useHistory()
  const navigateToTimelineCategoriesPage = () => {
    history.push('/timelineCategories')
  }

  return (
    <Layout>
      <Header
        title={'Editar categoria'}
        returnButton={navigateToTimelineCategoriesPage}
        loading={loading}
      />
      <Container>
        <EditableTimelineCategoryForm
          categoryData={categoryData}
          setLoading={setLoading}
        />

        <ToastContainer />
      </Container>
    </Layout>
  )
}

EditableTimelineCategory.propTypes = {
  categoryData: PropTypes.object,
}
