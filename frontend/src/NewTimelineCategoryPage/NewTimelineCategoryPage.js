import React, { useEffect, useRef, useState } from 'react'
import { Header } from '../_shared/Header/Header'
import { Layout } from '../_shared/Layout'
import { useMutation } from '@apollo/client'
import { CREATE_TIMELINE_CATEGORY_MUTATION } from './CREATE_TIMELINE_CATEGORY_MUTATION'
import { useHistory } from 'react-router-dom'
import { Container } from '../_shared/Container'
import { NewTimelineCategoryForm } from './NewTimelineCategoryForm/NewTimelineCategoryForm'

const AUTO_SAVE_DEBOUNCE_MILISECONDS = 500
let timeoutId = null
const checkIfCategoryError = (category) => {
  if (category.name.trim() === '') {
    return { error: 'emptyCategoryName', field: 'name' }
  } else {
    return false
  }
}
export const NewTimelineCategoryPage = () => {
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
  const isFirstRun = useRef(true)
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
          createTimelineCategory(payload).then((res) => {
            if (res.data.createTimelineCategory && !categoryId) {
              setCategoryId(res.data.createTimelineCategory.id)
            }
          })
        }, AUTO_SAVE_DEBOUNCE_MILISECONDS)
    } else {
      isFirstRun.current = false
    }
  }, [category, categoryError, categoryId, createTimelineCategory])

  return (
    <Layout>
      <Header
        title={'Criar categoria de linha do tempo'}
        loading={loading}
        returnButton={navigateToCategoriesPage}
      />
      <Container>
        <NewTimelineCategoryForm
          category={category}
          setCategory={setCategory}
          categoryError={categoryError}
        />
      </Container>
    </Layout>
  )
}
