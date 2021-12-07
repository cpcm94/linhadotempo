import React, { useEffect, useRef, useState } from 'react'
import { Header } from '../_shared/Header/Header'
import { Layout } from '../_shared/Layout'
import { useMutation } from '@apollo/client'
import { CREATE_TIME_ENTRY_CATEGORY_MUTATION } from './CREATE_TIME_ENTRY_CATEGORY_MUTATION'
import { useHistory } from 'react-router-dom'
import { Container } from '../_shared/Container'
import { NewTimeEntryCategoryForm } from './NewTimeEntryCategoryForm/NewTimeEntryCategoryForm'
import { UPDATE_TIME_ENTRY_CATEGORY_MUTATION } from '../_shared/UPDATE_TIME_ENTRY_CATEGORY_MUTATION'
import { checkIfCategoryError } from '../_shared/checkIfCategoryError'
import { DELETE_TIME_ENTRY_CATEGORY_MUTATION } from '../_shared/DELETE_TIME_ENTRY_CATEGORY_MUTATION'

const AUTO_SAVE_DEBOUNCE_MILISECONDS = 500
let timeoutId = null

export const NewTimeEntryCategoryPage = () => {
  const isFirstRun = useRef(true)

  const [category, setCategory] = useState({
    name: '',
    color: '',
  })
  const [categoryId, setCategoryId] = useState(null)
  let history = useHistory()

  const navigateToCategoriesPage = () => {
    history.push(`/timeEntryCategories`)
  }

  const [createTimeEntryCategory, { loading }] = useMutation(
    CREATE_TIME_ENTRY_CATEGORY_MUTATION
  )
  const [updateTimeEntryCategory, { loading: updateLoading }] = useMutation(
    UPDATE_TIME_ENTRY_CATEGORY_MUTATION
  )
  const [deleteCategory, { loading: deleteLoading }] = useMutation(
    DELETE_TIME_ENTRY_CATEGORY_MUTATION,
    { variables: { id: categoryId } }
  )

  const handleDelete = () => {
    deleteCategory().then((res) => {
      if (res.data) navigateToCategoriesPage()
    })
  }

  const categoryError = checkIfCategoryError(category)

  useEffect(() => {
    if (!isFirstRun.current) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      if (!categoryError)
        timeoutId = setTimeout(() => {
          const payload = {
            variables: {
              id: categoryId,
              input: category,
            },
          }
          if (categoryId) {
            updateTimeEntryCategory(payload)
          } else if (!categoryId && !loading) {
            createTimeEntryCategory(payload).then((res) => {
              if (res.data.createTimeEntryCategory && !categoryId) {
                setCategoryId(res.data.createTimeEntryCategory.id)
              }
            })
          }
        }, AUTO_SAVE_DEBOUNCE_MILISECONDS)
    } else {
      isFirstRun.current = false
    }
  }, [
    category,
    categoryError,
    categoryId,
    createTimeEntryCategory,
    loading,
    updateTimeEntryCategory,
  ])

  const isLoading = loading || updateLoading
  return (
    <Layout>
      <Header
        title={'Criar categoria'}
        loading={isLoading}
        returnButton={navigateToCategoriesPage}
      />
      <Container>
        <NewTimeEntryCategoryForm
          category={category}
          setCategory={setCategory}
          categoryError={categoryError}
          categoryId={categoryId}
          deleteLoading={deleteLoading}
          handleDelete={handleDelete}
        />
      </Container>
    </Layout>
  )
}
