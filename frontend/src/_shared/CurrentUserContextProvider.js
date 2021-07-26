import React, { createContext } from 'react'
import { useQuery } from '@apollo/client'
import { ME_QUERY } from './ME_QUERY'
import PropTypes from 'prop-types'

export const CurrentUserContext = createContext()
export const CurrentUserContextProvider = ({ children }) => {
  const {
    data,
    loading: userDataLoading,
    refetch: refetchUser,
  } = useQuery(ME_QUERY, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-first',
  })
  const user = data
    ? {
        ...data.me,
        initial: data.me ? data.me.name.substr(0, 1).toUpperCase() : null,
      }
    : null
  return (
    <CurrentUserContext.Provider value={{ userDataLoading, user, refetchUser }}>
      {children}
    </CurrentUserContext.Provider>
  )
}

CurrentUserContextProvider.propTypes = {
  children: PropTypes.object,
}
