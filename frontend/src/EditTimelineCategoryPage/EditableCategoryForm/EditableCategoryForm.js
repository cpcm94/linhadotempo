import React from 'react'
import { StyledTextField, Wrapper } from './EditableCategoryForm.styles'
import PropTypes from 'prop-types'
import { DeleteButtonAndConfirmation } from '../../_shared/DeleteButtonAndConfirmation/DeleteButtonAndConfirmation'
import { SectionTitle } from '../../_shared/SectionTitle/SectionTitle'
import { ErrorMessage } from '../../_shared/ErrorMessage.styles'

export const EditableTimelineCategoryForm = ({
  category,
  setCategory,
  handleDelete,
  categoryTimelines,
  deleteLoading,
  categoryError,
}) => {
  const handleChange = (categoryPropName) => (e) => {
    const newCategory = { ...category }
    newCategory[categoryPropName] = e.target.value
    setCategory(newCategory)
  }

  const numberOfRelatedTimelines = categoryTimelines.length
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
        deleteFunction={handleDelete}
        skipDeleteMessage={skipDeleteMessage}
        deleteMessage={deleteMessage}
        loading={deleteLoading}
      />
    </Wrapper>
  )
}

EditableTimelineCategoryForm.propTypes = {
  category: PropTypes.object,
  setCategory: PropTypes.func,
  categoryTimelines: PropTypes.array,
  handleDelete: PropTypes.func,
  deleteLoading: PropTypes.bool,
  categoryError: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
}
