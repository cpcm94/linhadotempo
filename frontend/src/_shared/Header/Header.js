import React from 'react'
import PropTypes from 'prop-types'
import { HeaderWrapper } from './HeaderWrapper'
import { PageActions, Title } from './Header.styles.js'

export const Header = ({ title, loading, pageActions }) => {
  return (
    <HeaderWrapper>
      {title && <Title>{title}</Title>}
      {loading && <span>Loading...</span>}
      {pageActions && <PageActions>{pageActions}</PageActions>}
    </HeaderWrapper>
  )
}

Header.propTypes = {
  title: PropTypes.any,
  loading: PropTypes.bool,
  pageActions: PropTypes.element,
}
