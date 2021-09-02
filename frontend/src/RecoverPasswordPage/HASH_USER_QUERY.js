import { gql } from '@apollo/client'

export const HASH_USER_QUERY = gql`
  query HashUser($hash_id: String!) {
    hashUser(hash_id: $hash_id) {
      expiry_date
      user {
        id
        email
        name
      }
    }
  }
`
