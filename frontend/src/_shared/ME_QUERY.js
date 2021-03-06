import { gql } from '@apollo/client'

export const ME_QUERY = gql`
  query {
    me {
      id
      name
      type
      email
    }
    settings {
      bucket_name
    }
  }
`
