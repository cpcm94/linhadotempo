import { gql } from '@apollo/client'

export const USER_QUERY = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      name
      type
      email
    }
  }
`
