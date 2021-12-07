import React from 'react'
import {
  Wrapper,
  Form,
  TextFieldColor,
  DeleteButtonWrapper,
} from './NewTimeEntryCategoryForm.styles'
import PropTypes from 'prop-types'
import { SectionTitle } from '../../_shared/SectionTitle/SectionTitle'
import { DeleteButton } from '../../_shared/DeleteButton'
import { ErrorMessage } from '../../_shared/ErrorMessage.styles'
import { GithubPicker } from 'react-color'
import { colorsArray } from '../../_shared/colorsArray'

export const NewTimeEntryCategoryForm = ({
  category,
  setCategory,
  categoryError,
  categoryId,
  deleteLoading,
  handleDelete,
}) => {
  const handleChange = (categoryPropName) => (e) => {
    const newCategory = { ...category }
    newCategory[categoryPropName] = e.target.value
    setCategory(newCategory)
  }
  const handleChangeColor = (color) => {
    const newCategory = { ...category }
    newCategory.color = color.hex
    setCategory(newCategory)
  }
  const resetColorField = () => {
    const newCategory = { ...category }
    newCategory.color = ''
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
          variant="outlined"
          label="Nome"
          value={category.name}
          onChange={handleChange('name')}
        />
        <SectionTitle title={'Cor'} resetSection={resetColorField} />
        <GithubPicker
          triangle="hide"
          color={category.color}
          onChange={handleChangeColor}
          colors={colorsArray}
        />
        <DeleteButtonWrapper showBorder={categoryId}>
          {categoryId &&
            (deleteLoading ? (
              <span>Loading...</span>
            ) : (
              <DeleteButton onClick={handleDelete} />
            ))}
        </DeleteButtonWrapper>
      </Form>
    </Wrapper>
  )
}

NewTimeEntryCategoryForm.propTypes = {
  category: PropTypes.object,
  setCategory: PropTypes.func,
  categoryError: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  categoryId: PropTypes.any,
  deleteLoading: PropTypes.bool,
  handleDelete: PropTypes.func,
}
