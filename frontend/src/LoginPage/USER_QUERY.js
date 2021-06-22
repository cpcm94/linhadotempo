import { gql } from '@apollo/client'

export const USER_QUERY = gql`
  query {
    me {
      id
      name
      email
    }
  }
`
