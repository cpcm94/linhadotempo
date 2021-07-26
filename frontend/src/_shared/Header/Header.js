import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { HeaderWrapper } from './HeaderWrapper'
import {
  PageActions,
  Title,
  SubTitle,
  TitlesWrapper,
  IconRow,
  UserButtonWrapper,
} from './Header.styles.js'
import { ReturnButton } from '../ReturnButton'
import { CurrentUserContext } from '../CurrentUserContextProvider'
import { UserButton } from '../UserButton'
import { useHistory } from 'react-router-dom'

export const Header = ({
  title,
  loading,
  pageActions,
  subTitle,
  returnButton,
  timelinesIconRow,
}) => {
  const { user, userLoading } = useContext(CurrentUserContext)
  let history = useHistory()

  const navigateToUserPage = () => {
    history.push('/userPage')
  }

  const onlyTitle = title && !subTitle && !timelinesIconRow
  return userLoading ? (
    <span>Loading...</span>
  ) : (
    <HeaderWrapper timelinesIconRow={timelinesIconRow}>
      {returnButton && <ReturnButton onClick={returnButton} />}
      {subTitle || timelinesIconRow ? (
        <TitlesWrapper>
          <SubTitle>{subTitle}</SubTitle>
          <Title>{title}</Title>
          {timelinesIconRow && <IconRow>{timelinesIconRow}</IconRow>}
        </TitlesWrapper>
      ) : null}
      {onlyTitle && <Title>{title}</Title>}
      {pageActions && <PageActions>{pageActions}</PageActions>}
      {loading && <span>Loading...</span>}
      {user && !userLoading && (
        <UserButtonWrapper>
          <UserButton initial={user.initial} onClick={navigateToUserPage} />
        </UserButtonWrapper>
      )}
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
