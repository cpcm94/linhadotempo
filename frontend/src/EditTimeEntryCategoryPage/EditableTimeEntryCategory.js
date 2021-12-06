import React, { useEffect, useRef, useState } from 'react'
import { Container } from '../_shared/Container'
import { Header } from '../_shared/Header/Header'
import { Layout } from '../_shared/Layout'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { EditableTimeEntryCategoryForm } from './EditableTimeEntryCategoryForm/EditableTimeEntryCategoryForm'
import { useMutation } from '@apollo/client'
import { checkIfCategoryError } from '../_shared/checkIfCategoryError'
import { UPDATE_TIME_ENTRY_CATEGORY_MUTATION } from '../_shared/UPDATE_TIME_ENTRY_CATEGORY_MUTATION'
import { DELETE_TIME_ENTRY_CATEGORY_MUTATION } from '../_shared/DELETE_TIME_ENTRY_CATEGORY_MUTATION'

const AUTO_SAVE_DEBOUNCE_MILISECONDS = 500
let timeoutId = null

export const EditableTimeEntryCategory = ({ categoryData }) => {
  let history = useHistory()
  const navigateToTimeEntryCategoriesPage = () => {
    history.push('/timeEntryCategories')
  }
  const [category, setCategory] = useState({
    name: categoryData.name,
  })
  const isFirstRun = useRef(true)

  const categoryError = checkIfCategoryError(category)

  const [updateTimeEntryCategory, { loading }] = useMutation(
    UPDATE_TIME_ENTRY_CATEGORY_MUTATION
  )
  const [deleteCategory, { loading: deleteLoading }] = useMutation(
    DELETE_TIME_ENTRY_CATEGORY_MUTATION,
    {
      variables: { id: categoryData.id },
    }
  )

  const handleDelete = () => {
    deleteCategory().then((res) => {
      if (res.data.deleteTimeEntryCategory) {
        navigateToTimeEntryCategoriesPage()
      } else {
        toast.error('Erro ao delete categoria', {
          position: 'top-center',
          hideProgressBar: true,
          transition: Slide,
        })
      }
    })
  }

  useEffect(() => {
    if (!isFirstRun.current) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      if (!categoryError)
        timeoutId = setTimeout(() => {
          const payload = {
            variables: {
              id: categoryData.id,
              input: category,
            },
          }
          updateTimeEntryCategory(payload)
        }, AUTO_SAVE_DEBOUNCE_MILISECONDS)
    } else {
      isFirstRun.current = false
    }
  }, [categoryError, categoryData.id, category, updateTimeEntryCategory])

  const categoryTimeEntries = categoryData.time_entries
  return (
    <Layout>
      <Header
        title={'Editar categoria'}
        returnButton={navigateToTimeEntryCategoriesPage}
        loading={loading}
      />
      <Container>
        <EditableTimeEntryCategoryForm
          category={category}
          setCategory={setCategory}
          handleDelete={handleDelete}
          deleteLoading={deleteLoading}
          categoryTimeEntries={categoryTimeEntries}
          categoryError={categoryError}
        />
        <ToastContainer />
      </Container>
    </Layout>
  )
}

EditableTimeEntryCategory.propTypes = {
  categoryData: PropTypes.object,
}
