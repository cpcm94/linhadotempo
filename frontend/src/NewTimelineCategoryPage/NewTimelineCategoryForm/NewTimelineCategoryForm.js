import React from 'react'
import {
  Wrapper,
  Form,
  TextFieldColor,
  ErrorMessage,
} from './NewTimelineCategoryForm.styles'
import PropTypes from 'prop-types'
import { SectionTitle } from '../../_shared/SectionTitle/SectionTitle'
import { DeleteButton } from '../../_shared/DeleteButton'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router'
import { DELETE_TIMELINE_CATEGORY_MUTATION } from '../../_shared/DELETE_TIMELINE_CATEGORY_MUTATION'

export const NewTimelineCategoryForm = ({
  category,
  setCategory,
  categoryError,
  categoryId,
}) => {
  let history = useHistory()
  const navigateToCategories = () => {
    history.push('/timelineCategories')
  }
  const handleChange = (categoryPropName) => (e) => {
    const newCategory = { ...category }
    newCategory[categoryPropName] = e.target.value
    setCategory(newCategory)
  }
  const showNameFieldErrorMessage =
    categoryError && categoryError.field === 'name'

  const [deleteCategory, { loading }] = useMutation(
    DELETE_TIMELINE_CATEGORY_MUTATION,
    { variables: { id: categoryId } }
  )
  const handleDelete = () => {
    deleteCategory().then((res) => {
      if (res.data) navigateToCategories()
    })
  }
  return (
    <Wrapper>
      <Form>
        <SectionTitle title={'Nome'} />
        {showNameFieldErrorMessage && (
          <ErrorMessage>
            Nome da categoria não pode ser deixado em branco.
          </ErrorMessage>
        )}
        <TextFieldColor
          type="text"
          variant="outlined"
          label="Nome"
          value={category.name}
          onChange={handleChange('name')}
        />
        {categoryId &&
          (loading ? (
            <span>Loading...</span>
          ) : (
            <DeleteButton onClick={handleDelete} />
          ))}
      </Form>
    </Wrapper>
  )
}

NewTimelineCategoryForm.propTypes = {
  category: PropTypes.object,
  setCategory: PropTypes.func,
  categoryError: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  categoryId: PropTypes.any,
}
