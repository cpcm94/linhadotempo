import React from 'react'
import { ViewTimelineLoader } from './ViewTimelineLoader'
import { useRouteMatch, Switch, Route } from 'react-router-dom'

export const ViewTimelinePage = () => {
  let { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={`${path}/:timelineId`}>
        <ViewTimelineLoader />
      </Route>
    </Switch>
  )
}
