import React from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import { EditBookLoader } from './EditBookLoader'

export const ViewEditBookPage = () => {
  let { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={`${path}/:bookId`}>
        <EditBookLoader />
      </Route>
    </Switch>
  )
}
