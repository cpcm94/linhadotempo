import React from 'react'
import { TimelineLoader } from './TimelineLoader'
import { useRouteMatch, Switch, Route } from 'react-router-dom'

export const TimelinePage = () => {
  let { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={`${path}/:timelineId`}>
        <TimelineLoader />
      </Route>
    </Switch>
  )
}
