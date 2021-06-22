import React from 'react'
import { LoginPage } from './LoginPage'

export const LoginPageLoader = () => {
  fetch(process.env.REACT_APP_AUTH_TOKEN_ENDPOINT, {
    method: 'GET',
  }).then((response) => {
    console.log('hello')
    console.log('response', response)
  })

  return <LoginPage />
}
