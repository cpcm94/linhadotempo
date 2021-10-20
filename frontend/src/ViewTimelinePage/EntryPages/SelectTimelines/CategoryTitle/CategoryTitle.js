import React from 'react'
import PropTypes from 'prop-types'
import { TitleWrapper } from './CategoryTitle.styles'

export const CategoryTitle = ({ title }) => {
  return (
    <>
      <TitleWrapper>
        <span>{title}</span>
      </TitleWrapper>
    </>
  )
}

CategoryTitle.propTypes = {
  title: PropTypes.string,
  resetSection: PropTypes.func,
}
