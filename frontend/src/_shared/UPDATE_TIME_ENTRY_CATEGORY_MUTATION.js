import { gql } from '@apollo/client'

export const UPDATE_TIME_ENTRY_CATEGORY_MUTATION = gql`
  mutation UpdateTimeEntryCategory(
    $id: ID!
    $input: UpdateTimeEntryCategoryInput!
  ) {
    updateTimeEntryCategory(id: $id, input: $input) {
      id
      name
      color
    }
  }
`
