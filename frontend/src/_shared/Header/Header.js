import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { HeaderWrapper } from './HeaderWrapper'
import {
  PageActions,
  Title,
  IconRow,
  UserButtonWrapper,
  UpperHeader,
  LowerHeader,
  TimelineTitle,
  MiddleHeader,
  EntryTitle,
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
  returnButton,
  timelinesIconRow,
  showMenuButton,
  timelineTitle,
  entryTitle,
  icon,
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

  return userLoading ? (
    <span>Loading...</span>
  ) : (
    <HeaderWrapper timelinesIconRow={timelinesIconRow} entryTitle={entryTitle}>
      {entryTitle && (
        <UpperHeader>
          <EntryTitle>{entryTitle}</EntryTitle>
        </UpperHeader>
      )}
      <MiddleHeader>
        {displayMenuButton ? <MenuDrawer user={user} /> : null}
        {returnButton && <ReturnButton onClick={returnButton} />}
        {icon && <div>{icon}</div>}
        {title && <Title>{title}</Title>}
        {timelineTitle && <TimelineTitle>{timelineTitle}</TimelineTitle>}
        {pageActions && <PageActions>{pageActions}</PageActions>}
        {loading && <span>Loading...</span>}
        {user && !userLoading && (
          <UserButtonWrapper hasTimelinesIcons={timelinesIconRow}>
            <UserButton initial={user.initial} onClick={navigateToUserPage} />
          </UserButtonWrapper>
        )}
      </MiddleHeader>
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
  loading: PropTypes.bool,
  pageActions: PropTypes.element,
  returnButton: PropTypes.func,
  timelinesIconRow: PropTypes.element,
  showMenuButton: PropTypes.bool,
  icon: PropTypes.element,
  timelineTitle: PropTypes.element,
  entryTitle: PropTypes.string,
}
