import React from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import { EditTimeEntryCategoryLoader } from './EditTimeEntryCategoryLoader'

export const EditTimeEntryCategoryPage = () => {
  let { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={`${path}/:categoryId`}>
        <EditTimeEntryCategoryLoader />
      </Route>
    </Switch>
  )
}
