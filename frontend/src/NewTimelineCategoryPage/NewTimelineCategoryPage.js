import React, { useEffect, useRef, useState } from 'react'
import { Header } from '../_shared/Header/Header'
import { Layout } from '../_shared/Layout'
import { useMutation } from '@apollo/client'
import { CREATE_TIMELINE_CATEGORY_MUTATION } from './CREATE_TIMELINE_CATEGORY_MUTATION'
import { useHistory } from 'react-router-dom'
import { Container } from '../_shared/Container'
import { NewTimelineCategoryForm } from './NewTimelineCategoryForm/NewTimelineCategoryForm'
import { UPDATE_TIMELINE_CATEGORY_MUTATION } from '../_shared/UPDATE_TIMELINE_CATEGORY_MUTATION'
import { checkIfCategoryError } from '../_shared/checkIfCategoryError'
import { DELETE_TIMELINE_CATEGORY_MUTATION } from '../_shared/DELETE_TIMELINE_CATEGORY_MUTATION'

const AUTO_SAVE_DEBOUNCE_MILISECONDS = 500
let timeoutId = null

export const NewTimelineCategoryPage = () => {
  const isFirstRun = useRef(true)

  const [category, setCategory] = useState({
    name: '',
  })
  const [categoryId, setCategoryId] = useState(null)
  let history = useHistory()

  const navigateToCategoriesPage = () => {
    history.push(`/timelineCategories`)
  }

  const [createTimelineCategory, { loading }] = useMutation(
    CREATE_TIMELINE_CATEGORY_MUTATION
  )
  const [updateTimelineCategory, { loading: updateLoading }] = useMutation(
    UPDATE_TIMELINE_CATEGORY_MUTATION
  )
  const [deleteCategory, { loading: deleteLoading }] = useMutation(
    DELETE_TIMELINE_CATEGORY_MUTATION,
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
            updateTimelineCategory(payload)
          } else {
            createTimelineCategory(payload).then((res) => {
              if (res.data.createTimelineCategory && !categoryId) {
                setCategoryId(res.data.createTimelineCategory.id)
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
    createTimelineCategory,
    updateTimelineCategory,
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
        <NewTimelineCategoryForm
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
