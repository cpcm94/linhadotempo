import React from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import { RecoverPasswordPageLoader } from './RecoverPasswordPageLoader'

export const ViewRecoverPasswordPage = () => {
  let { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={`${path}/:hashId`}>
        <RecoverPasswordPageLoader />
      </Route>
    </Switch>
  )
}
