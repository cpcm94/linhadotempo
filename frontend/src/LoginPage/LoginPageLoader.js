import React from 'react'
import { LoginPage } from './LoginPage'

export const LoginPageLoader = () => {
  fetch('http://www.graphql.stage.alinhadotempo.com.br/sanctum/csrf-cookie', {
    method: 'GET',
  }).then(async (response) => {
    console.log('hello')
    console.log('response', response)
  })

  return <LoginPage />
}
