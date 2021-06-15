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

const mapData = (data) => {
  data.map((name, event_data) => {
    return (
      <>
        <div>Nome do evento: {name}</div>
        <div>Data do evento: {event_data}</div>
      </>
    )
  })
}

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
  const { data, loading, error } = useQuery(TIMELINE_QUERY, {
    variables: { id: '3' },
    notifyOnNetworkStatusChange: true,
  })
  if (error) {
    console.log('error', error)
  }
  if (data) {
    console.log(
      'data.timeline.historical_events',
      data.timeline.historical_events
    )
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
                <div>
                  {loading ? '...' : mapData(data.timeline.historical_events)}
                </div>
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
