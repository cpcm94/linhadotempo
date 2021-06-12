import React from 'react'
import logo from './logo.svg'
import './App.css'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client'

const USER_QUERY = gql`
  query ($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`
const QueryAttempt = () => {
  const { loading, error, data } = useQuery(USER_QUERY, {
    variables: { id: '1' },
  })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const user = data.user

  return (
    <>
      <div>Username:{user.name}</div>
      <div>Email:{user.email}</div>
      <div>ID:{user.id}</div>
    </>
  )
}

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
    <div>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>Linha do Tempo</p>
        <QueryAttempt />
      </header>
    </div>
  )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => ApolloApp(Wrapped)
