import React from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import { EditTimelineLoader } from './EditTimelineLoader'

export const EditTimelinePage = () => {
  let { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={`${path}/:timelineId`}>
        <EditTimelineLoader />
      </Route>
    </Switch>
  )
}
