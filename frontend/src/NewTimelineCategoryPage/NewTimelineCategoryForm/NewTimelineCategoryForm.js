import React from 'react'
import {
  Wrapper,
  Form,
  TextFieldColor,
  ErrorMessage,
} from './NewTimelineCategoryForm.styles'
import PropTypes from 'prop-types'
import { SectionTitle } from '../../_shared/SectionTitle/SectionTitle'

export const NewTimelineCategoryForm = ({
  category,
  setCategory,
  categoryError,
}) => {
  const handleChange = (categoryPropName) => (e) => {
    const newCategory = { ...category }
    newCategory[categoryPropName] = e.target.value
    setCategory(newCategory)
  }
  const showNameFieldErrorMessage =
    categoryError && categoryError.field === 'name'
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
          id="timeline"
          variant="outlined"
          label="Nome"
          value={timeline.name}
          onChange={handleChange('name')}
        />
      </Form>
    </Wrapper>
  )
}

NewTimelineCategoryForm.propTypes = {
  category: PropTypes.object,
  setCategory: PropTypes.func,
  categoryError: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
}
