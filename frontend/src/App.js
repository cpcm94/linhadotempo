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
import { ViewTimelinesPage } from './ViewTimelinePage/ViewTimelinesPage'
import { CurrentUserContextProvider } from './_shared/CurrentUserContextProvider'
import { UserPageLoader } from './UserPage/UserPageLoader'
import { UsersLoader } from './UsersPage/UsersLoader'
import { EditUserPage } from './EditUserPage/EditUserPage'
import { ViewRecoverPasswordPage } from './RecoverPasswordPage/ViewRecoverPasswordPage'
import { BooksLoader } from './BooksPage/BooksLoader'
import { ViewEditBookPage } from './EditBookPage/ViewEditBookPage'
import { NewBookLoader } from './NewBookPage/NewBookLoader'
import { CategoriesLoader } from './TimelineCategoriesPage/TimelineCategoriesLoader'
import { NewTimelineCategoryLoader } from './NewTimelineCategoryPage/NewTimelineCategoryLoader'
import { EditTimelineCategoryPage } from './EditTimelineCategoryPage/EditTimelineCategoryPage'
import { NewUserLoader } from './NewUserPage/NewUserLoader'
import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'
import { TimeEntryCategoriesLoader } from './TimeEntryCategoriesPage/TimeEntryCategoriesLoader'
import { NewTimeEntryCategoryLoader } from './NewTimeEntryCategoryPage/NewTimeEntryCategoryLoader'
import { EditTimeEntryCategoryPage } from './EditTimeEntryCategoryPage/EditTimeEntryCategoryPage'

const bugsnagApiKey = process.env.REACT_APP_BUGSNAG_API_KEY
  ? process.env.REACT_APP_BUGSNAG_API_KEY
  : 'no api key found'

Bugsnag.start({
  apiKey: bugsnagApiKey,
  plugins: [new BugsnagPluginReact()],
})

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

const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React)

const ApolloApp = (Wrapped) => (
  <ErrorBoundary>
    <ApolloProvider client={client}>
      <CurrentUserContextProvider>
        <Wrapped />
      </CurrentUserContextProvider>
    </ApolloProvider>
  </ErrorBoundary>
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
            <ViewTimelinesPage />
          </Route>
          <Route path="/users">
            <UsersLoader />
          </Route>
          <Route path="/user">
            <UserPageLoader />
          </Route>
          <Route path="/editUser">
            <EditUserPage />
          </Route>
          <Route path="/recoverPassword">
            <ViewRecoverPasswordPage />
          </Route>
          <Route path="/books">
            <BooksLoader />
          </Route>
          <Route path="/newBook">
            <NewBookLoader />
          </Route>
          <Route path="/editBook">
            <ViewEditBookPage />
          </Route>
          <Route path="/timelineCategories">
            <CategoriesLoader />
          </Route>
          <Route path="/newTimelineCategory">
            <NewTimelineCategoryLoader />
          </Route>
          <Route path="/editTimelineCategory">
            <EditTimelineCategoryPage />
          </Route>
          <Route path="/timeEntryCategories">
            <TimeEntryCategoriesLoader />
          </Route>
          <Route path="/newTimeEntryCategory">
            <NewTimeEntryCategoryLoader />
          </Route>
          <Route path="/editTimeEntryCategory">
            <EditTimeEntryCategoryPage />
          </Route>
          <Route path="/newUser">
            <NewUserLoader />
          </Route>
          <Route path="/">
            <LoginPageLoader />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default () => ApolloApp(Wrapped)
