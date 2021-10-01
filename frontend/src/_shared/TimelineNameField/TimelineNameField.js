import React from 'react'
import { ErrorMessage } from '../ErrorMessage.styles'
import { SectionTitle } from '../SectionTitle/SectionTitle'
import { TextFieldColor } from './TimelineNameField.styles'
import PropTypes from 'prop-types'

export const TimelineNameField = ({
  resetField,
  timelineError,
  timelineName,
  handleChange,
}) => {
  const showNameFieldError = timelineError && timelineError.field === 'name'

  return (
    <>
      <SectionTitle title={'Nome'} resetSection={resetField} />
      {showNameFieldError && (
        <ErrorMessage>
          Nome da linha do tempo não pode estar em branco.
        </ErrorMessage>
      )}
      <TextFieldColor
        type="text"
        id="timeline"
        variant="outlined"
        label="Nome"
        value={timelineName}
        onChange={handleChange('name')}
      />
    </>
  )
}
TimelineNameField.propTypes = {
  resetField: PropTypes.func,
  timelineError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  timelineName: PropTypes.string,
  handleChange: PropTypes.func,
}
