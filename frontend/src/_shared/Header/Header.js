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
  UpperHeader,
  LowerHeader,
} from './Header.styles.js'
import { ReturnButton } from '../ReturnButton'
import { CurrentUserContext } from '../CurrentUserContextProvider'
import { UserButton } from '../UserButton'
import { useHistory } from 'react-router-dom'
import { MenuDrawer } from '../MenuDrawer/MenuDrawer'

export const Header = ({
  title,
  loading,
  pageActions,
  subTitle,
  returnButton,
  timelinesIconRow,
  showMenuButton,
}) => {
  const { user, userLoading } = useContext(CurrentUserContext)
  let history = useHistory()

  const hideMenuButtonOnTimelinesForBasicUser =
    user && user.type === 'basic' && location.pathname === '/timelines'

  const displayMenuButton =
    showMenuButton && !hideMenuButtonOnTimelinesForBasicUser

  const navigateToUserPage = () => {
    history.push('/user')
  }

  const onlyTitle = title && !subTitle && !timelinesIconRow
  return userLoading ? (
    <span>Loading...</span>
  ) : (
    <HeaderWrapper timelinesIconRow={timelinesIconRow}>
      <UpperHeader>
        {displayMenuButton ? <MenuDrawer user={user} /> : null}
        {returnButton && <ReturnButton onClick={returnButton} />}
        {subTitle || timelinesIconRow ? (
          <TitlesWrapper>
            <SubTitle>{subTitle}</SubTitle>
            <Title hasMenuButton={displayMenuButton}>{title}</Title>
          </TitlesWrapper>
        ) : null}
        {onlyTitle && <Title hasMenuButton={displayMenuButton}>{title}</Title>}
        {pageActions && <PageActions>{pageActions}</PageActions>}
        {loading && <span>Loading...</span>}
        {user && !userLoading && (
          <UserButtonWrapper hasTimelinesIcons={timelinesIconRow}>
            <UserButton initial={user.initial} onClick={navigateToUserPage} />
          </UserButtonWrapper>
        )}
      </UpperHeader>
      {timelinesIconRow && (
        <LowerHeader>
          <IconRow>{timelinesIconRow}</IconRow>
        </LowerHeader>
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
  showMenuButton: PropTypes.bool,
}
