import React from 'react'
import logo from './logo.svg'
import './App.css'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  concat,
} from '@apollo/client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { TimelinePage } from './TimelinePage/TimelinePage'
import { getToken } from './_shared/AuthToken/getToken'
import { LoginPageLoader } from './LoginPage/LoginPageLoader'

const addAuthTokensInHeader = new ApolloLink((operation, forward) => {
  const token = getToken()
  if (token) {
    operation.setContext(({ headers }) => ({
      headers: {
        ...headers,
        authorization: tokens ? `Bearer ${token}` : '',
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
          <Route path="/timeline">
            <TimelinePage />
          </Route>
          <Route path="/login">
            <LoginPageLoader />
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
