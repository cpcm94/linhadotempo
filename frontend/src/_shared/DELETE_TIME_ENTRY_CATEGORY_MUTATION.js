import { gql } from '@apollo/client'

export const DELETE_TIME_ENTRY_CATEGORY_MUTATION = gql`
  mutation DeleteTimeEntryCategory($id: ID!) {
    deleteTimeEntryCategory(id: $id) {
      id
      name
    }
  }
`
