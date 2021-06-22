import { gql } from '@apollo/client'

export const SELF_QUERY = gql`
  query {
    me {
      id
      name
      email
    }
  }
`
