import { gql } from '@apollo/client'

export const DELETE_USER_MUTATION = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id, input: $input) {
      success
      message
    }
  }
`
