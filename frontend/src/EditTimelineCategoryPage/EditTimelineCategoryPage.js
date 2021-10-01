import React from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import { EditTimelineCategoryLoader } from './EditTimelineCategoryLoader'

export const EditTimelineCategoryPage = () => {
  let { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={`${path}/:categoryId`}>
        <EditTimelineCategoryLoader />
      </Route>
    </Switch>
  )
}
