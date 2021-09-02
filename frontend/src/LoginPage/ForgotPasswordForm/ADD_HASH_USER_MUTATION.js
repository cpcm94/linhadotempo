import { gql } from '@apollo/client'

export const ADD_HASH_USER_MUTATION = gql`
  mutation AddHashUser($input: AddHashUserInput!) {
    addHashUser(input: $input) {
      message
      success
    }
  }
`
