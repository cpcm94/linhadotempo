import React from 'react'
import PropTypes from 'prop-types'
import { HeaderWrapper } from './HeaderWrapper'
import { PageActions, Title, SubTitle, TitlesWrapper } from './Header.styles.js'
import { ReturnButton } from '../ReturnButton'

export const Header = ({
  title,
  loading,
  pageActions,
  subTitle,
  returnButton,
}) => {
  const onlyTitle = title && !subTitle
  return (
    <HeaderWrapper>
      {returnButton && <ReturnButton />}
      {subTitle && (
        <TitlesWrapper>
          <SubTitle>{subTitle}</SubTitle>
          <Title>{title}</Title>
        </TitlesWrapper>
      )}
      {onlyTitle && <Title>{title}</Title>}
      {loading && <span>Loading...</span>}
      {pageActions && <PageActions>{pageActions}</PageActions>}
    </HeaderWrapper>
  )
}

Header.propTypes = {
  title: PropTypes.any,
  subTitle: PropTypes.any,
  loading: PropTypes.bool,
  pageActions: PropTypes.element,
  returnButton: PropTypes.bool,
}
