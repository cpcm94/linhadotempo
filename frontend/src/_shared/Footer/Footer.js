import React from 'react'
import { Wrapper, PageActions } from './Footer.styles'
import PropTypes from 'prop-types'

export const Footer = ({ pageActions }) => {
  return (
    <Wrapper>{pageActions && <PageActions>{pageActions}</PageActions>}</Wrapper>
  )
}
Footer.propTypes = {
  pageActions: PropTypes.element,
}
