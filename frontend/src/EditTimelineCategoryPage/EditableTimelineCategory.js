import React, { useEffect, useRef, useState } from 'react'
import { Container } from '../_shared/Container'
import { Header } from '../_shared/Header/Header'
import { Layout } from '../_shared/Layout'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { EditableTimelineCategoryForm } from './EditableCategoryForm/EditableCategoryForm'
import { UPDATE_TIMELINE_CATEGORY_MUTATION } from '../_shared/UPDATE_TIMELINE_CATEGORY_MUTATION'
import { useMutation } from '@apollo/client'
import { checkIfCategoryError } from '../_shared/checkIfCategoryError'
import { DELETE_TIMELINE_CATEGORY_MUTATION } from '../_shared/DELETE_TIMELINE_CATEGORY_MUTATION'
import { moveTouch } from '../_shared/moveTouch'
import { startTouch } from '../_shared/startTouch'

const AUTO_SAVE_DEBOUNCE_MILISECONDS = 500
let timeoutId = null

export const EditableTimelineCategory = ({ categoryData }) => {
  let history = useHistory()
  const navigateToTimelineCategoriesPage = () => {
    history.push('/timelineCategories')
  }
  const [initialX, setInitialX] = useState(null)
  const [category, setCategory] = useState({
    name: categoryData.name,
  })
  const isFirstRun = useRef(true)

  const categoryError = checkIfCategoryError(category)

  const [updateTimelineCategory, { loading }] = useMutation(
    UPDATE_TIMELINE_CATEGORY_MUTATION
  )
  const [deleteCategory, { loading: deleteLoading }] = useMutation(
    DELETE_TIMELINE_CATEGORY_MUTATION,
    {
      variables: { id: categoryData.id },
    }
  )

  const handleDelete = () => {
    deleteCategory().then((res) => {
      if (res.data.deleteTimelineCategory) {
        navigateToTimelineCategoriesPage()
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
          updateTimelineCategory(payload)
        }, AUTO_SAVE_DEBOUNCE_MILISECONDS)
    } else {
      isFirstRun.current = false
    }
  }, [categoryError, updateTimelineCategory, categoryData.id, category])

  const onStartTouch = (e) => startTouch(e, setInitialX)
  const onMoveTouch = (e) =>
    moveTouch(e, navigateToTimelineCategoriesPage, initialX)

  useEffect(() => {
    window.addEventListener('touchstart', onStartTouch)
    window.addEventListener('touchmove', onMoveTouch)
    return () => {
      window.removeEventListener('touchstart', onStartTouch)
      window.removeEventListener('touchmove', onMoveTouch)
    }
  })

  const categoryTimelines = categoryData.timelines
  return (
    <Layout>
      <Header
        title={'Editar categoria'}
        returnButton={navigateToTimelineCategoriesPage}
        loading={loading}
      />
      <Container>
        <EditableTimelineCategoryForm
          category={category}
          setCategory={setCategory}
          handleDelete={handleDelete}
          deleteLoading={deleteLoading}
          categoryTimelines={categoryTimelines}
          categoryError={categoryError}
        />
        <ToastContainer />
      </Container>
    </Layout>
  )
}

EditableTimelineCategory.propTypes = {
  categoryData: PropTypes.object,
}
