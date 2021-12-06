import React from 'react'
import { ViewTimelinesLoader } from './ViewTimelinesLoader'
import { TimelinesContextProvider } from './TimelinesContextProvider'
import { NewEntryLoader } from './EntryPages/NewEntryPage/NewEntryLoader'
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import { EditEntryLoader } from './EntryPages/EditEntryPage/EditEntryLoader'
import { TimeEntryCategoriesContextProvider } from './TimeEntryCategoriesContextProvider'

export const ViewTimelinesPage = () => {
  let { path } = useRouteMatch()
  return (
    <TimelinesContextProvider>
      <Switch>
        <Route exact path={`${path}`}>
          <ViewTimelinesLoader />
        </Route>
        <TimeEntryCategoriesContextProvider>
          <Route exact path={`${path}/newEntry/`}>
            <NewEntryLoader />
          </Route>
          <Route exact path={`${path}/editEntry/`}>
            <EditEntryLoader />
          </Route>
        </TimeEntryCategoriesContextProvider>
      </Switch>
    </TimelinesContextProvider>
  )
}
