import React from 'react'
import logo from './logo.svg'
import './App.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { HttpLink } from 'apollo-link-http'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { TimelinePage } from './TimelinePage/TimelinePage'
import { setContext } from 'apollo-link-context'

import { LoginPageLoader } from './LoginPage/LoginPageLoader'

const authLink = setContext((_, { headers }) => {
  let token = RegExp('XSRF-TOKEN[^;]+').exec(document.cookie)
  token = decodeURIComponent(
    token ? token.toString().replace(/^[^=]+./, '') : ''
  )
  return {
    headers: {
      ...headers,
      'X-XSRF-TOKEN': token,
    },
  }
})
// const authLink = new ApolloLink((operation, forward) => {
//   let token = RegExp('XSRF-TOKEN[^;]+').exec(document.cookie)
//   token = decodeURIComponent(
//     token ? token.toString().replace(/^[^=]+./, '') : ''
//   )
//   operation.setContext(({ headers }) => ({
//     headers: {
//       ...headers,
//       'X-XSRF-TOKEN': token,
//     },
//   }))
//   return forward(operation)
// })

const httpLink = new HttpLink({
  uri: 'http://www.graphql.stage.alinhadotempo.com.br/graphql',
  credentials: 'same-origin',
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
