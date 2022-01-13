import React from 'react'
import { GithubPicker } from 'react-color'
import PropTypes from 'prop-types'
import {
  ColorDisplay,
  Label,
  LabelAndColorWrapper,
  Wrapper,
} from './EndDateDisplay.styles'
import { periodColors } from '../../../../_shared/periodColors'

export const PeriodColorPicker = ({ entry, onColorChange }) => {
  return (
    <Wrapper>
      <LabelAndColorWrapper>
        <Label>Cor da barra do período:</Label>
        <ColorDisplay color={entry.period_color} />
      </LabelAndColorWrapper>
      <GithubPicker
        onChange={onColorChange}
        triangle="hide"
        colors={periodColors}
      />
    </Wrapper>
  )
}

PeriodColorPicker.propTypes = {
  entry: PropTypes.object,
  onColorChange: PropTypes.func,
}
