import React, { useState } from 'react'
import { Drawer } from '@material-ui/core'
import { MenuButton } from './MenuButton'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { colors } from '../colors'
import PropTypes from 'prop-types'

const ListItemWrapper = styled.li`
  background-color: white;
  :hover {
    background-color: ${colors.brown};
    cursor: pointer;
    color: white;
  }
  list-style-type: none;
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
`
const ListWrapper = styled.ul`
  margin: 0;
  width: 20vw;
  min-width: 150px;
  max-width: 300px;
`

export const MenuDrawer = ({ user }) => {
  const [drawer, setDrawer] = useState(false)

  const toggleDrawer = () => {
    setDrawer(!drawer)
  }

  let history = useHistory()
  const navigateToTimelines = () => {
    history.push('/timelines')
    setDrawer(!drawer)
  }
  const navigateToUsers = () => {
    history.push('/users')
    setDrawer(!drawer)
  }

  return (
    <div>
      <Drawer open={drawer} onClose={toggleDrawer}>
        <ListWrapper>
          <ListItemWrapper onClick={navigateToTimelines}>
            Linhas do Tempo
          </ListItemWrapper>
          {user && user.type === 'admin' && (
            <ListItemWrapper onClick={navigateToUsers}>
              Usuários
            </ListItemWrapper>
          )}
        </ListWrapper>
      </Drawer>
      <MenuButton onClick={toggleDrawer} />
    </div>
  )
}

MenuDrawer.propTypes = {
  user: PropTypes.object,
}
