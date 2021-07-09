import React from 'react'
import PropTypes from 'prop-types'
import { HeaderWrapper } from './HeaderWrapper'
import {
  PageActions,
  Title,
  SubTitle,
  TitlesWrapper,
  IconRow,
} from './Header.styles.js'
import { ReturnButton } from '../ReturnButton'

export const Header = ({
  title,
  loading,
  pageActions,
  subTitle,
  returnButton,
  timelinesIconRow,
}) => {
  const onlyTitle = title && !subTitle
  return (
    <HeaderWrapper timelinesIconRow={timelinesIconRow}>
      {returnButton && <ReturnButton onClick={returnButton} />}
      {subTitle && (
        <TitlesWrapper>
          <SubTitle>{subTitle}</SubTitle>
          <Title>{title}</Title>
          {timelinesIconRow && <IconRow>{timelinesIconRow}</IconRow>}
        </TitlesWrapper>
      )}
      {onlyTitle && <Title>{title}</Title>}
      {pageActions && <PageActions>{pageActions}</PageActions>}
      {loading && <span>Loading...</span>}
    </HeaderWrapper>
  )
}

Header.propTypes = {
  title: PropTypes.any,
  subTitle: PropTypes.any,
  loading: PropTypes.bool,
  pageActions: PropTypes.element,
  returnButton: PropTypes.func,
  timelinesIconRow: PropTypes.element,
}
