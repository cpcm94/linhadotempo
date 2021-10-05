import React from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import { RelatedTimelinesLoader } from './RelatedTimelinesLoader'

export const ViewRelatedTimelines = () => {
  let { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={`${path}/:timelineId`}>
        <RelatedTimelinesLoader />
      </Route>
    </Switch>
  )
}
