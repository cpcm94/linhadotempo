import React from 'react'
import { GithubPicker } from 'react-color'
import { SectionTitle } from './SectionTitle/SectionTitle'
import PropTypes from 'prop-types'
import { colorsArray } from './colorsArray'

export const ColorSection = ({ object, setObject }) => {
  const handleChangeColor = (color) => {
    const newObject = { ...object }
    newObject.color = color.hex
    setObject(newObject)
  }

  const resetColorField = () => {
    const newObject = { ...object }
    newObject.color = ''
    setObject(newObject)
  }
  return (
    <>
      <SectionTitle title={'Cor'} resetSection={resetColorField} />
      <GithubPicker
        triangle="hide"
        color={object.color}
        onChange={handleChangeColor}
        colors={colorsArray}
      />
    </>
  )
}

ColorSection.propTypes = {
  object: PropTypes.object,
  setObject: PropTypes.func,
}
