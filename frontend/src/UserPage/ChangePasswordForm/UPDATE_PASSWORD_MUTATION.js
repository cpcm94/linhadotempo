import { gql } from '@apollo/client'

export const UPDATE_PASSWORD_MUTATION = gql`
  mutation updatePassword($id: ID!, $input: UpdatePasswordInput!) {
    updatePassword(id: $id, input: $input) {
      success
    }
  }
`
