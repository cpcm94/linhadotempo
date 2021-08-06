import { gql } from '@apollo/client'

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      name
      type
      email
    }
  }
`
