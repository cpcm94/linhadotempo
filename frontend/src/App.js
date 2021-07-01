import React from 'react'
import logo from './logo.svg'
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
import { CurrentUserContextProvider } from './_shared/CurrentUserContextProvider'

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
    <CurrentUserContextProvider>
      <Wrapped />
    </CurrentUserContextProvider>
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
          <Route path="/">
            <div>
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Linha do Tempo</p>
              </header>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default () => ApolloApp(Wrapped)
