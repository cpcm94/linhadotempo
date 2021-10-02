import React, { useEffect, useRef, useState } from 'react'
import { StyledTextField, Wrapper } from './EditableCategoryForm.styles'
import PropTypes from 'prop-types'
import { DeleteButtonAndConfirmation } from '../../_shared/DeleteButtonAndConfirmation/DeleteButtonAndConfirmation'
import { toast, Slide } from 'react-toastify'
import { useMutation } from '@apollo/client'
import { DELETE_TIMELINE_CATEGORY_MUTATION } from '../../_shared/DELETE_TIMELINE_CATEGORY_MUTATION'
import { UPDATE_TIMELINE_CATEGORY_MUTATION } from '../../_shared/UPDATE_TIMELINE_CATEGORY_MUTATION'
import { checkIfCategoryError } from '../../_shared/checkIfCategoryError'
import { useHistory } from 'react-router'
import { SectionTitle } from '../../_shared/SectionTitle/SectionTitle'
import { ErrorMessage } from '../../_shared/ErrorMessage.styles'

const AUTO_SAVE_DEBOUNCE_MILISECONDS = 500
let timeoutId = null
export const EditableTimelineCategoryForm = ({ categoryData, setLoading }) => {
  const [category, setCategory] = useState({
    name: categoryData.name,
  })

  const isFirstRun = useRef(true)

  const categoryError = checkIfCategoryError(category)

  const [updateTimelineCategory, { loading: updateLoading }] = useMutation(
    UPDATE_TIMELINE_CATEGORY_MUTATION
  )

  let history = useHistory()
  const navigateToTimelineCategoriesPage = () => {
    history.push('/timelineCategories')
  }

  const [deleteCategory, { loading }] = useMutation(
    DELETE_TIMELINE_CATEGORY_MUTATION,
    {
      variables: { id: categoryData.id },
    }
  )

  const onDelete = () => {
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
    setLoading(updateLoading)
  }, [updateLoading, setLoading])
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

  const handleChange = (categoryPropName) => (e) => {
    const newCategory = { ...category }
    newCategory[categoryPropName] = e.target.value
    setCategory(newCategory)
  }

  const numberOfRelatedTimelines = categoryData.timelines.length
  const skipDeleteMessage = !numberOfRelatedTimelines
  const deleteMessage = `Ao deletar essa categoria ${
    numberOfRelatedTimelines > 1
      ? `${numberOfRelatedTimelines} linhas do tempo perderão essa categoria`
      : `1 linha do tempo irá perder essa categoria`
  }. Tem certeza que deseja deletar essa categoria? Essa ação será irreversível.`
  const showNameFieldErrorMessage =
    categoryError && categoryError.field === 'name'
  return (
    <Wrapper>
      <SectionTitle title={'Nome'} />
      {showNameFieldErrorMessage && (
        <ErrorMessage>
          Nome da categoria não pode ser deixado em branco.
        </ErrorMessage>
      )}
      <StyledTextField
        type="text"
        id="userName"
        variant="outlined"
        label="Nome"
        value={category.name}
        onChange={handleChange('name')}
      />
      <DeleteButtonAndConfirmation
        deleteFunction={onDelete}
        skipDeleteMessage={skipDeleteMessage}
        deleteMessage={deleteMessage}
        loading={loading}
      />
    </Wrapper>
  )
}

EditableTimelineCategoryForm.propTypes = {
  categoryData: PropTypes.object,
  setLoading: PropTypes.func,
}
