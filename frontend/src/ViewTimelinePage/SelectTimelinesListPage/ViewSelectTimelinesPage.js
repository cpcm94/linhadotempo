import React from 'react'
import { SelectTimelinesLoader } from './SelectTimelinesLoader'
import { useRouteMatch, Switch, Route } from 'react-router-dom'

export const ViewSelectTimelinesPage = () => {
  let { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={`${path}/`}>
        <SelectTimelinesLoader />
      </Route>
    </Switch>
  )
}
