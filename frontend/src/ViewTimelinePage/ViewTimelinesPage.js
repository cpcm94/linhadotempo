import React from 'react'
import { ViewTimelinesLoader } from './ViewTimelinesLoader'
import { TimelinesContextProvider } from './TimelinesContextProvider'
import { NewEntryLoader } from './NewEntryPage/NewEntryLoader'
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import { EditEntryLoader } from './EditEntryPage/EditEntryLoader'

export const ViewTimelinesPage = () => {
  let { path } = useRouteMatch()
  return (
    <TimelinesContextProvider>
      <Switch>
        <Route exact path={`${path}`}>
          <ViewTimelinesLoader />
        </Route>
        <Route exact path={`${path}/newEntry/`}>
          <NewEntryLoader />
        </Route>
        <Route exact path={`${path}/editEntry/`}>
          <EditEntryLoader />
        </Route>
      </Switch>
    </TimelinesContextProvider>
  )
}
