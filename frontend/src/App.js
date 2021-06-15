import React from 'react'
import logo from './logo.svg'
import './App.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { TimelineLoader } from './TimelinePage/TimelineLoader'

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
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
          <Route path='/timeline'>
            <TimelineLoader />
          </Route>
          <Route path='/'>
            <div>
              <header className='App-header'>
                <img src={logo} className='App-logo' alt='logo' />
                <p>Linha do Tempo</p>
              </header>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => ApolloApp(Wrapped)
