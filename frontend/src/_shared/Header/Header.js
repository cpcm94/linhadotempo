import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { HeaderWrapper } from './HeaderWrapper'
import {
  PageActions,
  Title,
  IconRow,
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
  lowerHeader,
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
  const searchBarHasAtLeastOneChosenCategory =
    lowerHeader && lowerHeader.props.chosenCategories[0]
  return userLoading ? (
    <span>Loading...</span>
  ) : (
    <HeaderWrapper
      big={searchBarHasAtLeastOneChosenCategory || entryTitle}
      medium={lowerHeader}
    >
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
          <UserButton initial={user.initial} onClick={navigateToUserPage} />
        )}
      </MiddleHeader>
      {lowerHeader && (
        <LowerHeader>
          <IconRow>{lowerHeader}</IconRow>
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
  lowerHeader: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
  showMenuButton: PropTypes.bool,
  icon: PropTypes.element,
  timelineTitle: PropTypes.element,
  entryTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
}
