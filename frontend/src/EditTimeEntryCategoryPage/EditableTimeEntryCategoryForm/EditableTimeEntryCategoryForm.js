import React from 'react'
import PropTypes from 'prop-types'
import { DeleteButtonAndConfirmation } from '../../_shared/DeleteButtonAndConfirmation/DeleteButtonAndConfirmation'
import { SectionTitle } from '../../_shared/SectionTitle/SectionTitle'
import { ErrorMessage } from '../../_shared/ErrorMessage.styles'
import {
  StyledTextField,
  Wrapper,
} from './EditableTimeEntryCategoryForm.styles'
import { GithubPicker } from 'react-color'
import { colorsArray } from '../../_shared/colorsArray'

export const EditableTimeEntryCategoryForm = ({
  category,
  setCategory,
  handleDelete,
  categoryTimeEntries,
  deleteLoading,
  categoryError,
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
  const numberOfRelatedTimeEntries = categoryTimeEntries.length
  const skipDeleteMessage = !numberOfRelatedTimeEntries
  const deleteMessage = `Ao deletar essa categoria ${
    numberOfRelatedTimeEntries > 1
      ? `${numberOfRelatedTimeEntries} acontecimentos perderão essa categoria`
      : `1 acontecimento irá perder essa categoria`
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
      <SectionTitle title={'Cor'} resetSection={resetColorField} />
      <GithubPicker
        triangle="hide"
        color={category.color}
        onChange={handleChangeColor}
        colors={colorsArray}
      />
      <DeleteButtonAndConfirmation
        deleteFunction={handleDelete}
        skipDeleteMessage={skipDeleteMessage}
        deleteMessage={deleteMessage}
        loading={deleteLoading}
      />
    </Wrapper>
  )
}

EditableTimeEntryCategoryForm.propTypes = {
  category: PropTypes.object,
  setCategory: PropTypes.func,
  categoryTimeEntries: PropTypes.array,
  handleDelete: PropTypes.func,
  deleteLoading: PropTypes.bool,
  categoryError: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
}
