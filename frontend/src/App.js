import React from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  concat,
} from '@apollo/client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { TimelinesLoader } from './TimelinesPage/TimelinesLoader'
import { getToken } from './_shared/AuthToken/getToken'
import { LoginPageLoader } from './LoginPage/LoginPageLoader'
import { NewTimelineLoader } from './NewTimelinePage/NewTimelineLoader'
import { EditTimelinePage } from './EditTimelinePage/EditTimelinePage'
import { ViewTimelinePage } from './ViewTimelinePage/ViewTimelinePage'

const addAuthTokensInHeader = new ApolloLink((operation, forward) => {
  const token = getToken()
  if (token) {
    operation.setContext(({ headers }) => ({
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }))
  }
  return forward(operation)
})

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
})

const client = new ApolloClient({
  link: concat(addAuthTokensInHeader, httpLink),
  cache: new InMemoryCache(),
})

const ApolloApp = (Wrapped) => (
  <ApolloProvider client={client}>
    <Wrapped />
  </ApolloProvider>
)
const Wrapped = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/timelines">
            <TimelinesLoader />
          </Route>
          <Route path="/login">
            <LoginPageLoader />
          </Route>
          <Route path="/newTimeline">
            <NewTimelineLoader />
          </Route>
          <Route path="/editTimeline">
            <EditTimelinePage />
          </Route>
          <Route path="/viewTimeline">
            <ViewTimelinePage />
          </Route>
          <Route path="/">
            <TimelinesLoader />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default () => ApolloApp(Wrapped)
