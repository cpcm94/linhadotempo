import React from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import { EditUserLoader } from './EditUserLoader'

export const EditUserPage = () => {
  let { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={`${path}/:userId`}>
        <EditUserLoader />
      </Route>
    </Switch>
  )
}
