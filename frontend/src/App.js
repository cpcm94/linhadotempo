import React from 'react'
import logo from './logo.svg'
import './App.css'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
} from '@apollo/client'
import { HttpLink } from 'apollo-link-http'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { TimelinePage } from './TimelinePage/TimelinePage'
import { TIMELINE_QUERY } from './TimelinePage/TIMELINE_QUERY'

const httpLink = new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_ENDPOINT })

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

const ApolloApp = (Wrapped) => (
  <ApolloProvider client={client}>
    <Wrapped />
  </ApolloProvider>
)
const Wrapped = () => {
  const { data, error } = useQuery(TIMELINE_QUERY, {
    variables: { id: '3' },
    notifyOnNetworkStatusChange: true,
  })
  if (error) {
    console.log('error', error)
  }

  if (data) {
    console.log('data', data)
  }
  return (
    <Router>
      <div>
        <Switch>
          <Route path='/timeline'>
            <TimelinePage />
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
